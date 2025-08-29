# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is version 3 of a "vibe coding practice" project, taking a step-by-step approach rather than building everything at once. The project uses a simplified architecture to reduce complexity.

## Architecture

- **Frontend**: Vite + React (avoiding Next.js for simplicity)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (preferred choice for all projects)
- **Structure**: Monorepo with separate `frontend/` and `backend/` directories

## Development Setup

Since this is an early-stage project, the following commands will need to be established as the codebase grows:

### Frontend (when initialized)
```bash
cd frontend
npm install
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linting
npm run test         # Run tests
```

### Backend (when initialized)
```bash
cd backend
npm install
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linting
npm run test         # Run tests
```

## Database

- Uses PostgreSQL as the preferred database
- Local database service is available (no Docker needed)
- Database configuration should be environment-specific

## Development Guidelines

- Always ask for user choice before making infrastructure changes
- If issues are found during testing, present solutions and wait for user approval
- Prefer PostgreSQL unless there's a compelling system architecture reason to use alternatives
- Take incremental approach - build step by step rather than implementing everything at once