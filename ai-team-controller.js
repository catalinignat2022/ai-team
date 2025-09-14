#!/usr/bin/env node

/**
 * Master AI Team Controller
 * Coordinates the entire AI development team for end-to-      // Phase 9: Project Summary
      console.log("📋 PHASE 9: PROJECT COMPLETION SUMMARY");
      console.log("-" * 50);
      
      await this.generateProjectSummary();

      console.log("🎉 FULL-STACK APPLICATION DEVELOPMENT COMPLETED SUCCESSFULLY!");
      console.log("=" * 80);

      return {
        success: true,
        project_name: this.projectName,
        frontend_project: frontendProjectName,
        phases_completed: 10,
        backend_repository_url: repoResult?.repository_url,
        frontend_repository_url: frontendResult?.repository_url,
        database_configuration: databaseResult,
        deployment_status: "both_deployed",
        backend_result: backendResult,
        frontend_result: frontendResult
      };very
 */

import OrchestratorAgent from './agents/orchestrator-agent.js';
import ProductOwnerAgent from './agents/product-owner-agent.js';
import FrontendDeveloperAgent from './agents/frontend-developer-agent.js';
import BackendDeveloperAgent from './agents/backend-developer-agent.js';
import DatabaseAgent from './agents/database-agent.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

class MasterAITeamController {
  constructor() {
    this.orchestrator = new OrchestratorAgent();
    this.productOwner = new ProductOwnerAgent();
    this.frontendDev = new FrontendDeveloperAgent();
    this.backendDev = new BackendDeveloperAgent();
    this.databaseAgent = new DatabaseAgent();
    this.projectName = null;
  }

  async initialize() {
    console.log("🎭 Master AI Team Controller starting...");
    console.log("👥 Initializing AI development team...\n");

    await this.orchestrator.initialize();
    await this.productOwner.initialize();
    await this.frontendDev.initialize();
    await this.backendDev.initialize();
    await this.databaseAgent.initialize();

    console.log("✅ All AI agents initialized and ready!\n");
  }

