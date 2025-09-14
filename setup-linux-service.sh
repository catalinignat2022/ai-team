#!/bin/bash

# DevOps AI Agent - Linux System Service Setup
# For Ubuntu/Debian/CentOS servers

echo "🐧 Setting up DevOps AI Agent as Linux system service..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run as root (use sudo)"
    exit 1
fi

# Create service user
echo "👤 Creating service user..."
useradd --system --create-home --shell /bin/bash node || true

# Set up application directory
APP_DIR="/home/node/devops-ai-agent"
echo "📁 Setting up application directory: $APP_DIR"

# Copy application files
mkdir -p "$APP_DIR"
cp -r . "$APP_DIR/"
chown -R node:node "$APP_DIR"

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    apt-get install -y nodejs
fi

# Install dependencies as service user
echo "📦 Installing dependencies..."
sudo -u node bash -c "cd $APP_DIR && npm install --production"

# Create logs directory
mkdir -p "$APP_DIR/logs"
chown -R node:node "$APP_DIR/logs"

# Copy systemd service file
echo "⚙️ Installing systemd service..."
cp devops-ai-agent.service /etc/systemd/system/

# Reload systemd and enable service
echo "🔄 Configuring systemd..."
systemctl daemon-reload
systemctl enable devops-ai-agent.service

# Start the service
echo "🚀 Starting DevOps AI Agent service..."
systemctl start devops-ai-agent.service

# Check status
echo "📊 Service status:"
systemctl status devops-ai-agent.service --no-pager

echo ""
echo "✅ DevOps AI Agent installed as system service!"
echo ""
echo "🎯 The agent will now:"
echo "   • Start automatically on system boot"
echo "   • Restart automatically if it crashes"
echo "   • Run as dedicated 'node' user"
echo "   • Log to system journal"
echo ""
echo "📋 Useful commands:"
echo "   systemctl status devops-ai-agent    - Check status"
echo "   systemctl restart devops-ai-agent   - Restart service"
echo "   systemctl stop devops-ai-agent      - Stop service"
echo "   journalctl -u devops-ai-agent -f    - View logs"
echo ""
echo "🤖 DevOps AI Agent with 15+ years experience is now monitoring!"
