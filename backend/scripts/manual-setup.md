# Manual Database Setup (Alternative Method)

If you prefer to set up the database manually, follow these steps:

## Method 1: Using the automated script (Recommended)

```bash
cd backend/scripts
./setup-db.sh
```

## Method 2: Manual step-by-step setup

### Step 1: Connect as PostgreSQL superuser
```bash
sudo -u postgres psql
```

### Step 2: Create database and user
```sql
-- Drop existing database/user if they exist
DROP DATABASE IF EXISTS cpoint;
DROP USER IF EXISTS cpoint_user;

-- Create new database and user
CREATE DATABASE cpoint;
CREATE USER cpoint_user WITH ENCRYPTED PASSWORD 'cpoint_secure_password_2024';

-- Grant database privileges
GRANT ALL PRIVILEGES ON DATABASE cpoint TO cpoint_user;

-- Connect to the database
\c cpoint

-- Grant schema privileges (this fixes the permission error)
GRANT ALL ON SCHEMA public TO cpoint_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cpoint_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cpoint_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cpoint_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO cpoint_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO cpoint_user;

-- Exit psql
\q
```

### Step 3: Initialize the schema
```bash
cd /home/jimmyz/Dev/cpoint/backend/scripts
PGPASSWORD=cpoint_secure_password_2024 psql -h localhost -U cpoint_user -d cpoint -f init-db-fixed.sql
```

### Step 4: Test the connection
```bash
PGPASSWORD=cpoint_secure_password_2024 psql -h localhost -U cpoint_user -d cpoint -c "SELECT 'Connection works!' as test;"
```

## Method 3: Quick one-liner (if you have sudo access)

```bash
# As postgres user
sudo -u postgres psql <<EOF
DROP DATABASE IF EXISTS cpoint;
DROP USER IF EXISTS cpoint_user;
CREATE DATABASE cpoint;
CREATE USER cpoint_user WITH ENCRYPTED PASSWORD 'cpoint_secure_password_2024';
GRANT ALL PRIVILEGES ON DATABASE cpoint TO cpoint_user;
\c cpoint
GRANT ALL ON SCHEMA public TO cpoint_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO cpoint_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO cpoint_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO cpoint_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO cpoint_user;
EOF

# Then run the schema
cd backend/scripts
PGPASSWORD=cpoint_secure_password_2024 psql -h localhost -U cpoint_user -d cpoint -f init-db-fixed.sql
```

## Environment Configuration

After successful setup, create `backend/.env`:

```env
NODE_ENV=development
PORT=3001

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cpoint
DB_USER=cpoint_user
DB_PASSWORD=cpoint_secure_password_2024

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long-change-this
JWT_EXPIRE=24h

# Security
BCRYPT_ROUNDS=12
```

## Troubleshooting

**Permission Error**: The schema `public` needs explicit permissions for the application user.

**Connection Error**: Make sure PostgreSQL is running:
```bash
sudo systemctl status postgresql
sudo systemctl start postgresql  # if not running
```

**User already exists**: Use `DROP USER IF EXISTS cpoint_user;` before creating.

**Database already exists**: Use `DROP DATABASE IF EXISTS cpoint;` before creating.