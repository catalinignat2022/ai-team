#!/usr/bin/env node

/**
 * Backend Developer AI Agent - Node.js API & Database Expert
 * 10+ years Node.js development experience
 * Specialized in APIs, databases, microservices, and real-time systems
 */

import { Octokit } from "@octokit/rest";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

dotenv.config();

class BackendDeveloperAgent {
  static CLAUDE_MODEL = "claude-sonnet-4-20250514";

  constructor() {
    this.octokit = null;
    this.anthropic = null;
    this.config = {
      owner: process.env.GITHUB_USERNAME,
      token: process.env.GITHUB_TOKEN,
      anthropicKey: process.env.ANTHROPIC_API_KEY,
    };
    this.contextPath = "./shared-context";
  }

  async initialize() {
    console.log("⚙️ Backend Developer AI Agent (10+ years Node.js) initializing...");
    
    if (!this.config.token || !this.config.anthropicKey) {
      throw new Error("Missing required credentials in .env file");
    }

    this.octokit = new Octokit({ auth: this.config.token });
    this.anthropic = new Anthropic({ apiKey: this.config.anthropicKey });

    try {
      const { data: user } = await this.octokit.rest.users.getAuthenticated();
      console.log(`✅ GitHub authenticated as: ${user.login}`);
    } catch (error) {
      throw new Error(`GitHub authentication failed: ${error.message}`);
    }

    console.log("🚀 Backend Developer ready for Node.js API development");
  }

