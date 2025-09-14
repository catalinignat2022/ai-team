#!/usr/bin/env node

/**
 * Orchestrator AI Agent - Team Lead & Workflow Coordinator
 * 15+ years project management & technical leadership experience
 * Coordinates entire AI development team and manages workflows
 */

import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import { SharedContext } from "../shared/context-manager.js";
import { CommunicationLogger } from "../shared/communication-logger.js";

dotenv.config();

class OrchestratorAgent {
  static CLAUDE_MODEL = "claude-sonnet-4-20250514";

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    this.context = new SharedContext();
    this.logger = new CommunicationLogger();
    this.teamAgents = [
      'product-owner',
      'frontend-developer', 
      'backend-developer',
      'devops',
      'manual-tester'
    ];
  }

  async initialize() {
    console.log("🎭 Orchestrator AI Agent (15+ years leadership) initializing...");
    
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("Anthropic API key not found. Please set ANTHROPIC_API_KEY environment variable.");
    }

    await this.context.initialize();
    await this.logger.initialize();
    
    console.log("✅ Orchestrator ready to coordinate AI development team");
  }

  /**
   * Coordinate complete project development from requirements to deployment
   */
  async coordinateProject(projectRequirements) {
    const ORCHESTRATOR_PROMPT = `Tu ești un Orchestrator AI Agent cu 15+ ani experiență în:

🎯 **PROJECT MANAGEMENT MASTERY:**
- Agile/Scrum methodology și sprint planning
- Technical leadership și team coordination
- Risk management și dependency tracking
- Quality gates și delivery milestones
- Conflict resolution și decision making

👥 **TEAM COORDINATION:**
- Cross-functional team management
- Resource allocation și task distribution
- Communication facilitation între specialisti
- Performance monitoring și optimization
- Stakeholder management

🏗️ **TECHNICAL LEADERSHIP:**
- Architecture decision facilitation
- Technology stack evaluation
- Code quality standards enforcement
- Technical debt management
- Innovation și best practices adoption

📊 **DELIVERY EXCELLENCE:**
- Timeline estimation și milestone tracking
- Scope management și change control
- Quality assurance și testing coordination
- Release planning și deployment orchestration
- Post-delivery analysis și lessons learned

Tu coordonezi o echipă de AI agenți cu 10+ ani experiență fiecare:
- **Product Owner AI**: Requirements, user stories, feature prioritization
- **Frontend Developer AI**: Orice tehnologie frontend (React, Vue, Angular, React Native, Flutter)
- **Backend Developer AI**: Specializat Node.js (Express, NestJS, GraphQL, microservices)
- **DevOps AI**: Infrastructure, CI/CD, monitoring, security, cloud native
- **Manual Tester AI**: QA, test cases, exploratory testing, bug tracking

RĂSPUNDE ca un senior technical leader care:
1. Analizează requirements și identifică complexitatea
2. Propune breakdown în faze și sprints
3. Identifică dependencies între echipe
4. Sugerează technology stack optim
5. Definește quality gates și success criteria
6. Estimează timeline realistic
7. Identifică potential risks și mitigation

Format structurat pentru clarity și actionability.`;

    try {
      console.log("🎯 Orchestrator analyzing project requirements...\n");

      const completion = await this.anthropic.messages.create({
        model: OrchestratorAgent.CLAUDE_MODEL,
        max_tokens: 3000,
        temperature: 0.2,
        system: ORCHESTRATOR_PROMPT,
        messages: [
          { role: "user", content: projectRequirements }
        ]
      });

      const analysis = completion.content[0].text;
      
      console.log("🎭 Orchestrator Project Analysis:\n");
      console.log(analysis);
      console.log("\n" + "=".repeat(80) + "\n");

      // Log communication
      await this.logger.logCommunication({
        from: "orchestrator",
        to: "team",
        type: "project_analysis",
        content: analysis,
        priority: "high"
      });

      // Update project context
      await this.context.updateProjectState({
        phase: "analysis_complete",
        orchestrator_analysis: analysis,
        requirements: projectRequirements,
        timestamp: new Date().toISOString()
      });

      return {
        agent: "Orchestrator (15+ years leadership)",
        analysis: analysis,
        next_steps: await this.planNextSteps(analysis),
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ Orchestrator analysis failed: ${error.message}`);
      return {
        agent: "Orchestrator",
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Plan next steps based on analysis
   */
  async planNextSteps(analysis) {
    const steps = [
      {
        step: 1,
        agent: "product-owner",
        action: "Create detailed user stories and acceptance criteria",
        estimated_time: "2-3 hours"
      },
      {
        step: 2,
        agent: "frontend-developer", 
        action: "Evaluate and select optimal frontend technology stack",
        estimated_time: "1-2 hours"
      },
      {
        step: 3,
        agent: "backend-developer",
        action: "Design API architecture and database schema",
        estimated_time: "3-4 hours"
      },
      {
        step: 4,
        agent: "devops",
        action: "Setup infrastructure and CI/CD pipeline",
        estimated_time: "4-6 hours"
      },
      {
        step: 5,
        agent: "manual-tester",
        action: "Create test strategy and test cases",
        estimated_time: "2-3 hours"
      }
    ];

    return steps;
  }

  /**
   * Coordinate team communication and task distribution
   */
  async coordinateTeam(taskType, agentName, taskDetails) {
    console.log(`🎭 Orchestrator coordinating: ${taskType} → ${agentName}`);
    
    // Log the coordination request
    await this.logger.logCommunication({
      from: "orchestrator",
      to: agentName,
      type: "task_assignment",
      content: taskDetails,
      priority: "normal"
    });

    // Update context with task assignment
    await this.context.updateProjectState({
      [`${agentName}_task`]: {
        type: taskType,
        details: taskDetails,
        status: "assigned",
        assigned_at: new Date().toISOString()
      }
    });

    return {
      task_assigned: true,
      agent: agentName,
      task: taskType,
      logged: true
    };
  }

  /**
   * Monitor team progress and identify blockers
   */
  async monitorProgress() {
    const projectState = await this.context.getProjectState();
    const recentCommunications = await this.logger.getRecentCommunications(24); // Last 24 hours

    console.log("📊 Orchestrator Progress Monitoring:");
    console.log(`Project Phase: ${projectState.phase || 'Not set'}`);
    console.log(`Recent Communications: ${recentCommunications.length}`);
    
    // Identify blockers
    const blockers = recentCommunications.filter(comm => 
      comm.type === 'blocker' || comm.priority === 'urgent'
    );

    if (blockers.length > 0) {
      console.log(`⚠️  Found ${blockers.length} blockers requiring attention`);
      blockers.forEach(blocker => {
        console.log(`  - ${blocker.from} → ${blocker.to}: ${blocker.content}`);
      });
    }

    return {
      project_health: blockers.length === 0 ? 'healthy' : 'attention_needed',
      blockers: blockers,
      recommendations: await this.generateRecommendations(projectState, recentCommunications)
    };
  }

  async generateRecommendations(projectState, communications) {
    // Simple recommendation logic - can be enhanced with AI analysis
    const recommendations = [];

    if (!projectState.technology_stack) {
      recommendations.push("Frontend and Backend agents need to finalize technology stack decisions");
    }

    if (!projectState.infrastructure_setup) {
      recommendations.push("DevOps agent should prioritize infrastructure setup");
    }

    const testingCommunications = communications.filter(c => c.from === 'manual-tester' || c.to === 'manual-tester');
    if (testingCommunications.length === 0) {
      recommendations.push("Manual Tester agent should be more involved in planning phase");
    }

    return recommendations;
  }

  /**
   * Interactive mode for orchestrator
   */
  async interactive() {
    console.log("\n🎭 Orchestrator AI Agent - Interactive Mode");
    console.log("Commands:");
    console.log("  project <requirements>  - Analyze and coordinate new project");
    console.log("  monitor                 - Check team progress and blockers");
    console.log("  coordinate <agent> <task> - Assign task to specific agent");
    console.log("  status                  - Show current project status");
    console.log("  quit                    - Exit orchestrator");

    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const askQuestion = () => {
      rl.question('\n🎭 Orchestrator> ', async (input) => {
        const [command, ...args] = input.trim().split(' ');

        switch (command.toLowerCase()) {
          case 'project':
            if (args.length > 0) {
              await this.coordinateProject(args.join(' '));
            } else {
              console.log("Usage: project <requirements>");
            }
            break;

          case 'monitor':
            await this.monitorProgress();
            break;

          case 'coordinate':
            if (args.length >= 2) {
              const [agent, ...taskParts] = args;
              await this.coordinateTeam('manual_task', agent, taskParts.join(' '));
            } else {
              console.log("Usage: coordinate <agent> <task>");
            }
            break;

          case 'status':
            const state = await this.context.getProjectState();
            console.log("📊 Current Project Status:");
            console.log(JSON.stringify(state, null, 2));
            break;

          case 'quit':
          case 'exit':
            console.log("👋 Orchestrator signing off!");
            rl.close();
            return;

          default:
            console.log("Unknown command. Type a valid command or 'quit' to exit.");
        }

        askQuestion();
      });
    };

    askQuestion();
  }
}

export { OrchestratorAgent };

// CLI execution
async function main() {
  const orchestrator = new OrchestratorAgent();

  try {
    await orchestrator.initialize();
    
    const args = process.argv.slice(2);
    
    if (args.length > 0) {
      const [command, ...params] = args;
      
      if (command === "project") {
        if (params.length > 0) {
          const requirements = params.join(" ");
          await orchestrator.coordinateProject(requirements);
        } else {
          console.log("Usage: node orchestrator.js project \"project requirements\"");
        }
      } else if (command === "monitor") {
        await orchestrator.monitorProgress();
      } else {
        console.log("Available commands: project, monitor");
      }
    } else {
      // Interactive mode
      await orchestrator.interactive();
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
