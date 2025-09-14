#!/usr/bin/env node

/**
 * Orchestrator AI Agent - Team Lead & Workflow Coordinator
 * 15+ years project management & technical leadership experience
 * Coordinates entire AI development team and manages project lifecycle
 */

import { Octokit } from "@octokit/rest";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

dotenv.config();

class OrchestratorAgent {
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
    this.team = {
      productOwner: null,
      frontendDev: null,
      backendDev: null,
      devOps: null,
      manualTester: null
    };
  }

  async initialize() {
    console.log("🎭 Orchestrator AI Agent (15+ years) initializing...");
    
    if (!this.config.token || !this.config.anthropicKey) {
      throw new Error("Missing required credentials in .env file");
    }

    // Initialize GitHub and Anthropic clients
    this.octokit = new Octokit({ auth: this.config.token });
    this.anthropic = new Anthropic({ apiKey: this.config.anthropicKey });

    // Verify authentication
    try {
      const { data: user } = await this.octokit.rest.users.getAuthenticated();
      console.log(`✅ GitHub authenticated as: ${user.login}`);
    } catch (error) {
      throw new Error(`GitHub authentication failed: ${error.message}`);
    }

    // Initialize shared context system
    await this.initializeSharedContext();
    
    console.log("🎯 Orchestrator ready to coordinate AI development team");
  }

  async initializeSharedContext() {
    console.log("📁 Initializing shared context system...");
    
    try {
      await fs.mkdir(this.contextPath, { recursive: true });
      
      // Initialize project context file
      const projectContext = {
        metadata: {
          created_at: new Date().toISOString(),
          orchestrator_version: "1.0.0",
          team_size: 5,
          current_phase: "initialization"
        },
        project_state: {
          repositories_created: false,
          technology_stack: {},
          infrastructure_setup: "not_started",
          development_phase: "planning"
        },
        team_status: {
          product_owner: { status: "available", current_task: null },
          frontend_dev: { status: "available", current_task: null },
          backend_dev: { status: "available", current_task: null },
          devops: { status: "available", current_task: null },
          manual_tester: { status: "available", current_task: null }
        },
        active_decisions: [],
        blockers: [],
        milestones: []
      };

      await this.updateProjectContext(projectContext);

      // Initialize communication log
      const communicationLog = {
        log_version: "1.0.0",
        created_at: new Date().toISOString(),
        messages: [
          {
            timestamp: new Date().toISOString(),
            from: "Orchestrator AI",
            to: "All Team",
            message_type: "initialization",
            content: "Shared context system initialized. Team coordination ready.",
            priority: "info"
          }
        ]
      };

      await this.updateCommunicationLog(communicationLog);
      
      console.log("✅ Shared context system ready");
    } catch (error) {
      console.error(`❌ Failed to initialize shared context: ${error.message}`);
      throw error;
    }
  }

  async updateProjectContext(context) {
    const contextFile = path.join(this.contextPath, "project-context.json");
    await fs.writeFile(contextFile, JSON.stringify(context, null, 2));
  }

  async getProjectContext() {
    const contextFile = path.join(this.contextPath, "project-context.json");
    try {
      const data = await fs.readFile(contextFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.warn("⚠️ Could not read project context, using defaults");
      return null;
    }
  }

  async updateCommunicationLog(log) {
    const logFile = path.join(this.contextPath, "communication-log.json");
    await fs.writeFile(logFile, JSON.stringify(log, null, 2));
  }

  async getCommunicationLog() {
    const logFile = path.join(this.contextPath, "communication-log.json");
    try {
      const data = await fs.readFile(logFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.warn("⚠️ Could not read communication log");
      return { messages: [] };
    }
  }

  async logCommunication(from, to, messageType, content, priority = "normal") {
    const log = await this.getCommunicationLog();
    
    const message = {
      timestamp: new Date().toISOString(),
      from,
      to,
      message_type: messageType,
      content,
      priority,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    log.messages.push(message);
    await this.updateCommunicationLog(log);
    
    console.log(`📨 [${from} → ${to}] ${content}`);
    return message.id;
  }

  async coordinateProject(requirements) {
    console.log("🎯 Starting project coordination...");
    
    const ORCHESTRATOR_PROMPT = `Tu ești un Orchestrator AI cu 15+ ani experiență în leadership tehnic și project management.

RESPONSABILITĂȚI:
🎯 **PROJECT COORDINATION:**
- Analizează requirements și creează project breakdown
- Coordonează echipa de 5 AI agenți specializați
- Gestionează dependencies și blockers
- Asigură timeline și milestone delivery

👥 **TEAM MANAGEMENT:**
- Product Owner AI (10+ ani) - requirements, user stories
- Frontend Developer AI (10+ ani) - orice tehnologie frontend
- Backend Developer AI (10+ ani) - Node.js specialist
- DevOps AI (10+ ani) - infrastructure, CI/CD, Railway deployment
- Manual Tester AI (10+ ani) - QA, testing, bug tracking

🔄 **WORKFLOW ORCHESTRATION:**
- Task assignment și prioritization
- Git workflow coordination (branches, PRs, master merge)
- Conflict resolution între agenți
- Quality gates și code review coordination
- Deployment coordination cu Railway.com

Analizează cerințele proiectului și creează:
1. **Project Analysis** - Ce tip de aplicație, complexitate, tehnologii
2. **Team Assignment** - Care agent face ce și în ce ordine
3. **Technology Stack** - Recomandări pentru frontend/backend/infrastructure
4. **Milestone Planning** - Faze de development și timeline
5. **Risk Assessment** - Potential blockers și mitigation
6. **Next Actions** - Primul set de tasks pentru fiecare agent

Răspunde ca un senior technical lead care gestionează echipe de developeri.`;

    try {
      console.log("🤖 Orchestrator analyzing project requirements...\n");

      const completion = await this.anthropic.messages.create({
        model: OrchestratorAgent.CLAUDE_MODEL,
        max_tokens: 3000,
        temperature: 0.2,
        system: ORCHESTRATOR_PROMPT,
        messages: [
          { role: "user", content: requirements }
        ]
      });

      const analysis = completion.content[0].text;
      
      console.log("🎯 Project Coordination Plan:\n");
      console.log(analysis);
      console.log("\n" + "=".repeat(80) + "\n");

      // Log orchestration decision
      await this.logCommunication(
        "Orchestrator AI",
        "All Team",
        "project_analysis",
        `Project requirements analyzed. Coordination plan created.`,
        "high"
      );

      // Update project context with analysis
      const context = await this.getProjectContext();
      if (context) {
        context.project_state.current_phase = "planning_complete";
        context.orchestration_analysis = analysis;
        context.last_updated = new Date().toISOString();
        await this.updateProjectContext(context);
      }

      return {
        agent: "Orchestrator AI (15+ years)",
        analysis,
        timestamp: new Date().toISOString(),
        next_phase: "team_assignment"
      };

    } catch (error) {
      console.error(`❌ Project coordination failed: ${error.message}`);
      return {
        agent: "Orchestrator AI",
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async assignTask(agentName, task, priority = "normal") {
    console.log(`📋 Assigning task to ${agentName}: ${task}`);
    
    // Update project context with task assignment
    const context = await this.getProjectContext();
    if (context && context.team_status[agentName.toLowerCase().replace(' ', '_')]) {
      context.team_status[agentName.toLowerCase().replace(' ', '_')] = {
        status: "assigned",
        current_task: task,
        assigned_at: new Date().toISOString(),
        priority
      };
      await this.updateProjectContext(context);
    }

    // Log task assignment
    await this.logCommunication(
      "Orchestrator AI",
      agentName,
      "task_assignment",
      `Task assigned: ${task}`,
      priority
    );

    return {
      success: true,
      agent: agentName,
      task,
      priority,
      assigned_at: new Date().toISOString()
    };
  }

  async monitorTeamProgress() {
    console.log("📊 Monitoring team progress...");
    
    const context = await this.getProjectContext();
    const log = await this.getCommunicationLog();
    
    if (!context) {
      console.log("⚠️ No project context available");
      return;
    }

    console.log("\n🎭 TEAM STATUS REPORT");
    console.log("=".repeat(50));
    
    Object.entries(context.team_status).forEach(([agent, status]) => {
      const statusIcon = status.status === "available" ? "✅" : 
                        status.status === "assigned" ? "🔄" : 
                        status.status === "blocked" ? "❌" : "❓";
      
      console.log(`${statusIcon} ${agent.replace('_', ' ').toUpperCase()}: ${status.status}`);
      if (status.current_task) {
        console.log(`   📋 Task: ${status.current_task}`);
      }
    });

    console.log(`\n📊 Project Phase: ${context.project_state.current_phase}`);
    console.log(`📨 Total Communications: ${log.messages.length}`);
    
    if (context.blockers && context.blockers.length > 0) {
      console.log("\n⚠️ ACTIVE BLOCKERS:");
      context.blockers.forEach(blocker => {
        console.log(`   - ${blocker.description} (${blocker.agent})`);
      });
    }

    return {
      team_status: context.team_status,
      project_phase: context.project_state.current_phase,
      total_communications: log.messages.length,
      blockers: context.blockers || []
    };
  }

  async resolveConflict(agentA, agentB, conflictDescription) {
    console.log(`⚖️ Resolving conflict between ${agentA} and ${agentB}`);
    
    const CONFLICT_RESOLUTION_PROMPT = `Tu ești un senior technical lead cu 15+ ani experiență în conflict resolution.

CONFLICT SITUATION:
Agent A: ${agentA}
Agent B: ${agentB}
Conflict: ${conflictDescription}

Ca orchestrator, analizează conflictul și propune:
1. **Root Cause Analysis** - De ce a apărut conflictul
2. **Technical Resolution** - Soluția tehnică optimă
3. **Process Improvement** - Cum să previi în viitor
4. **Decision Authority** - Cine are autoritatea finală
5. **Communication Plan** - Cum să comunici decizia

Răspunde profesional și decisiv ca un senior lead.`;

    try {
      const completion = await this.anthropic.messages.create({
        model: OrchestratorAgent.CLAUDE_MODEL,
        max_tokens: 1500,
        temperature: 0.1,
        system: CONFLICT_RESOLUTION_PROMPT,
        messages: [
          { role: "user", content: conflictDescription }
        ]
      });

      const resolution = completion.content[0].text;
      
      console.log("⚖️ Conflict Resolution:\n");
      console.log(resolution);

      // Log conflict resolution
      await this.logCommunication(
        "Orchestrator AI",
        `${agentA}, ${agentB}`,
        "conflict_resolution",
        `Conflict resolved: ${conflictDescription}`,
        "high"
      );

      return {
        success: true,
        resolution,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ Conflict resolution failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// CLI Interface
async function main() {
  const orchestrator = new OrchestratorAgent();

  try {
    await orchestrator.initialize();
    
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.log("🎭 Orchestrator AI Agent Commands:");
      console.log("  coordinate \"project requirements\"  - Analyze and coordinate project");
      console.log("  assign \"agent\" \"task\"            - Assign task to specific agent");
      console.log("  monitor                             - Monitor team progress");
      console.log("  resolve \"agentA\" \"agentB\" \"conflict\" - Resolve team conflict");
      console.log("\nExample:");
      console.log("  node orchestrator-agent.js coordinate \"Build a React Native dating app\"");
      return;
    }

    const [command, ...params] = args;
    
    switch (command) {
      case "coordinate":
        if (params.length > 0) {
          const requirements = params.join(" ");
          await orchestrator.coordinateProject(requirements);
        } else {
          console.log("❌ Missing project requirements");
        }
        break;
        
      case "assign":
        if (params.length >= 2) {
          const [agent, ...taskParts] = params;
          const task = taskParts.join(" ");
          await orchestrator.assignTask(agent, task);
        } else {
          console.log("❌ Missing agent name or task description");
        }
        break;
        
      case "monitor":
        await orchestrator.monitorTeamProgress();
        break;
        
      case "resolve":
        if (params.length >= 3) {
          const [agentA, agentB, ...conflictParts] = params;
          const conflict = conflictParts.join(" ");
          await orchestrator.resolveConflict(agentA, agentB, conflict);
        } else {
          console.log("❌ Missing agents or conflict description");
        }
        break;
        
      default:
        console.log(`❌ Unknown command: ${command}`);
    }
    
  } catch (error) {
    console.error(`❌ Orchestrator Error: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default OrchestratorAgent;
