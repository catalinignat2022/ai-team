#!/usr/bin/env node

/**
 * DevOps AI Agent - Main Server
 * Senior DevOps Engineer with 15+ Years Experience
 * Autonomous monitoring and auto-fixing for Railway/GitHub deployments
 */

require('dotenv').config();

const DevOpsAIAgent = require('./agents/devops-ai-agent');
const RailwayMonitor = require('./agents/railway-monitor');
const GitHubAutoFixEngine = require('./agents/github-autofix-engine');
const AIDecisionEngine = require('./agents/ai-decision-engine');
const MonitoringDashboard = require('./agents/monitoring-dashboard');

// Express app for frontend and API
const express = require('express');
const cors = require('cors');
const path = require('path');

class DevOpsAIServer {
  constructor() {
    this.config = this.loadConfiguration();
    this.validateEnvironment();
    
    console.log('🚀 Initializing DevOps AI Agent Server...');
    console.log('📋 Configuration loaded');
    console.log('🎯 Target Repository:', this.config.targetRepo);
    console.log('🚂 Railway Project:', this.config.railwayProject || 'Not configured');
  }

  loadConfiguration() {
    return {
      // GitHub Configuration
      githubToken: process.env.GITHUB_TOKEN,
      targetRepo: process.env.TARGET_REPO || 'catalinignat2022/romanian-dating-final-app',
      
      // Railway Configuration
      railwayToken: process.env.RAILWAY_TOKEN,
      railwayProject: process.env.RAILWAY_PROJECT_ID,
      railwayHealthUrl: process.env.RAILWAY_HEALTH_URL,
      webhookSecret: process.env.RAILWAY_WEBHOOK_SECRET,
      
      // Agent Configuration
      autoMergeFixes: process.env.AUTO_MERGE_FIXES === 'true',
      agentPort: parseInt(process.env.AGENT_PORT) || 3000,
      webhookPort: parseInt(process.env.WEBHOOK_PORT) || 3002,
      dashboardPort: parseInt(process.env.DASHBOARD_PORT) || 3001,
      
      // Monitoring Configuration
      healthCheckInterval: parseInt(process.env.HEALTH_CHECK_INTERVAL) || 60000,
      monitoringInterval: parseInt(process.env.MONITORING_INTERVAL) || 120000,
      alertRetention: parseInt(process.env.ALERT_RETENTION_HOURS) || 24,
      
      // Security Configuration
      enableAuth: process.env.ENABLE_AUTH === 'true',
      adminPassword: process.env.ADMIN_PASSWORD || 'devops-ai-2024'
    };
  }

  validateEnvironment() {
    const required = ['GITHUB_TOKEN'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.error('❌ Missing required environment variables:', missing);
      console.log('💡 Create a .env file with:');
      console.log('GITHUB_TOKEN=your_github_token');
      console.log('RAILWAY_TOKEN=your_railway_token (optional)');
      console.log('RAILWAY_PROJECT_ID=your_project_id (optional)');
      process.exit(1);
    }

    console.log('✅ Environment validation passed');
  }

  async initialize() {
    try {
      // Initialize Express app
      console.log('🌐 Initializing Express server...');
      this.app = express();
      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(express.static(path.join(__dirname, 'frontend')));
      
      // Setup frontend API routes
      this.setupFrontendRoutes();
      
      // Initialize AI Decision Engine
      console.log('🧠 Initializing AI Decision Engine...');
      this.decisionEngine = new AIDecisionEngine();
      
      // Initialize core DevOps AI Agent
      console.log('🤖 Initializing DevOps AI Agent...');
      this.devopsAgent = new DevOpsAIAgent();
      
      // Initialize GitHub Auto-Fix Engine
      console.log('🔧 Initializing GitHub Auto-Fix Engine...');
      this.githubEngine = new GitHubAutoFixEngine(this.devopsAgent);
      
      // Initialize Railway Monitor
      console.log('🚂 Initializing Railway Monitor...');
      this.railwayMonitor = new RailwayMonitor(this.devopsAgent);
      
      // Initialize Monitoring Dashboard
      console.log('📊 Initializing Monitoring Dashboard...');
      this.dashboard = new MonitoringDashboard(
        this.devopsAgent,
        this.railwayMonitor,
        this.githubEngine,
        this.decisionEngine
      );
      
      // Setup inter-component communication
      this.setupEventHandlers();
      
      console.log('✅ All components initialized successfully');
      
    } catch (error) {
      console.error('❌ Initialization failed:', error.message);
      process.exit(1);
    }
  }

