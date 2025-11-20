# Live Metrics Dashboard

A real-time metrics dashboard built with React, TypeScript, Vite (frontend) and Node.js, Express, TypeScript (backend).

## Features

- Real-time metrics streaming via Server-Sent Events (SSE)
- React frontend with TypeScript and Vite
- Node.js/Express backend with TypeScript
- Docker support for easy deployment

## Prerequisites

- Node.js 22 or higher
- npm or yarn
- Docker and Docker Compose (optional)

## Project Structure

```
├── frontend/          # React + Vite frontend application
├── backend/           # Node.js + Express backend API
└── docker-compose.yml # Docker Compose configuration
```

## Local Development

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend API will run on `http://localhost:4000`

## Docker Development

### Using Docker Compose (Recommended)

Run both frontend and backend together:

```bash
docker compose up
```

This will:
- Build both frontend and backend containers
- Run frontend on `http://localhost:5173`
- Run backend on `http://localhost:4000`

To run in detached mode:
```bash
docker compose up -d
```

To stop:
```bash
docker compose down
```

### Building Individual Services

#### Frontend Only

```bash
cd frontend
docker build -t frontend-app .
docker run -p 5173:5173 frontend-app
```

#### Backend Only

```bash
cd backend
docker build -t backend-app .
docker run -p 4000:4000 backend-app
```

## Production Build

### Frontend

```bash
cd frontend
npm run build
npm run start
```

### Backend

```bash
cd backend
npm run build
npm start
```

## Environment Variables

### Frontend
- `VITE_BASE_URL`: Backend API URL (default: `http://localhost:4000`)
- `PORT`: Frontend port (default: `5173`)

### Backend
- `PORT`: Backend port (default: `4000`)

## Notes

- The frontend Dockerfile removes `package-lock.json` before installing dependencies to ensure Linux-native binaries are downloaded correctly (fixes issues with lightningcss and rollup native modules)
- Both services use Node.js 22
- The backend uses Express with CORS enabled for cross-origin requests
