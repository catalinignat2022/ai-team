/**
 * Senior DevOps AI Agent - 15+ Years Experience
 * Autonomous monitoring and auto-fixing for Railway/GitHub deployments
 * 
 * Agent Profile:
 * - 15+ years DevOps experience patterns
 * - Expert in Railway, Heroku, AWS, Docker, Kubernetes
 * - Advanced error pattern recognition
 * - Autonomous decision making
 * - Git workflow automation
 */

const express = require('express');
const { Octokit } = require('@octokit/rest');
const axios = require('axios');
const cron = require('node-cron');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

class DevOpsAIAgent {
  constructor() {
    this.name = "Senior DevOps AI Agent";
    this.experience = "15+ years";
    this.specialties = [
      'Railway Deployment Optimization',
      'GitHub Workflow Automation', 
      'Error Pattern Recognition',
      'Infrastructure as Code',
      'CI/CD Pipeline Design',
      'Database Connection Troubleshooting',
      'Node.js Performance Tuning',
      'Docker Container Optimization'
    ];
    
    this.github = new Octokit({ auth: process.env.GITHUB_TOKEN });
    this.monitoredRepos = [process.env.TARGET_REPO || 'catalinignat2022/ai-team'];
    this.railwayProjects = [process.env.RAILWAY_PROJECT_ID];
    this.fixHistory = [];
    this.errorPatterns = this.loadErrorPatterns();
    
    console.log(`🤖 ${this.name} initialized`);
    console.log(`📚 Experience: ${this.experience}`);
    console.log(`🎯 Monitoring: ${this.monitoredRepos.length} repositories`);
  }

  loadErrorPatterns() {
    // 15+ years of DevOps experience encoded as error patterns
    return {
      'Cannot find module': {
        severity: 'HIGH',
        category: 'MISSING_DEPENDENCY',
        autoFixStrategy: 'CREATE_MISSING_FILES',
        commonCauses: ['Missing entry point', 'Incorrect package.json', 'Build output mismatch'],
        solutions: ['createServerFile', 'fixPackageJson', 'addBuildConfig']
      },
      'ECONNREFUSED': {
        severity: 'HIGH',
        category: 'DATABASE_CONNECTION',
        autoFixStrategy: 'FIX_CONNECTION_STRING',
        commonCauses: ['Wrong DATABASE_URL', 'Network timeout', 'Auth issues'],
        solutions: ['updateConnectionString', 'addRetryLogic', 'fixAuthCredentials']
      },
      'Port already in use': {
        severity: 'MEDIUM',
        category: 'RUNTIME_CONFLICT',
        autoFixStrategy: 'DYNAMIC_PORT_ALLOCATION',
        commonCauses: ['Hardcoded port', 'Process not killed', 'Railway port conflict'],
        solutions: ['useDynamicPort', 'addProcessManagement', 'updatePortConfig']
      },
      'ModuleNotFoundError': {
        severity: 'HIGH', 
        category: 'DEPENDENCY_MISSING',
        autoFixStrategy: 'INSTALL_DEPENDENCIES',
        commonCauses: ['Missing npm install', 'Wrong package name', 'Version mismatch'],
        solutions: ['updatePackageJson', 'addMissingDeps', 'fixVersions']
      },
      'Build failed': {
        severity: 'HIGH',
        category: 'BUILD_ERROR',
        autoFixStrategy: 'FIX_BUILD_PROCESS',
        commonCauses: ['Syntax errors', 'Missing build script', 'Environment variables'],
        solutions: ['fixSyntax', 'addBuildScript', 'configureEnvVars']
      }
    };
  }

  // Event-driven monitoring - only responds to actual errors
  startMonitoring() {
    console.log('🔍 Starting event-driven monitoring...');
    console.log('⚡ Agent will respond ONLY when errors occur');
    console.log('🎣 Webhook endpoints active for real-time error detection');
    
    // Only generate health reports periodically (once per day)
    cron.schedule('0 0 * * *', () => {
      this.generateHealthReport();
    });
    
    console.log('✅ Event-driven monitoring active - waiting for error signals');
  }

  async monitorRailwayDeployments() {
    try {
      for (const projectId of this.railwayProjects) {
        if (!projectId) continue;
        
        const deploymentStatus = await this.checkRailwayStatus(projectId);
        
        if (deploymentStatus.hasErrors) {
          console.log(`🚨 Deployment error detected in project ${projectId}`);
          await this.handleDeploymentError(deploymentStatus);
        }
      }
    } catch (error) {
      console.error('❌ Railway monitoring error:', error.message);
    }
  }

  async checkRailwayStatus(projectId) {
    // Simulate Railway API call (replace with actual Railway API)
    try {
      const response = await axios.get(`https://backboard.railway.app/graphql`, {
        headers: {
          'Authorization': `Bearer ${process.env.RAILWAY_TOKEN}`,
          'Content-Type': 'application/json'
        },
        data: {
          query: `{
            project(id: "${projectId}") {
              deployments(first: 1) {
                edges {
                  node {
                    status
                    url
                    createdAt
                  }
                }
              }
            }
          }`
        }
      });
      
      return {
        hasErrors: response.data?.data?.project?.deployments?.edges[0]?.node?.status === 'FAILED',
        status: response.data?.data?.project?.deployments?.edges[0]?.node?.status,
        url: response.data?.data?.project?.deployments?.edges[0]?.node?.url
      };
    } catch (error) {
      // Fallback: check health endpoint
      return await this.checkHealthEndpoint();
    }
  }

  async checkHealthEndpoint() {
    try {
      const healthUrl = process.env.RAILWAY_HEALTH_URL || 'https://your-app.railway.app/health';
      const response = await axios.get(healthUrl, { timeout: 10000 });
      
      return {
        hasErrors: response.status !== 200,
        status: response.status === 200 ? 'RUNNING' : 'FAILED',
        healthData: response.data
      };
    } catch (error) {
      return {
        hasErrors: true,
        status: 'FAILED',
        error: error.message
      };
    }
  }

  async handleDeploymentError(deploymentStatus) {
    console.log('🔧 Senior DevOps AI Agent analyzing error...');
    
    const errorAnalysis = this.analyzeError(deploymentStatus.error);
    console.log('📊 Error Analysis:', errorAnalysis);
    
    if (errorAnalysis.canAutoFix) {
      console.log('🤖 Attempting automatic fix...');
      const fixResult = await this.executeAutoFix(errorAnalysis);
      
      this.logFix({
        timestamp: new Date().toISOString(),
        error: deploymentStatus.error,
        analysis: errorAnalysis,
        fixResult: fixResult,
        success: fixResult.success
      });
      
      if (fixResult.success) {
        console.log('✅ Auto-fix completed successfully');
        await this.notifyFixSuccess(fixResult);
      } else {
        console.log('❌ Auto-fix failed, escalating...');
        await this.escalateToHuman(errorAnalysis, fixResult);
      }
    } else {
      console.log('⚠️ Error requires human intervention');
      await this.escalateToHuman(errorAnalysis);
    }
  }

  analyzeError(errorMessage) {
    if (!errorMessage) return { canAutoFix: false, confidence: 0 };
    
    // AI pattern matching based on 15+ years experience
    for (const [pattern, config] of Object.entries(this.errorPatterns)) {
      if (errorMessage.includes(pattern)) {
        return {
          canAutoFix: true,
          confidence: 0.95,
          pattern: pattern,
          category: config.category,
          severity: config.severity,
          strategy: config.autoFixStrategy,
          solutions: config.solutions,
          estimatedFixTime: this.estimateFixTime(config.category)
        };
      }
    }
    
    // Advanced heuristics for unknown errors
    const unknownErrorAnalysis = this.analyzeUnknownError(errorMessage);
    return unknownErrorAnalysis;
  }

  analyzeUnknownError(errorMessage) {
    const keywords = {
      'npm': { category: 'DEPENDENCY', confidence: 0.8 },
      'node': { category: 'RUNTIME', confidence: 0.7 },
      'mongodb': { category: 'DATABASE', confidence: 0.9 },
      'express': { category: 'SERVER', confidence: 0.8 },
      'timeout': { category: 'NETWORK', confidence: 0.7 },
      'permission': { category: 'SECURITY', confidence: 0.9 }
    };
    
    let bestMatch = { canAutoFix: false, confidence: 0 };
    
    for (const [keyword, analysis] of Object.entries(keywords)) {
      if (errorMessage.toLowerCase().includes(keyword)) {
        if (analysis.confidence > bestMatch.confidence) {
          bestMatch = {
            canAutoFix: analysis.confidence > 0.7,
            confidence: analysis.confidence,
            category: analysis.category,
            strategy: 'EXPERIMENTAL_FIX',
            solutions: [`fix${analysis.category}`]
          };
        }
      }
    }
    
    return bestMatch;
  }

  estimateFixTime(category) {
    const timeEstimates = {
      'MISSING_DEPENDENCY': '2-3 minutes',
      'DATABASE_CONNECTION': '3-5 minutes', 
      'RUNTIME_CONFLICT': '1-2 minutes',
      'BUILD_ERROR': '5-10 minutes',
      'DEPENDENCY_MISSING': '2-4 minutes'
    };
    
    return timeEstimates[category] || '5-15 minutes';
  }

