#!/usr/bin/env node

// Auto-fix Railway deployment by creating missing files
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const REPO_OWNER = 'catalinignat2022';
const REPO_NAME = 'romanian-dating-final-app';

async function createMissingFiles() {
  console.log('🔧 Auto-fixing Railway deployment...');
  console.log(`📁 Repository: ${REPO_OWNER}/${REPO_NAME}`);
  
  try {
    // 1. Create server.js
    const serverJs = `const app = require('./src/app');
const connectDB = require('./src/config/database');
const { createServer } = require('http');
const { Server } = require('socket.io');
const socketHandler = require('./src/socket/socketHandler');

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Create HTTP server
const server = createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Initialize Socket.IO
socketHandler(io);

// Start server
server.listen(PORT, () => {
  console.log(\`🚀 Romanian Dating Server running on port \${PORT}\`);
  console.log(\`📊 Environment: \${process.env.NODE_ENV}\`);
  console.log(\`🌐 API URL: \${process.env.API_URL || \`http://localhost:\${PORT}\`}\`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

module.exports = server;`;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'server.js',
      message: 'Add server.js entry point for Railway deployment',
      content: Buffer.from(serverJs).toString('base64')
    });
    console.log('✅ Created server.js');

    // 2. Create package.json
    const packageJson = `{
  "name": "romanian-dating-final-app",
  "version": "1.0.0",
  "description": "Romanian Dating App Backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "joi": "^17.9.2",
    "socket.io": "^4.7.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "express-rate-limit": "^6.10.0",
    "dotenv": "^16.3.1",
    "compression": "^1.7.4",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}`;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'package.json',
      message: 'Add package.json with Railway deployment configuration',
      content: Buffer.from(packageJson).toString('base64')
    });
    console.log('✅ Created package.json');

    // 3. Create railway.json
    const railwayJson = `{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm ci"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}`;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'railway.json',
      message: 'Add Railway deployment configuration',
      content: Buffer.from(railwayJson).toString('base64')
    });
    console.log('✅ Created railway.json');

    // 4. Create src/app.js
    const srcAppJs = `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    error: 'Prea multe cereri. Încearcă din nou mai târziu.'
  }
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Romanian Dating Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Basic routes
app.get('/', (req, res) => {
  res.json({
    message: 'Romanian Dating App API',
    status: 'running',
    version: '1.0.0'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: \`Ruta \${req.originalUrl} nu a fost găsită\`
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;`;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'src/app.js',
      message: 'Add Express app configuration',
      content: Buffer.from(srcAppJs).toString('base64')
    });
    console.log('✅ Created src/app.js');

    // 5. Create src/config/database.js
    const databaseConfig = `const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use Railway's DATABASE_URL or fallback to MONGODB_URI
    const mongoURI = process.env.DATABASE_URL || 
                     process.env.MONGODB_URI || 
                     'mongodb://localhost:27017/romanian-dating';

    console.log('🔗 Connecting to MongoDB...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      bufferCommands: false
    });

    console.log(\`✅ MongoDB connected: \${conn.connection.host}\`);

    // Event listeners
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔒 MongoDB connection closed');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;`;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'src/config/database.js',
      message: 'Add MongoDB connection configuration',
      content: Buffer.from(databaseConfig).toString('base64')
    });
    console.log('✅ Created src/config/database.js');

    // 6. Create src/middleware/errorHandler.js
    const errorHandler = `const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.error('❌ Error:', err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;`;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'src/middleware/errorHandler.js',
      message: 'Add error handling middleware',
      content: Buffer.from(errorHandler).toString('base64')
    });
    console.log('✅ Created src/middleware/errorHandler.js');

    // 7. Create src/routes/auth.js
    const authRoutes = `const express = require('express');
const router = express.Router();

// Basic auth routes
router.post('/register', (req, res) => {
  res.json({
    success: true,
    message: 'Registration endpoint - implementation coming soon'
  });
});

router.post('/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login endpoint - implementation coming soon'
  });
});

router.get('/me', (req, res) => {
  res.json({
    success: true,
    message: 'User profile endpoint - implementation coming soon'
  });
});

module.exports = router;`;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'src/routes/auth.js',
      message: 'Add authentication routes',
      content: Buffer.from(authRoutes).toString('base64')
    });
    console.log('✅ Created src/routes/auth.js');

    // 8. Create src/routes/users.js
    const userRoutes = `const express = require('express');
const router = express.Router();

// Basic user routes
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Users endpoint - implementation coming soon',
    data: []
  });
});

router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'User details endpoint - implementation coming soon',
    data: { id: req.params.id }
  });
});

module.exports = router;`;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'src/routes/users.js',
      message: 'Add user routes',
      content: Buffer.from(userRoutes).toString('base64')
    });
    console.log('✅ Created src/routes/users.js');

    // 9. Create src/socket/socketHandler.js
    const socketHandler = `// Basic socket handler
const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(\`✅ User connected: \${socket.id}\`);
    
    socket.on('disconnect', () => {
      console.log(\`❌ User disconnected: \${socket.id}\`);
    });
  });
};

module.exports = socketHandler;`;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'src/socket/socketHandler.js',
      message: 'Add socket handler',
      content: Buffer.from(socketHandler).toString('base64')
    });
    console.log('✅ Created src/socket/socketHandler.js');

    console.log('');
    console.log('🎉 RAILWAY DEPLOYMENT FIX COMPLETED!');
    console.log('=' .repeat(50));
    console.log('✅ All necessary files created');
    console.log('✅ Repository structure fixed');
    console.log('✅ Railway configuration added');
    console.log('');
    console.log('🚀 NEXT STEPS:');
    console.log('1. Railway will automatically redeploy from GitHub');
    console.log('2. Add MongoDB service in Railway dashboard');
    console.log('3. DATABASE_URL will be set automatically');
    console.log('4. Server should start successfully');
    console.log('');
    console.log('🔗 Repository: https://github.com/catalinignat2022/romanian-dating-final-app');
    console.log('🌐 Railway Dashboard: https://railway.app/');

  } catch (error) {
    console.error('❌ Error fixing deployment:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

createMissingFiles();