  setupFrontendRoutes() {
    // Serve main frontend page
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // API endpoint for creating applications
    this.app.post('/api/create-app', async (req, res) => {
      try {
        const { request, timestamp, client_info } = req.body;
        
        if (!request || request.trim().length < 10) {
          return res.status(400).json({
            success: false,
            message: 'Te rog să descrii aplicația pe care vrei să o creez (minim 10 caractere).',
            error_type: 'validation_error'
          });
        }
        
        console.log('🤖 DevOps AI Agent: Creating new app...');
        console.log('📝 Request:', request);
        console.log('⏰ Timestamp:', timestamp);
        console.log('💻 Client info:', client_info);
        
        // Process the app creation request using DevOps AI Agent
        const result = await this.devopsAgent.createApplication({
          description: request,
          timestamp,
          clientInfo: client_info
        });
        
        console.log('✅ App creation result:', result);
        
        // Log to dashboard
        this.dashboard.createAlert({
          type: 'APP_CREATION_REQUESTED',
          severity: 'INFO',
          message: `New app creation request: ${request.substring(0, 100)}...`,
          data: { request, result }
        });
        
        res.json(result);
        
      } catch (error) {
        console.error('❌ Error creating app:', error);
        
        this.dashboard.createAlert({
          type: 'APP_CREATION_FAILED',
          severity: 'ERROR',
          message: `App creation failed: ${error.message}`,
          data: { error: error.message, request: req.body?.request }
        });
        
        res.status(500).json({
          success: false,
          message: 'Eroare internă la crearea aplicației. Te rog încearcă din nou.',
          error_type: 'internal_error',
          suggestions: [
            'Verifică că descrierea aplicației este clară și detaliată',
            'Încearcă din nou peste câteva secunde',
            'Contactează support-ul dacă problema persistă'
          ]
        });
      }
    });

    // API endpoint to get agent status
    this.app.get('/api/status', (req, res) => {
      res.json({
        devops_agent: {
          status: 'active',
          last_activity: new Date().toISOString(),
          created_apps: this.devopsAgent.getStats?.()?.createdApps || 0,
          total_fixes: this.devopsAgent.fixHistory?.length || 0
        },
        railway_monitor: {
          status: 'active',
          last_webhook: this.railwayMonitor.getLastWebhook?.() || null,
          health_status: this.railwayMonitor.getHealthStatus?.() || 'unknown'
        },
        dashboard: {
          status: 'active',
          alerts_count: this.dashboard.getActiveAlerts?.()?.length || 0,
          uptime: process.uptime()
        }
      });
    });

    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'DevOps AI Agent - App Creator',
        version: '2.0.0',
        components: {
          devops_agent: 'operational',
          railway_monitor: 'operational',
          dashboard: 'operational',
          app_creator: 'operational'
        }
      });
    });

    // 404 handler for API routes
    this.app.use('/api/*', (req, res) => {
      res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        available_endpoints: [
          'GET /health',
          'GET /api/status', 
          'POST /api/create-app'
        ]
      });
    });

    console.log('🌐 Frontend routes configured');
  }

  setupEventHandlers() {
    // Connect DevOps Agent to Dashboard
    const originalExecuteAutoFix = this.devopsAgent.executeAutoFix.bind(this.devopsAgent);
    this.devopsAgent.executeAutoFix = async (analysis) => {
      const result = await originalExecuteAutoFix(analysis);
      this.dashboard.onFixAttempted({ ...result, analysis });
      return result;
    };

    // Connect Railway Monitor to Dashboard
    const originalHandleDeploymentFailure = this.railwayMonitor.handleDeploymentFailure.bind(this.railwayMonitor);
    this.railwayMonitor.handleDeploymentFailure = async (deploymentData) => {
      this.dashboard.onDeploymentError(deploymentData);
      return await originalHandleDeploymentFailure(deploymentData);
    };

    // Connect GitHub Engine to Dashboard
    const originalCreateAutoFixPR = this.githubEngine.createAutoFixPR.bind(this.githubEngine);
    this.githubEngine.createAutoFixPR = async (repoPath, fixes) => {
      const result = await originalCreateAutoFixPR(repoPath, fixes);
      if (result) {
        this.dashboard.onRepositoryFixed({ repository: repoPath, pr: result });
      }
      return result;
    };

    console.log('🔗 Event handlers configured');
  }

  async start() {
    try {
      console.log('🚀 Starting DevOps AI Agent Server...');
      
      // Start the main Express app for frontend and API
      const PORT = process.env.PORT || 8080;
      this.app.listen(PORT, () => {
        console.log(`🌐 DevOps AI Agent Frontend running on port ${PORT}`);
        console.log(`🌐 Frontend available at: http://localhost:${PORT}`);
        console.log(`⚙️ API endpoints:`);
        console.log(`   - Health: http://localhost:${PORT}/health`);
        console.log(`   - Status: http://localhost:${PORT}/api/status`);
        console.log(`   - Create App: POST http://localhost:${PORT}/api/create-app`);
      });
      
      // Start monitoring systems
      this.devopsAgent.startMonitoring();
      
      // Start dashboard
      this.dashboard.start(this.config.dashboardPort);
      
      // Perform initial repository scan
      await this.performInitialScan();
      
      // Setup process handlers
      this.setupProcessHandlers();
      
      console.log('🎉 DevOps AI Agent Server fully operational!');
      console.log(`📊 Dashboard: http://localhost:${this.config.dashboardPort}`);
      console.log(`🎣 Webhooks: http://localhost:${this.config.webhookPort}`);
      console.log('🤖 Senior DevOps AI Agent with 15+ years experience is now monitoring...');
      
    } catch (error) {
      console.error('❌ Server startup failed:', error.message);
      process.exit(1);
    }
  }

  async performInitialScan() {
    console.log('🔍 Performing initial repository scan...');
    
    try {
      // Analyze target repository
      const analysis = await this.githubEngine.analyzeRepository(this.config.targetRepo);
      
      if (analysis.recommendedFixes.length > 0) {
        console.log(`🔧 Found ${analysis.recommendedFixes.length} issues in repository`);
        console.log('🤖 DevOps AI will monitor and auto-fix as needed');
        
        // Create dashboard alert
        this.dashboard.createAlert({
          type: 'INITIAL_SCAN_COMPLETE',
          severity: 'INFO',
          message: `Repository scan complete: ${analysis.recommendedFixes.length} potential fixes identified`,
          data: analysis
        });
      } else {
        console.log('✅ Repository is healthy - no immediate fixes needed');
        
        this.dashboard.createAlert({
          type: 'REPOSITORY_HEALTHY',
          severity: 'SUCCESS',
          message: 'Initial repository scan passed - no issues detected',
          data: analysis
        });
      }
      
    } catch (error) {
      console.error('❌ Initial scan failed:', error.message);
      
      this.dashboard.createAlert({
        type: 'INITIAL_SCAN_FAILED',
        severity: 'ERROR',
        message: `Initial repository scan failed: ${error.message}`,
        data: { error: error.message }
      });
    }
  }

  setupProcessHandlers() {
    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('📴 Received SIGTERM, shutting down gracefully...');
      this.shutdown();
    });

    process.on('SIGINT', () => {
      console.log('📴 Received SIGINT, shutting down gracefully...');
      this.shutdown();
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      console.error('💥 Uncaught Exception:', error);
      this.dashboard.createAlert({
        type: 'UNCAUGHT_EXCEPTION',
        severity: 'CRITICAL',
        message: `Uncaught exception: ${error.message}`,
        data: { error: error.message, stack: error.stack }
      });
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
      this.dashboard.createAlert({
        type: 'UNHANDLED_REJECTION',
        severity: 'ERROR',
        message: `Unhandled promise rejection: ${reason}`,
        data: { reason: reason?.toString() }
      });
    });
  }

  shutdown() {
    console.log('🛑 DevOps AI Agent shutting down...');
    
    // Create final status report
    this.dashboard.createAlert({
      type: 'AGENT_SHUTDOWN',
      severity: 'INFO',
      message: 'DevOps AI Agent shutting down gracefully',
      data: {
        uptime: process.uptime(),
        totalFixes: this.devopsAgent.fixHistory.length,
        timestamp: new Date().toISOString()
      }
    });
    
    // Give time for final logs and cleanup
    setTimeout(() => {
      process.exit(0);
    }, 2000);
  }

  // CLI commands
  static async runCommand(command, args) {
    const server = new DevOpsAIServer();
    await server.initialize();
    
    switch (command) {
      case 'scan':
        await server.performRepositoryScan(args[0]);
        break;
        
      case 'fix':
        await server.performManualFix(args[0], args[1]);
        break;
        
      case 'test':
        await server.performHealthTest();
        break;
        
      case 'start':
      default:
        await server.start();
        break;
    }
  }

  async performRepositoryScan(repository) {
    const repo = repository || this.config.targetRepo;
    console.log(`🔍 Scanning repository: ${repo}`);
    
    const analysis = await this.githubEngine.analyzeRepository(repo);
    console.log('📊 Analysis Results:', analysis);
    
    if (analysis.recommendedFixes.length > 0) {
      console.log('🔧 Creating auto-fix PR...');
      const pr = await this.githubEngine.createAutoFixPR(repo, analysis.recommendedFixes);
      console.log('✅ PR Created:', pr?.html_url);
    }
  }

  async performManualFix(repository, fixType) {
    const repo = repository || this.config.targetRepo;
    console.log(`🔧 Manual fix: ${fixType} on ${repo}`);
    
    const result = await this.dashboard.triggerManualFix(repo, fixType);
    console.log('📊 Fix Result:', result);
  }

  async performHealthTest() {
    console.log('🧪 Performing health test...');
    
    const result = await this.dashboard.testDeployment();
    console.log('📊 Health Test Result:', result);
  }
}

// CLI entry point
if (require.main === module) {
  const command = process.argv[2] || 'start';
  const args = process.argv.slice(3);
  
  DevOpsAIServer.runCommand(command, args).catch(error => {
    console.error('❌ Command failed:', error.message);
    process.exit(1);
  });
}

module.exports = DevOpsAIServer;