  async buildApplication(projectDescription) {
    console.log("🚀 Starting full application development pipeline...\n");
    console.log("=" * 80);

    try {
      // Phase 1: Orchestration & Planning
      console.log("📋 PHASE 1: PROJECT COORDINATION & PLANNING");
      console.log("-" * 50);
      
      const coordination = await this.orchestrator.coordinateProject(projectDescription);
      console.log("✅ Project coordination completed\n");

      // Phase 2: Requirements Analysis  
      console.log("📊 PHASE 2: REQUIREMENTS ANALYSIS");
      console.log("-" * 50);
      
      const requirements = await this.productOwner.analyzeRequirements(projectDescription);
      console.log("✅ Requirements analysis completed\n");

      // Phase 3: Technology Selection
      console.log("💻 PHASE 3: FRONTEND TECHNOLOGY SELECTION");
      console.log("-" * 50);
      
      const techStack = await this.frontendDev.selectTechnologyStack(projectDescription);
      console.log("✅ Technology stack selected\n");

      // Phase 4: Repository Creation
      console.log("📦 PHASE 4: REPOSITORY SETUP");
      console.log("-" * 50);
      
      this.projectName = this.generateProjectName(projectDescription);
      const repoResult = await this.createProjectRepository(this.projectName, projectDescription);
      console.log("✅ Project repository created\n");

      // Phase 5: Database Configuration
      console.log("🗄️ PHASE 5: DATABASE ARCHITECTURE & CONFIGURATION");
      console.log("-" * 50);
      
      const databaseResult = await this.databaseAgent.configureDatabase(
        requirements.requirements_analysis,
        this.projectName
      );
      console.log("✅ Database configured and ready for backend\n");

      // Phase 6: Backend Development
      console.log("⚙️ PHASE 6: BACKEND DEVELOPMENT");
      console.log("-" * 50);
      
      const backendResult = await this.backendDev.developCompleteAPI(
        requirements.requirements_analysis,
        this.projectName,
        databaseResult // Pass database configuration to backend
      );
      console.log("✅ Backend API development completed\n");

      // Phase 7: Frontend Development  
      console.log("💻 PHASE 7: FRONTEND DEVELOPMENT");
      console.log("-" * 50);
      
      const frontendProjectName = `${this.projectName}-frontend`;
      const frontendResult = await this.frontendDev.implementApplication(
        requirements.requirements_analysis,
        frontendProjectName,
        backendResult.api_spec || backendResult.endpoints
      );
      console.log("✅ Frontend application development completed\n");

      // Phase 8: Backend Deployment
      console.log("🚀 PHASE 8: BACKEND DEPLOYMENT");
      console.log("-" * 50);
      
      if (backendResult.pr_number) {
        await this.deployApplication(this.projectName, backendResult.pr_number);
        console.log("✅ Backend deployed to Railway.com\n");
      }

      // Phase 9: Frontend Deployment
      console.log("🌐 PHASE 9: FRONTEND DEPLOYMENT");
      console.log("-" * 50);
      
      if (frontendResult.pr_number) {
        await this.deployApplication(frontendProjectName, frontendResult.pr_number);
        console.log("✅ Frontend deployed to Railway.com\n");
      }

      // Phase 9: Project Summary
      console.log("📋 PHASE 7: PROJECT COMPLETION SUMMARY");
      console.log("-" * 50);
      
      await this.generateProjectSummary();

      console.log("🎉 APPLICATION DEVELOPMENT COMPLETED SUCCESSFULLY!");
      console.log("=" * 80);

      return {
        success: true,
        project_name: this.projectName,
        phases_completed: 7,
        repository_url: repoResult?.repository_url,
        deployment_status: "deployed"
      };

    } catch (error) {
      console.error(`❌ Application development failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  generateProjectName(description) {
    // Extract key words and create a project name
    const words = description.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 3);
    
    return words.join('-') + '-app';
  }

  async createProjectRepository(projectName, description) {
    console.log(`📦 Creating repository: ${projectName}`);
    
    try {
      const { stdout } = await execAsync(
        `node agents/devops-github-creator.js "${projectName}" "${description} - Full-stack application developed by AI team"`
      );
      
      console.log("Repository creation output:", stdout);
      
      // Extract repository URL from output
      const urlMatch = stdout.match(/https:\/\/github\.com\/[^\s]+/);
      const repositoryUrl = urlMatch ? urlMatch[0] : null;

      return {
        success: true,
        project_name: projectName,
        repository_url: repositoryUrl
      };
    } catch (error) {
      console.error(`❌ Repository creation failed: ${error.message}`);
      throw error;
    }
  }

  async deployApplication(projectName, prNumber) {
    console.log(`🚀 Deploying ${projectName} via PR #${prNumber}`);
    
    try {
      const { stdout } = await execAsync(
        `node agents/devops-github-creator.js workflow "${projectName}" ${prNumber}`
      );
      
      console.log("Deployment output:", stdout);
      
      return {
        success: true,
        deployed: true,
        pr_merged: true
      };
    } catch (error) {
      console.error(`❌ Deployment failed: ${error.message}`);
      throw error;
    }
  }

  async generateProjectSummary() {
    console.log("📊 Generating project completion summary...\n");

    const summary = `
🎯 PROJECT COMPLETION SUMMARY
${"=".repeat(50)}

📦 Project Name: ${this.projectName}
👥 AI Team Members: 4 agents (Orchestrator, Product Owner, Frontend, Backend)
🏗️ Architecture: Full-stack web application
💾 Repository: Created and configured
⚙️ Backend API: Developed and deployed
🚀 Deployment: Railway.com (auto-deployed)

📋 DELIVERABLES:
✅ Complete requirements analysis
✅ Technology stack selection
✅ Backend API with authentication
✅ Database schema and models
✅ Repository with CI/CD setup
✅ Deployed application on Railway.com

🔗 NEXT STEPS:
1. Access repository and review code
2. Configure environment variables on Railway
3. Test API endpoints
4. Develop frontend application
5. Integrate with backend APIs

🎉 Your application is ready for frontend development!
    `;

    console.log(summary);
  }

  async monitorTeam() {
    console.log("📊 Team Status Monitor");
    console.log("=" * 30);
    
    return await this.orchestrator.monitorTeamProgress();
  }
}

// CLI Interface
async function main() {
  const masterController = new MasterAITeamController();
  
  try {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.log("🎭 Master AI Team Controller Commands:");
      console.log("  build \"project description\"  - Build complete application");
      console.log("  monitor                       - Monitor team status");
      console.log("\nExample:");
      console.log("  node ai-team-controller.js build \"E-commerce platform for small businesses\"");
      console.log("  node ai-team-controller.js build \"Social media app with real-time chat\"");
      console.log("  node ai-team-controller.js build \"Task management tool with collaboration\"");
      return;
    }

    await masterController.initialize();
    
    const [command, ...params] = args;
    
    switch (command) {
      case "build":
        if (params.length > 0) {
          const projectDescription = params.join(" ");
          await masterController.buildApplication(projectDescription);
        } else {
          console.log("❌ Missing project description");
          console.log("Usage: node ai-team-controller.js build \"your project description\"");
        }
        break;
        
      case "monitor":
        await masterController.monitorTeam();
        break;
        
      default:
        console.log(`❌ Unknown command: ${command}`);
        console.log("Available commands: build, monitor");
    }
    
  } catch (error) {
    console.error(`❌ Master Controller Error: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default MasterAITeamController;