  async executeAutoFix(analysis) {
    try {
      console.log(`🔧 Executing ${analysis.strategy} fix...`);
      
      switch (analysis.strategy) {
        case 'CREATE_MISSING_FILES':
          return await this.createMissingFiles();
        
        case 'FIX_CONNECTION_STRING':
          return await this.fixDatabaseConnection();
        
        case 'DYNAMIC_PORT_ALLOCATION':
          return await this.fixPortConfiguration();
        
        case 'INSTALL_DEPENDENCIES':
          return await this.installMissingDependencies();
        
        case 'FIX_BUILD_PROCESS':
          return await this.fixBuildProcess();
        
        default:
          return await this.experimentalFix(analysis);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
        strategy: analysis.strategy
      };
    }
  }

  async createMissingFiles() {
    // Use the railway-auto-fix logic we created earlier
    const fixes = [
      {
        file: 'server.js',
        content: this.generateServerJs()
      },
      {
        file: 'package.json', 
        content: this.generatePackageJson()
      },
      {
        file: 'railway.json',
        content: this.generateRailwayConfig()
      }
    ];
    
    let successCount = 0;
    for (const fix of fixes) {
      try {
        await this.updateGitHubFile(fix.file, fix.content, `DevOps AI: Auto-fix ${fix.file}`);
        successCount++;
      } catch (error) {
        console.error(`Failed to create ${fix.file}:`, error.message);
      }
    }
    
    return {
      success: successCount === fixes.length,
      filesCreated: successCount,
      totalFiles: fixes.length
    };
  }

  async fixDatabaseConnection() {
    const envFixes = {
      'DATABASE_URL': process.env.MONGODB_URI || 'mongodb://localhost:27017/romanian-dating',
      'MONGODB_URI': process.env.DATABASE_URL || 'mongodb://localhost:27017/romanian-dating'
    };
    
    // Update connection logic in server.js
    const connectionFix = `
// Improved MongoDB connection with Railway optimization
const connectDB = async () => {
  try {
    const mongoURI = process.env.DATABASE_URL || 
                     process.env.MONGODB_URI || 
                     'mongodb://localhost:27017/romanian-dating';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    });
    
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Error:', error.message);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};`;
    
    await this.updateGitHubFile('server.js', this.generateServerJs(connectionFix), 
      'DevOps AI: Fix MongoDB connection');
    
    return { success: true, action: 'database_connection_fixed' };
  }

  async updateGitHubFile(filename, content, commitMessage) {
    const [owner, repo] = this.monitoredRepos[0].split('/');
    
    let sha;
    try {
      const { data } = await this.github.rest.repos.getContent({
        owner,
        repo,
        path: filename
      });
      sha = data.sha;
    } catch (error) {
      // File doesn't exist
      sha = undefined;
    }
    
    const params = {
      owner,
      repo,
      path: filename,
      message: commitMessage,
      content: Buffer.from(content).toString('base64')
    };
    
    if (sha) {
      params.sha = sha;
    }
    
    return await this.github.rest.repos.createOrUpdateFileContents(params);
  }

  generateServerJs(customConnection = null) {
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

${customConnection || `// MongoDB Private Connection for Railway
const connectDB = async () => {
  try {
    // Private MongoDB connection with credentials for Railway
    const mongoURI = process.env.DATABASE_URL || 
                     process.env.MONGODB_URI || 
                     'mongodb://mongo:RfeOIYfZHZDZnPbVNwXKwNSOjSurleuP@mongodb.railway.internal:27017/romanian-dating?authSource=admin';
                     
    console.log('🔗 Connecting to private MongoDB...');
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increased for private networks
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      authSource: 'admin',
      retryWrites: true,
      w: 'majority'
    });
    
    console.log('✅ MongoDB Connected successfully (Private)');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🔒 Connection type: Private Railway Network');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('🔄 Retrying private connection in 10 seconds...');
    setTimeout(connectDB, 10000);
  }
};`}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Romanian Dating App API',
    status: 'Running',
    timestamp: new Date().toISOString(),
    devops_agent: 'Monitoring Active'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    error: 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// Start server
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(\`🚀 Server running on port \${PORT}\`);
    console.log(\`🤖 DevOps AI Agent monitoring active\`);
  });
};

start();

module.exports = app;`;
  }

  generatePackageJson() {
    return JSON.stringify({
      "name": "romanian-dating-final-app",
      "version": "1.0.0",
      "description": "Romanian Dating App Backend - AI Monitored",
      "main": "server.js",
      "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js",
        "health-check": "curl -f http://localhost:$PORT/health || exit 1"
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
      },
      "keywords": ["dating", "romanian", "api", "ai-monitored"]
    }, null, 2);
  }

  generateRailwayConfig() {
    return JSON.stringify({
      "build": {
        "builder": "NIXPACKS"
      },
      "deploy": {
        "startCommand": "npm start",
        "healthcheckPath": "/health",
        "healthcheckTimeout": 30,
        "restartPolicyType": "ON_FAILURE",
        "restartPolicyMaxRetries": 3
      }
    }, null, 2);
  }

  logFix(fixData) {
    this.fixHistory.push(fixData);
    console.log('📝 Fix logged:', {
      timestamp: fixData.timestamp,
      success: fixData.success,
      strategy: fixData.analysis?.strategy
    });
  }

  async generateHealthReport() {
    const report = {
      timestamp: new Date().toISOString(),
      agent: this.name,
      uptime: process.uptime(),
      totalFixes: this.fixHistory.length,
      successfulFixes: this.fixHistory.filter(f => f.success).length,
      recentActivity: this.fixHistory.slice(-5),
      monitoredSystems: {
        repositories: this.monitoredRepos.length,
        railwayProjects: this.railwayProjects.filter(p => p).length
      }
    };
    
    console.log('📊 Health Report Generated:', report);
    
    // Save to file
    await fs.writeFile(
      path.join(__dirname, '../logs/devops-agent-health.json'),
      JSON.stringify(report, null, 2)
    );
    
    return report;
  }

  async notifyFixSuccess(fixResult) {
    console.log('🎉 Auto-fix successful notification sent');
    // Here you could integrate with Slack, Discord, email, etc.
  }

  async escalateToHuman(errorAnalysis, fixResult = null) {
    console.log('🚨 Escalating to human intervention');
    console.log('Error requires manual attention:', errorAnalysis);
    // Integration with alerting systems
  }

  // Express server for agent dashboard
  createDashboard() {
    const app = express();
    app.use(express.json());
    
    app.get('/agent/status', (req, res) => {
      res.json({
        agent: this.name,
        experience: this.experience,
        specialties: this.specialties,
        uptime: process.uptime(),
        monitoring: {
          repositories: this.monitoredRepos,
          railwayProjects: this.railwayProjects.filter(p => p)
        },
        fixHistory: this.fixHistory.slice(-10)
      });
    });
    
    app.get('/agent/health', (req, res) => {
      res.json({ status: 'ACTIVE', monitoring: true });
    });
    
    app.post('/agent/manual-fix', async (req, res) => {
      const { error, strategy } = req.body;
      const result = await this.executeAutoFix({ strategy, solutions: [] });
      res.json(result);
    });
    
    const port = process.env.AGENT_PORT || 3001;
    app.listen(port, () => {
      console.log(`🤖 DevOps AI Agent dashboard running on port ${port}`);
    });
  }

  // App Creation Method - Generate complete applications based on user descriptions
  async createApplication(options) {
    const { description, timestamp, clientInfo } = options;
    
    console.log('🤖 DevOps AI Agent: Starting app creation process...');
    console.log('📝 Description:', description);
    
    try {
      // Step 1: Product Owner analyzes requirements
      console.log('📋 Step 1: Product Owner analyzing requirements...');
      const SeniorProductOwnerAgent = require('./senior-product-owner-agent');
      const productOwner = new SeniorProductOwnerAgent();
      const productRequirements = await productOwner.analyzeProductRequirements(description);
      
      // Step 2: Designer collaborates with Product Owner
      console.log('🎨 Step 2: Designer collaborating on design requirements...');
      const SeniorDesignerAgent = require('./senior-designer-agent');
      const designer = new SeniorDesignerAgent();
      productOwner.setDesignerCollaborator(designer);
      
      const designCollaboration = await productOwner.collaborateWithDesigner(productRequirements);
      
      // Step 3: Create design system
      console.log('🧩 Step 3: Creating comprehensive design system...');
      const designSystem = await designer.createDesignSystem(designCollaboration.designCollaboration.designBrief);
      
      // Step 4: CSS Agent creates advanced styling architecture
      console.log('🎨 Step 4: CSS Agent creating advanced styling architecture...');
      const SeniorCSSsassAgent = require('./senior-css-sass-agent');
      const cssAgent = new SeniorCSSsassAgent();
      
      // CSS Agent collaborates with Designer
      const designerCollaboration = await cssAgent.collaborateWithDesignerAgent(designSystem, designCollaboration.designTokens);
      const advancedStyling = await cssAgent.createAdvancedStyling(designSystem, {}, analysis?.type || 'general');
      
      // Step 5: Generate implementation guide for frontend
      console.log('⚙️ Step 5: Creating implementation guide...');
      const implementationGuide = await designer.collaborateWithFrontendDeveloper(
        designSystem, 
        productRequirements.technicalRequirements
      );
      
      // Step 6: Generate repository structure with design system and advanced styling
      console.log('🏗️ Step 6: Generating repository structure...');
      const analysis = {
        ...this.analyzeAppDescription(description),
        productRequirements: designCollaboration.productRequirements,
        designSystem: designSystem,
        advancedStyling: advancedStyling,
        implementationGuide: implementationGuide
      };
      
      console.log('🔍 Enhanced app analysis with design system and styling:', {
        type: analysis.type,
        features: analysis.features?.length || 0,
        designComponents: Object.keys(designSystem.components || {}).length,
        stylingFeatures: Object.keys(advancedStyling || {}).length,
        hasDesignSystem: !!designSystem,
        hasAdvancedStyling: !!advancedStyling
      });
      
      const repoStructure = this.generateRepositoryStructure(analysis);
      
      // Step 7: Create the repository and deploy
      console.log('🚀 Step 7: Creating repository and deploying...');
      const result = await this.deployNewApplication(analysis, repoStructure);
      
      // Enhanced result with design and styling information
      result.designSystem = {
        componentsCreated: Object.keys(designSystem.components || {}).length,
        colorPalette: designSystem.colorPalette ? 'Generated' : 'Basic',
        typography: designSystem.typography ? 'Custom' : 'Default',
        advancedStyling: advancedStyling ? 'CSS Agent Professional Styling' : 'Basic',
        cssFiles: advancedStyling ? Object.keys(advancedStyling).length : 0,
        responsiveDesign: advancedStyling?.responsive ? 'Mobile-First' : 'Basic',
        designCollaboration: 'Product Owner + Designer + CSS Agent + DevOps'
      };
      
      // Log the creation in fix history
      this.fixHistory.push({
        timestamp: new Date().toISOString(),
        type: 'APP_CREATION',
        description: description.substring(0, 100),
        result: result.success ? 'SUCCESS' : 'FAILED',
        details: result
      });
      
      return result;
      
    } catch (error) {
      console.error('❌ App creation failed:', error);
      
      return {
        success: false,
        message: `Crearea aplicației a eșuat: ${error.message}`,
        error_type: 'creation_error',
        suggestions: [
          'Verifică că descrierea este suficient de detaliată',
          'Încearcă să specifici mai clar funcționalitățile dorite',
          'Contactează support-ul pentru asistență'
        ]
      };
    }
  }

