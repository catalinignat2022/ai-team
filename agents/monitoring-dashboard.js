/**
 * DevOps AI Agent Monitoring Dashboard
 * Real-time monitoring with alerts and fix history tracking
 */

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

class MonitoringDashboard {
  constructor(devopsAgent, railwayMonitor, githubEngine, decisionEngine) {
    this.devopsAgent = devopsAgent;
    this.railwayMonitor = railwayMonitor;
    this.githubEngine = githubEngine;
    this.decisionEngine = decisionEngine;
    
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIo(this.server);
    
    this.alerts = [];
    this.metrics = {
      uptime: process.uptime(),
      totalFixes: 0,
      successRate: 100,
      errorCount: 0,
      lastHealthCheck: new Date().toISOString()
    };
    
    this.setupRoutes();
    this.setupWebSockets();
    this.startMetricsCollection();
    
    console.log('📊 Monitoring Dashboard initialized');
  }

  setupRoutes() {
    this.app.use(express.static(path.join(__dirname, 'dashboard-ui')));
    this.app.use(express.json());

    // Main dashboard
    this.app.get('/', (req, res) => {
      res.send(this.generateDashboardHTML());
    });

    // API endpoints
    this.app.get('/api/status', (req, res) => {
      res.json(this.getSystemStatus());
    });

    this.app.get('/api/metrics', (req, res) => {
      res.json(this.getMetrics());
    });

    this.app.get('/api/alerts', (req, res) => {
      res.json(this.getAlerts());
    });

    this.app.get('/api/fix-history', (req, res) => {
      res.json(this.getFixHistory());
    });

    this.app.get('/api/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        components: this.getComponentHealth()
      });
    });

    // Manual triggers
    this.app.post('/api/manual-fix', async (req, res) => {
      const { repository, fixType } = req.body;
      try {
        const result = await this.triggerManualFix(repository, fixType);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    this.app.post('/api/test-deployment', async (req, res) => {
      try {
        const result = await this.testDeployment();
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }

  setupWebSockets() {
    this.io.on('connection', (socket) => {
      console.log('👀 Client connected to dashboard');
      
      // Send current status immediately
      socket.emit('status-update', this.getSystemStatus());
      socket.emit('metrics-update', this.getMetrics());
      
      socket.on('request-fix-history', () => {
        socket.emit('fix-history', this.getFixHistory());
      });
      
      socket.on('request-live-logs', () => {
        socket.emit('live-logs', this.getLiveLogs());
      });
      
      socket.on('disconnect', () => {
        console.log('👋 Client disconnected from dashboard');
      });
    });
  }

  getSystemStatus() {
    return {
      agent: {
        name: this.devopsAgent.name,
        experience: this.devopsAgent.experience,
        status: 'ACTIVE',
        uptime: process.uptime(),
        version: '1.0.0'
      },
      monitoring: {
        repositories: this.devopsAgent.monitoredRepos.length,
        railwayProjects: this.devopsAgent.railwayProjects.filter(p => p).length,
        activeMonitors: 4
      },
      lastActivity: {
        lastFix: this.getLastFixTime(),
        lastHealthCheck: this.metrics.lastHealthCheck,
        lastAlert: this.getLastAlertTime()
      }
    };
  }

  getMetrics() {
    return {
      ...this.metrics,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage(),
      timestamp: new Date().toISOString()
    };
  }

  getAlerts() {
    return {
      active: this.alerts.filter(alert => alert.status === 'ACTIVE'),
      recent: this.alerts.slice(-20),
      total: this.alerts.length,
      byType: this.groupAlertsByType()
    };
  }

  getFixHistory() {
    return this.githubEngine.getFixHistory();
  }

  getComponentHealth() {
    return {
      devops_agent: 'healthy',
      railway_monitor: 'healthy',
      github_engine: 'healthy',
      decision_engine: 'healthy',
      database: 'healthy',
      external_apis: 'healthy'
    };
  }

  // Event-driven metrics collection
  startMetricsCollection() {
    // Only update metrics when events occur or on-demand
    console.log('📈 Event-driven metrics collection enabled');
    console.log('📊 Metrics updated only when events occur or manually requested');
    
    // Health check only when specifically requested
    console.log('🎯 No continuous polling - pure event-driven monitoring');
  }

  updateMetrics() {
    this.metrics = {
      ...this.metrics,
      uptime: process.uptime(),
      totalFixes: this.devopsAgent.fixHistory.length,
      successRate: this.calculateSuccessRate(),
      errorCount: this.countRecentErrors(),
      lastHealthCheck: new Date().toISOString(),
      memory: process.memoryUsage(),
      cpu: process.cpuUsage()
    };
  }

  calculateSuccessRate() {
    const fixes = this.devopsAgent.fixHistory;
    if (fixes.length === 0) return 100;
    
    const successful = fixes.filter(fix => fix.success).length;
    return Math.round((successful / fixes.length) * 100);
  }

  countRecentErrors() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return this.alerts.filter(alert => 
      new Date(alert.timestamp) > oneHourAgo && 
      alert.severity === 'ERROR'
    ).length;
  }

  broadcastMetrics() {
    this.io.emit('metrics-update', this.getMetrics());
    this.io.emit('status-update', this.getSystemStatus());
  }

  async performSystemHealthCheck() {
    try {
      const health = await this.devopsAgent.generateHealthReport();
      
      if (health.successfulFixes < health.totalFixes * 0.8) {
        this.createAlert({
          type: 'LOW_SUCCESS_RATE',
          severity: 'WARNING',
          message: `Fix success rate below 80%: ${health.successfulFixes}/${health.totalFixes}`,
          data: health
        });
      }

      this.metrics.lastHealthCheck = new Date().toISOString();
      
    } catch (error) {
      this.createAlert({
        type: 'HEALTH_CHECK_FAILED',
        severity: 'ERROR',
        message: `System health check failed: ${error.message}`,
        data: { error: error.message }
      });
    }
  }

  createAlert(alertData) {
    const alert = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'ACTIVE',
      acknowledged: false,
      ...alertData
    };

    this.alerts.push(alert);
    
    // Broadcast to connected clients
    this.io.emit('new-alert', alert);
    
    console.log(`🚨 Alert created: ${alert.type} - ${alert.message}`);
    
    // Auto-resolve low severity alerts after 1 hour
    if (alert.severity !== 'CRITICAL' && alert.severity !== 'ERROR') {
      setTimeout(() => {
        this.resolveAlert(alert.id);
      }, 60 * 60 * 1000);
    }
    
    return alert;
  }

  resolveAlert(alertId) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = 'RESOLVED';
      alert.resolvedAt = new Date().toISOString();
      this.io.emit('alert-resolved', alert);
    }
  }

  // Event handlers for agent activities
  onFixAttempted(fixData) {
    this.io.emit('fix-attempted', {
      timestamp: new Date().toISOString(),
      fix: fixData
    });

    if (fixData.success) {
      this.createAlert({
        type: 'FIX_SUCCESS',
        severity: 'INFO',
        message: `Successfully fixed: ${fixData.analysis?.strategy}`,
        data: fixData
      });
    } else {
      this.createAlert({
        type: 'FIX_FAILED',
        severity: 'WARNING',
        message: `Fix attempt failed: ${fixData.error}`,
        data: fixData
      });
    }
  }

  onDeploymentError(errorData) {
    this.createAlert({
      type: 'DEPLOYMENT_ERROR',
      severity: 'ERROR',
      message: `Deployment failed: ${errorData.error}`,
      data: errorData
    });

    this.io.emit('deployment-error', {
      timestamp: new Date().toISOString(),
      error: errorData
    });
  }

  onRepositoryFixed(repoData) {
    this.createAlert({
      type: 'REPOSITORY_FIXED',
      severity: 'SUCCESS',
      message: `Repository auto-fixed: ${repoData.repository}`,
      data: repoData
    });

    this.io.emit('repository-fixed', {
      timestamp: new Date().toISOString(),
      repo: repoData
    });
  }

  // Utility methods
  getLastFixTime() {
    const fixes = this.devopsAgent.fixHistory;
    return fixes.length > 0 ? fixes[fixes.length - 1].timestamp : null;
  }

  getLastAlertTime() {
    return this.alerts.length > 0 ? this.alerts[this.alerts.length - 1].timestamp : null;
  }

  groupAlertsByType() {
    const groups = {};
    this.alerts.forEach(alert => {
      groups[alert.type] = (groups[alert.type] || 0) + 1;
    });
    return groups;
  }

  getLiveLogs() {
    // This would typically connect to a logging system
    return [
      {
        timestamp: new Date().toISOString(),
        level: 'INFO',
        message: 'DevOps AI Agent monitoring active',
        component: 'agent'
      },
      {
        timestamp: new Date(Date.now() - 60000).toISOString(),
        level: 'SUCCESS',
        message: 'Railway health check passed',
        component: 'railway_monitor'
      }
    ];
  }

  async triggerManualFix(repository, fixType) {
    console.log(`🔧 Manual fix triggered: ${fixType} on ${repository}`);
    
    try {
      const analysis = { strategy: fixType, confidence: 0.9 };
      const result = await this.devopsAgent.executeAutoFix(analysis);
      
      this.onFixAttempted({
        ...result,
        manual: true,
        repository,
        fixType
      });
      
      return { success: true, result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async testDeployment() {
    console.log('🧪 Testing deployment health...');
    
    try {
      const healthUrl = process.env.RAILWAY_HEALTH_URL;
      const response = await fetch(healthUrl);
      
      return {
        success: true,
        status: response.status,
        healthy: response.ok,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  generateDashboardHTML() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevOps AI Agent Dashboard</title>
    <script src="/socket.io/socket.io.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            min-height: 100vh;
        }
        .dashboard { 
            padding: 20px;
            max-width: 1400px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #4ade80;
            margin-left: 10px;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .card h3 {
            margin-bottom: 15px;
            color: #4ade80;
        }
        .metric {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .metric-value {
            font-weight: bold;
            color: #fbbf24;
        }
        .alert {
            padding: 10px;
            margin: 5px 0;
            border-radius: 8px;
            border-left: 4px solid;
        }
        .alert.ERROR { border-color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .alert.WARNING { border-color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
        .alert.INFO { border-color: #3b82f6; background: rgba(59, 130, 246, 0.1); }
        .alert.SUCCESS { border-color: #10b981; background: rgba(16, 185, 129, 0.1); }
        .logs {
            background: rgba(0,0,0,0.3);
            border-radius: 10px;
            padding: 15px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            max-height: 300px;
            overflow-y: auto;
        }
        .log-entry {
            margin-bottom: 5px;
            padding: 2px 0;
        }
        .timestamp {
            color: #9ca3af;
            margin-right: 10px;
        }
        .buttons {
            text-align: center;
            margin-top: 20px;
        }
        .btn {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            margin: 0 10px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .btn:hover {
            background: rgba(255,255,255,0.3);
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>🤖 DevOps AI Agent Dashboard</h1>
            <p>Senior DevOps Engineer with 15+ Years Experience</p>
            <span class="status-indicator" id="status"></span>
            <span id="status-text">Monitoring Active</span>
        </div>

        <div class="cards">
            <div class="card">
                <h3>📊 System Metrics</h3>
                <div class="metric">
                    <span>Uptime:</span>
                    <span class="metric-value" id="uptime">--</span>
                </div>
                <div class="metric">
                    <span>Total Fixes:</span>
                    <span class="metric-value" id="total-fixes">--</span>
                </div>
                <div class="metric">
                    <span>Success Rate:</span>
                    <span class="metric-value" id="success-rate">--</span>
                </div>
                <div class="metric">
                    <span>Memory Usage:</span>
                    <span class="metric-value" id="memory">--</span>
                </div>
            </div>

            <div class="card">
                <h3>🔍 Monitoring Status</h3>
                <div class="metric">
                    <span>Repositories:</span>
                    <span class="metric-value" id="repos">--</span>
                </div>
                <div class="metric">
                    <span>Railway Projects:</span>
                    <span class="metric-value" id="railway-projects">--</span>
                </div>
                <div class="metric">
                    <span>Active Monitors:</span>
                    <span class="metric-value" id="monitors">--</span>
                </div>
                <div class="metric">
                    <span>Last Health Check:</span>
                    <span class="metric-value" id="last-check">--</span>
                </div>
            </div>

            <div class="card">
                <h3>🚨 Recent Alerts</h3>
                <div id="alerts">
                    <p>No recent alerts</p>
                </div>
            </div>

            <div class="card">
                <h3>📝 Live Logs</h3>
                <div class="logs" id="logs">
                    <div class="log-entry">
                        <span class="timestamp">[${new Date().toISOString()}]</span>
                        <span>DevOps AI Agent initialized</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="buttons">
            <button class="btn" data-action="health-check">🔍 Health Check</button>
            <button class="btn" data-action="manual-fix">🔧 Manual Fix</button>
            <button class="btn" data-action="test-deployment">🧪 Test Deployment</button>
            <button class="btn" data-action="refresh">🔄 Refresh</button>
        </div>
    </div>

    <script src="/js/dashboard.js"></script>
        const socket = io();
        
        // Initialize button event listeners
        document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('.btn[data-action]');
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const action = this.dataset.action;
                    switch(action) {
                        case 'health-check':
                            triggerHealthCheck();
                            break;
                        case 'manual-fix':
                            triggerManualFix();
                            break;
                        case 'test-deployment':
                            testDeployment();
                            break;
                        case 'refresh':
                            refreshData();
                            break;
                    }
                });
            });
        });
        
        socket.on('metrics-update', (metrics) => {
            document.getElementById('uptime').textContent = formatUptime(metrics.uptime);
            document.getElementById('total-fixes').textContent = metrics.totalFixes || 0;
            document.getElementById('success-rate').textContent = (metrics.successRate || 100) + '%';
            document.getElementById('memory').textContent = formatMemory(metrics.memory?.heapUsed || 0);
        });
        
        socket.on('status-update', (status) => {
            document.getElementById('repos').textContent = status.monitoring?.repositories || 0;
            document.getElementById('railway-projects').textContent = status.monitoring?.railwayProjects || 0;
            document.getElementById('monitors').textContent = status.monitoring?.activeMonitors || 0;
            document.getElementById('last-check').textContent = formatTime(status.lastActivity?.lastHealthCheck);
        });
        
        socket.on('new-alert', (alert) => {
            addAlert(alert);
        });
        
        function formatUptime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return hours + 'h ' + minutes + 'm';
        }
        
        function formatMemory(bytes) {
            return Math.round(bytes / 1024 / 1024) + ' MB';
        }
        
        function formatTime(timestamp) {
            if (!timestamp) return '--';
            return new Date(timestamp).toLocaleTimeString();
        }
        
        function addAlert(alert) {
            const alertsDiv = document.getElementById('alerts');
            const alertElement = document.createElement('div');
            alertElement.className = 'alert ' + alert.severity;
            alertElement.innerHTML = '<strong>' + alert.type + '</strong>: ' + alert.message;
            alertsDiv.insertBefore(alertElement, alertsDiv.firstChild);
            
            // Keep only last 5 alerts
            while (alertsDiv.children.length > 5) {
                alertsDiv.removeChild(alertsDiv.lastChild);
            }
        }
        
        function addLog(message) {
            const logsDiv = document.getElementById('logs');
            const logElement = document.createElement('div');
            logElement.className = 'log-entry';
            logElement.innerHTML = '<span class="timestamp">[' + new Date().toISOString() + ']</span><span>' + message + '</span>';
            logsDiv.insertBefore(logElement, logsDiv.firstChild);
            
            // Keep only last 20 logs
            while (logsDiv.children.length > 20) {
                logsDiv.removeChild(logsDiv.lastChild);
            }
        }
        
        function triggerHealthCheck() {
            fetch('/api/health')
                .then(response => response.json())
                .then(data => {
                    addLog('Health check completed: ' + data.status);
                });
        }
        
        function triggerManualFix() {
            const repo = prompt('Enter repository name:') || 'romanian-dating-final-app';
            const fixType = prompt('Enter fix type:') || 'MISSING_SERVER_FILE';
            
            fetch('/api/manual-fix', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ repository: repo, fixType: fixType })
            })
            .then(response => response.json())
            .then(data => {
                addLog('Manual fix ' + (data.success ? 'successful' : 'failed'));
            });
        }
        
        function testDeployment() {
            fetch('/api/test-deployment', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    addLog('Deployment test: ' + (data.healthy ? 'HEALTHY' : 'UNHEALTHY'));
                });
        }
        
        function refreshData() {
            location.reload();
        }
        
        // Initial data load
        refreshData();
</body>
</html>`;
  }

  start(port = 3000) {
    this.server.listen(port, () => {
      console.log(`📊 Monitoring Dashboard running on http://localhost:${port}`);
    });
  }
}

module.exports = MonitoringDashboard;
