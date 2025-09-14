#!/bin/bash

# Railway Environment Setup Script
echo "🚂 Setting up Railway environment variables..."

# Load local environment
if [ -f .env ]; then
    source .env
    echo "✅ Local .env loaded"
else
    echo "❌ .env file not found!"
    exit 1
fi

# Railway project info
echo "📋 Railway Project: melodious-patience"
echo "🌐 Railway URL: https://railway.com/project/d38e53db-e32b-4ad4-947c-48d071b35014"

echo ""
echo "🔧 Required Environment Variables for Railway:"
echo "=================================="
echo ""
echo "1. ANTHROPIC_API_KEY (AI Agent)"
echo "2. GITHUB_TOKEN (GitHub Integration)"
echo "3. GITHUB_USERNAME (GitHub User)"
echo "4. PORT (Automatically set by Railway)"
echo ""

echo "📝 Manual Setup Instructions:"
echo "1. Go to: https://railway.com/project/d38e53db-e32b-4ad4-947c-48d071b35014"
echo "2. Click on your service"
echo "3. Go to Variables tab"
echo "4. Add these variables:"
echo ""
echo "   ANTHROPIC_API_KEY = $ANTHROPIC_API_KEY"
echo "   GITHUB_TOKEN = $GITHUB_TOKEN"
echo "   GITHUB_USERNAME = $GITHUB_USERNAME"
echo "   NODE_ENV = production"
echo ""

echo "🚀 After setting variables, Railway will automatically redeploy!"
echo ""
echo "📱 Endpoints after deployment:"
echo "   - Frontend: https://your-app.railway.app"
echo "   - Health: https://your-app.railway.app/health"
echo "   - API: https://your-app.railway.app/api/status"
