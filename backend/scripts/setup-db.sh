#!/bin/bash

# CPoint Database Setup Script
# This script creates the database, user, and initializes the schema

set -e  # Exit on any error

# Configuration
DB_NAME="cpoint"
DB_USER="cpoint_user"
DB_PASSWORD="cpoint_secure_password_2024"
POSTGRES_USER="postgres"

echo "🚀 Setting up CPoint database..."
echo "Database: $DB_NAME"
echo "User: $DB_USER"

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    echo "   sudo systemctl start postgresql"
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database and user as superuser
echo "📝 Creating database and user..."
psql -U $POSTGRES_USER -c "DROP DATABASE IF EXISTS $DB_NAME;" 2>/dev/null || true
psql -U $POSTGRES_USER -c "DROP USER IF EXISTS $DB_USER;" 2>/dev/null || true

psql -U $POSTGRES_USER <<EOF
CREATE DATABASE $DB_NAME;
CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASSWORD';

-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;

-- Connect to the database and grant schema permissions
\c $DB_NAME

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $DB_USER;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $DB_USER;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO $DB_USER;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO $DB_USER;

EOF

echo "✅ Database and user created successfully"

# Now run the schema initialization as the application user
echo "📋 Initializing database schema..."
PGPASSWORD=$DB_PASSWORD psql -h localhost -U $DB_USER -d $DB_NAME -f "$(dirname "$0")/init-db.sql"

echo "✅ Database schema initialized successfully"

# Test the connection
echo "🔍 Testing database connection..."
PGPASSWORD=$DB_PASSWORD psql -h localhost -U $DB_USER -d $DB_NAME -c "SELECT 'Connection successful!' as status;"

echo "🎉 Database setup completed!"
echo ""
echo "📝 Environment configuration:"
echo "DB_HOST=localhost"
echo "DB_PORT=5432"
echo "DB_NAME=$DB_NAME"
echo "DB_USER=$DB_USER"
echo "DB_PASSWORD=$DB_PASSWORD"
echo ""
echo "Copy these values to your backend/.env file"