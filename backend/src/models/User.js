const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

class User {
    static async create(userData) {
        const { email, password, firstName, lastName } = userData;
        
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        
        const query = `
            INSERT INTO users (email, password_hash, first_name, last_name, created_at, updated_at)
            VALUES ($1, $2, $3, $4, NOW(), NOW())
            RETURNING id, email, first_name, last_name, created_at
        `;
        
        const result = await db.query(query, [email, passwordHash, firstName, lastName]);
        return result.rows[0];
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await db.query(query, [email]);
        return result.rows[0];
    }

    static async findById(id) {
        const query = 'SELECT id, email, first_name, last_name, created_at FROM users WHERE id = $1';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    static async validatePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    static generateToken(userId) {
        return jwt.sign(
            { userId: userId },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || '24h' }
        );
    }

    static async emailExists(email) {
        const query = 'SELECT id FROM users WHERE email = $1';
        const result = await db.query(query, [email]);
        return result.rows.length > 0;
    }

    static async updateProfile(userId, updateData) {
        const { firstName, lastName } = updateData;
        const query = `
            UPDATE users 
            SET first_name = $1, last_name = $2, updated_at = NOW()
            WHERE id = $3
            RETURNING id, email, first_name, last_name, updated_at
        `;
        
        const result = await db.query(query, [firstName, lastName, userId]);
        return result.rows[0];
    }
}

module.exports = User;