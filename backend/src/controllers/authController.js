const Joi = require('joi');
const User = require('../models/User');

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const profileSchema = Joi.object({
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required()
});

class AuthController {
    static async register(req, res) {
        try {
            const { error, value } = registerSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.details[0].message
                });
            }

            const { email, password, firstName, lastName } = value;

            const emailExists = await User.emailExists(email);
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already registered'
                });
            }

            const user = await User.create({ email, password, firstName, lastName });
            const token = User.generateToken(user.id);

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name
                }
            });

        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async login(req, res) {
        try {
            const { error, value } = loginSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.details[0].message
                });
            }

            const { email, password } = value;

            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            const isValidPassword = await User.validatePassword(password, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            const token = User.generateToken(user.id);

            res.json({
                success: true,
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name
                }
            });

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async getMe(req, res) {
        try {
            res.json({
                success: true,
                user: {
                    id: req.user.id,
                    email: req.user.email,
                    firstName: req.user.first_name,
                    lastName: req.user.last_name,
                    createdAt: req.user.created_at
                }
            });
        } catch (error) {
            console.error('Get user error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async updateProfile(req, res) {
        try {
            const { error, value } = profileSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.details[0].message
                });
            }

            const updatedUser = await User.updateProfile(req.user.id, value);

            res.json({
                success: true,
                message: 'Profile updated successfully',
                user: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    firstName: updatedUser.first_name,
                    lastName: updatedUser.last_name,
                    updatedAt: updatedUser.updated_at
                }
            });

        } catch (error) {
            console.error('Update profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    static async logout(req, res) {
        res.json({
            success: true,
            message: 'Logout successful'
        });
    }
}

module.exports = AuthController;