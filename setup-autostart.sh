#!/bin/bash

# DevOps AI Agent Auto-Start Script
# This script sets up the DevOps AI Agent to start automatically

echo "🤖 Setting up DevOps AI Agent for automatic startup..."

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2 globally..."
    npm install -g pm2
fi

# Stop any existing instance
echo "🛑 Stopping any existing DevOps AI Agent..."
pm2 delete devops-ai-agent 2>/dev/null || true

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Create logs directory
mkdir -p logs

# Start the agent with PM2
echo "🚀 Starting DevOps AI Agent with PM2..."
pm2 start ecosystem.config.json

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Setup PM2 to start on system boot
echo "⚡ Setting up automatic startup on system boot..."
pm2 startup

echo ""
echo "✅ DevOps AI Agent setup complete!"
echo ""
echo "🎯 The agent is now running and will:"
echo "   • Start automatically when system boots"
echo "   • Restart automatically if it crashes"
echo "   • Monitor for errors via webhooks only"
echo "   • Respond instantly to deployment issues"
echo ""
echo "📊 Dashboard: http://localhost:3001"
echo "🎣 Webhooks: http://localhost:3002"
echo ""
echo "📋 Useful commands:"
echo "   pm2 status          - Check agent status"
echo "   pm2 logs            - View real-time logs"
echo "   pm2 restart all     - Restart agent"
echo "   pm2 stop all        - Stop agent"
echo "   pm2 delete all      - Remove from PM2"
echo ""
echo "🤖 DevOps AI Agent with 15+ years experience is now monitoring!"

# Show current status
pm2 status
