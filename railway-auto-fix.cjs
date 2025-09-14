#!/usr/bin/env node

// Railway Auto-Fix cu GitHub Integration
const { Octokit } = require('@octokit/rest');
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const REPO_OWNER = 'catalinignat2022';
const REPO_NAME = 'romanian-dating-final-app';

async function autoFixRailway() {
  console.log('🚂 Auto-fixing Railway deployment...');
  console.log(`📋 Target: ${REPO_OWNER}/${REPO_NAME}`);
  
  try {
    // 1. Create proper server.js
    console.log('\n🔧 Creating server.js...');
    await createFile('server.js', getServerJsContent());
    
    // 2. Fix package.json
    console.log('🔧 Fixing package.json...');
    await createFile('package.json', getPackageJsonContent());
    
    // 3. Create Railway config
    console.log('🔧 Creating railway.json...');
    await createFile('railway.json', getRailwayConfigContent());
    
    console.log('\n✅ Railway deployment auto-fixed!');
    console.log('🚀 Railway will auto-redeploy with these changes');
    
  } catch (error) {
    console.error('❌ Auto-fix failed:', error.message);
  }
}

async function createFile(filename, content) {
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
      message: `Railway fix: ${filename}`,
      content: Buffer.from(content).toString('base64')
    };
    
    if (sha) {
      params.sha = sha;
    }
    
    await octokit.rest.repos.createOrUpdateFileContents(params);
    console.log(`✅ ${filename} updated`);
    
  } catch (error) {
    console.error(`❌ Failed to update ${filename}:`, error.message);
  }
}

function getServerJsContent() {
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

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.DATABASE_URL || 
                     process.env.MONGODB_URI || 
                     'mongodb://localhost:27017/romanian-dating';
                     
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Romanian Dating App API',
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Start server
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(\`🚀 Server running on port \${PORT}\`);
  });
};

start();

module.exports = app;`;
}

function getPackageJsonContent() {
  return JSON.stringify({
    "name": "romanian-dating-final-app",
    "version": "1.0.0",
    "description": "Romanian Dating App Backend",
    "main": "server.js",
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js"
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
    }
  }, null, 2);
}

function getRailwayConfigContent() {
  return JSON.stringify({
    "build": {
      "builder": "NIXPACKS"
    },
    "deploy": {
      "startCommand": "npm start",
      "healthcheckPath": "/health"
    }
  }, null, 2);
}

// Run the auto-fix
autoFixRailway();
