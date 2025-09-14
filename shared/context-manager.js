#!/usr/bin/env node

/**
 * Shared Context Manager
 * Manages project state, technology decisions, and team coordination data
 */

import fs from 'fs/promises';
import path from 'path';

class SharedContext {
  constructor() {
    this.contextDir = path.join(process.cwd(), 'shared', 'context');
    this.projectStateFile = path.join(this.contextDir, 'project-state.json');
    this.technologyStackFile = path.join(this.contextDir, 'technology-stack.json');
    this.teamDecisionsFile = path.join(this.contextDir, 'team-decisions.json');
  }

  async initialize() {
    // Ensure context directory exists
    try {
      await fs.mkdir(this.contextDir, { recursive: true });
    } catch (error) {
      // Directory already exists
    }

    // Initialize files if they don't exist
    await this.ensureFileExists(this.projectStateFile, {
      metadata: {
        created_at: new Date().toISOString(),
        last_updated: new Date().toISOString(),
        current_phase: "initialization"
      },
      current_state: {
        repositories_created: false,
        infrastructure_setup: "not_started",
        frontend_scaffolding: "not_started", 
        backend_apis: "not_started",
        testing_setup: "not_started"
      },
      blockers: [],
      milestones: []
    });

    await this.ensureFileExists(this.technologyStackFile, {
      frontend: {
        chosen_tech: null,
        reasoning: null,
        alternatives_considered: []
      },
      backend: {
        framework: "Node.js",
        specific_framework: null,
        database: null,
        caching: null
      },
      infrastructure: {
        cloud_provider: null,
        deployment: null,
        ci_cd: null
      },
      testing: {
        frontend_testing: null,
        backend_testing: null,
        e2e_testing: null
      }
    });

    await this.ensureFileExists(this.teamDecisionsFile, {
      architecture_decisions: [],
      technology_decisions: [],
      process_decisions: [],
      design_decisions: []
    });

    console.log("✅ Shared Context System initialized");
  }

  async ensureFileExists(filePath, defaultContent) {
    try {
      await fs.access(filePath);
    } catch (error) {
      await fs.writeFile(filePath, JSON.stringify(defaultContent, null, 2));
    }
  }

  async getProjectState() {
    try {
      const content = await fs.readFile(this.projectStateFile, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error reading project state: ${error.message}`);
      return null;
    }
  }

  async updateProjectState(updates) {
    try {
      const currentState = await this.getProjectState();
      const updatedState = {
        ...currentState,
        ...updates,
        metadata: {
          ...currentState.metadata,
          last_updated: new Date().toISOString()
        }
      };

      await fs.writeFile(this.projectStateFile, JSON.stringify(updatedState, null, 2));
      console.log("✅ Project state updated");
      return updatedState;
    } catch (error) {
      console.error(`Error updating project state: ${error.message}`);
      return null;
    }
  }

  async getTechnologyStack() {
    try {
      const content = await fs.readFile(this.technologyStackFile, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error reading technology stack: ${error.message}`);
      return null;
    }
  }

  async updateTechnologyStack(updates) {
    try {
      const currentStack = await this.getTechnologyStack();
      const updatedStack = this.deepMerge(currentStack, updates);

      await fs.writeFile(this.technologyStackFile, JSON.stringify(updatedStack, null, 2));
      console.log("✅ Technology stack updated");
      return updatedStack;
    } catch (error) {
      console.error(`Error updating technology stack: ${error.message}`);
      return null;
    }
  }

  async addTeamDecision(decisionType, decision) {
    try {
      const decisions = await this.getTeamDecisions();
      const newDecision = {
        id: `${decisionType.toUpperCase()}-${String(decisions[decisionType].length + 1).padStart(3, '0')}`,
        date: new Date().toISOString(),
        ...decision
      };

      decisions[decisionType].push(newDecision);
      await fs.writeFile(this.teamDecisionsFile, JSON.stringify(decisions, null, 2));
      
      console.log(`✅ Team decision added: ${newDecision.id}`);
      return newDecision;
    } catch (error) {
      console.error(`Error adding team decision: ${error.message}`);
      return null;
    }
  }

  async getTeamDecisions() {
    try {
      const content = await fs.readFile(this.teamDecisionsFile, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error reading team decisions: ${error.message}`);
      return null;
    }
  }

  async addBlocker(blocker) {
    try {
      const projectState = await this.getProjectState();
      const newBlocker = {
        id: `BLOCKER-${Date.now()}`,
        created: new Date().toISOString(),
        status: "open",
        ...blocker
      };

      projectState.blockers.push(newBlocker);
      await this.updateProjectState(projectState);
      
      console.log(`⚠️  Blocker added: ${newBlocker.id}`);
      return newBlocker;
    } catch (error) {
      console.error(`Error adding blocker: ${error.message}`);
      return null;
    }
  }

  async resolveBlocker(blockerId, resolution) {
    try {
      const projectState = await this.getProjectState();
      const blocker = projectState.blockers.find(b => b.id === blockerId);
      
      if (blocker) {
        blocker.status = "resolved";
        blocker.resolved_at = new Date().toISOString();
        blocker.resolution = resolution;
        
        await this.updateProjectState(projectState);
        console.log(`✅ Blocker resolved: ${blockerId}`);
        return blocker;
      } else {
        console.error(`Blocker not found: ${blockerId}`);
        return null;
      }
    } catch (error) {
      console.error(`Error resolving blocker: ${error.message}`);
      return null;
    }
  }

  async addMilestone(milestone) {
    try {
      const projectState = await this.getProjectState();
      const newMilestone = {
        id: `MILESTONE-${Date.now()}`,
        created: new Date().toISOString(),
        status: "pending",
        ...milestone
      };

      projectState.milestones.push(newMilestone);
      await this.updateProjectState(projectState);
      
      console.log(`🎯 Milestone added: ${newMilestone.id}`);
      return newMilestone;
    } catch (error) {
      console.error(`Error adding milestone: ${error.message}`);
      return null;
    }
  }

  async getFullContext() {
    return {
      project_state: await this.getProjectState(),
      technology_stack: await this.getTechnologyStack(),
      team_decisions: await this.getTeamDecisions()
    };
  }

  // Utility function for deep merging objects
  deepMerge(target, source) {
    const output = { ...target };
    
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    
    return output;
  }

  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
}

export { SharedContext };
