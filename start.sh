#!/bin/bash

# Railway Deployment Script for AI Team
echo "🚀 Deploying AI Team to Railway..."

# Set environment variables from .env if it exists
if [ -f .env ]; then
    export $(cat .env | xargs)
    echo "✅ Environment variables loaded from .env"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start the DevOps AI Server
echo "🤖 Starting DevOps AI Server..."
node devops-ai-server.js
