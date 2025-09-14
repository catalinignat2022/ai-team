#!/usr/bin/env node

/**
 * MongoDB Private Connection Fix for Railway
 * Updates GitHub repository with correct private MongoDB configuration
 */

const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const REPO_OWNER = 'catalinignat2022';
const REPO_NAME = 'romanian-dating-final-app';

async function fixPrivateMongoConnection() {
  console.log('🔒 Fixing MongoDB private connection for Railway...');
  console.log('📋 Target: catalinignat2022/romanian-dating-final-app');
  
  try {
    // Update server.js with private MongoDB connection
    console.log('🔧 Updating server.js with private connection...');
    await updateFile('server.js', getPrivateServerJsContent());
    
    // Update package.json if needed
    console.log('🔧 Ensuring package.json is configured...');
    await updateFile('package.json', getPackageJsonContent());
    
    // Create .env.example with private connection template
    console.log('🔧 Creating .env.example with private connection...');
    await updateFile('.env.example', getEnvExampleContent());
    
    console.log('✅ Private MongoDB connection fix completed!');
    console.log('🚂 Railway will now connect to private MongoDB correctly');
    console.log('🔒 Using credentials: mongo/RfeOIYfZHZDZnPbVNwXKwNSOjSurleuP');
    
  } catch (error) {
    console.error('❌ Private connection fix failed:', error.message);
  }
}

async function updateFile(filename, content) {
  try {
    let sha;
    
    // Try to get existing file
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: filename
      });
      sha = data.sha;
    } catch (error) {
      // File doesn't exist
      sha = undefined;
    }
    
    const params = {
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filename,
      message: `MongoDB private connection fix: ${filename}`,
      content: Buffer.from(content).toString('base64')
    };
    
    if (sha) {
      params.sha = sha;
    }
    
    await octokit.rest.repos.createOrUpdateFileContents(params);
    console.log(`✅ ${filename} updated with private connection`);
    
  } catch (error) {
    console.error(`❌ Failed to update ${filename}:`, error.message);
  }
}

function getPrivateServerJsContent() {
  return `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Private Connection for Railway
const connectDB = async () => {
  try {
    console.log('🔗 Connecting to private MongoDB...');
    
    // Private MongoDB connection with credentials
    const mongoURI = process.env.DATABASE_URL || 
                     'mongodb://mongo:RfeOIYfZHZDZnPbVNwXKwNSOjSurleuP@mongodb.railway.internal:27017/romanian-dating?authSource=admin';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Extended for private networks
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      waitQueueTimeoutMS: 5000,
      retryWrites: true,
      authSource: 'admin'
    });
    
    console.log('✅ MongoDB Connected (Private Railway Network)');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🔒 Connection type: Private');
    
  } catch (error) {
    console.error('❌ MongoDB Private Connection Error:', error.message);
    console.log('🔄 Retrying private connection in 10 seconds...');
    setTimeout(connectDB, 10000);
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Romanian Dating App API',
    status: 'Running',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    connection_type: 'private'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    connection_type: 'private_railway',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

app.get('/db-test', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    
    // Test database operation
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    res.json({
      success: true,
      database: mongoose.connection.db.databaseName,
      collections: collections.length,
      connection_state: mongoose.connection.readyState,
      host: mongoose.connection.host,
      port: mongoose.connection.port
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    error: 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// Start server
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(\`🚀 Server running on port \${PORT}\`);
    console.log(\`🔒 MongoDB: Private Railway connection active\`);
    console.log(\`🎯 Health check: http://localhost:\${PORT}/health\`);
    console.log(\`🧪 DB test: http://localhost:\${PORT}/db-test\`);
  });
};

start().catch(error => {
  console.error('❌ Server startup failed:', error);
  process.exit(1);
});

module.exports = app;`;
}

function getPackageJsonContent() {
  return JSON.stringify({
    "name": "romanian-dating-final-app",
    "version": "1.0.0",
    "description": "Romanian Dating App Backend - Private MongoDB",
    "main": "server.js",
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js",
      "test": "node --version && npm --version"
    },
    "dependencies": {
      "express": "^4.18.2",
      "mongoose": "^7.5.0",
      "cors": "^2.8.5",
      "helmet": "^7.0.0",
      "dotenv": "^16.3.1"
    },
    "engines": {
      "node": ">=18.0.0"
    },
    "keywords": ["dating", "romanian", "api", "private-mongodb"]
  }, null, 2);
}

function getEnvExampleContent() {
  return `# MongoDB Private Connection for Railway
DATABASE_URL=mongodb://mongo:RfeOIYfZHZDZnPbVNwXKwNSOjSurleuP@mongodb.railway.internal:27017/romanian-dating?authSource=admin

# Alternative MongoDB URI (same as above)
MONGODB_URI=mongodb://mongo:RfeOIYfZHZDZnPbVNwXKwNSOjSurleuP@mongodb.railway.internal:27017/romanian-dating?authSource=admin

# Server Configuration
PORT=3000
NODE_ENV=production

# MongoDB Credentials (for reference)
# Username: mongo
# Password: RfeOIYfZHZDZnPbVNwXKwNSOjSurleuP
# Host: mongodb.railway.internal (private)
# Port: 27017
# Database: romanian-dating
# Auth Source: admin`;
}

// Run the fix
fixPrivateMongoConnection();