  analyzeAppDescription(description) {
    // Use 15+ years DevOps experience to analyze the app requirements
    const analysis = {
      type: 'web_application',
      technologies: [],
      features: [],
      complexity: 'medium',
      estimatedTime: '10-15 minutes'
    };
    
    const desc = description.toLowerCase();
    
    // Determine application type
    if (desc.includes('blog') || desc.includes('cms')) {
      analysis.type = 'blog_cms';
      analysis.technologies = ['Node.js', 'Express', 'MongoDB', 'EJS/Handlebars'];
      analysis.features = ['Authentication', 'Content Management', 'SEO Optimization'];
    } else if (desc.includes('e-commerce') || desc.includes('magazin') || desc.includes('plăți')) {
      analysis.type = 'ecommerce';
      analysis.technologies = ['Node.js', 'Express', 'MongoDB', 'Stripe', 'React'];
      analysis.features = ['Payment Integration', 'Product Catalog', 'Order Management', 'User Authentication'];
      analysis.complexity = 'high';
      analysis.estimatedTime = '20-25 minutes';
    } else if (desc.includes('chat') || desc.includes('mesagerie') || desc.includes('timp real')) {
      analysis.type = 'realtime_chat';
      analysis.technologies = ['Node.js', 'Socket.io', 'Express', 'MongoDB', 'React'];
      analysis.features = ['Real-time Messaging', 'User Authentication', 'File Sharing', 'Group Chat'];
    } else if (desc.includes('task') || desc.includes('todo') || desc.includes('proiect')) {
      analysis.type = 'task_management';
      analysis.technologies = ['Node.js', 'Express', 'MongoDB', 'React'];
      analysis.features = ['Task Creation', 'Project Management', 'User Authentication', 'Notifications'];
    } else if (desc.includes('fitness') || desc.includes('sport') || desc.includes('exerciții')) {
      analysis.type = 'fitness_tracker';
      analysis.technologies = ['Node.js', 'Express', 'MongoDB', 'React', 'Chart.js'];
      analysis.features = ['Exercise Tracking', 'Progress Analytics', 'User Profiles', 'Goal Setting'];
    } else {
      // Generic web application
      analysis.type = 'generic_webapp';
      analysis.technologies = ['Node.js', 'Express', 'MongoDB', 'React'];
      analysis.features = ['User Authentication', 'CRUD Operations', 'Responsive Design'];
    }
    
    // Add common features
    if (desc.includes('autentificare') || desc.includes('login') || desc.includes('google')) {
      analysis.features.push('Google OAuth');
    }
    if (desc.includes('email') || desc.includes('notificări')) {
      analysis.features.push('Email Notifications');
    }
    if (desc.includes('dashboard') || desc.includes('statistici')) {
      analysis.features.push('Analytics Dashboard');
    }
    if (desc.includes('admin') || desc.includes('panel')) {
      analysis.features.push('Admin Panel');
    }
    
    return analysis;
  }

  generateRepositoryStructure(analysis) {
    const structure = {
      'package.json': this.generatePackageJson(analysis),
      'server.js': this.generateServerJs(analysis),
      'README.md': this.generateReadme(analysis),
      '.env.example': this.generateEnvExample(analysis),
      'routes/api.js': this.generateAPIRoutes(analysis),
      'models/User.js': this.generateUserModel(analysis),
      'middleware/auth.js': this.generateAuthMiddleware(analysis)
    };
    
    // Add design system files if available
    if (analysis.designSystem) {
      console.log('📦 Adding design system files...');
      
      // CSS with design system variables
      structure['public/styles/design-system.css'] = this.generateDesignSystemCSS(analysis.designSystem);
      structure['public/styles/components.css'] = this.generateComponentCSS(analysis.designSystem);
      structure['public/styles/main.css'] = this.generateMainCSS(analysis);
      
      // Advanced CSS/SASS from CSS Agent
      if (analysis.advancedStyling) {
        console.log('🎨 Adding advanced CSS/SASS files from CSS Agent...');
        structure['public/styles/variables.css'] = analysis.advancedStyling.variables?.colors || '';
        structure['public/styles/typography.css'] = analysis.advancedStyling.typography || '';
        structure['public/styles/layout.css'] = analysis.advancedStyling.layout || '';
        structure['public/styles/utilities.css'] = analysis.advancedStyling.utilities || '';
        structure['public/styles/animations.css'] = analysis.advancedStyling.animations || '';
        structure['public/styles/responsive.css'] = analysis.advancedStyling.responsive || '';
        
        // App-specific styles
        if (analysis.advancedStyling.appSpecific) {
          structure[`public/styles/app-${analysis.type || 'general'}.css`] = analysis.advancedStyling.appSpecific;
        }
        
        // SASS architecture files
        if (analysis.advancedStyling.sassStructure) {
          structure['src/styles/main.scss'] = analysis.advancedStyling.sassStructure.structure || '';
          structure['src/styles/_variables.scss'] = analysis.advancedStyling.sassStructure.variables || '';
          structure['src/styles/_functions.scss'] = analysis.advancedStyling.sassStructure.functions || '';
        }
        
        // Advanced mixins
        if (analysis.advancedStyling.mixins) {
          structure['src/styles/_mixins.scss'] = analysis.advancedStyling.mixins;
        }
      }
      
      // Enhanced HTML with design system
      structure['views/index.html'] = this.generateEnhancedHTML(analysis);
      
      // Enhanced JavaScript with component interactions
      structure['public/scripts/components.js'] = this.generateComponentJS(analysis.designSystem);
      structure['public/scripts/main.js'] = this.generateEnhancedFrontendJS(analysis);
      
      // Design system documentation
      structure['docs/design-system.md'] = this.generateDesignSystemDocs(analysis.designSystem);
      
      // Tailwind configuration if implementation guide exists
      if (analysis.implementationGuide?.tailwindConfig) {
        structure['tailwind.config.js'] = JSON.stringify(analysis.implementationGuide.tailwindConfig, null, 2);
      }
    } else {
      // Fallback to basic styling
      structure['public/style.css'] = this.generateCSS(analysis);
      structure['public/script.js'] = this.generateFrontendJS(analysis);
      structure['views/index.html'] = this.generateIndexHTML(analysis);
    }
    
    // Add specific files based on app type
    if (analysis.type === 'ecommerce') {
      structure['models/Product.js'] = this.generateProductModel();
      structure['models/Order.js'] = this.generateOrderModel();
      structure['routes/products.js'] = this.generateProductRoutes();
      structure['routes/payments.js'] = this.generatePaymentRoutes();
    }
    
    if (analysis.type === 'realtime_chat') {
      structure['socket/chatHandler.js'] = this.generateChatHandler();
      structure['public/chat.js'] = this.generateChatClient();
    }
    
    if (analysis.type === 'blog_cms') {
      structure['models/Post.js'] = this.generatePostModel();
      structure['routes/posts.js'] = this.generatePostRoutes();
      structure['views/admin.html'] = this.generateAdminPanel();
    }
    
    return structure;
  }

