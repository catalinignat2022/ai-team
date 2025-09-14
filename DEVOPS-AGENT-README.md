# DevOps AI Agent Installation Guide

## 🤖 Senior DevOps AI Agent (15+ Years Experience)

Autonomous monitoring and auto-fixing for Railway/GitHub deployments.

### Features
- **Intelligent Error Detection**: Pattern recognition based on 15+ years DevOps experience
- **Automatic Fixes**: Auto-generates and deploys fixes via GitHub PRs
- **Railway Integration**: Real-time monitoring with webhook support
- **Smart Decision Making**: AI-driven analysis for deployment issues
- **Real-time Dashboard**: Live monitoring with alerts and metrics
- **Zero-downtime Operations**: Automatic rollback and recovery

### Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env file with your tokens
```

3. **Start the DevOps AI Agent**
```bash
npm start
```

4. **Access Dashboard**
- Dashboard: http://localhost:3001
- API: http://localhost:3000
- Webhooks: http://localhost:3002

### Environment Variables

#### Required
- `GITHUB_TOKEN`: GitHub personal access token with repo permissions

#### Optional (Railway Integration)
- `RAILWAY_TOKEN`: Railway API token
- `RAILWAY_PROJECT_ID`: Your Railway project ID
- `RAILWAY_HEALTH_URL`: Your app's health endpoint
- `RAILWAY_WEBHOOK_SECRET`: Webhook secret for verification

#### Configuration
- `TARGET_REPO`: Repository to monitor (default: catalinignat2022/romanian-dating-final-app)
- `AUTO_MERGE_FIXES`: Auto-merge safe fixes (default: false)
- `DASHBOARD_PORT`: Dashboard port (default: 3001)

### CLI Commands

```bash
# Start the full monitoring system
npm start

# Scan a specific repository
npm run scan [repository]

# Manual fix trigger
npm run fix [repository] [fix-type]

# Health check test
npm run health

# Development mode with auto-restart
npm run dev
```

### Monitoring Capabilities

#### Error Detection
- Missing dependencies
- Database connection issues
- Port conflicts
- Build failures
- Deployment crashes
- Performance degradation

#### Auto-Fix Actions
- Create missing server files
- Fix package.json configuration
- Update Railway configuration
- Repair database connections
- Add GitHub Actions workflows
- Generate Docker configurations

### Dashboard Features

- **Real-time Metrics**: Uptime, success rate, memory usage
- **Live Alerts**: Error notifications with severity levels
- **Fix History**: Complete audit trail of all auto-fixes
- **System Health**: Component status and performance
- **Manual Controls**: Trigger fixes and health checks

---

**🤖 Powered by AI with 15+ years DevOps experience patterns**