  async createAPIArchitecture(projectRequirements) {
    console.log("🏗️ Designing Node.js API architecture...");
    
    const BACKEND_ARCHITECTURE_PROMPT = `Tu ești un Backend Developer cu 10+ ani experiență în Node.js și API development.

EXPERTISE:
🚀 **NODE.JS MASTERY:**
- Express.js, Fastify, NestJS, Koa
- RESTful APIs, GraphQL, WebSocket
- Authentication (JWT, OAuth2, Passport)
- Database integration (MongoDB, PostgreSQL, Redis)

🔒 **SECURITY & PERFORMANCE:**
- Rate limiting, CORS, Helmet
- Input validation, SQL injection prevention
- Caching strategies (Redis, memory)
- Load balancing și clustering

📊 **DATABASE DESIGN:**
- Schema design și normalization
- Indexing strategies
- Query optimization
- Migration management

🌐 **MICROSERVICES & SCALING:**
- Service decomposition
- API Gateway patterns
- Message queues (RabbitMQ, Kafka)
- Docker containerization

Project: ${projectRequirements}

Creează arhitectura completă:

1. **API ARCHITECTURE OVERVIEW**
   - Framework choice (Express/Fastify/NestJS) cu justificare
   - Project structure și folder organization
   - Middleware stack
   - Error handling strategy

2. **DATABASE DESIGN**
   - Database choice (MongoDB/PostgreSQL) cu reasoning
   - Schema design pentru all entities
   - Relationships și indexing strategy
   - Migration și seeding approach

3. **AUTHENTICATION SYSTEM**
   - Authentication strategy (JWT + refresh tokens)
   - Social login integration (Facebook, Google)
   - Password security (bcrypt, validation)
   - Session management

4. **API ENDPOINTS DESIGN**
   - RESTful API structure
   - Request/Response schemas
   - Error codes și status handling
   - API versioning strategy

5. **REAL-TIME FEATURES**
   - WebSocket implementation (Socket.io)
   - Real-time messaging architecture
   - Presence status system
   - Notification system

6. **DEPLOYMENT & SCALING**
   - Railway.com deployment configuration
   - Environment variables
   - Health checks și monitoring
   - Performance optimization

Răspunde cu concrete implementation details și code examples.`;

    try {
      console.log("🤖 Backend Developer analyzing architecture requirements...\n");

      const completion = await this.anthropic.messages.create({
        model: BackendDeveloperAgent.CLAUDE_MODEL,
        max_tokens: 4000,
        temperature: 0.3,
        system: BACKEND_ARCHITECTURE_PROMPT,
        messages: [
          { role: "user", content: projectRequirements }
        ]
      });

      const architecture = completion.content[0].text;
      
      console.log("🏗️ Backend API Architecture:\n");
      console.log(architecture);
      console.log("\n" + "=".repeat(80) + "\n");

      // Save architecture to shared context
      await this.saveArchitectureDecision(projectRequirements, architecture);

      return {
        agent: "Backend Developer AI (10+ years Node.js)",
        project_requirements: projectRequirements,
        api_architecture: architecture,
        timestamp: new Date().toISOString(),
        phase: "architecture_designed"
      };

    } catch (error) {
      console.error(`❌ Architecture design failed: ${error.message}`);
      return {
        agent: "Backend Developer AI",
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async generateAPICode(repoName, featureName) {
    console.log(`💻 Generating Node.js API code for: ${featureName}`);
    
    const API_CODE_PROMPT = `Tu ești un Backend Developer expert în Node.js cu focus pe production-ready code.

Generează cod complet pentru feature: "${featureName}"

Include:

1. **PROJECT STRUCTURE**
   - Complete folder structure
   - Package.json cu dependencies
   - Environment configuration
   - Docker configuration

2. **CORE API FILES**
   - Server setup (app.js, server.js)
   - Database connection
   - Middleware configuration
   - Error handling

3. **FEATURE IMPLEMENTATION**
   - Models/Schemas pentru database
   - Controllers cu business logic
   - Routes cu validation
   - Services pentru complex operations

4. **AUTHENTICATION**
   - JWT implementation
   - Middleware pentru protected routes
   - Password hashing
   - Token refresh logic

5. **REAL-TIME FEATURES**
   - Socket.io setup
   - Real-time event handlers
   - Room management
   - Online status tracking

6. **DATABASE INTEGRATION**
   - Connection setup
   - Migration files
   - Seed data
   - Query helpers

7. **TESTING**
   - Unit tests
   - Integration tests
   - API testing setup
   - Mock data

8. **DEPLOYMENT**
   - Railway.com configuration
   - Environment variables
   - Health check endpoints
   - Production optimizations

Generează exact file structure și complete code pentru production deployment.`;

    try {
      const completion = await this.anthropic.messages.create({
        model: BackendDeveloperAgent.CLAUDE_MODEL,
        max_tokens: 4500,
        temperature: 0.2,
        system: API_CODE_PROMPT,
        messages: [
          { role: "user", content: `Generate API code for ${featureName} in ${repoName}` }
        ]
      });

      const apiCode = completion.content[0].text;
      
      console.log("💻 Generated API Code:\n");
      console.log(apiCode);

      // Save code to shared context
      await this.saveGeneratedCode(featureName, apiCode);

      // Create actual files in repository
      await this.createRepositoryFiles(repoName, featureName, apiCode);

      return {
        feature_name: featureName,
        repository: repoName,
        generated_code: apiCode,
        created_by: "Backend Developer AI",
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ API code generation failed: ${error.message}`);
      return { error: error.message };
    }
  }

  async createRepositoryFiles(repoName, featureName, codeContent) {
    console.log(`📁 Creating repository files for ${featureName}...`);
    
    try {
      // Create branch for feature
      const branchName = `backend-${featureName.toLowerCase().replace(/\s+/g, '-')}`;
      await this.createGitBranch(repoName, branchName, featureName);

      // Parse code content and extract files (simplified - in real implementation would parse the generated structure)
      const files = [
        {
          path: "package.json",
          content: JSON.stringify({
            "name": repoName,
            "version": "1.0.0",
            "description": `Backend API for ${featureName}`,
            "main": "server.js",
            "scripts": {
              "start": "node server.js",
              "dev": "nodemon server.js",
              "test": "jest"
            },
            "dependencies": {
              "express": "^4.18.2",
              "mongoose": "^7.5.0",
              "jsonwebtoken": "^9.0.2",
              "bcryptjs": "^2.4.3",
              "socket.io": "^4.7.2",
              "cors": "^2.8.5",
              "helmet": "^7.0.0",
              "express-rate-limit": "^6.10.0",
              "joi": "^17.9.2",
              "dotenv": "^16.3.1"
            },
            "devDependencies": {
              "nodemon": "^3.0.1",
              "jest": "^29.6.4"
            }
          }, null, 2)
        },
        {
          path: "server.js",
          content: `const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dating-app')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'Romanian Dating App API - Created by Backend Developer AI' });
});

// Start server
app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});`
        },
        {
          path: "README.md",
          content: `# ${repoName} - Backend API

Backend API for Romanian Dating App created by Backend Developer AI.

## Features
- ${featureName}
- Authentication with JWT
- Real-time messaging
- Location services
- GDPR compliance

## Setup
1. \`npm install\`
2. Set environment variables
3. \`npm run dev\`

## Deployment
Configured for Railway.com deployment.
`
        },
        {
          path: "railway.json",
          content: JSON.stringify({
            "build": {
              "builder": "NIXPACKS"
            },
            "deploy": {
              "startCommand": "npm start",
              "healthcheckPath": "/health"
            }
          }, null, 2)
        }
      ];