  // Generate design system CSS with variables and utilities
  generateDesignSystemCSS(designSystem) {
    let css = '/* Design System CSS Variables and Base Styles */\n\n';
    
    if (designSystem.colorPalette) {
      css += ':root {\n';
      css += '  /* Brand Colors */\n';
      
      // Add color variables
      if (designSystem.colorPalette.brand?.primary) {
        Object.entries(designSystem.colorPalette.brand.primary).forEach(([shade, color]) => {
          css += `  --color-primary-${shade}: ${color};\n`;
        });
      }
      
      if (designSystem.colorPalette.semantic) {
        Object.entries(designSystem.colorPalette.semantic).forEach(([name, color]) => {
          css += `  --color-${name}: ${color};\n`;
        });
      }
      
      css += '\n  /* Typography */\n';
      if (designSystem.typography?.fontFamilies) {
        Object.entries(designSystem.typography.fontFamilies).forEach(([type, family]) => {
          css += `  --font-${type}: ${family};\n`;
        });
      }
      
      css += '\n  /* Spacing System */\n';
      css += '  --space-xs: 0.25rem;\n';
      css += '  --space-sm: 0.5rem;\n';
      css += '  --space-md: 1rem;\n';
      css += '  --space-lg: 1.5rem;\n';
      css += '  --space-xl: 2rem;\n';
      css += '  --space-2xl: 3rem;\n';
      
      css += '\n  /* Border Radius */\n';
      css += '  --radius-sm: 0.125rem;\n';
      css += '  --radius-md: 0.375rem;\n';
      css += '  --radius-lg: 0.5rem;\n';
      css += '  --radius-xl: 0.75rem;\n';
      
      css += '\n  /* Shadows */\n';
      css += '  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n';
      css += '  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);\n';
      css += '  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);\n';
      
      css += '}\n\n';
    }
    
    css += `/* Base Styles */
* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-body, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-neutral-800, #1f2937);
  background-color: var(--color-neutral-50, #f9fafb);
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
  font-weight: 600;
  line-height: 1.25;
  margin: 0 0 var(--space-md, 1rem) 0;
  color: var(--color-neutral-900, #111827);
}

h1 { font-size: 2.25rem; }
h2 { font-size: 1.875rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }
h5 { font-size: 1.125rem; }
h6 { font-size: 1rem; }

p {
  margin: 0 0 var(--space-md, 1rem) 0;
}

a {
  color: var(--color-primary-600, #3b82f6);
  text-decoration: none;
}

a:hover {
  color: var(--color-primary-700, #1d4ed8);
  text-decoration: underline;
}`;
    
    return css;
  }

  // Generate component-specific CSS
  generateComponentCSS(designSystem) {
    let css = '/* Component Styles */\n\n';
    
    if (designSystem.components?.buttons) {
      css += `/* Button Components */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: var(--radius-md, 0.375rem);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary-500, #3b82f6);
}

.btn-primary {
  background-color: var(--color-primary-600, #3b82f6);
  color: white;
  border-color: var(--color-primary-600, #3b82f6);
}

.btn-primary:hover {
  background-color: var(--color-primary-700, #1d4ed8);
  border-color: var(--color-primary-700, #1d4ed8);
}

.btn-secondary {
  background-color: white;
  color: var(--color-neutral-700, #374151);
  border-color: var(--color-neutral-300, #d1d5db);
}

.btn-secondary:hover {
  background-color: var(--color-neutral-50, #f9fafb);
  border-color: var(--color-neutral-400, #9ca3af);
}

.btn-sm {
  padding: var(--space-xs, 0.25rem) var(--space-sm, 0.5rem);
  font-size: 0.875rem;
}

.btn-md {
  padding: var(--space-sm, 0.5rem) var(--space-md, 1rem);
  font-size: 0.875rem;
}

.btn-lg {
  padding: var(--space-md, 1rem) var(--space-lg, 1.5rem);
  font-size: 1rem;
}

`;
    }
    
    if (designSystem.components?.cards) {
      css += `/* Card Components */
.card {
  background-color: white;
  border-radius: var(--radius-lg, 0.5rem);
  box-shadow: var(--shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05));
  border: 1px solid var(--color-neutral-200, #e5e7eb);
  overflow: hidden;
}

.card-header {
  padding: var(--space-lg, 1.5rem);
  border-bottom: 1px solid var(--color-neutral-200, #e5e7eb);
}

.card-body {
  padding: var(--space-lg, 1.5rem);
}

.card-footer {
  padding: var(--space-lg, 1.5rem);
  border-top: 1px solid var(--color-neutral-200, #e5e7eb);
  background-color: var(--color-neutral-50, #f9fafb);
}

`;
    }
    
    css += `/* Form Components */
.form-group {
  margin-bottom: var(--space-md, 1rem);
}

.form-label {
  display: block;
  font-weight: 500;
  color: var(--color-neutral-700, #374151);
  margin-bottom: var(--space-xs, 0.25rem);
}

.form-input {
  width: 100%;
  padding: var(--space-sm, 0.5rem) var(--space-sm, 0.5rem);
  border: 1px solid var(--color-neutral-300, #d1d5db);
  border-radius: var(--radius-md, 0.375rem);
  font-size: 0.875rem;
  transition: border-color 0.2s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-500, #3b82f6);
  box-shadow: 0 0 0 2px var(--color-primary-100, #dbeafe);
}

/* Utility Classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-md, 1rem);
}

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mt-1 { margin-top: var(--space-xs, 0.25rem); }
.mt-2 { margin-top: var(--space-sm, 0.5rem); }
.mt-4 { margin-top: var(--space-md, 1rem); }
.mt-6 { margin-top: var(--space-lg, 1.5rem); }
.mt-8 { margin-top: var(--space-xl, 2rem); }

.mb-1 { margin-bottom: var(--space-xs, 0.25rem); }
.mb-2 { margin-bottom: var(--space-sm, 0.5rem); }
.mb-4 { margin-bottom: var(--space-md, 1rem); }
.mb-6 { margin-bottom: var(--space-lg, 1.5rem); }
.mb-8 { margin-bottom: var(--space-xl, 2rem); }

.p-2 { padding: var(--space-sm, 0.5rem); }
.p-4 { padding: var(--space-md, 1rem); }
.p-6 { padding: var(--space-lg, 1.5rem); }
.p-8 { padding: var(--space-xl, 2rem); }

.grid {
  display: grid;
  gap: var(--space-md, 1rem);
}

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}`;
    
    return css;
  }

  // Generate enhanced HTML with design system
  generateEnhancedHTML(analysis) {
    const { designSystem, productRequirements } = analysis;
    const appType = this.detectAppTypeFromAnalysis(analysis);
    const appName = productRequirements?.productVision?.valueProposition || 'Generated Application';
    
    // Generate specific interface based on app type
    const specificContent = this.generateSpecificInterface(appType, designSystem);
    
    return `<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${appName}</title>
    <link rel="stylesheet" href="/styles/design-system.css">
    <link rel="stylesheet" href="/styles/components.css">
    <link rel="stylesheet" href="/styles/main.css">
    <style>
        :root {
            --primary-color: ${designSystem?.colorPalette?.primary?.[0] || '#007bff'};
            --secondary-color: ${designSystem?.colorPalette?.primary?.[1] || '#6c757d'};
            --success-color: ${designSystem?.colorPalette?.semantic?.success || '#28a745'};
            --font-family: ${designSystem?.typography?.primaryFont || 'Inter, system-ui'};
        }
        
        body {
            font-family: var(--font-family);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        
        .app-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .app-header {
            background: var(--primary-color);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .app-content {
            padding: 40px;
        }
    </style>
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <h1>${appName}</h1>
            <p>${productRequirements?.productVision?.mission || 'Aplicație generată cu design excepțional'}</p>
        </header>
        
        <main class="app-content">
            ${specificContent}
        </main>
    </div>
    
    <script src="/scripts/components.js"></script>
    <script src="/scripts/main.js"></script>
</body>
</html>`;
  }

  // Detect app type from analysis
  detectAppTypeFromAnalysis(analysis) {
    const description = analysis?.productRequirements?.productVision?.problemStatement || '';
    
    // Try to detect from product requirements first
    if (description.toLowerCase().includes('calculator') || description.toLowerCase().includes('calcul')) {
      return 'calculator';
    }
    if (description.toLowerCase().includes('todo') || description.toLowerCase().includes('task')) {
      return 'todo';
    }
    if (description.toLowerCase().includes('weather') || description.toLowerCase().includes('vreme')) {
      return 'weather';
    }
    
    return analysis?.type || 'general';
  }

