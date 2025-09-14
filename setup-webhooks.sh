#!/bin/bash

# Railway Webhook Setup Script
# Configures webhooks to trigger the DevOps AI Agent only when errors occur

echo "🚂 Setting up Railway webhooks for event-driven monitoring..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
    echo "🔑 Please run 'railway login' first, then run this script again"
    exit 1
fi

# Get webhook URL (you'll need to set this to your server's public URL)
read -p "🌐 Enter your public webhook URL (e.g., https://your-domain.com:3002): " WEBHOOK_URL

if [ -z "$WEBHOOK_URL" ]; then
    echo "❌ Webhook URL is required"
    exit 1
fi

echo "🎣 Configuring Railway webhooks..."

# Set webhook URL as Railway environment variable
railway variables set WEBHOOK_URL="$WEBHOOK_URL"

echo "⚙️ Webhook configuration completed!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your Railway project dashboard"
echo "2. Navigate to Settings → Webhooks"
echo "3. Add webhook URL: $WEBHOOK_URL/webhook/railway"
echo "4. Select events: 'Deployment Failed', 'Deployment Crashed'"
echo "5. Set the webhook secret in your .env file"
echo ""
echo "🎯 After setup, the DevOps AI Agent will:"
echo "   • Respond ONLY when Railway sends error webhooks"
echo "   • Auto-fix deployment issues within 2-5 minutes"
echo "   • Create GitHub PRs with fixes"
echo "   • Monitor zero resources when everything is working"
echo ""
echo "🤖 Event-driven monitoring active!"
