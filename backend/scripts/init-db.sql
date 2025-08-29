-- CPoint Database Initialization Script
-- Run this script to set up the database schema

-- Create the database (run this separately if needed)
-- CREATE DATABASE cpoint;

-- Connect to the cpoint database before running the following commands

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verify the schema
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- Show indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'users';

-- Insert a test user (optional - remove in production)
-- Password is 'testpassword' hashed with bcrypt
-- INSERT INTO users (email, password_hash, first_name, last_name)
-- VALUES ('test@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4Jw9q1L8R.', 'Test', 'User');

PRINT 'Database initialization completed successfully!';
PRINT 'You can now start the backend server.';

-- Display some useful queries for verification:
PRINT '';
PRINT 'Useful verification queries:';
PRINT '1. Count users: SELECT COUNT(*) FROM users;';
PRINT '2. List all users: SELECT id, email, first_name, last_name, created_at FROM users;';
PRINT '3. Check table structure: \d users';