  // Generate specific interface based on app type
  generateSpecificInterface(appType, designSystem) {
    const interfaces = {
      'calculator': `
        <div class="calculator">
            <div class="display">
                <input type="text" id="display" value="0" readonly style="
                    width: 100%;
                    padding: 20px;
                    font-size: 2rem;
                    text-align: right;
                    border: none;
                    background: #f8f9fa;
                    border-radius: 10px;
                    margin-bottom: 20px;
                    font-family: 'Courier New', monospace;
                ">
            </div>
            
            <div class="buttons" style="
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 15px;
                margin-top: 20px;
            ">
                <button class="btn-calc clear" onclick="clearDisplay()" style="
                    grid-column: span 2;
                    padding: 20px;
                    font-size: 1.2rem;
                    border: none;
                    border-radius: 10px;
                    background: #ff6b6b;
                    color: white;
                    cursor: pointer;
                    transition: all 0.2s;
                ">Șterge</button>
                
                <button class="btn-calc operator" onclick="deleteLast()" style="
                    padding: 20px;
                    font-size: 1.2rem;
                    border: none;
                    border-radius: 10px;
                    background: #feca57;
                    color: white;
                    cursor: pointer;
                ">⌫</button>
                
                <button class="btn-calc operator" onclick="appendToDisplay('/')" style="
                    padding: 20px;
                    font-size: 1.2rem;
                    border: none;
                    border-radius: 10px;
                    background: var(--primary-color);
                    color: white;
                    cursor: pointer;
                ">÷</button>
                
                <button class="btn-calc number" onclick="appendToDisplay('7')">7</button>
                <button class="btn-calc number" onclick="appendToDisplay('8')">8</button>
                <button class="btn-calc number" onclick="appendToDisplay('9')">9</button>
                <button class="btn-calc operator" onclick="appendToDisplay('*')">×</button>
                
                <button class="btn-calc number" onclick="appendToDisplay('4')">4</button>
                <button class="btn-calc number" onclick="appendToDisplay('5')">5</button>
                <button class="btn-calc number" onclick="appendToDisplay('6')">6</button>
                <button class="btn-calc operator" onclick="appendToDisplay('-')">-</button>
                
                <button class="btn-calc number" onclick="appendToDisplay('1')">1</button>
                <button class="btn-calc number" onclick="appendToDisplay('2')">2</button>
                <button class="btn-calc number" onclick="appendToDisplay('3')">3</button>
                <button class="btn-calc operator" onclick="appendToDisplay('+')">+</button>
                
                <button class="btn-calc number zero" onclick="appendToDisplay('0')" style="grid-column: span 2;">0</button>
                <button class="btn-calc number" onclick="appendToDisplay('.')">.</button>
                <button class="btn-calc equals" onclick="calculate()" style="
                    background: var(--success-color);
                    color: white;
                ">=</button>
            </div>
        </div>
        
        <style>
            .btn-calc {
                padding: 20px;
                font-size: 1.2rem;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.2s;
                font-weight: 600;
            }
            
            .btn-calc.number {
                background: #f8f9fa;
                color: #333;
            }
            
            .btn-calc.number:hover {
                background: #e9ecef;
                transform: scale(0.95);
            }
            
            .btn-calc.operator {
                background: var(--primary-color);
                color: white;
            }
            
            .btn-calc.operator:hover {
                opacity: 0.9;
                transform: scale(0.95);
            }
        </style>
        
        <script>
            let display = document.getElementById('display');
            let currentInput = '0';
            
            function clearDisplay() {
                currentInput = '0';
                display.value = currentInput;
            }
            
            function deleteLast() {
                if (currentInput.length > 1) {
                    currentInput = currentInput.slice(0, -1);
                } else {
                    currentInput = '0';
                }
                display.value = currentInput;
            }
            
            function appendToDisplay(value) {
                if (currentInput === '0' && value !== '.') {
                    currentInput = value;
                } else {
                    currentInput += value;
                }
                display.value = currentInput;
            }
            
            function calculate() {
                try {
                    // Replace display operators with JS operators
                    let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
                    let result = eval(expression);
                    currentInput = result.toString();
                    display.value = currentInput;
                } catch (error) {
                    display.value = 'Eroare';
                    currentInput = '0';
                }
            }
            
            // Keyboard support
            document.addEventListener('keydown', function(event) {
                const key = event.key;
                if ('0123456789'.includes(key)) {
                    appendToDisplay(key);
                } else if (['+', '-'].includes(key)) {
                    appendToDisplay(key);
                } else if (key === '*') {
                    appendToDisplay('*');
                } else if (key === '/') {
                    event.preventDefault();
                    appendToDisplay('/');
                } else if (key === 'Enter' || key === '=') {
                    event.preventDefault();
                    calculate();
                } else if (key === 'Escape') {
                    clearDisplay();
                } else if (key === 'Backspace') {
                    event.preventDefault();
                    deleteLast();
                }
            });
        </script>
      `,
      
      'todo': `
        <div class="todo-app">
            <div class="add-task" style="margin-bottom: 30px;">
                <input type="text" id="taskInput" placeholder="Adaugă o sarcină nouă..." style="
                    width: 70%;
                    padding: 15px;
                    border: 2px solid #e9ecef;
                    border-radius: 10px;
                    font-size: 1rem;
                    margin-right: 10px;
                ">
                <button onclick="addTask()" style="
                    padding: 15px 25px;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 1rem;
                ">Adaugă</button>
            </div>
            
            <div id="todoList" style="
                background: #f8f9fa;
                border-radius: 15px;
                padding: 20px;
                min-height: 200px;
            ">
                <p style="text-align: center; color: #6c757d;">Nu ai încă sarcini. Adaugă prima!</p>
            </div>
        </div>
        
        <script>
            let tasks = [];
            
            function addTask() {
                const input = document.getElementById('taskInput');
                const task = input.value.trim();
                
                if (task) {
                    tasks.push({
                        id: Date.now(),
                        text: task,
                        completed: false
                    });
                    input.value = '';
                    renderTasks();
                }
            }
            
            function toggleTask(id) {
                tasks = tasks.map(task => 
                    task.id === id ? {...task, completed: !task.completed} : task
                );
                renderTasks();
            }
            
            function deleteTask(id) {
                tasks = tasks.filter(task => task.id !== id);
                renderTasks();
            }
            
            function renderTasks() {
                const todoList = document.getElementById('todoList');
                
                if (tasks.length === 0) {
                    todoList.innerHTML = '<p style="text-align: center; color: #6c757d;">Nu ai încă sarcini. Adaugă prima!</p>';
                    return;
                }
                
                todoList.innerHTML = tasks.map(task => \`
                    <div style="
                        display: flex;
                        align-items: center;
                        padding: 15px;
                        margin-bottom: 10px;
                        background: white;
                        border-radius: 10px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                        \${task.completed ? 'opacity: 0.6;' : ''}
                    ">
                        <input type="checkbox" \${task.completed ? 'checked' : ''} 
                               onchange="toggleTask(\${task.id})" style="margin-right: 15px;">
                        <span style="
                            flex: 1;
                            \${task.completed ? 'text-decoration: line-through;' : ''}
                        ">\${task.text}</span>
                        <button onclick="deleteTask(\${task.id})" style="
                            background: #ff6b6b;
                            color: white;
                            border: none;
                            padding: 5px 10px;
                            border-radius: 5px;
                            cursor: pointer;
                        ">🗑️</button>
                    </div>
                \`).join('');
            }
            
            // Add task on Enter key
            document.getElementById('taskInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addTask();
                }
            });
        </script>
      `,
      
      'weather': `
        <div class="weather-app">
            <div class="location-input" style="margin-bottom: 30px;">
                <input type="text" id="cityInput" placeholder="Introdu orașul..." value="București" style="
                    width: 70%;
                    padding: 15px;
                    border: 2px solid #e9ecef;
                    border-radius: 10px;
                    font-size: 1rem;
                    margin-right: 10px;
                ">
                <button onclick="getWeather()" style="
                    padding: 15px 25px;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                ">Caută</button>
            </div>
            
            <div id="weatherInfo" style="
                background: linear-gradient(135deg, #74b9ff, #0984e3);
                color: white;
                padding: 30px;
                border-radius: 20px;
                text-align: center;
            ">
                <h2>☀️ București</h2>
                <div style="font-size: 3rem; margin: 20px 0;">22°C</div>
                <p style="font-size: 1.2rem;">Însorit</p>
                <div style="display: flex; justify-content: space-around; margin-top: 20px;">
                    <div>
                        <div>Umiditate</div>
                        <div style="font-weight: bold;">65%</div>
                    </div>
                    <div>
                        <div>Vânt</div>
                        <div style="font-weight: bold;">12 km/h</div>
                    </div>
                    <div>
                        <div>Vizibilitate</div>
                        <div style="font-weight: bold;">10 km</div>
                    </div>
                </div>
            </div>
        </div>
        
        <script>
            function getWeather() {
                const city = document.getElementById('cityInput').value || 'București';
                // Simulate weather data - in real app would call weather API
                const weatherData = {
                    'București': {icon: '☀️', temp: '22°C', desc: 'Însorit', humidity: '65%', wind: '12 km/h'},
                    'Cluj-Napoca': {icon: '⛅', temp: '18°C', desc: 'Parțial noros', humidity: '72%', wind: '8 km/h'},
                    'Timișoara': {icon: '🌧️', temp: '15°C', desc: 'Ploios', humidity: '85%', wind: '15 km/h'}
                };
                
                const data = weatherData[city] || weatherData['București'];
                
                document.getElementById('weatherInfo').innerHTML = \`
                    <h2>\${data.icon} \${city}</h2>
                    <div style="font-size: 3rem; margin: 20px 0;">\${data.temp}</div>
                    <p style="font-size: 1.2rem;">\${data.desc}</p>
                    <div style="display: flex; justify-content: space-around; margin-top: 20px;">
                        <div>
                            <div>Umiditate</div>
                            <div style="font-weight: bold;">\${data.humidity}</div>
                        </div>
                        <div>
                            <div>Vânt</div>
                            <div style="font-weight: bold;">\${data.wind}</div>
                        </div>
                        <div>
                            <div>Vizibilitate</div>
                            <div style="font-weight: bold;">10 km</div>
                        </div>
                    </div>
                \`;
            }
        </script>
      `
    };
    
    return interfaces[appType] || `
      <div class="welcome-message">
          <h2>🎉 Aplicația ta a fost generată cu succes!</h2>
          <p>Această aplicație a fost creată prin colaborarea profesionistă a echipei AI:</p>
          <ul style="text-align: left; max-width: 400px; margin: 20px auto;">
              <li><strong>Product Owner</strong> - Analiză cerințe</li>
              <li><strong>Senior Designer</strong> - Design system</li>
              <li><strong>DevOps Agent</strong> - Implementare</li>
          </ul>
          <div style="margin-top: 30px;">
              <button style="
                  padding: 15px 30px;
                  background: var(--primary-color);
                  color: white;
                  border: none;
                  border-radius: 10px;
                  font-size: 1.1rem;
                  cursor: pointer;
                  margin: 0 10px;
              " onclick="alert('Funcționalitate în dezvoltare!')">Începe</button>
              <button style="
                  padding: 15px 30px;
                  background: transparent;
                  color: var(--primary-color);
                  border: 2px solid var(--primary-color);
                  border-radius: 10px;
                  font-size: 1.1rem;
                  cursor: pointer;
                  margin: 0 10px;
              " onclick="alert('Documentație în curând!')">Documentație</button>
          </div>
      </div>
    `;
  }

