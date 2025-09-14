#!/usr/bin/env node

/**
 * DevOps AI Agent - Advanced Infrastructure & Deployment Expert
 * 10+ years DevOps experience: GitHub, CI/CD, Cloud Architecture, Monitoring, Security
 */

import { Octokit } from "@octokit/rest";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import readline from "readline";
import fs from "fs/promises";
import path from "path";

dotenv.config();

class DevOpsAgent {
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
    console.log("🤖 DevOps AI Agent (10+ years experience) initializing...");
    
    if (!this.config.token) {
      throw new Error("GitHub token not found. Please set GITHUB_TOKEN environment variable.");
    }

    if (!this.config.anthropicKey) {
      throw new Error("Anthropic API key not found. Please set ANTHROPIC_API_KEY environment variable.");
    }

    // Initialize GitHub client
    this.octokit = new Octokit({
      auth: this.config.token,
    });

    // Initialize Anthropic client
    this.anthropic = new Anthropic({
      apiKey: this.config.anthropicKey,
    });

    // Verify authentication
    try {
      const { data: user } = await this.octokit.rest.users.getAuthenticated();
      console.log(`✅ GitHub authenticated as: ${user.login}`);
      this.config.owner = user.login;
    } catch (error) {
    }
  }

  /**
   * DevOps Expert Consultation - 10+ years experience
   * Infrastructure, Cloud Native, CI/CD, Security, Monitoring, Cost Optimization
   */
  async consultDevOps(request) {
    // 🎯 AUTO-DETECT și EXECUTE acțiuni
    const lowerRequest = request.toLowerCase();
    const createKeywords = ['creeaza', 'creează', 'create', 'genereaza', 'generează', 'fă', 'fa'];
    const repoKeywords = ['repo', 'repository', 'repositoriu', 'depozit'];
    
    // Detectează cereri de creare repository
    const shouldCreateRepo = createKeywords.some(keyword => lowerRequest.includes(keyword)) && 
                             repoKeywords.some(keyword => lowerRequest.includes(keyword));
    
    if (shouldCreateRepo) {
      console.log("🎯 Auto-detectat: Cerere de CREARE REPOSITORY!");
      console.log("⚡ Execut automat acțiunea...\n");
      
      // Extrage nume sugerit sau generează unul
      let repoName;
      const suggestedNames = [
        'romanian-dating-ai-agents-team',
        'dating-app-devops-infrastructure', 
        'ai-team-romanian-dating-platform',
        'love-connect-romania-infrastructure',
        'cupid-tech-agents-team',
        'romanian-hearts-devops-stack'
      ];
      
      // Folosește primul nume sugerit ca default
      repoName = suggestedNames[0];
      
      try {
        console.log(`🚀 Creez repository: ${repoName}`);
        
        const repo = await this.createRepository({
          name: repoName,
          description: "🤖 AI Agents Team pentru aplicație românească de dating cu location services și DevOps automation",
          private: false
        });
        
        console.log(`✅ Repository creat cu succes: ${repo.html_url}`);
        
        console.log("\n🤖 Configurez echipa de AI agents...");
        await this.setupAITeam(repoName);
        
        console.log("\n🎉 GATA! Repository-ul și echipa de AI agents sunt configurate!");
        console.log(`🔗 Acces direct: ${repo.html_url}`);
        
        return {
          action: "repository_created",
          repository: repo,
          agent: "DevOps Expert - Auto Execution",
          request: request,
          success: true,
          timestamp: new Date().toISOString()
        };
        
      } catch (error) {
        console.error(`❌ Eroare la crearea repository: ${error.message}`);
        // Continuă cu consultația normală dacă crearea eșuează
      }
    }

    // Consultație normală DevOps
    const EXPERT_DEVOPS_PROMPT = `Tu ești un DevOps Engineer cu 10+ ani experiență în:

🏗️ **INFRASTRUCTURE & CLOUD NATIVE:**
- AWS/GCP/Azure: EC2, Lambda, EKS, GKE, AKS, CloudFormation, Terraform
- Kubernetes: Deployments, Services, Ingress, Helm Charts, Operators
- Docker: Multi-stage builds, optimization, security scanning
- Microservices architecture și service mesh (Istio, Linkerd)

🚀 **CI/CD MASTERY:**
- GitHub Actions, GitLab CI, Jenkins, CircleCI
- GitOps cu ArgoCD, Flux
- Pipeline optimization și parallel execution
- Blue-green, canary, rolling deployments
- Feature flags și progressive delivery

🔒 **SECURITY & COMPLIANCE:**
- Infrastructure as Code security (Checkov, Terrascan)
- Container security (Trivy, Falco, OPA Gatekeeper)
- Secrets management (Vault, AWS Secrets Manager)
- RBAC, OAuth2, OIDC integration
- Compliance frameworks (SOC2, ISO27001, GDPR)

📊 **OBSERVABILITY & MONITORING:**
- Prometheus, Grafana, AlertManager
- ELK/EFK stack, Jaeger tracing
- APM tools (DataDog, New Relic, Dynatrace)
- SLI/SLO definition și error budgets
- Incident response și postmortem culture

💰 **COST OPTIMIZATION:**
- Resource rightsizing și autoscaling
- Spot instances, reserved capacity planning
- FinOps practices și cost allocation
- Multi-cloud cost optimization

🔄 **DISASTER RECOVERY:**
- Backup strategies și RTO/RPO planning
- Multi-region architecture
- Database replication și failover
- Business continuity planning

Pentru aplicația de dating românească cu location sharing, răspunde ca senior DevOps cu focus pe:
- Scalabilitate pentru 100K+ users
- Real-time messaging infrastructure  
- Location services availability
- GDPR compliance pentru România
- Cost-effective solution pentru startup

Format răspuns:
**🎯 Analysis & Recommendations**
**🏗️ Infrastructure Design** 
**🚀 CI/CD Strategy**
**🔒 Security Implementation**
**📊 Monitoring & Alerting**
**💰 Cost Optimization**
**⚡ Performance Tuning**
**🔄 Disaster Recovery**
**📋 Implementation Timeline**`;

    try {
      console.log("🤖 DevOps Expert analyzing your request...\n");

      const completion = await this.anthropic.messages.create({
        model: DevOpsAgent.CLAUDE_MODEL,
        max_tokens: 2000,
        temperature: 0.3,
        system: EXPERT_DEVOPS_PROMPT,
        messages: [
          { role: "user", content: request }
        ]
      });

      const response = completion.content[0].text;
      
      console.log("💡 DevOps Expert Consultation:\n");
      console.log(response);
      console.log("\n" + "=".repeat(80) + "\n");

      return {
        agent: "DevOps Expert (10+ years)",
        request: request,
        response: response,
        timestamp: new Date().toISOString(),
        expertise: [
          "Infrastructure as Code", 
          "Kubernetes & Cloud Native",
          "CI/CD & GitOps",
          "Security & Compliance", 
          "Observability & Monitoring",
          "Cost Optimization",
          "Disaster Recovery"
        ]
      };
    } catch (error) {
      console.error(`❌ DevOps consultation failed: ${error.message}`);
      return {
        agent: "DevOps Expert",
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async mergePullRequest(repoName, prNumber, commitTitle = "Auto-merge by DevOps AI") {
    console.log(`🔄 Merging Pull Request #${prNumber} in ${repoName}...`);
    
    try {
      // Get PR details
      const { data: pr } = await this.octokit.rest.pulls.get({
        owner: this.config.owner,
        repo: repoName,
        pull_number: prNumber
      });

      console.log(`📋 PR: ${pr.title}`);
      console.log(`🌿 Merging ${pr.head.ref} → ${pr.base.ref}`);

      // Check if PR is mergeable
      if (pr.mergeable === false) {
        throw new Error(`PR #${prNumber} has merge conflicts`);
      }

      // Merge the PR
      const { data: merge } = await this.octokit.rest.pulls.merge({
        owner: this.config.owner,
        repo: repoName,
        pull_number: prNumber,
        commit_title: commitTitle,
        merge_method: "squash" // Use squash merge for cleaner history
      });

      console.log(`✅ PR merged successfully: ${merge.sha}`);
      
      // Log to communication
      await this.logToCommunication(
        "DevOps AI",
        "All Team",
        "pr_merged",
        `Merged PR #${prNumber}: ${pr.title}. SHA: ${merge.sha}`
      );

      // Trigger Railway deployment after successful merge
      if (pr.base.ref === 'main' || pr.base.ref === 'master') {
        console.log("🚀 Triggering Railway deployment...");
        await this.deployToRailway(repoName, merge.sha);
      }

      return {
        success: true,
        merge_sha: merge.sha,
        pr_number: prNumber,
        deployed: true
      };

    } catch (error) {
      console.error(`❌ PR merge failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deployToRailway(repoName, commitSha) {
    console.log(`🚀 Deploying ${repoName} to Railway.com...`);
    
    try {
      // Railway deployment via GitHub integration
      // Railway automatically deploys when code is pushed to main branch
      console.log("📡 Railway will auto-deploy from GitHub integration");
      console.log(`🎯 Deployment triggered for commit: ${commitSha}`);
      
      // Create Railway configuration if not exists
      await this.createRailwayConfig(repoName);
      
      // Log deployment to communication
      await this.logToCommunication(
        "DevOps AI",
        "All Team", 
        "deployment_triggered",
        `Railway deployment triggered for ${repoName}. Commit: ${commitSha}`
      );

      return {
        success: true,
        platform: "Railway.com",
        commit_sha: commitSha,
        deployment_method: "GitHub integration"
      };

    } catch (error) {
      console.error(`❌ Railway deployment failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async createRailwayConfig(repoName) {
    console.log("⚙️ Creating Railway configuration...");
    
    const railwayConfig = {
      "version": 2,
      "builds": [
        {
          "src": "package.json",
          "use": "@vercel/node"
        }
      ],
      "routes": [
        {
          "src": "/(.*)",
          "dest": "/index.js"
        }
      ]
    };

    const packageJsonConfig = {
      "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "build": "echo 'No build step required'"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    };

    try {
      // Check if railway.json exists
      try {
        await this.octokit.rest.repos.getContent({
          owner: this.config.owner,
          repo: repoName,
          path: "railway.json"
        });
        console.log("✅ Railway config already exists");
      } catch (error) {
        if (error.status === 404) {
          // Create railway.json
          await this.octokit.rest.repos.createOrUpdateFileContents({
            owner: this.config.owner,
            repo: repoName,
            path: "railway.json",
            message: "Add Railway deployment configuration",
            content: Buffer.from(JSON.stringify(railwayConfig, null, 2)).toString("base64")
          });
          console.log("✅ Railway configuration created");
        }
      }

      return {
        success: true,
        config_created: true
      };

    } catch (error) {
      console.warn(`⚠️ Could not create Railway config: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async monitorDeployment(repoName, deploymentId = null) {
    console.log(`📊 Monitoring deployment for ${repoName}...`);
    
    try {
      // Check GitHub deployments
      const { data: deployments } = await this.octokit.rest.repos.listDeployments({
        owner: this.config.owner,
        repo: repoName,
        per_page: 5
      });

      if (deployments.length > 0) {
        const latestDeployment = deployments[0];
        
        // Get deployment status
        const { data: statuses } = await this.octokit.rest.repos.listDeploymentStatuses({
          owner: this.config.owner,
          repo: repoName,
          deployment_id: latestDeployment.id
        });

        const latestStatus = statuses[0];
        
        console.log(`🎯 Latest Deployment:`);
        console.log(`   ID: ${latestDeployment.id}`);
        console.log(`   SHA: ${latestDeployment.sha.substring(0, 7)}`);
        console.log(`   Environment: ${latestDeployment.environment}`);
        console.log(`   Status: ${latestStatus?.state || 'unknown'}`);
        
        if (latestStatus?.target_url) {
          console.log(`   URL: ${latestStatus.target_url}`);
        }

        return {
          deployment_id: latestDeployment.id,
          status: latestStatus?.state || 'unknown',
          url: latestStatus?.target_url,
          sha: latestDeployment.sha
        };
      } else {
        console.log("📭 No deployments found");
        return {
          deployment_id: null,
          status: 'no_deployments'
        };
      }

    } catch (error) {
      console.error(`❌ Deployment monitoring failed: ${error.message}`);
      return {
        error: error.message
      };
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

  async automatedWorkflow(repoName, prNumber) {
    console.log(`🤖 Starting automated DevOps workflow for ${repoName}...`);
    
    try {
      // Step 1: Merge the PR
      console.log("🔄 Step 1: Merging Pull Request...");
      const mergeResult = await this.mergePullRequest(repoName, prNumber);
      
      if (!mergeResult.success) {
        throw new Error(`PR merge failed: ${mergeResult.error}`);
      }

      // Step 2: Monitor deployment
      console.log("📊 Step 2: Monitoring deployment...");
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      const deploymentStatus = await this.monitorDeployment(repoName);

      // Step 3: Log completion
      await this.logToCommunication(
        "DevOps AI",
        "All Team",
        "workflow_completed",
        `Automated workflow completed for ${repoName}. PR #${prNumber} merged and deployed.`
      );

      console.log("✅ Automated DevOps workflow completed successfully!");

      return {
        success: true,
        merge_result: mergeResult,
        deployment_status: deploymentStatus,
        workflow_completed: true
      };

    } catch (error) {
      console.error(`❌ Automated workflow failed: ${error.message}`);
      
      await this.logToCommunication(
        "DevOps AI",
        "All Team",
        "workflow_failed", 
        `Automated workflow failed for ${repoName}: ${error.message}`
      );

      return {
        success: false,
        error: error.message
      };
    }
  }

  async createRepository(repoConfig) {
    console.log(`🚀 Creating repository: ${repoConfig.name}`);

    try {
      const { data: repo } = await this.octokit.rest.repos.createForAuthenticatedUser({
        name: repoConfig.name,
        description: repoConfig.description,
        private: repoConfig.private || false,
        auto_init: true,
        gitignore_template: repoConfig.gitignore || "Node",
        license_template: repoConfig.license || "mit",
      });

      console.log(`✅ Repository created: ${repo.html_url}`);
      return repo;
    } catch (error) {
      if (error.status === 422) {
        throw new Error(`Repository '${repoConfig.name}' already exists`);
      }
      throw new Error(`Failed to create repository: ${error.message}`);
    }
  }

  async setupProjectStructure(repoName, structure) {
    console.log("📁 Setting up project structure...");

    for (const item of structure) {
      try {
        if (item.type === "file") {
          await this.createFile(repoName, item.path, item.content, item.message);
        } else if (item.type === "directory") {
          await this.createFile(repoName, `${item.path}/.gitkeep`, "", `Create ${item.path} directory`);
        }
      } catch (error) {
        console.warn(`⚠️ Warning: Could not create ${item.path}: ${error.message}`);
      }
    }

    console.log("✅ Project structure setup complete");
  }

  async createFile(repoName, path, content, message) {
    await this.octokit.rest.repos.createOrUpdateFileContents({
      owner: this.config.owner,
      repo: repoName,
      path: path,
      message: message || `Add ${path}`,
      content: Buffer.from(content).toString("base64"),
    });
  }

  async setupAITeam(repoName) {
    console.log("🤖 Setting up AI agent team...");

    const aiAgentStructure = [
      {
        type: "directory",
        path: "agents",
      },
      {
        type: "file",
        path: "agents/product-owner.js",
        content: this.getProductOwnerAgent(),
        message: "Add Product Owner AI agent",
      },
      {
        type: "file",
        path: "agents/frontend-developer.js",
        content: this.getFrontendDeveloperAgent(),
        message: "Add Frontend Developer AI agent",
      },
      {
        type: "file",
        path: "agents/backend-developer.js",
        content: this.getBackendDeveloperAgent(),
        message: "Add Backend Developer AI agent",
      },
      {
        type: "file",
        path: "agents/solution-architect.js",
        content: this.getSolutionArchitectAgent(),
        message: "Add Solution Architect AI agent",
      },
      {
        type: "file",
        path: "agents/marketing-agent.js",
        content: this.getMarketingAgent(),
        message: "Add Marketing AI agent",
      },
      {
        type: "file",
        path: "agents/devops-agent.js",
        content: this.getDevOpsAgent(),
        message: "Add DevOps AI agent",
      },
      {
        type: "file",
        path: "config/agents.json",
        content: JSON.stringify(this.getAgentConfig(), null, 2),
        message: "Add agent configuration",
      },
      {
        type: "file",
        path: "scripts/run-agent.js",
        content: this.getAgentRunner(),
        message: "Add agent runner script",
      },
      {
        type: "file",
        path: "package.json",
        content: JSON.stringify(this.getPackageJson(repoName), null, 2),
        message: "Add package.json",
      },
      {
        type: "file",
        path: ".env.example",
        content: this.getEnvExample(),
        message: "Add environment variables example",
      },
      {
        type: "file",
        path: "README.md",
        content: this.getReadme(repoName),
        message: "Add project README",
      },
    ];

    await this.setupProjectStructure(repoName, aiAgentStructure);
  }

  getProductOwnerAgent() {
    return `/**
 * Product Owner AI Agent
 * Handles requirements, user stories, and feature prioritization
 */

import Anthropic from '@anthropic-ai/sdk';

const PRODUCT_OWNER_PROMPT = \`Tu ești Product Owner pentru aplicația de dating românească cu location sharing.

Nume aplicație: DateSpot România
Target: 18-35 ani, urban professionals din România

Responsabilități:
- Definești feature requirements și user stories
- Prioritizezi backlog-ul 
- Validezi UX/UI decisions
- Analizezi metrics și user feedback
- Faci competitive analysis

Răspunde mereu ca PM cu 5+ ani experiență în dating apps.
Păstrează focus pe piața românească și location features.

Pentru fiecare request, întreabă clarificări dacă e necesar.
Format răspunsuri cu:
- User Story
- Acceptance Criteria  
- Priority (High/Medium/Low)
- Timeline estimate
- Dependencies\`;

export class ProductOwnerAgent {
  static CLAUDE_MODEL = "claude-sonnet-4-20250514";
  
  constructor(apiKey) {
    this.anthropic = new Anthropic({ apiKey });
  }

  async processRequest(message) {
    try {
      const completion = await this.anthropic.messages.create({
        model: ProductOwnerAgent.CLAUDE_MODEL,
        max_tokens: 1000,
        temperature: 0.7,
        system: PRODUCT_OWNER_PROMPT,
        messages: [
          { role: "user", content: message }
        ]
      });

      return {
        agent: "Product Owner",
        response: completion.content[0].text,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        agent: "Product Owner", 
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}`;
  }

  getFrontendDeveloperAgent() {
    return `/**
 * Frontend Developer AI Agent
 * Handles React Native development and UI implementation
 */

import Anthropic from '@anthropic-ai/sdk';

const FRONTEND_DEVELOPER_PROMPT = \`Tu ești Senior Frontend Developer pentru aplicația de dating.

Tech stack:
- React Native pentru mobile
- TypeScript
- Redux pentru state management
- React Navigation
- Location services integration
- Real-time messaging cu Socket.io

Focus pe: UI/UX implementation, performance, smooth animations, location features

Pentru fiecare task:
1. Analizezi requirements de la Product Owner
2. Pui întrebări tehnice de clarificare
3. Propui soluții de implementare
4. Estimezi timpul de dezvoltare
5. Identifici riscuri și dependențe

Format răspunsuri:
- Technical Analysis
- Implementation Plan
- Code Examples (când e relevant)
- Testing Strategy
- Questions for PM
- Timeline Estimate\`;

export class FrontendDeveloperAgent {
  static CLAUDE_MODEL = "claude-sonnet-4-20250514";
  
  constructor(apiKey) {
    this.anthropic = new Anthropic({ apiKey });
  }

  async processRequest(message) {
    try {
      const completion = await this.anthropic.messages.create({
        model: FrontendDeveloperAgent.CLAUDE_MODEL,
        max_tokens: 1500,
        temperature: 0.3,
        system: FRONTEND_DEVELOPER_PROMPT,
        messages: [
          { role: "user", content: message }
        ]
      });

      return {
        agent: "Frontend Developer",
        response: completion.content[0].text,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        agent: "Frontend Developer",
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}`;
  }

  getBackendDeveloperAgent() {
    return `/**
 * Backend Developer AI Agent
 * Handles API development, database design, and server infrastructure
 */

import Anthropic from '@anthropic-ai/sdk';

const BACKEND_DEVELOPER_PROMPT = \`Tu ești Senior Backend Developer pentru aplicația de dating.

Tech stack:
- Node.js/Express sau Python/Django
- PostgreSQL database
- Redis pentru caching
- Socket.io pentru real-time messaging
- AWS/Firebase pentru infrastructure
- JWT authentication
- Cloudinary pentru image storage

Focus pe: APIs, authentication, real-time messaging, location services, scalability

Pentru fiecare task:
1. Analizezi requirements tehnice
2. Propui arhitectura API-urilor
3. Definești database schema
4. Planifici scalability
5. Identifici security considerations

Format răspunsuri:
- API Design
- Database Schema
- Security Considerations  
- Performance Optimization
- Integration Points
- Timeline Estimate\`;

export class BackendDeveloperAgent {
  static CLAUDE_MODEL = "claude-sonnet-4-20250514";
  
  constructor(apiKey) {
    this.anthropic = new Anthropic({ apiKey });
  }

  async processRequest(message) {
    try {
      const completion = await this.anthropic.messages.create({
        model: BackendDeveloperAgent.CLAUDE_MODEL,
        max_tokens: 1500,
        temperature: 0.3,
        system: BACKEND_DEVELOPER_PROMPT,
        messages: [
          { role: "user", content: message }
        ]
      });

      return {
        agent: "Backend Developer",
        response: completion.content[0].text,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        agent: "Backend Developer",
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}`;
  }

  getSolutionArchitectAgent() {
    return `/**
 * Solution Architect AI Agent
 * Handles system design, architecture decisions, and technical strategy
 */

import Anthropic from '@anthropic-ai/sdk';

const SOLUTION_ARCHITECT_PROMPT = \`Tu ești Solution Architect pentru aplicația de dating.

Responsabilități:
- System design și architecture decisions
- Microservices vs monolith decisions
- Database design și optimization
- API design patterns
- Performance și scalability planning
- Security architecture
- Technology stack decisions
- Integration patterns

Focus pe scalable, maintainable, secure architecture.

Pentru fiecare request:
1. Analizezi requirements de business și tehnice
2. Propui soluții arhitecturale
3. Evaluezi trade-offs
4. Documentezi decisions
5. Planifici evolution path

Format răspunsuri:
- Architecture Overview
- Technology Decisions
- Trade-offs Analysis
- Scalability Plan
- Security Considerations
- Implementation Phases\`;

export class SolutionArchitectAgent {
  static CLAUDE_MODEL = "claude-sonnet-4-20250514";
  
  constructor(apiKey) {
    this.anthropic = new Anthropic({ apiKey });
  }

  async processRequest(message) {
    try {
      const completion = await this.anthropic.messages.create({
        model: SolutionArchitectAgent.CLAUDE_MODEL,
        max_tokens: 1500,
        temperature: 0.4,
        system: SOLUTION_ARCHITECT_PROMPT,
        messages: [
          { role: "user", content: message }
        ]
      });

      return {
        agent: "Solution Architect",
        response: completion.content[0].text,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        agent: "Solution Architect",
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}`;
  }

  getMarketingAgent() {
    return `/**
 * Marketing AI Agent
 * Handles user acquisition, growth strategies, and marketing campaigns
 */

import OpenAI from 'openai';

const MARKETING_AGENT_PROMPT = \`Tu ești Marketing Manager pentru aplicația de dating românească.

Responsabilități:
- User acquisition strategy pentru România
- Social media campaigns (Instagram, TikTok, Facebook)
- Influencer partnerships cu content creators români
- ASO (App Store Optimization)
- Performance marketing și paid ads
- Growth hacking strategies
- Brand positioning și messaging

Target: 18-35 ani România, urban, tech-savvy, active pe social media

Pentru fiecare campanie:
1. Definești obiectivele și KPI-urile
2. Identifici target audience specific
3. Propui channels și tactics
4. Estimezi budget și ROI
5. Planifici timeline și milestones

Format răspunsuri:
- Campaign Strategy
- Target Audience
- Channels & Tactics
- Budget Breakdown
- Expected ROI
- Success Metrics\`;

export class MarketingAgent {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async processRequest(message) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: MARKETING_AGENT_PROMPT },
          { role: "user", content: message }
        ],
        max_tokens: 1200,
        temperature: 0.6
      });

      return {
        agent: "Marketing Manager",
        response: completion.choices[0].message.content,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        agent: "Marketing Manager",
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}`;
  }

  getDevOpsAgent() {
    return `/**
 * DevOps AI Agent - Expert cu 10+ ani experiență
 * Infrastructure, Cloud Native, CI/CD, Security, Monitoring, Cost Optimization
 */

import Anthropic from '@anthropic-ai/sdk';

const EXPERT_DEVOPS_PROMPT = \`Tu ești DevOps Engineer cu 10+ ani experiență în:

🏗️ **INFRASTRUCTURE & CLOUD NATIVE:**
- AWS/GCP/Azure: EC2, Lambda, EKS, GKE, AKS, CloudFormation, Terraform
- Kubernetes: Deployments, Services, Ingress, Helm Charts, Operators
- Docker: Multi-stage builds, optimization, security scanning
- Microservices architecture și service mesh (Istio, Linkerd)

🚀 **CI/CD MASTERY:**
- GitHub Actions, GitLab CI, Jenkins, CircleCI
- GitOps cu ArgoCD, Flux
- Pipeline optimization și parallel execution
- Blue-green, canary, rolling deployments
- Feature flags și progressive delivery

🔒 **SECURITY & COMPLIANCE:**
- Infrastructure as Code security (Checkov, Terrascan)
- Container security (Trivy, Falco, OPA Gatekeeper)
- Secrets management (Vault, AWS Secrets Manager)
- RBAC, OAuth2, OIDC integration
- Compliance frameworks (SOC2, ISO27001, GDPR)

📊 **OBSERVABILITY & MONITORING:**
- Prometheus, Grafana, AlertManager
- ELK/EFK stack, Jaeger tracing
- APM tools (DataDog, New Relic, Dynatrace)
- SLI/SLO definition și error budgets
- Incident response și postmortem culture

💰 **COST OPTIMIZATION:**
- Resource rightsizing și autoscaling
- Spot instances, reserved capacity planning
- FinOps practices și cost allocation
- Multi-cloud cost optimization

🔄 **DISASTER RECOVERY:**
- Backup strategies și RTO/RPO planning
- Multi-region architecture
- Database replication și failover
- Business continuity planning

Pentru aplicația de dating românească cu location sharing, răspunde cu focus pe:
- Scalabilitate pentru 100K+ users
- Real-time messaging infrastructure  
- Location services availability
- GDPR compliance pentru România
- Cost-effective solution pentru startup

Format răspuns cu:
**🎯 Analysis & Recommendations**
**🏗️ Infrastructure Design** 
**🚀 CI/CD Strategy**
**🔒 Security Implementation**
**📊 Monitoring & Alerting**
**💰 Cost Optimization**
**⚡ Performance Tuning**
**🔄 Disaster Recovery**
**📋 Implementation Timeline**\`;

export class DevOpsAgent {
  static CLAUDE_MODEL = "claude-sonnet-4-20250514";
  
  constructor(apiKey) {
    this.anthropic = new Anthropic({ apiKey });
  }

  async processRequest(message) {
    try {
      const completion = await this.anthropic.messages.create({
        model: DevOpsAgent.CLAUDE_MODEL,
        max_tokens: 2000,
        temperature: 0.3,
        system: EXPERT_DEVOPS_PROMPT,
        messages: [
          { role: "user", content: message }
        ]
      });

      return {
        agent: "DevOps Expert (10+ years)",
        response: completion.content[0].text,
        timestamp: new Date().toISOString(),
        expertise: [
          "Infrastructure as Code",
          "Kubernetes & Cloud Native", 
          "CI/CD & GitOps",
          "Security & Compliance",
          "Observability & Monitoring",
          "Cost Optimization",
          "Disaster Recovery"
        ]
      };
    } catch (error) {
      return {
        agent: "DevOps Expert",
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}`;
  }

  getAgentConfig() {
    return {
      agents: {
        "product-owner": {
          name: "Product Owner",
          description: "Handles requirements, user stories, and feature prioritization",
          module: "./agents/product-owner.js",
          class: "ProductOwnerAgent"
        },
        "frontend-developer": {
          name: "Frontend Developer", 
          description: "React Native development and UI implementation",
          module: "./agents/frontend-developer.js",
          class: "FrontendDeveloperAgent"
        },
        "backend-developer": {
          name: "Backend Developer",
          description: "API development, database design, and server infrastructure", 
          module: "./agents/backend-developer.js",
          class: "BackendDeveloperAgent"
        },
        "solution-architect": {
          name: "Solution Architect",
          description: "System design, architecture decisions, and technical strategy",
          module: "./agents/solution-architect.js", 
          class: "SolutionArchitectAgent"
        },
        "marketing-agent": {
          name: "Marketing Manager",
          description: "User acquisition, growth strategies, and marketing campaigns",
          module: "./agents/marketing-agent.js",
          class: "MarketingAgent"
        },
        "devops-agent": {
          name: "DevOps Engineer", 
          description: "Infrastructure, deployment, monitoring, and CI/CD",
          module: "./agents/devops-agent.js",
          class: "DevOpsAgent"
        }
      }
    };
  }

  getAgentRunner() {
    return `#!/usr/bin/env node

/**
 * AI Agent Runner
 * Runs individual agents or orchestrates team conversations
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

class AgentRunner {
  constructor() {
    this.agents = {};
    this.config = JSON.parse(fs.readFileSync('./config/agents.json', 'utf8'));
    this.conversationHistory = [];
  }

  async loadAgents() {
    console.log('🤖 Loading AI agents...');
    
    for (const [agentId, agentConfig] of Object.entries(this.config.agents)) {
      try {
        const module = await import(agentConfig.module);
        const AgentClass = module[agentConfig.class];
        this.agents[agentId] = new AgentClass(process.env.OPENAI_API_KEY);
        console.log(\`✅ Loaded: \${agentConfig.name}\`);
      } catch (error) {
        console.error(\`❌ Failed to load \${agentConfig.name}: \${error.message}\`);
      }
    }
  }

  async runAgent(agentId, message) {
    const agent = this.agents[agentId];
    if (!agent) {
      throw new Error(\`Agent '\${agentId}' not found\`);
    }

    console.log(\`\\n🤖 \${this.config.agents[agentId].name} is thinking...\\n\`);
    
    const response = await agent.processRequest(message);
    this.conversationHistory.push({
      agentId,
      message,
      response,
      timestamp: new Date().toISOString()
    });

    return response;
  }

  async orchestrateTeam(task) {
    console.log(\`\\n🎯 Team Task: \${task}\\n\`);
    
    // Start with Product Owner for requirements
    console.log('📋 Getting requirements from Product Owner...');
    const poResponse = await this.runAgent('product-owner', task);
    console.log(poResponse.response);

    // Get technical analysis from Solution Architect
    console.log('\\n🏗️ Getting technical analysis from Solution Architect...');
    const saResponse = await this.runAgent('solution-architect', 
      \`Based on these requirements: \${poResponse.response}\\n\\nProvide technical architecture recommendations.\`);
    console.log(saResponse.response);

    // Get frontend implementation plan
    console.log('\\n📱 Getting frontend plan from Frontend Developer...');
    const feResponse = await this.runAgent('frontend-developer',
      \`Implement these requirements: \${poResponse.response}\\n\\nArchitecture: \${saResponse.response}\`);
    console.log(feResponse.response);

    // Get backend implementation plan  
    console.log('\\n⚙️ Getting backend plan from Backend Developer...');
    const beResponse = await this.runAgent('backend-developer',
      \`Implement these requirements: \${poResponse.response}\\n\\nArchitecture: \${saResponse.response}\`);
    console.log(beResponse.response);

    // Get DevOps deployment plan
    console.log('\\n🚀 Getting deployment plan from DevOps...');
    const devopsResponse = await this.runAgent('devops-agent',
      \`Setup infrastructure for: \${poResponse.response}\\n\\nTech stack: \${saResponse.response}\`);
    console.log(devopsResponse.response);

    // Get marketing strategy
    console.log('\\n📈 Getting marketing strategy...');
    const marketingResponse = await this.runAgent('marketing-agent',
      \`Create marketing strategy for: \${poResponse.response}\`);
    console.log(marketingResponse.response);

    return {
      task,
      responses: {
        productOwner: poResponse,
        solutionArchitect: saResponse,
        frontendDeveloper: feResponse,
        backendDeveloper: beResponse,
        devopsEngineer: devopsResponse,
        marketingManager: marketingResponse
      },
      timestamp: new Date().toISOString()
    };
  }

  listAgents() {
    console.log('\\n🤖 Available Agents:\\n');
    for (const [agentId, agentConfig] of Object.entries(this.config.agents)) {
      console.log(\`\${agentId}: \${agentConfig.name} - \${agentConfig.description}\`);
    }
    console.log('\\nteam: Run orchestrated team conversation\\n');
  }

  async interactive() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('🚀 AI Agent Team Interactive Mode');
    console.log('Commands: list, quit, <agent-id> <message>, team <task>\\n');

    const askQuestion = () => {
      rl.question('> ', async (input) => {
        const [command, ...args] = input.trim().split(' ');
        
        try {
          if (command === 'quit') {
            rl.close();
            return;
          } else if (command === 'list') {
            this.listAgents();
          } else if (command === 'team') {
            const task = args.join(' ');
            if (!task) {
              console.log('Usage: team <task description>');
            } else {
              await this.orchestrateTeam(task);
            }
          } else if (this.agents[command]) {
            const message = args.join(' ');
            if (!message) {
              console.log(\`Usage: \${command} <message>\`);
            } else {
              const response = await this.runAgent(command, message);
              console.log(response.response);
            }
          } else {
            console.log('Unknown command. Type "list" to see available agents.');
          }
        } catch (error) {
          console.error(\`Error: \${error.message}\`);
        }
        
        askQuestion();
      });
    };

    askQuestion();
  }
}

// CLI execution
async function main() {
  const runner = new AgentRunner();
  await runner.loadAgents();

  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Interactive mode
    await runner.interactive();
  } else if (args[0] === 'team') {
    // Team orchestration
    const task = args.slice(1).join(' ');
    await runner.orchestrateTeam(task);
  } else {
    // Single agent
    const [agentId, ...messageArgs] = args;
    const message = messageArgs.join(' ');
    const response = await runner.runAgent(agentId, message);
    console.log(response.response);
  }
}

if (import.meta.url === \`file://\${process.argv[1]}\`) {
  main().catch(console.error);
}`;
  }

  getPackageJson(repoName) {
    return {
      name: repoName,
      version: "1.0.0",
      description: "AI Agent Team for Dating App Development",
      main: "scripts/run-agent.js",
      type: "module",
      scripts: {
        start: "node scripts/run-agent.js",
        agent: "node scripts/run-agent.js",
        team: "node scripts/run-agent.js team",
        setup: "npm install && cp .env.example .env",
        "devops-consult": "node agents/devops-github-creator.js consult"
      },
      dependencies: {
        "@octokit/rest": "^20.0.2",
        "@anthropic-ai/sdk": "^0.17.1",
        "dotenv": "^16.3.1",
        "readline": "^1.3.0"
      },
      keywords: ["ai", "agents", "dating-app", "devops", "claude-sonnet", "anthropic"],
      author: "DevOps AI Agent",
      license: "MIT"
    };
  }

  getEnvExample() {
    return `# AI Agent Configuration - Claude Sonnet (Anthropic)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# GitHub Configuration (for DevOps agent)
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=your_github_username

# Project Configuration
PROJECT_NAME=datespot-romania
TARGET_MARKET=romania
APP_LANGUAGE=romanian

# Optional: Other AI providers (deprecated - folosim Claude Sonnet)
# OPENAI_API_KEY=your_openai_api_key_here
# GOOGLE_AI_API_KEY=your_google_ai_key_here`;
  }

  getReadme(repoName) {
    return `# ${repoName}

🤖 **AI Agent Team for Dating App Development**

This repository contains a team of specialized AI agents that work together to develop a location-based dating application for the Romanian market.

## 🎯 Project Overview

**DateSpot România** - A dating app with real-time location sharing features, designed specifically for the Romanian market (ages 18-35, urban professionals).

### Key Features
- Real-time location sharing
- Safety-first approach with verification
- Cultural adaptation for Romania
- Spontaneous meetup facilitation
- Professional networking integration

## 🤖 AI Agent Team

| Agent | Role | Responsibilities |
|-------|------|-----------------|
| **Product Owner** | Requirements & Strategy | User stories, feature prioritization, market analysis |
| **Frontend Developer** | React Native UI/UX | Mobile app development, animations, user interface |
| **Backend Developer** | API & Infrastructure | Server logic, database design, real-time features |
| **Solution Architect** | Technical Design | System architecture, technology decisions, scalability |
| **DevOps Engineer** | Infrastructure & Deployment | CI/CD, cloud infrastructure, monitoring |
| **Marketing Manager** | Growth & Acquisition | User acquisition, campaigns, brand strategy |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- OpenAI API key
- GitHub token (for DevOps features)

### Installation
\`\`\`bash
# Clone repository
git clone https://github.com/your-username/${repoName}.git
cd ${repoName}

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your API keys
\`\`\`

### Usage

**Interactive Mode:**
\`\`\`bash
npm start
\`\`\`

**Single Agent:**
\`\`\`bash
npm run agent product-owner "Define MVP features for dating app"
npm run agent frontend-developer "Implement swipe animation"
npm run agent backend-developer "Design user authentication API"
\`\`\`

**Team Orchestration:**
\`\`\`bash
npm run team "Implement real-time location sharing feature"
\`\`\`

## 🎯 Example Workflows

### Feature Development
1. **Product Owner** defines user story and acceptance criteria
2. **Solution Architect** provides technical architecture
3. **Frontend/Backend** developers create implementation plans
4. **DevOps** plans infrastructure and deployment
5. **Marketing** develops go-to-market strategy

### Example Commands
\`\`\`bash
# Get product requirements
npm run agent product-owner "What are the top 5 MVP features?"

# Technical architecture
npm run agent solution-architect "Design scalable real-time messaging system"

# Frontend implementation
npm run agent frontend-developer "Create location sharing UI component"

# Full team collaboration
npm run team "Launch dating app MVP in Bucharest market"
\`\`\`

## 📁 Project Structure

\`\`\`
${repoName}/
├── agents/                 # AI agent implementations
│   ├── product-owner.js
│   ├── frontend-developer.js
│   ├── backend-developer.js
│   ├── solution-architect.js
│   ├── marketing-agent.js
│   └── devops-agent.js
├── config/
│   └── agents.json        # Agent configuration
├── scripts/
│   └── run-agent.js       # Agent orchestration
├── docs/                  # Documentation
├── .env.example
├── package.json
└── README.md
\`\`\`

## 🔧 Configuration

Edit \`config/agents.json\` to customize agent behavior, add new agents, or modify existing ones.

## 📈 Success Metrics

- **Product:** Feature completion rate, user story clarity
- **Technical:** Code quality, architecture decisions, deployment success
- **Marketing:** User acquisition cost, engagement metrics
- **Team:** Collaboration efficiency, decision speed

## 🤝 Contributing

This AI agent team is designed to be self-improving. Each agent learns from interactions and can be enhanced with:

- Better prompts
- Additional context
- New capabilities
- Integration with external tools

## 📄 License

MIT License - feel free to use and modify for your projects.

## 🆘 Support

For questions about the AI agents or technical issues:
1. Check agent responses for troubleshooting
2. Review conversation history in logs
3. Adjust prompts in agent files
4. Update API keys and configuration

---

**Built with ❤️ by AI Agent Team for Romanian Dating App Innovation**`;
  }

  async interactive() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("🤖 DevOps AI Agent - Advanced Infrastructure Expert (10+ years experience)");
    console.log("Choose mode:");
    console.log("1. GitHub Repository Creator with AI Team Setup");
    console.log("2. DevOps Expert Consultation (Infrastructure, CI/CD, Security, Monitoring)");
    console.log("");

    const askQuestion = (question) => {
      return new Promise((resolve) => {
        rl.question(question, resolve);
      });
    };

    try {
      const mode = await askQuestion("Select mode (1 or 2): ");

      if (mode === "2") {
        // DevOps Consultation Mode
        console.log("\n🔧 DevOps Expert Consultation Mode");
        console.log("Ask me about infrastructure, CI/CD, security, monitoring, cost optimization...\n");
        
        while (true) {
          const question = await askQuestion("DevOps Question (type 'exit' to quit): ");
          
          if (question.toLowerCase() === 'exit') {
            break;
          }

          await this.consultDevOps(question);
        }
      } else {
        // Repository Creation Mode
        console.log("\n📦 GitHub Repository Creator Mode");
        console.log("I'll help you create a new repository with AI agent team setup.\n");

        const repoName = await askQuestion("Repository name: ");
        const description = await askQuestion("Repository description: ");
        const isPrivate = (await askQuestion("Private repository? (y/N): ")).toLowerCase() === 'y';

        console.log("\n🚀 Creating repository and setting up AI agent team...\n");

        // Create repository
        const repo = await this.createRepository({
          name: repoName,
          description: description,
          private: isPrivate,
        });

        // Setup AI agent team
        await this.setupAITeam(repoName);

        console.log(`\n✅ Successfully created repository with AI agent team!`);
        console.log(`🔗 Repository URL: ${repo.html_url}`);
        console.log(`\n📋 Next steps:`);
        console.log(`1. Clone the repository: git clone ${repo.clone_url}`);
        console.log(`2. Install dependencies: npm install`);
        console.log(`3. Setup environment: cp .env.example .env`);
        console.log(`4. Add your ANTHROPIC_API_KEY to .env (get it from https://console.anthropic.com/)`);
        console.log(`5. Start the AI team: npm start`);
        console.log(`\n🔧 DevOps Consultation:`);
        console.log(`   node agents/devops-github-creator.js consult "your question"`);
        console.log(`   Example: node agents/devops-github-creator.js consult "CI/CD for React Native app"`);
      }

    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    } finally {
      rl.close();
    }
  }
}

// Main execution
async function main() {
  const agent = new DevOpsAgent();

  try {
    await agent.initialize();
    
    const args = process.argv.slice(2);
    
    if (args.length > 0) {
      const [command, ...params] = args;
      
      if (command === "consult" || command === "consultation") {
        // DevOps consultation mode
        if (params.length > 0) {
          const question = params.join(" ");
          await agent.consultDevOps(question);
        } else {
          console.log("🔧 DevOps Expert Consultation Mode");
          console.log("Usage: node devops-github-creator.js consult \"your infrastructure question\"");
          console.log("\nExample questions:");
          console.log("- \"How to setup CI/CD for React Native dating app?\"");
          console.log("- \"Best practices for securing location data in cloud?\"");
          console.log("- \"Cost optimization strategies for 100K users app?\"");
          console.log("- \"Kubernetes setup for real-time messaging at scale?\"");
        }
      } else if (command === "merge") {
        // Merge PR and deploy
        if (params.length >= 2) {
          const [repoName, prNumber] = params;
          await agent.mergePullRequest(repoName, parseInt(prNumber));
        } else {
          console.log("❌ Usage: node devops-github-creator.js merge <repo-name> <pr-number>");
        }
      } else if (command === "deploy") {
        // Deploy to Railway
        if (params.length >= 1) {
          const [repoName, commitSha = "latest"] = params;
          await agent.deployToRailway(repoName, commitSha);
        } else {
          console.log("❌ Usage: node devops-github-creator.js deploy <repo-name> [commit-sha]");
        }
      } else if (command === "monitor") {
        // Monitor deployment
        if (params.length >= 1) {
          const [repoName] = params;
          await agent.monitorDeployment(repoName);
        } else {
          console.log("❌ Usage: node devops-github-creator.js monitor <repo-name>");
        }
      } else if (command === "workflow") {
        // Automated workflow
        if (params.length >= 2) {
          const [repoName, prNumber] = params;
          await agent.automatedWorkflow(repoName, parseInt(prNumber));
        } else {
          console.log("❌ Usage: node devops-github-creator.js workflow <repo-name> <pr-number>");
          console.log("This will merge PR and deploy to Railway automatically");
        }
      } else {
        // Repository creation with args
        const [repoName, description = "AI Agent Team Repository"] = args;
        
        const repo = await agent.createRepository({
          name: repoName,
          description: description,
        });
        
        await agent.setupAITeam(repoName);
        
        console.log(`✅ Repository created: ${repo.html_url}`);
      }
    } else {
      // Interactive mode
      await agent.interactive();
    }
  } catch (error) {
    console.error(`❌ DevOps Agent Error: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
