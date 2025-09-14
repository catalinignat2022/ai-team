#!/usr/bin/env node

// Database Connection Fix for Railway
import { Octokit } from '@octokit/rest';
import dotenv from 'dotenv';

dotenv.config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function fixDatabaseConnection() {
  try {
    console.log('🔧 Database Agent fixing MongoDB connection for Railway...');
    
    // Update server.js to use correct MongoDB connection string
    const serverJsFixed = `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Database connection - FIXED for Railway
const connectDB = async () => {
  try {
    // Railway MongoDB connection string
    const mongoURI = process.env.DATABASE_URL || 
                     process.env.MONGODB_URI || 
                     process.env.MONGO_URL ||
                     'mongodb://localhost:27017/dating-app';
    
    console.log('🔗 Connecting to MongoDB...');
    console.log('🔗 URI:', mongoURI.replace(/:\\/\\/[^:]+:[^@]+@/, '://***:***@')); // Hide credentials in logs
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional Railway-specific options
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      bufferCommands: false,
      bufferMaxEntries: 0
    });
    
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('🔍 Connection details:');
    console.error('   - NODE_ENV:', process.env.NODE_ENV);
    console.error('   - PORT:', process.env.PORT);
    console.error('   - DATABASE_URL available:', !!process.env.DATABASE_URL);
    console.error('   - MONGODB_URI available:', !!process.env.MONGODB_URI);
    
    // Exit process with failure
    process.exit(1);
  }
};

// Connect to database
connectDB();

// MongoDB connection event handlers
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected');
});

// Routes
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    const dbStatus = mongoose.connection.readyState;
    const dbStatusText = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }[dbStatus] || 'unknown';
    
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: {
        status: dbStatusText,
        connected: dbStatus === 1
      },
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Romanian Dating App API - Backend by Database & Backend AI Agents',
    status: 'running',
    database_connected: mongoose.connection.readyState === 1
  });
});

// API Routes will be added here
app.get('/api/users/test', async (req, res) => {
  try {
    // Simple database test
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({
      message: 'Database test successful',
      collections: collections.map(c => c.name),
      connection_status: 'connected'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Database test failed',
      message: error.message
    });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Shutting down gracefully...');
  await mongoose.connection.close();
  console.log('✅ MongoDB connection closed');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
  console.log(\`🌍 Environment: \${process.env.NODE_ENV || 'development'}\`);
});`;

    // Update server.js in repository
    const serverSha = await getFileSha('server.js');
    const updateServerData = {
      owner: process.env.GITHUB_USERNAME,
      repo: 'romanian-dating-backend-api',
      path: 'server.js',
      message: 'Fix MongoDB connection for Railway deployment',
      content: Buffer.from(serverJsFixed).toString('base64')
    };
    
    if (serverSha) {
      updateServerData.sha = serverSha;
    }
    
    await octokit.rest.repos.createOrUpdateFileContents(updateServerData);

    // Add Railway-specific environment variables template
    const envExample = `# Railway Environment Variables
# These are automatically set by Railway when you add MongoDB service

# Database Connection (Set by Railway MongoDB service)
DATABASE_URL=mongodb://username:password@host:port/database
MONGODB_URI=mongodb://username:password@host:port/database

# Application Settings
NODE_ENV=production
PORT=3000

# JWT Secret (Generate your own)
JWT_SECRET=your-super-secret-jwt-key-here

# Security Settings
BCRYPT_ROUNDS=12

# CORS Settings
CORS_ORIGIN=https://your-frontend-domain.railway.app

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
`;

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_USERNAME,
      repo: 'romanian-dating-backend-api',
      path: '.env.example',
      message: 'Add Railway MongoDB environment variables template',
      content: Buffer.from(envExample).toString('base64')
    });

    console.log('✅ MongoDB connection fixed for Railway deployment');
    console.log('📋 Next steps:');
    console.log('1. Go to Railway dashboard: https://railway.app/');
    console.log('2. Open your romanian-dating-backend-api project');
    console.log('3. Add MongoDB service: New Service → Database → MongoDB');
    console.log('4. Railway will automatically set DATABASE_URL environment variable');
    console.log('5. Redeploy your application');

  } catch (error) {
    console.error('❌ Error fixing database connection:', error.message);
  }
}

async function getFileSha(filename) {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: process.env.GITHUB_USERNAME,
      repo: 'romanian-dating-backend-api',
      path: filename
    });
    return data.sha;
  } catch (error) {
    return undefined; // File doesn't exist, will create new
  }
}

fixDatabaseConnection();