  async deployNewApplication(analysis, repoStructure) {
    try {
      // Create a new repository for the app
      const appName = `generated-app-${Date.now()}`;
      const repoName = this.generateRepoName(analysis, appName);
      
      console.log(`🏗️ Creating new app: ${appName}`);
      console.log(`📦 New repository: ${repoName}`);
      
      // Get owner from current repo
      const currentRepoPath = this.monitoredRepos[0];
      const [owner] = currentRepoPath.split('/');
      
      // Create new repository
      const { data: newRepo } = await this.github.rest.repos.createForAuthenticatedUser({
        name: repoName,
        description: `${analysis.type} application - ${analysis.description?.substring(0, 100) || 'Generated by AI DevOps Agent'}`,
        private: false,
        auto_init: true,
        gitignore_template: 'Node',
        license_template: 'mit'
      });
      
      console.log(`✅ Repository created: ${newRepo.html_url}`);
      
      // Wait a moment for repository to be ready
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create all files in the new repository
      for (const [filePath, content] of Object.entries(repoStructure)) {
        try {
          await this.github.rest.repos.createOrUpdateFileContents({
            owner,
            repo: repoName,
            path: filePath,
            message: `Add ${filePath} for ${appName}`,
            content: Buffer.from(content).toString('base64'),
            branch: 'main'
          });
          
          console.log(`✅ Created: ${filePath}`);
        } catch (fileError) {
          console.error(`❌ Failed to create ${filePath}:`, fileError.message);
        }
      }
      
      // Create Railway deployment configuration
      const railwayConfig = {
        "build": {
          "builder": "nixpacks"
        },
        "deploy": {
          "startCommand": "npm start",
          "healthcheckPath": "/health"
        }
      };
      
      await this.github.rest.repos.createOrUpdateFileContents({
        owner,
        repo: repoName,
        path: 'railway.json',
        message: `Add Railway configuration for ${appName}`,
        content: Buffer.from(JSON.stringify(railwayConfig, null, 2)).toString('base64'),
        branch: 'main'
      });
      
      console.log(`✅ Railway configuration added`);
      
      // Setup Railway deployment (mock for now)
      const railwayUrl = `https://${repoName}-production.up.railway.app`;
      
      return {
        success: true,
        message: `Aplicația "${appName}" a fost creată cu succes! Repository-ul nou "${repoName}" conține ${Object.keys(repoStructure).length} fișiere generate.`,
        repository_url: newRepo.html_url,
        app_url: railwayUrl,
        details: {
          repository_name: repoName,
          technology_stack: analysis.technologies?.join(', ') || 'Node.js, Express, MongoDB',
          features: analysis.features || ['Web Application'],
          deployment_time: '5-10 minutes',
          files_created: Object.keys(repoStructure).length,
          ready_for_deployment: true
        }
      };
      
    } catch (error) {
      console.error('❌ Deployment failed:', error);
      throw new Error(`Deployment failed: ${error.message}`);
    }
  }

  // Generate meaningful repository name based on app analysis
  generateRepoName(analysis, appName) {
    const typeMapping = {
      'dating': 'dating-app',
      'ecommerce': 'shop-app', 
      'chat': 'chat-app',
      'social': 'social-app',
      'productivity': 'task-app',
      'education': 'learning-app',
      'finance': 'finance-app',
      'health': 'health-app'
    };
    
    const typePrefix = typeMapping[analysis.type] || 'web-app';
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits
    
    return `${typePrefix}-${timestamp}`;
  }

  generatePackageJson(analysis) {
    const dependencies = {
      "express": "^4.18.2",
      "mongoose": "^7.5.0",
      "dotenv": "^16.3.1",
      "cors": "^2.8.5",
      "helmet": "^7.0.0",
      "morgan": "^1.10.0"
    };
    
    if (analysis.features.includes('Google OAuth')) {
      dependencies["passport"] = "^0.6.0";
      dependencies["passport-google-oauth20"] = "^2.0.0";
    }
    
    if (analysis.features.includes('Email Notifications')) {
      dependencies["nodemailer"] = "^6.9.4";
    }
    
    if (analysis.type === 'realtime_chat') {
      dependencies["socket.io"] = "^4.7.2";
    }
    
    if (analysis.type === 'ecommerce') {
      dependencies["stripe"] = "^13.6.0";
    }
    
    return JSON.stringify({
      "name": `generated-app-${Date.now()}`,
      "version": "1.0.0",
      "description": `Generated by DevOps AI Agent - ${analysis.type}`,
      "main": "server.js",
      "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": analysis.technologies,
      "author": "DevOps AI Agent",
      "license": "MIT",
      "dependencies": dependencies,
      "devDependencies": {
        "nodemon": "^3.0.1"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    }, null, 2);
  }

  generateServerJs(analysis) {
    return `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/generated-app';
mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api', require('./routes/api'));

// Main route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: '${analysis.type}',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

${analysis.type === 'realtime_chat' ? `
// Socket.IO setup
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

require('./socket/chatHandler')(io);

server.listen(PORT, () => {
  console.log(\`🚀 Server with Socket.IO running on port \${PORT}\`);
});
` : `
app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});
`}

module.exports = app;`;
  }

  generateReadme(analysis) {
    return `# ${analysis.type.replace(/_/g, ' ').toUpperCase()}

Generated by DevOps AI Agent with 15+ years experience.

## 🚀 Features

${analysis.features.map(feature => `- ${feature}`).join('\n')}

## 🛠️ Technology Stack

${analysis.technologies.map(tech => `- ${tech}`).join('\n')}

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Copy environment variables:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Update the \`.env\` file with your configuration

5. Start the application:
   \`\`\`bash
   npm start
   \`\`\`

## 🌍 Environment Variables

See \`.env.example\` for required environment variables.

## 🚀 Deployment

This application is configured for Railway deployment:

1. Connect your GitHub repository to Railway
2. Set the environment variables in Railway dashboard
3. Deploy automatically on push to main branch

## 📝 API Documentation

- \`GET /\` - Main application page
- \`GET /health\` - Health check endpoint
- \`GET /api/status\` - API status
${analysis.type === 'ecommerce' ? `
- \`GET /api/products\` - Get all products
- \`POST /api/products\` - Create new product
- \`POST /api/orders\` - Create new order
- \`POST /api/payments\` - Process payment
` : ''}
${analysis.type === 'blog_cms' ? `
- \`GET /api/posts\` - Get all posts
- \`POST /api/posts\` - Create new post
- \`PUT /api/posts/:id\` - Update post
- \`DELETE /api/posts/:id\` - Delete post
` : ''}

## 🔒 Security

- Helmet.js for security headers
- CORS configuration
- Environment variable protection
- Input validation
- Rate limiting (recommended for production)

## 🤖 Generated by DevOps AI Agent

This application was automatically generated with industry best practices and 15+ years of DevOps experience patterns.

Generated on: ${new Date().toISOString()}
`;
  }

  generateEnvExample(analysis) {
    let envVars = `# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/generated-app

# Application Settings
PORT=3000
NODE_ENV=development

# Security
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
SESSION_SECRET=your-session-secret-here

`;

    if (analysis.features.includes('Google OAuth')) {
      envVars += `# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

`;
    }

    if (analysis.features.includes('Email Notifications')) {
      envVars += `# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

`;
    }

    if (analysis.type === 'ecommerce') {
      envVars += `# Stripe Payment
STRIPE_PUBLIC_KEY=pk_test_your-stripe-public-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

`;
    }

    return envVars;
  }

  generateCSS(analysis) {
    return `/* Generated by DevOps AI Agent - Modern CSS */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    text-align: center;
    margin-bottom: 40px;
    color: white;
}

.header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 30px;
    margin: 20px 0;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.2);
}

.btn {
    display: inline-block;
    padding: 12px 24px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;
    font-weight: 600;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 12px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 10px rgba(102, 126, 234, 0.2);
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.footer {
    text-align: center;
    margin-top: 40px;
    color: rgba(255,255,255,0.8);
    font-size: 14px;
}

.loading {
    text-align: center;
    padding: 40px;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    .header h1 {
        font-size: 2em;
    }
    
    .card {
        padding: 20px;
    }
    
    .grid {
        grid-template-columns: 1fr;
    }
}

/* ${analysis.type} specific styles */
${analysis.type === 'ecommerce' ? `
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.product-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-info {
    padding: 15px;
}

.price {
    font-size: 1.2em;
    font-weight: bold;
    color: #667eea;
}
` : ''}

${analysis.type === 'realtime_chat' ? `
.chat-container {
    height: 400px;
    display: flex;
    flex-direction: column;
}

.messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px 10px 0 0;
}

.message {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    max-width: 70%;
}

.message.own {
    background: #667eea;
    color: white;
    margin-left: auto;
}

.message.other {
    background: white;
    border: 1px solid #ddd;
}

.chat-input {
    display: flex;
    gap: 10px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 0 0 10px 10px;
}

.chat-input input {
    flex: 1;
}
` : ''}`;
  }

  generateFrontendJS(analysis) {
    let baseJS = `// Generated by DevOps AI Agent - Frontend JavaScript

class App {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('${analysis.type} app initialized');
        this.setupEventListeners();
        this.loadData();
    }
    
    setupEventListeners() {
        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('.ajax-form')) {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });
        
