# DevOps AI Agent - Event-Driven Setup Guide

## 🎯 Event-Driven Monitoring (Zero Resource Usage)

The DevOps AI Agent now runs in **pure event-driven mode**:
- ✅ **No periodic checking** (no 60-second intervals)
- ✅ **Responds ONLY to actual errors** via webhooks
- ✅ **Zero resource usage** when everything works
- ✅ **Automatic startup** and restart capabilities

## 🚀 Auto-Start Setup Options

### Option 1: PM2 (Recommended for development)

```bash
# Setup automatic startup with PM2
npm run setup-autostart

# Manual PM2 commands
npm run pm2-start     # Start agent
npm run pm2-stop      # Stop agent  
npm run pm2-restart   # Restart agent
npm run pm2-logs      # View logs
npm run pm2-status    # Check status
```

### Option 2: Linux System Service (Production servers)

```bash
# Setup as systemd service (requires sudo)
npm run setup-linux

# System service commands
sudo systemctl status devops-ai-agent
sudo systemctl restart devops-ai-agent
sudo journalctl -u devops-ai-agent -f
```

## 🎣 Webhook Configuration

```bash
# Setup Railway webhooks for event triggering
./setup-webhooks.sh
```

### Manual Webhook Setup:

1. **Railway Webhooks**:
   - URL: `https://your-domain.com:3002/webhook/railway`
   - Events: `deployment.failed`, `deployment.crashed`
   - Secret: Set in `.env` as `RAILWAY_WEBHOOK_SECRET`

2. **GitHub Webhooks** (optional):
   - URL: `https://your-domain.com:3002/webhook/github`
   - Events: `push`, `pull_request`, `deployment`

## 🎯 How It Works Now

### Before (Resource Intensive):
```
❌ Every 60 seconds: Health check
❌ Every 2 minutes: Railway monitoring  
❌ Every 5 minutes: GitHub checking
❌ Continuous resource usage
```

### After (Event-Driven):
```
✅ Sleeps until error webhook received
✅ Wakes up ONLY when problems occur
✅ Fixes issue in 2-5 minutes
✅ Goes back to sleep
✅ Zero resources when healthy
```

## 🔄 Agent Lifecycle

1. **System Boot** → Agent starts automatically
2. **Normal Operation** → Agent sleeps (0% CPU usage)
3. **Error Occurs** → Railway/GitHub sends webhook
4. **Agent Wakes** → Analyzes and fixes issue
5. **Fix Complete** → Agent goes back to sleep
6. **Crash Recovery** → PM2/systemd restarts agent

## 📊 Monitoring Dashboard

- **URL**: http://localhost:3001
- **Status**: Shows agent is "sleeping" or "active"
- **Events**: Displays only when errors occur
- **Resource Usage**: Near zero during normal operation

## 🎛️ Quick Commands

```bash
# Check if agent is running
pm2 status

# View real-time logs (only shows activity during errors)
pm2 logs devops-ai-agent

# Test the agent manually
npm run test

# Trigger manual fix
npm run fix romanian-dating-final-app MISSING_SERVER_FILE
```

## 🛡️ Error Response Time

- **Webhook Delivery**: < 5 seconds
- **Agent Analysis**: < 30 seconds  
- **Fix Generation**: 1-2 minutes
- **GitHub PR Creation**: < 1 minute
- **Total Response**: 2-5 minutes from error to fix

## 🎉 Result

Your DevOps AI Agent now:
- ✅ **Starts automatically** when server boots
- ✅ **Restarts automatically** if it crashes  
- ✅ **Uses zero resources** when everything is working
- ✅ **Responds instantly** to deployment errors
- ✅ **Never needs manual intervention**

Perfect pentru production environment! 🚀