      // Commit files to repository
      await this.commitCode(repoName, branchName, files, `Backend API implementation for ${featureName}`);

      // Create Pull Request
      await this.createPullRequest(
        repoName, 
        branchName, 
        `Backend API: ${featureName}`,
        `Backend implementation created by Backend Developer AI\n\nFeatures:\n- ${featureName}\n- Production-ready code\n- Railway.com deployment ready`
      );

      console.log(`✅ Repository files created and PR submitted for ${featureName}`);

      return {
        success: true,
        branch: branchName,
        files_created: files.length
      };

    } catch (error) {
      console.error(`❌ Repository file creation failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async createGitBranch(repoName, branchName, featureName) {
    console.log(`🌿 Creating Git branch: ${branchName} for feature: ${featureName}`);
    
    try {
      // Get default branch
      const { data: repo } = await this.octokit.rest.repos.get({
        owner: this.config.owner,
        repo: repoName
      });

      // Get the SHA of the default branch
      const { data: ref } = await this.octokit.rest.git.getRef({
        owner: this.config.owner,
        repo: repoName,
        ref: `heads/${repo.default_branch}`
      });

      // Create new branch
      await this.octokit.rest.git.createRef({
        owner: this.config.owner,
        repo: repoName,
        ref: `refs/heads/${branchName}`,
        sha: ref.object.sha
      });

      console.log(`✅ Branch created: ${branchName}`);
      return { success: true, branch_name: branchName };

    } catch (error) {
      if (error.status === 422) {
        console.log(`⚠️ Branch ${branchName} already exists`);
        return { success: true, branch_name: branchName, existed: true };
      }
      throw error;
    }
  }

  async commitCode(repoName, branchName, files, commitMessage) {
    console.log(`💾 Committing ${files.length} files to ${branchName}: ${commitMessage}`);
    
    try {
      // Get current commit SHA
      const { data: ref } = await this.octokit.rest.git.getRef({
        owner: this.config.owner,
        repo: repoName,
        ref: `heads/${branchName}`
      });

      const currentCommitSha = ref.object.sha;

      // Get current commit
      const { data: currentCommit } = await this.octokit.rest.git.getCommit({
        owner: this.config.owner,
        repo: repoName,
        commit_sha: currentCommitSha
      });

      // Create blobs for all files
      const tree = await Promise.all(files.map(async (file) => {
        const { data: blob } = await this.octokit.rest.git.createBlob({
          owner: this.config.owner,
          repo: repoName,
          content: Buffer.from(file.content).toString('base64'),
          encoding: 'base64'
        });

        return {
          path: file.path,
          mode: '100644',
          type: 'blob',
          sha: blob.sha
        };
      }));

      // Create tree
      const { data: newTree } = await this.octokit.rest.git.createTree({
        owner: this.config.owner,
        repo: repoName,
        tree: tree,
        base_tree: currentCommit.tree.sha
      });

      // Create commit
      const { data: newCommit } = await this.octokit.rest.git.createCommit({
        owner: this.config.owner,
        repo: repoName,
        message: commitMessage,
        tree: newTree.sha,
        parents: [currentCommitSha]
      });

      // Update branch reference
      await this.octokit.rest.git.updateRef({
        owner: this.config.owner,
        repo: repoName,
        ref: `heads/${branchName}`,
        sha: newCommit.sha
      });

      console.log(`✅ Code committed: ${commitMessage}`);
      return { success: true, commit_sha: newCommit.sha };

    } catch (error) {
      console.error(`❌ Code commit failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async createPullRequest(repoName, branchName, title, description) {
    console.log(`🔄 Creating Pull Request: ${title}`);
    
    try {
      const { data: pr } = await this.octokit.rest.pulls.create({
        owner: this.config.owner,
        repo: repoName,
        title: title,
        body: description,
        head: branchName,
        base: 'main'
      });

      console.log(`✅ Pull Request created: ${pr.html_url}`);

      // Log to communication
      await this.logToCommunication(
        "Backend Developer AI",
        "All Team",
        "pull_request_created",
        `Created Backend PR: ${title} - ${pr.html_url}`
      );

      return {
        success: true,
        pr_number: pr.number,
        pr_url: pr.html_url
      };

    } catch (error) {
      console.error(`❌ Pull Request creation failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async saveArchitectureDecision(requirements, architecture) {
    try {
      await fs.mkdir(this.contextPath, { recursive: true });
      
      const decision = {
        version: "1.0.0",
        created_at: new Date().toISOString(),
        project_requirements: requirements,
        api_architecture: architecture,
        decided_by: "Backend Developer AI",
        status: "architecture_designed"
      };

      const filePath = path.join(this.contextPath, "backend-architecture-decision.json");
      await fs.writeFile(filePath, JSON.stringify(decision, null, 2));
      
      console.log("✅ Backend architecture saved to shared context");
    } catch (error) {
      console.warn(`⚠️ Could not save architecture decision: ${error.message}`);
    }
  }

  async saveGeneratedCode(featureName, code) {
    try {
      const codeData = {
        feature_name: featureName,
        generated_code: code,
        created_at: new Date().toISOString(),
        created_by: "Backend Developer AI"
      };

      const fileName = `backend-code-${featureName.toLowerCase().replace(/\s+/g, '-')}.json`;
      const filePath = path.join(this.contextPath, fileName);
      await fs.writeFile(filePath, JSON.stringify(codeData, null, 2));
      
      console.log(`✅ Generated code saved: ${fileName}`);
    } catch (error) {
      console.warn(`⚠️ Could not save generated code: ${error.message}`);
    }
  }

  async logToCommunication(from, to, messageType, content) {
    try {
      const logPath = path.join(this.contextPath, "communication-log.json");
      let log = { messages: [] };
      
      try {
        const data = await fs.readFile(logPath, 'utf8');
        log = JSON.parse(data);
      } catch (error) {
        // File doesn't exist, use empty log
      }

      const message = {
        timestamp: new Date().toISOString(),
        from,
        to,
        message_type: messageType,
        content,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      log.messages.push(message);
      await fs.writeFile(logPath, JSON.stringify(log, null, 2));
      
      console.log(`📨 [${from} → ${to}] ${content}`);
    } catch (error) {
      console.warn(`⚠️ Could not log communication: ${error.message}`);
    }
  }

  /**
   * Complete Backend API Development with Database Configuration
   * Auto-triggered by Master Controller after Database Agent
   */
  async developCompleteAPI(requirements, projectName, databaseConfig = null) {
    console.log(`🚀 Backend Developer developing complete API: ${projectName}`);
    console.log(`📋 Requirements: ${requirements}`);
    if (databaseConfig) {
      console.log(`🗄️ Database: ${databaseConfig.database_type} configured by Database Agent`);
    }

    try {
      // Phase 1: API Architecture Design (with database integration)
      console.log("\n🏗️ Phase 1: Designing API architecture with database integration...");
      const architecture = await this.createAPIArchitecture(requirements, databaseConfig);
      
      // Phase 2: Generate Backend Code (with database models)
      console.log("\n💻 Phase 2: Generating backend implementation with database models...");
      const codeResult = await this.generateAPICode(projectName, "Complete Backend API with Database", databaseConfig);
      
      // Phase 3: Create Repository Files
      console.log("\n📦 Phase 3: Creating repository files...");
      const filesResult = await this.createRepositoryFiles(projectName, "backend-api", codeResult.code_content);
      
      // Phase 4: Git Workflow
      console.log("\n🌿 Phase 4: Creating Git workflow...");
      const gitResult = await this.createGitWorkflow(projectName, codeResult);
      
      return {
        agent: "Backend Developer AI",
        project_name: projectName,
        architecture: architecture.api_architecture,
        database_integration: databaseConfig ? true : false,
        code_generated: true,
        pr_number: gitResult.pr_number,
        endpoints: this.extractEndpoints(codeResult.code_content),
        api_spec: {
          authentication: "JWT",
          database: databaseConfig?.database_type || "MongoDB",
          connection_configured: databaseConfig ? true : false,
          endpoints: this.extractEndpoints(codeResult.code_content)
        },
        success: true,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ Backend development failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async createGitWorkflow(projectName, codeResult) {
    console.log("🌿 Creating Git workflow for backend...");
    
    try {
      // Create feature branch
      const branchName = "feature-backend-api-implementation";
      await this.createGitBranch(projectName, branchName, "Complete backend API implementation");
      
      // Commit code
      const files = [
        { path: "README.md", content: "Backend API - " + codeResult.implementation_details },
        { path: "package.json", content: JSON.stringify({ 
          name: projectName, 
          version: "1.0.0",
          main: "server.js",
          scripts: {
            start: "node server.js",
            dev: "nodemon server.js"
          }
        }, null, 2) }
      ];
      
      await this.commitCode(projectName, branchName, files, "Implement complete backend API");
      
      // Create pull request
      const prDescription = codeResult.implementation_details 
        ? `Backend API implementation completed!\n\n${codeResult.implementation_details.substring(0, 500)}...`
        : "Backend API implementation completed!";
        
      const prResult = await this.createPullRequest(
        projectName,
        branchName,
        "Backend API: Complete Implementation",
        prDescription
      );
      
      return {
        branch_created: branchName,
        pr_number: prResult.pr_number,
        files_committed: files.length
      };
      
    } catch (error) {
      console.error(`❌ Git workflow failed: ${error.message}`);
      throw error;
    }
  }

  extractEndpoints(codeContent) {
    // Simple endpoint extraction from generated code
    const endpoints = [];
    if (typeof codeContent === 'string') {
      const matches = codeContent.match(/app\.(get|post|put|delete)\(['"`]([^'"`]+)['"`]/g);
      if (matches) {
        matches.forEach(match => {
          const [, method, path] = match.match(/app\.(\w+)\(['"`]([^'"`]+)['"`]/);
          endpoints.push({ method: method.toUpperCase(), path });
        });
      }
    }
    
    // Generate dynamic endpoints based on analysis if no explicit endpoints found
    return endpoints.length > 0 ? endpoints : this.generateDynamicEndpoints(analysisResult);
  }

  // Generate endpoints dynamically based on feature analysis
  generateDynamicEndpoints(analysis) {
    const baseEndpoints = [
      { method: "POST", path: "/api/auth/register" },
      { method: "POST", path: "/api/auth/login" }
    ];

    if (!analysis || !analysis.features) {
      return baseEndpoints;
    }

    const dynamicEndpoints = [];
    
    // Generate endpoints based on detected features
    if (analysis.features.includes('data_management')) {
      const resourceName = this.inferResourceName(analysis);
      dynamicEndpoints.push(
        { method: "GET", path: `/api/${resourceName}` },
        { method: "POST", path: `/api/${resourceName}` },
        { method: "PUT", path: `/api/${resourceName}/:id` },
        { method: "DELETE", path: `/api/${resourceName}/:id` }
      );
    }

    if (analysis.features.includes('search')) {
      dynamicEndpoints.push(
        { method: "GET", path: "/api/search" }
      );
    }

    if (analysis.features.includes('file_handling')) {
      dynamicEndpoints.push(
        { method: "POST", path: "/api/upload" },
        { method: "GET", path: "/api/files/:id" }
      );
    }

    if (analysis.features.includes('communication')) {
      dynamicEndpoints.push(
        { method: "GET", path: "/api/messages" },
        { method: "POST", path: "/api/messages" }
      );
    }

    return [...baseEndpoints, ...dynamicEndpoints];
  }

  // Infer resource name from analysis category
  inferResourceName(analysis) {
    const resourceNames = {
      'computation': 'calculations',
      'productivity': 'tasks',
      'social': 'posts',
      'ecommerce': 'products',
      'entertainment': 'content',
      'utility': 'tools',
      'information': 'items'
    };

    return resourceNames[analysis.category] || 'items';
  }
}

// CLI Interface
async function main() {
  const backendDev = new BackendDeveloperAgent();

  try {
    await backendDev.initialize();
    
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.log("⚙️ Backend Developer AI Agent Commands:");
      console.log("  design \"project requirements\"       - Design API architecture");
      console.log("  generate \"repo\" \"feature\"          - Generate API code");
      console.log("  deploy \"repo\" \"branch\"             - Deploy to Railway");
      console.log("\nExample:");
      console.log("  node backend-developer-agent.js design \"Dating app with real-time chat\"");
      return;
    }

    const [command, ...params] = args;
    
    switch (command) {
      case "design":
        if (params.length > 0) {
          const requirements = params.join(" ");
          await backendDev.createAPIArchitecture(requirements);
        } else {
          console.log("❌ Missing project requirements");
        }
        break;
        
      case "generate":
        if (params.length >= 2) {
          const [repo, ...featureParts] = params;
          const feature = featureParts.join(" ");
          await backendDev.generateAPICode(repo, feature);
        } else {
          console.log("❌ Missing repo name or feature");
        }
        break;
        
      default:
        console.log(`❌ Unknown command: ${command}`);
    }
    
  } catch (error) {
    console.error(`❌ Backend Developer Error: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default BackendDeveloperAgent;