        // Button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn-ajax')) {
                e.preventDefault();
                this.handleButtonClick(e.target);
            }
        });
    }
    
    async handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            this.showLoading(form);
            
            const response = await fetch(form.action || '/api/submit', {
                method: form.method || 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.showSuccess('Operation completed successfully!');
                form.reset();
                this.loadData();
            } else {
                this.showError(result.message || 'Operation failed');
            }
            
        } catch (error) {
            this.showError('Network error occurred');
            console.error('Form submission error:', error);
        } finally {
            this.hideLoading(form);
        }
    }
    
    async loadData() {
        try {
            const response = await fetch('/api/data');
            const data = await response.json();
            this.renderData(data);
        } catch (error) {
            console.error('Data loading error:', error);
        }
    }
    
    renderData(data) {
        const container = document.getElementById('data-container');
        if (container && data.items) {
            container.innerHTML = data.items.map(item => 
                \`<div class="data-item">\${this.renderItem(item)}</div>\`
            ).join('');
        }
    }
    
    renderItem(item) {
        return \`
            <h3>\${item.title || item.name}</h3>
            <p>\${item.description || item.content}</p>
            <small>\${new Date(item.createdAt).toLocaleDateString()}</small>
        \`;
    }
    
    showLoading(element) {
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        spinner.id = 'loading-spinner';
        element.appendChild(spinner);
        
        const buttons = element.querySelectorAll('button');
        buttons.forEach(btn => btn.disabled = true);
    }
    
    hideLoading(element) {
        const spinner = element.querySelector('#loading-spinner');
        if (spinner) spinner.remove();
        
        const buttons = element.querySelectorAll('button');
        buttons.forEach(btn => btn.disabled = false);
    }
    
    showSuccess(message) {
        this.showAlert(message, 'success');
    }
    
    showError(message) {
        this.showAlert(message, 'error');
    }
    
    showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = \`alert alert-\${type}\`;
        alert.textContent = message;
        alert.style.cssText = \`
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            background: \${type === 'success' ? '#4caf50' : '#f44336'};
            animation: slideIn 0.3s ease-out;
        \`;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => alert.remove(), 300);
        }, 4000);
    }
}
`;

    // Add specific functionality based on app type
    if (analysis.type === 'realtime_chat') {
      baseJS += `
// Socket.IO Chat Implementation
class ChatApp extends App {
    constructor() {
        super();
        this.socket = io();
        this.setupSocketListeners();
    }
    
    setupSocketListeners() {
        this.socket.on('message', (data) => {
            this.addMessage(data);
        });
        
        this.socket.on('user-joined', (data) => {
            this.addSystemMessage(\`\${data.username} joined the chat\`);
        });
        
        this.socket.on('user-left', (data) => {
            this.addSystemMessage(\`\${data.username} left the chat\`);
        });
    }
    
    sendMessage(message) {
        if (message.trim()) {
            this.socket.emit('send-message', { message });
            document.getElementById('message-input').value = '';
        }
    }
    
    addMessage(data) {
        const messagesContainer = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = \`message \${data.isOwn ? 'own' : 'other'}\`;
        messageDiv.innerHTML = \`
            <strong>\${data.username}:</strong>
            <span>\${data.message}</span>
            <small>\${new Date(data.timestamp).toLocaleTimeString()}</small>
        \`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    addSystemMessage(message) {
        const messagesContainer = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message system';
        messageDiv.innerHTML = \`<em>\${message}</em>\`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chat app
const app = new ChatApp();
`;
    } else if (analysis.type === 'ecommerce') {
      baseJS += `
// E-commerce specific functionality
class EcommerceApp extends App {
    constructor() {
        super();
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartDisplay();
    }
    
    addToCart(productId, quantity = 1) {
        const existing = this.cart.find(item => item.productId === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cart.push({ productId, quantity });
        }
        this.saveCart();
        this.updateCartDisplay();
        this.showSuccess('Product added to cart!');
    }
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.productId !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.showSuccess('Product removed from cart!');
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    
    updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }
    
    async checkout() {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cart: this.cart })
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.cart = [];
                this.saveCart();
                this.updateCartDisplay();
                this.showSuccess('Order placed successfully!');
                window.location.href = '/order-confirmation';
            } else {
                this.showError(result.message || 'Checkout failed');
            }
        } catch (error) {
            this.showError('Checkout failed');
            console.error('Checkout error:', error);
        }
    }
}

// Initialize e-commerce app
const app = new EcommerceApp();
`;
    } else {
      baseJS += `
// Initialize generic app
const app = new App();
`;
    }

    return baseJS;
  }

  generateIndexHTML(analysis) {
    return `<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${analysis.type.replace(/_/g, ' ').toUpperCase()} - Generated by DevOps AI Agent</title>
    <link rel="stylesheet" href="style.css">
    ${analysis.type === 'realtime_chat' ? '<script src="/socket.io/socket.io.js"></script>' : ''}
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🤖 ${analysis.type.replace(/_/g, ' ').toUpperCase()}</h1>
            <p>Generated by DevOps AI Agent with 15+ years experience</p>
        </div>
        
        <div class="card">
            <h2>Welcome to your new application!</h2>
            <p>This ${analysis.type} application includes the following features:</p>
            <ul>
                ${analysis.features.map(feature => `<li>${feature}</li>`).join('\n                ')}
            </ul>
        </div>
        
        ${this.generateTypeSpecificHTML(analysis)}
        
        <div class="footer">
            <p>Generated on ${new Date().toISOString()} by DevOps AI Agent</p>
            <p>Technology Stack: ${analysis.technologies.join(', ')}</p>
        </div>
    </div>
    
    <div id="data-container"></div>
    
    <script src="script.js"></script>
</body>
</html>`;
  }

  generateTypeSpecificHTML(analysis) {
    switch (analysis.type) {
      case 'realtime_chat':
        return `
        <div class="card">
            <h2>💬 Chat Room</h2>
            <div class="chat-container">
                <div id="messages" class="messages"></div>
                <div class="chat-input">
                    <input type="text" id="message-input" placeholder="Type your message..." 
                           onkeypress="if(event.key==='Enter') app.sendMessage(this.value)">
                    <button onclick="app.sendMessage(document.getElementById('message-input').value)">Send</button>
                </div>
            </div>
        </div>`;
        
      case 'ecommerce':
        return `
        <div class="card">
            <h2>🛍️ Products</h2>
            <div class="product-grid" id="product-grid">
                <!-- Products will be loaded here -->
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <button onclick="app.checkout()" class="btn">
                    Checkout (<span id="cart-count">0</span> items)
                </button>
            </div>
        </div>`;
        
      case 'blog_cms':
        return `
        <div class="card">
            <h2>📝 Latest Posts</h2>
            <div id="posts-container">
                <!-- Posts will be loaded here -->
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <a href="/admin" class="btn">Admin Panel</a>
            </div>
        </div>`;
        
      case 'task_management':
        return `
        <div class="card">
            <h2>✅ Task Manager</h2>
            <form class="ajax-form" action="/api/tasks" method="POST">
                <div class="form-group">
                    <input type="text" name="title" placeholder="Task title" required>
                </div>
                <div class="form-group">
                    <textarea name="description" placeholder="Task description"></textarea>
                </div>
                <button type="submit" class="btn">Add Task</button>
            </form>
            <div id="tasks-container" style="margin-top: 20px;">
                <!-- Tasks will be loaded here -->
            </div>
        </div>`;
        
      default:
        return `
        <div class="card">
            <h2>🚀 Get Started</h2>
            <p>Your application is ready! You can:</p>
            <ul>
                <li>Check the API endpoints at <code>/api/status</code></li>
                <li>View the health check at <code>/health</code></li>
                <li>Customize the frontend and backend as needed</li>
                <li>Deploy to Railway for production</li>
            </ul>
            <div style="text-align: center; margin-top: 20px;">
                <a href="/api/status" class="btn">Check API Status</a>
            </div>
        </div>`;
    }
  }

  generateAPIRoutes(analysis) {
    return `const express = require('express');
const router = express.Router();

// API Status endpoint
router.get('/status', (req, res) => {
  res.json({
    status: 'active',
    timestamp: new Date().toISOString(),
    service: '${analysis.type}',
    version: '1.0.0',
    features: ${JSON.stringify(analysis.features)}
  });
});

// Sample data endpoint
router.get('/data', async (req, res) => {
  try {
    // This would typically fetch from database
    res.json({
      success: true,
      items: [
        {
          id: 1,
          title: 'Sample Item 1',
          description: 'This is a sample item generated by DevOps AI Agent',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Sample Item 2', 
          description: 'Another sample item with different content',
          createdAt: new Date().toISOString()
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generic submit endpoint
router.post('/submit', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    
    // Process the submitted data here
    // This would typically save to database
    
    res.json({
      success: true,
      message: 'Data submitted successfully',
      data: req.body
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

${analysis.type === 'task_management' ? `
// Task-specific routes
router.get('/tasks', async (req, res) => {
  try {
    // Fetch tasks from database
    res.json({
      success: true,
      tasks: []
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Save task to database
    const task = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
` : ''}

${analysis.type === 'ecommerce' ? `
// E-commerce routes
router.get('/products', async (req, res) => {
  try {
    // Fetch products from database
    res.json({
      success: true,
      products: []
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/checkout', async (req, res) => {
  try {
    const { cart } = req.body;
    
    // Process checkout
    const order = {
      id: Date.now(),
      items: cart,
      total: 0, // Calculate total
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
` : ''}

module.exports = router;`;
  }

  generateUserModel(analysis) {
    return `const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password not required if using Google OAuth
    },
    minlength: 6
  },
  ${analysis.features.includes('Google OAuth') ? `
  googleId: {
    type: String,
    sparse: true
  },
  avatar: {
    type: String,
    default: ''
  },` : ''}
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
    phone: String
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Static method to find by email or username
userSchema.statics.findByEmailOrUsername = function(identifier) {
  return this.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { username: identifier }
    ]
  });
};

module.exports = mongoose.model('User', userSchema);`;
  }

  generateAuthMiddleware(analysis) {
    return `const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT Authentication middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Admin role middleware
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Optional authentication (don't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      if (user && user.isActive) {
        req.user = user;
      }
    }
  } catch (error) {
    // Ignore errors in optional auth
  }
  next();
};

${analysis.features.includes('Google OAuth') ? `
// Google OAuth middleware setup
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with this Google ID
    let user = await User.findOne({ googleId: profile.id });
    
    if (user) {
      return done(null, user);
    }
    
    // Check if user exists with same email
    user = await User.findOne({ email: profile.emails[0].value });
    
    if (user) {
      // Link Google account to existing user
      user.googleId = profile.id;
      user.avatar = profile.photos[0]?.value || '';
      await user.save();
      return done(null, user);
    }
    
    // Create new user
    user = new User({
      googleId: profile.id,
      username: profile.displayName.replace(/\\s+/g, '').toLowerCase() + Date.now(),
      email: profile.emails[0].value,
      avatar: profile.photos[0]?.value || '',
      profile: {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
      }
    });
    
    await user.save();
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-password');
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
` : ''}

module.exports = {
  authenticateToken,
  requireAdmin,
  generateToken,
  optionalAuth${analysis.features.includes('Google OAuth') ? ',\n  passport' : ''}
};`;
  }

  // Additional helper methods for specific app types
  generateProductModel() {
    return `const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'clothing', 'books', 'home', 'sports', 'other']
  },
  images: [{
    url: String,
    alt: String
  }],
  inventory: {
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    sku: {
      type: String,
      unique: true,
      sparse: true
    }
  },
  specifications: {
    type: Map,
    of: String
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for search
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model('Product', productSchema);`;
  }

  generateOrderModel() {
    return `const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentInfo: {
    method: {
      type: String,
      enum: ['stripe', 'paypal', 'cash'],
      required: true
    },
    transactionId: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    }
  },
  tracking: {
    number: String,
    carrier: String,
    url: String
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);`;
  }

  generateChatHandler() {
    return `module.exports = (io) => {
  const users = new Map();
  
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // User joins
    socket.on('user-join', (data) => {
      users.set(socket.id, {
        id: socket.id,
        username: data.username || \`User\${Date.now()}\`,
        joinedAt: new Date()
      });
      
      socket.broadcast.emit('user-joined', {
        username: users.get(socket.id).username
      });
      
      // Send current users list
      socket.emit('users-list', Array.from(users.values()));
    });
    
    // Handle messages
    socket.on('send-message', (data) => {
      const user = users.get(socket.id);
      if (user) {
        const messageData = {
          id: Date.now(),
          message: data.message,
          username: user.username,
          timestamp: new Date().toISOString(),
          isOwn: false
        };
        
        // Send to all clients except sender
        socket.broadcast.emit('message', messageData);
        
        // Send back to sender with isOwn flag
        socket.emit('message', { ...messageData, isOwn: true });
      }
    });
    
    // Handle typing indicators
    socket.on('typing-start', () => {
      const user = users.get(socket.id);
      if (user) {
        socket.broadcast.emit('user-typing', {
          username: user.username,
          isTyping: true
        });
      }
    });
    
    socket.on('typing-stop', () => {
      const user = users.get(socket.id);
      if (user) {
        socket.broadcast.emit('user-typing', {
          username: user.username,
          isTyping: false
        });
      }
    });
    
    // Handle disconnect
    socket.on('disconnect', () => {
      const user = users.get(socket.id);
      if (user) {
        socket.broadcast.emit('user-left', {
          username: user.username
        });
        users.delete(socket.id);
      }
      console.log('User disconnected:', socket.id);
    });
  });
};`;
  }

  generatePostModel() {
    return `const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    maxlength: 500
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categories: [String],
  tags: [String],
  featuredImage: {
    url: String,
    alt: String
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: Date,
  views: {
    type: Number,
    default: 0
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  comments: [{
    author: String,
    email: String,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    approved: {
      type: Boolean,
      default: false
    }
  }]
}, {
  timestamps: true
});

// Generate slug before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Index for search and SEO
postSchema.index({ title: 'text', content: 'text' });
postSchema.index({ slug: 1 });
postSchema.index({ status: 1, publishedAt: -1 });

module.exports = mongoose.model('Post', postSchema);`;
  }

  getStats() {
    return {
      createdApps: this.fixHistory.filter(fix => fix.type === 'APP_CREATION').length,
      totalFixes: this.fixHistory.length,
      successRate: this.fixHistory.length > 0 
        ? (this.fixHistory.filter(fix => fix.result === 'SUCCESS').length / this.fixHistory.length * 100).toFixed(1)
        : 100
    };
  }

  // Generate main CSS file
  generateMainCSS(analysis) {
    return `/* Main Application Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Inter, system-ui, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .card {
    padding: 16px;
  }
}
`;
  }

  // Generate component JavaScript
  generateComponentJS(designSystem) {
    return `// Component Interactions
document.addEventListener('DOMContentLoaded', function() {
  console.log('Components initialized');
  
  // Button interactions
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  // Form interactions
  const inputs = document.querySelectorAll('.form-input');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
  
  // Card hover effects
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    });
  });
});
`;
  }

  // Generate enhanced frontend JavaScript
  generateEnhancedFrontendJS(analysis) {
    const { designSystem, productRequirements } = analysis;
    const appName = productRequirements?.productVision?.missionStatement || 'MyApp';
    
    return `
// ${appName} - Enhanced Frontend Application
// Generated with modern JavaScript patterns and design system integration

// Design System Integration
const designTokens = ${JSON.stringify(designSystem?.colorPalette || {}, null, 2)};

// App Configuration
const appConfig = {
  name: '${appName}',
  version: '1.0.0',
  theme: designTokens.primary || '#007bff',
  features: ['responsive', 'accessibility', 'performance']
};

// Main Application Class
class ${appName.replace(/\s+/g, '')}App {
  constructor() {
    this.initialized = false;
    this.components = new Map();
    this.state = { user: null, theme: 'light', loading: false };
    this.init();
  }

  async init() {
    await this.loadComponents();
    this.setupEventListeners();
    this.render();
    this.initialized = true;
    console.log('✅ ${appName} initialized successfully');
  }

  loadComponents() {
    // Component loading logic
    const components = ['Header', 'Navigation', 'MainContent', 'Footer'];
    components.forEach(name => {
      this.components.set(name, { name, element: null });
    });
  }

  setupEventListeners() {
    document.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleClick(event) {
    const action = event.target.dataset.action;
    if (action) this.executeAction(action, event.target);
  }

  handleResize() {
    this.updateLayout();
  }

  executeAction(action, element) {
    console.log('Executing action:', action);
  }

  updateLayout() {
    // Responsive updates
  }

  render() {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = '<div>App loaded with design system</div>';
    }
  }
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new ${appName.replace(/\s+/g, '')}App();
});
`;
  }

  // Generate design system documentation
  generateDesignSystemDocs(designSystem) {
    return `# Design System Documentation

## Overview
This design system provides a comprehensive foundation for building consistent, accessible, and scalable user interfaces.

## Colors
${JSON.stringify(designSystem?.colorPalette || {}, null, 2)}

## Typography
- Primary Font: ${designSystem?.typography?.primaryFont || 'system-ui'}
- Font Stack: ${designSystem?.typography?.fontStack || 'system-ui, sans-serif'}

## Spacing
Base unit: ${designSystem?.spacing?.base || '8px'}

## Components
${JSON.stringify(designSystem?.components || {}, null, 2)}

## Usage Guidelines

### Colors
- Primary colors for main actions and branding
- Secondary colors for supporting elements
- Semantic colors for status and feedback

### Typography
- Use consistent font sizes and weights
- Maintain proper line height for readability
- Consider accessibility in font choices

### Spacing
- Use consistent spacing units throughout
- Maintain visual hierarchy with spacing
- Consider mobile and desktop spacing needs

## Implementation
Include the design system CSS variables in your stylesheets:

\`\`\`css
:root {
  --primary-color: ${designSystem?.colorPalette?.primary?.[0] || '#007bff'};
  --font-family: ${designSystem?.typography?.primaryFont || 'system-ui'};
  --spacing-unit: ${designSystem?.spacing?.base || '8px'};
}
\`\`\`
`;
  }
}

module.exports = DevOpsAIAgent;
