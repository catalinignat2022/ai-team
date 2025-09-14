#!/usr/bin/env node

/**
 * Product Owner AI Agent - Requirements & Business Analysis Expert
 * 10+ years product management experience
 * Creates user stories, manages requirements, defines acceptance criteria
 */

import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

dotenv.config();

class ProductOwnerAgent {
  static CLAUDE_MODEL = "claude-sonnet-4-20250514";

  constructor() {
    this.anthropic = null;
    this.config = {
      anthropicKey: process.env.ANTHROPIC_API_KEY,
    };
    this.contextPath = "./shared-context";
  }

  async initialize() {
    console.log("📋 Product Owner AI Agent (10+ years) initializing...");
    
    if (!this.config.anthropicKey) {
      throw new Error("Anthropic API key not found. Please set ANTHROPIC_API_KEY environment variable.");
    }

    this.anthropic = new Anthropic({
      apiKey: this.config.anthropicKey,
    });

    console.log("✅ Product Owner ready for requirements analysis");
  }

  async analyzeRequirements(projectDescription) {
    console.log("📊 Analyzing project requirements...");
    
    const PRODUCT_OWNER_PROMPT = `Tu ești un Product Owner cu 10+ ani experiență în product management și business analysis.

EXPERTISE:
🎯 **PRODUCT STRATEGY:**
- Market research și competitive analysis
- User persona creation și user journey mapping
- Feature prioritization cu business value assessment
- MVP definition și roadmap planning

📋 **REQUIREMENTS ENGINEERING:**
- User stories cu acceptance criteria clare
- Non-functional requirements (performance, security, usability)
- Technical constraints și integration requirements
- Compliance și legal requirements

📊 **BUSINESS ANALYSIS:**
- ROI calculation și business case development
- Risk assessment și mitigation strategies
- Success metrics și KPI definition
- Stakeholder management și communication

🔄 **AGILE METHODOLOGY:**
- Sprint planning și backlog management
- Epic breakdown în user stories
- Definition of Done și acceptance criteria
- User acceptance testing coordination

Analizează cerințele proiectului și creează:

1. **PRODUCT VISION** - Ce problema rezolvă, vision statement
2. **USER PERSONAS** - Target users, needs, behaviors
3. **FEATURE BREAKDOWN** - Core features, nice-to-have, future
4. **USER STORIES** - Format: "As a [user], I want [goal] so that [benefit]"
5. **ACCEPTANCE CRITERIA** - Clear, testable conditions
6. **NON-FUNCTIONAL REQUIREMENTS** - Performance, security, scalability
7. **TECHNICAL REQUIREMENTS** - APIs needed, integrations, platforms
8. **SUCCESS METRICS** - KPIs, analytics, business goals
9. **RISK ASSESSMENT** - Technical și business risks
10. **MVP SCOPE** - Minimum viable product pentru first release

Răspunde ca un senior product owner care lucrează cu echipe de developeri.`;

    try {
      console.log("🤖 Product Owner analyzing requirements...\n");

      const completion = await this.anthropic.messages.create({
        model: ProductOwnerAgent.CLAUDE_MODEL,
        max_tokens: 3500,
        temperature: 0.3,
        system: PRODUCT_OWNER_PROMPT,
        messages: [
          { role: "user", content: projectDescription }
        ]
      });

      const analysis = completion.content[0].text;
      
      console.log("📋 Product Requirements Analysis:\n");
      console.log(analysis);
      console.log("\n" + "=".repeat(80) + "\n");

      // Save analysis to shared context
      await this.updateProductRequirements(analysis, projectDescription);

      return {
        agent: "Product Owner AI (10+ years)",
        project_description: projectDescription,
        requirements_analysis: analysis,
        timestamp: new Date().toISOString(),
        phase: "requirements_complete"
      };

    } catch (error) {
      console.error(`❌ Requirements analysis failed: ${error.message}`);
      return {
        agent: "Product Owner AI",
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async createUserStories(feature) {
    console.log(`📝 Creating user stories for: ${feature}`);
    
    const USER_STORIES_PROMPT = `Tu ești un Product Owner expert în scrierea user stories clare și actionable.

Creează user stories pentru feature: "${feature}"

Format pentru fiecare user story:
**User Story:** As a [user type], I want [goal] so that [benefit]
**Acceptance Criteria:**
- Given [context]
- When [action]  
- Then [outcome]
**Priority:** High/Medium/Low
**Effort Estimate:** Small/Medium/Large
**Dependencies:** [other features/stories]

Creează 3-5 user stories comprehensiv pentru această feature, considerând:
- Different user types și use cases
- Happy path și edge cases
- Error handling și validation
- Mobile și web considerations
- Accessibility requirements`;

    try {
      const completion = await this.anthropic.messages.create({
        model: ProductOwnerAgent.CLAUDE_MODEL,
        max_tokens: 2000,
        temperature: 0.3,
        system: USER_STORIES_PROMPT,
        messages: [
          { role: "user", content: feature }
        ]
      });

      const userStories = completion.content[0].text;
      
      console.log("📝 User Stories:\n");
      console.log(userStories);
      console.log("\n" + "=".repeat(80) + "\n");

      // Save to shared context
      await this.saveUserStories(feature, userStories);

      return {
        feature,
        user_stories: userStories,
        created_by: "Product Owner AI",
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ User stories creation failed: ${error.message}`);
      return {
        error: error.message,
        feature
      };
    }
  }

  async defineAcceptanceCriteria(userStory) {
    console.log("✅ Defining detailed acceptance criteria...");
    
    const ACCEPTANCE_CRITERIA_PROMPT = `Tu ești un Product Owner cu expertise în QA și testing.

Pentru user story: "${userStory}"

Creează acceptance criteria detaliate folosind format:

**GIVEN-WHEN-THEN Format:**
- Given [precondition]
- When [action/trigger]
- Then [expected result]

**CHECKLIST Format:**
✅ [Specific testable condition]
✅ [Another testable condition]

**EDGE CASES:**
- [Boundary conditions]
- [Error scenarios]
- [Integration points]

**NON-FUNCTIONAL CRITERIA:**
- Performance (loading times, response times)
- Security (authentication, authorization)
- Usability (accessibility, mobile responsiveness)
- Compatibility (browsers, devices)

Fii specific, measurable, și testable. Include și negative test cases.`;

    try {
      const completion = await this.anthropic.messages.create({
        model: ProductOwnerAgent.CLAUDE_MODEL,
        max_tokens: 1500,
        temperature: 0.2,
        system: ACCEPTANCE_CRITERIA_PROMPT,
        messages: [
          { role: "user", content: userStory }
        ]
      });

      const criteria = completion.content[0].text;
      
      console.log("✅ Detailed Acceptance Criteria:\n");
      console.log(criteria);

      return {
        user_story: userStory,
        acceptance_criteria: criteria,
        created_by: "Product Owner AI",
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ Acceptance criteria creation failed: ${error.message}`);
      return { error: error.message };
    }
  }

  async prioritizeFeatures(features) {
    console.log("📊 Prioritizing features based on business value...");
    
    const PRIORITIZATION_PROMPT = `Tu ești un Product Owner expert în feature prioritization.

Features list: ${JSON.stringify(features)}

Prioritizează folosind:

**MoSCoW Method:**
- Must Have (Critical pentru MVP)
- Should Have (Important dar nu critical)
- Could Have (Nice to have)
- Won't Have (Future releases)

**Value vs Effort Matrix:**
- High Value, Low Effort (Quick Wins)
- High Value, High Effort (Major Projects)  
- Low Value, Low Effort (Fill-ins)
- Low Value, High Effort (Questionable)

Pentru fiecare feature, include:
1. **Business Value Score** (1-10)
2. **Development Effort** (1-10)
3. **User Impact** (High/Medium/Low)
4. **Technical Risk** (High/Medium/Low)
5. **Dependencies** (Other features)
6. **Recommended Priority** (Must/Should/Could/Won't)
7. **Rationale** (Why this priority)

Recomandă și release planning (MVP, v1.1, v1.2, etc.)`;

    try {
      const completion = await this.anthropic.messages.create({
        model: ProductOwnerAgent.CLAUDE_MODEL,
        max_tokens: 2500,
        temperature: 0.3,
        system: PRIORITIZATION_PROMPT,
        messages: [
          { role: "user", content: `Prioritize these features: ${features.join(", ")}` }
        ]
      });

      const prioritization = completion.content[0].text;
      
      console.log("📊 Feature Prioritization:\n");
      console.log(prioritization);

      await this.saveFeaturePrioritization(features, prioritization);

      return {
        features,
        prioritization,
        created_by: "Product Owner AI",
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ Feature prioritization failed: ${error.message}`);
      return { error: error.message };
    }
  }

  async updateProductRequirements(analysis, originalDescription) {
    try {
      await fs.mkdir(this.contextPath, { recursive: true });
      
      const requirements = {
        version: "1.0.0",
        created_at: new Date().toISOString(),
        original_description: originalDescription,
        product_analysis: analysis,
        created_by: "Product Owner AI",
        status: "requirements_defined"
      };

      const filePath = path.join(this.contextPath, "product-requirements.json");
      await fs.writeFile(filePath, JSON.stringify(requirements, null, 2));
      
      console.log("✅ Product requirements saved to shared context");
    } catch (error) {
      console.warn(`⚠️ Could not save product requirements: ${error.message}`);
    }
  }

  async saveUserStories(feature, userStories) {
    try {
      const storiesData = {
        feature,
        user_stories: userStories,
        created_at: new Date().toISOString(),
        created_by: "Product Owner AI"
      };

      const fileName = `user-stories-${feature.toLowerCase().replace(/\s+/g, '-')}.json`;
      const filePath = path.join(this.contextPath, fileName);
      await fs.writeFile(filePath, JSON.stringify(storiesData, null, 2));
      
      console.log(`✅ User stories saved: ${fileName}`);
    } catch (error) {
      console.warn(`⚠️ Could not save user stories: ${error.message}`);
    }
  }

  async saveFeaturePrioritization(features, prioritization) {
    try {
      const priorityData = {
        features,
        prioritization,
        created_at: new Date().toISOString(),
        created_by: "Product Owner AI"
      };

      const filePath = path.join(this.contextPath, "feature-prioritization.json");
      await fs.writeFile(filePath, JSON.stringify(priorityData, null, 2));
      
      console.log("✅ Feature prioritization saved to shared context");
    } catch (error) {
      console.warn(`⚠️ Could not save feature prioritization: ${error.message}`);
    }
  }
}

// CLI Interface
async function main() {
  const productOwner = new ProductOwnerAgent();

  try {
    await productOwner.initialize();
    
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.log("📋 Product Owner AI Agent Commands:");
      console.log("  analyze \"project description\"     - Analyze requirements");
      console.log("  stories \"feature name\"           - Create user stories");
      console.log("  criteria \"user story\"            - Define acceptance criteria");
      console.log("  prioritize \"feature1,feature2\"   - Prioritize features");
      console.log("\nExample:");
      console.log("  node product-owner-agent.js analyze \"Dating app for Romania\"");
      return;
    }

    const [command, ...params] = args;
    
    switch (command) {
      case "analyze":
        if (params.length > 0) {
          const description = params.join(" ");
          await productOwner.analyzeRequirements(description);
        } else {
          console.log("❌ Missing project description");
        }
        break;
        
      case "stories":
        if (params.length > 0) {
          const feature = params.join(" ");
          await productOwner.createUserStories(feature);
        } else {
          console.log("❌ Missing feature name");
        }
        break;
        
      case "criteria":
        if (params.length > 0) {
          const userStory = params.join(" ");
          await productOwner.defineAcceptanceCriteria(userStory);
        } else {
          console.log("❌ Missing user story");
        }
        break;
        
      case "prioritize":
        if (params.length > 0) {
          const featuresStr = params.join(" ");
          const features = featuresStr.split(",").map(f => f.trim());
          await productOwner.prioritizeFeatures(features);
        } else {
          console.log("❌ Missing features list (comma-separated)");
        }
        break;
        
      default:
        console.log(`❌ Unknown command: ${command}`);
    }
    
  } catch (error) {
    console.error(`❌ Product Owner Error: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default ProductOwnerAgent;
