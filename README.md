# 🔗 Shorty URL App

A modern URL shortening application built with a monorepo architecture that allows users to create short links and track visitor statistics in a simple and intuitive way.

## 📋 Description

Shorty URL App is a complete URL shortening solution that allows users to:

- 🎯 **Create custom short links** from long URLs
- 📊 **Monitor real-time statistics** of clicks and visits
- 👤 **Guest session management** without registration required
- 🚀 **Modern and responsive interface** built with React and TailwindCSS
- ⚡ **Robust RESTful API** with validations and error handling

## 🛠️ Technologies Used

### Backend (API)

- **Node.js** - JavaScript runtime environment
- **Express.js** - Minimalist and flexible web framework
- **MongoDB** - Document-oriented NoSQL database
- **Mongoose** - ODM (Object Document Mapper) for MongoDB
- **TypeScript** - Typed superset of JavaScript
- **Zod** - TypeScript-first schema validation library
- **nanoid** - Secure and unique ID generator
- **Nodemon** - Development tool for automatic reload

### Frontend (Client)

- **React 19** - Library for building user interfaces
- **TypeScript** - Typed and safer development
- **Vite** - Fast and modern build tool
- **TailwindCSS 4** - Utility-first CSS framework
- **React Hooks** - State and effects management

### DevOps and Tools

- **Docker & Docker Compose** - Containerization and orchestration
- **Turbo** - High-performance monorepo build system
- **ESLint** - Linter for JavaScript/TypeScript
- **Prettier** - Code formatter

## 📁 Project Structure

```
shorty-url-app/
├── 📋 README.md                    # Main documentation
├── 📦 package.json                 # Root workspace configuration
├── 🐳 docker-compose.yml           # Container orchestration
├── ⚡ turbo.json                   # Turbo configuration
├── 📝 tsconfig.base.json           # Base TypeScript configuration
│
├── 🎯 apps/
│   ├── 🔧 api/                     # Backend API
│   │   ├── 📦 package.json
│   │   ├── 🐳 Dockerfile.dev
│   │   ├── 🔄 nodemon.json
│   │   └── 📂 src/
│   │       ├── 🚀 index.ts         # Entry point
│   │       ├── ⚙️ config/          # Configurations
│   │       ├── 🎮 controllers/     # Route controllers
│   │       ├── 📊 models/          # Data models
│   │       ├── 🛣️ routes/          # Route definitions
│   │       ├── 📋 schemas/         # Validation schemas
│   │       ├── 🔧 services/        # Business logic
│   │       └── 🛠️ utils/           # Utilities and helpers
│   │
│   └── 🎨 client/                  # React Frontend
│       ├── 📦 package.json
│       ├── 🐳 Dockerfile.dev
│       ├── ⚡ vite.config.ts
│       ├── 🌐 index.html
│       └── 📂 src/
│           ├── 🎨 App.tsx          # Main component
│           ├── 🚀 main.tsx         # Entry point
│           ├── 🧩 components/      # Reusable components
│           ├── 🎭 context/         # React contexts
│           ├── 🎣 hooks/           # Custom hooks
│           ├── 🔧 services/        # API services
│           ├── 📝 types/           # Type definitions
│           └── 🛠️ utils/          # Frontend utilities
```

## 🚀 Project Setup

### Prerequisites

- **Node.js** (version 20 or higher)
- **npm** or **yarn**
- **MongoDB** (for local development)
- **Docker** and **Docker Compose** (for container development)

### 🔧 Native Installation (NPM)

#### 1. Clone the repository

```bash
git clone https://github.com/alerandon/shorty-url-app.git
cd shorty-url-app
```

#### 2. Install dependencies

```bash
# Install root workspace and all application dependencies
npm install
```

#### 3. Configure environment variables

```bash
# In the root folder, create .env file
cp .env.example .env

# Configure the following variables:
API_PORT=3001
API_DB_USER=user
API_DB_PASSWORD=password
API_DB_HOST=localhost
API_DB_PORT=27017
API_DB_NAME=shorty-url-app
API_JWT_SECRET=your-jwt-secret-key
API_NODE_ENV=development
```

#### 4. Start MongoDB

```bash
# Option 1: Local MongoDB
mongod

# Option 2: MongoDB with Docker
docker run -d -p 27017:27017 --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=user \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest
```

#### 5. Run the project

```bash
# Option 1: Run the entire monorepo
npm run dev

# Option 2: Run only the API
npm run dev:api

# Option 3: Run only the client
npm run dev:client
```

### 🐳 Docker Installation

#### 1. Clone the repository

```bash
git clone https://github.com/alerandon/shorty-url-app.git
cd shorty-url-app
```

#### 2. Configure environment variables

```bash
# Create .env file in the project root
cp .env.example .env
```

#### 3. Build and run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in development mode with watch (recommended)
docker-compose watch

# Run in background
docker-compose up -d
```

#### 4. Access the application

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001
- **MongoDB**: mongodb://localhost:27017

### 🔍 Available Scripts

```bash
# Root workspace
npm run dev          # Run entire monorepo in development mode
npm run build        # Build all applications
npm run dev:api      # Run only the API
npm run dev:client   # Run only the client

# API (apps/api)
npm run dev          # Development with hot-reload
npm run build        # Build for production
npm run start        # Run built version
npm test             # Run tests

# Client (apps/client)
npm run dev          # Development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Code linter
```

## 📊 Project Entities

### 🔗 URL Model

The main model of the application that represents a shortened link.

#### Data Structure

| Field         | Type       | Description                                         | Required | Default Value    |
| ------------- | ---------- | --------------------------------------------------- | -------- | ---------------- |
| `_id`         | `ObjectId` | MongoDB unique identifier                           | ✅       | Auto-generated   |
| `originalUrl` | `String`   | Complete original URL to be shortened               | ✅       | -                |
| `shortCode`   | `String`   | Unique 7-character code for the short link         | ✅       | `nanoid(7)`      |
| `visitCount`  | `Number`   | Visit counter for the short link                    | ✅       | `0`              |
| `guestId`     | `String`   | Guest user session identifier                       | ✅       | -                |
| `createdAt`   | `Date`     | Record creation date and time                       | ✅       | Auto-generated   |
| `updatedAt`   | `Date`     | Last update date and time                           | ✅       | Auto-updated     |

#### Document Example

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "originalUrl": "https://www.example.com/a-very-long-url-that-needs-to-be-shortened",
  "shortCode": "aB3xY7z",
  "visitCount": 42,
  "guestId": "guest_a1b2c3d4e5f6",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-18T15:45:30.000Z"
}
```

#### Validations and Rules

- **originalUrl**: Must be a valid URL with protocol (http/https)
- **shortCode**: Unique across the entire database, automatically generated
- **visitCount**: Only increments, never decreases
- **guestId**: Allows associating multiple URLs to a user session

#### Database Indexes

- `shortCode`: Unique index for fast searches
- `guestId`: Index for user queries
- `createdAt`: Index for temporal sorting

