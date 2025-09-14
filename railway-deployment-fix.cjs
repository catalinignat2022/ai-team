#!/usr/bin/env node

// Railway Deployment Fix - Create missing server.js file
console.log('🔧 Railway Deployment Fix - Romanian Dating App');
console.log('=' .repeat(50));

const serverJsContent = `const app = require('./src/app');
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

const packageJsonContent = `{
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

const railwayJsonContent = `{
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

const srcAppJsContent = `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Import routes (basic routes that will work even if others are missing)
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
  max: 100, // limit each IP to 100 requests per windowMs
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

// API routes (with error handling if routes don't exist)
try {
  app.use('/api/auth', authRoutes);
} catch (error) {
  console.log('Auth routes not available yet');
}

try {
  app.use('/api/users', userRoutes);
} catch (error) {
  console.log('User routes not available yet');
}

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

const databaseConfigContent = `const mongoose = require('mongoose');

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

const errorHandlerContent = `const errorHandler = (err, req, res, next) => {
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

const authRoutesContent = `const express = require('express');
const router = express.Router();

// Basic auth routes that return placeholder responses
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

const userRoutesContent = `const express = require('express');
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

const socketHandlerContent = `// Basic socket handler
const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(\`✅ User connected: \${socket.id}\`);
    
    socket.on('disconnect', () => {
      console.log(\`❌ User disconnected: \${socket.id}\`);
    });
  });
};

module.exports = socketHandler;`;

console.log('📝 Railway Deployment Files:');
console.log('1. server.js (main entry point)');
console.log('2. package.json (dependencies)');
console.log('3. railway.json (Railway config)');
console.log('4. src/app.js (Express app)');
console.log('5. src/config/database.js (MongoDB connection)');
console.log('6. Basic routes and middleware');
console.log('');

console.log('🚀 INSTRUCTIONS FOR RAILWAY DEPLOYMENT:');
console.log('');
console.log('1. Copy these files to your repository:');
console.log('   - Create server.js in root directory');
console.log('   - Update package.json with correct start script');
console.log('   - Add railway.json for Railway configuration');
console.log('   - Create src/ directory structure');
console.log('');
console.log('2. Push to GitHub:');
console.log('   git add .');
console.log('   git commit -m "Add Railway deployment files"');
console.log('   git push origin main');
console.log('');
console.log('3. Railway Environment Variables:');
console.log('   - DATABASE_URL (auto-set when you add MongoDB service)');
console.log('   - NODE_ENV=production');
console.log('   - PORT (auto-set by Railway)');
console.log('');
console.log('4. Add MongoDB Service in Railway:');
console.log('   - Dashboard → New Service → Database → MongoDB');
console.log('   - DATABASE_URL will be automatically configured');
console.log('');
console.log('📋 FILE CONTENTS:');
console.log('=' .repeat(50));
console.log('');

// Export all the file contents
module.exports = {
  serverJs: serverJsContent,
  packageJson: packageJsonContent,
  railwayJson: railwayJsonContent,
  srcAppJs: srcAppJsContent,
  databaseConfig: databaseConfigContent,
  errorHandler: errorHandlerContent,
  authRoutes: authRoutesContent,
  userRoutes: userRoutesContent,
  socketHandler: socketHandlerContent
};

// If run directly, show the files
if (require.main === module) {
  console.log('📁 server.js:');
  console.log(serverJsContent);
  console.log('\\n' + '='.repeat(50) + '\\n');
  
  console.log('📁 package.json:');
  console.log(packageJsonContent);
  console.log('\\n' + '='.repeat(50) + '\\n');
  
  console.log('📁 railway.json:');
  console.log(railwayJsonContent);
  console.log('\\n' + '='.repeat(50) + '\\n');
  
  console.log('✅ All files ready for Railway deployment!');
  console.log('🔗 Repository: https://github.com/catalinignat2022/romanian-dating-final-app');
}
