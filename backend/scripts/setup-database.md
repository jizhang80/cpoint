# Database Setup Instructions

## Prerequisites
- PostgreSQL installed and running on localhost
- Database user with CREATE DATABASE privileges

## Quick Setup

1. **Connect to PostgreSQL as a superuser or database admin:**
   ```bash
   psql -h localhost -U postgres
   ```

2. **Create the database and user:**
   ```sql
   CREATE DATABASE cpoint;
   CREATE USER cpoint_user WITH ENCRYPTED PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE cpoint TO cpoint_user;
   ```

3. **Exit and connect to the new database:**
   ```bash
   \q
   psql -h localhost -U cpoint_user -d cpoint
   ```

4. **Run the initialization script:**
   ```bash
   psql -h localhost -U cpoint_user -d cpoint -f scripts/init-db.sql
   ```

## Alternative: One-liner setup
```bash
# Create database and run init script
createdb -h localhost -U postgres cpoint
psql -h localhost -U postgres -d cpoint -f scripts/init-db.sql
```

## Environment Configuration

Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=3001

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cpoint
DB_USER=cpoint_user
DB_PASSWORD=your_secure_password

# JWT Configuration  
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_EXPIRE=24h

# Security
BCRYPT_ROUNDS=12
```

## Verification Commands

After setup, verify the database is working:

```sql
-- Check if tables exist
\dt

-- Check users table structure
\d users

-- Verify indexes
\di

-- Test connection from Node.js (optional)
SELECT 1 as connection_test;
```

## Database Schema Overview

The `users` table includes:
- `id`: Serial primary key
- `email`: Unique email address (varchar 255)
- `password_hash`: Bcrypt hashed password (varchar 255)
- `first_name`: User's first name (varchar 100)
- `last_name`: User's last name (varchar 100)
- `created_at`: Timestamp of account creation
- `updated_at`: Timestamp of last update (auto-updated via trigger)

## Security Notes

1. **Database User**: Create a dedicated database user for the application
2. **Password**: Use a strong password for the database user
3. **JWT Secret**: Generate a secure random string at least 32 characters long
4. **Environment Variables**: Never commit actual credentials to version control

## Troubleshooting

**Connection Issues:**
- Ensure PostgreSQL is running: `sudo systemctl status postgresql`
- Check if the database exists: `psql -l`
- Verify user permissions: `\du` in psql

**Permission Errors:**
```sql
-- Grant necessary permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cpoint_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cpoint_user;
```

**Testing the Setup:**
Run the backend server and check the health endpoint:
```bash
cd backend
npm install
npm run dev
curl http://localhost:3001/api/health
```