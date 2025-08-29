# CPoint System Design Document

## Overview

CPoint is a web application built with a modern, simplified architecture focusing on user authentication and basic functionality. This version (v3) takes an incremental approach, implementing core features step by step.

## Architecture

### High-Level Architecture
```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐    SQL    ┌─────────────────┐
│                 │ ──────────────────► │                 │ ────────► │                 │
│   Frontend      │                     │    Backend      │           │   PostgreSQL    │
│  (React+Vite)   │ ◄────────────────── │  (Node.js +     │ ◄──────── │    Database     │
│                 │    JSON/JWT         │   Express)      │           │                 │
└─────────────────┘                     └─────────────────┘           └─────────────────┘
```

### Technology Stack

#### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS Modules / Vanilla CSS
- **HTTP Client**: Fetch API / Axios
- **State Management**: React Context (for auth state)
- **Routing**: React Router

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Database Client**: pg (node-postgres)
- **Validation**: joi or express-validator
- **Environment**: dotenv

#### Database
- **Database**: PostgreSQL
- **Host**: localhost
- **Connection Pooling**: pg Pool

## System Components

### 1. Frontend Application
- **Location**: `/frontend/`
- **Purpose**: User interface for registration, login, and main application features
- **Key Components**:
  - Login Form
  - Registration Form
  - Protected Routes
  - Authentication Context

### 2. Backend API
- **Location**: `/backend/`
- **Purpose**: RESTful API server handling authentication and business logic
- **Key Endpoints**:
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login
  - `POST /api/auth/logout` - User logout
  - `GET /api/auth/me` - Get current user info
  - `PUT /api/auth/profile` - Update user profile

### 3. Database Layer
- **Database**: PostgreSQL running on localhost
- **Tables**:
  - `users` - User accounts and authentication data
  - `sessions` (optional) - Token blacklist or session management

## Authentication Flow

### User Registration
```
1. User fills registration form (email, password, confirm password)
2. Frontend validates input and sends POST to /api/auth/register
3. Backend validates data, checks email uniqueness
4. Password is hashed using bcrypt
5. User record created in database
6. JWT token generated and returned
7. Frontend stores token and redirects to dashboard
```

### User Login
```
1. User provides email and password
2. Frontend sends POST to /api/auth/login
3. Backend validates credentials against database
4. If valid, JWT token generated and returned
5. Frontend stores token for subsequent requests
6. User redirected to main application
```

### Token Management
- JWT tokens stored in localStorage (or httpOnly cookies for enhanced security)
- Tokens include user ID and expiration time
- Backend middleware validates tokens on protected routes
- Token expiry: 24 hours (configurable)

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
```json
Request:
{
    "email": "user@example.com",
    "password": "securepassword",
    "firstName": "John",
    "lastName": "Doe"
}

Response:
{
    "success": true,
    "token": "jwt-token-here",
    "user": {
        "id": 1,
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe"
    }
}
```

#### POST /api/auth/login
```json
Request:
{
    "email": "user@example.com",
    "password": "securepassword"
}

Response:
{
    "success": true,
    "token": "jwt-token-here",
    "user": {
        "id": 1,
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe"
    }
}
```

#### GET /api/auth/me
```json
Headers:
Authorization: Bearer jwt-token-here

Response:
{
    "success": true,
    "user": {
        "id": 1,
        "email": "user@example.com",
        "firstName": "John",
        "lastName": "Doe"
    }
}
```

## Security Considerations

### Authentication Security
- Passwords hashed with bcrypt (minimum 12 rounds)
- JWT tokens signed with strong secret key
- Input validation on all endpoints
- Rate limiting on authentication endpoints
- Email validation and sanitization

### Database Security
- Prepared statements to prevent SQL injection
- Connection pooling with proper connection limits
- Database credentials stored in environment variables

### Frontend Security
- No sensitive data in localStorage beyond JWT token
- Proper token cleanup on logout
- Input sanitization on forms
- HTTPS enforcement in production

## Environment Configuration

### Backend Environment Variables
```env
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cpoint
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h
```

### Frontend Environment Variables
```env
VITE_API_URL=http://localhost:3001/api
```

## Development Workflow

### Initial Setup
1. Initialize backend with Express and dependencies
2. Set up database connection and create tables
3. Implement authentication middleware and endpoints
4. Initialize frontend with Vite and React
5. Create login/registration forms
6. Implement authentication context and routing

### Testing Strategy
- Unit tests for authentication functions
- Integration tests for API endpoints
- Frontend component testing with React Testing Library
- End-to-end testing for complete authentication flow

## Deployment Considerations

### Development
- Backend runs on port 3001
- Frontend runs on port 5173 (Vite default)
- PostgreSQL on localhost:5432

### Production (Future)
- Frontend built as static files
- Backend deployed as Node.js service
- PostgreSQL as managed database service
- HTTPS/SSL termination
- Environment-specific configurations

## Future Enhancements

### Phase 2 Features
- User profile management
- Password reset functionality
- Email verification
- Role-based authorization

### Phase 3 Features
- Multi-factor authentication
- Social login integration
- Audit logging
- Session management improvements

## File Structure

```
cpoint/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   └── auth.js
│   │   ├── config/
│   │   │   └── database.js
│   │   └── app.js
│   ├── scripts/
│   │   └── init-db.sql
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
├── design/
│   ├── index.html
│   ├── login.html
│   └── register.html
└── systemdesign.md
```

This system design provides a solid foundation for the CPoint application, focusing on security, maintainability, and scalability while keeping the initial implementation simple and focused.