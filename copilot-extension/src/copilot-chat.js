/**
 * Copilot Chat Integration
 * Handles communication between GitHub Copilot Chat and DevOps Agent
 */

export class CopilotChat {
  constructor({ devopsAgent, logger }) {
    this.devopsAgent = devopsAgent;
    this.logger = logger;
    this.supportedCommands = [
      'help', 'infrastructure', 'ci-cd', 'monitoring', 
      'security', 'costs', 'terraform', 'kubernetes',
      'create-repo', 'setup-pipeline', 'optimize-costs'
    ];
  }

  /**
   * Process message from Copilot Chat
   */
  async processMessage(messages, context = {}) {
    try {
      const latestMessage = messages[messages.length - 1];
      const userInput = latestMessage.content;
      
      this.logger.info('Processing Copilot Chat message', { 
        input: userInput,
        context: Object.keys(context)
      });

      // Parse command and intent
      const { command, intent, parameters } = this.parseUserInput(userInput);
      
      // Add Copilot Chat context to DevOps consultation
      const enhancedContext = {
        ...context,
        source: 'copilot-chat',
        command: command,
        intent: intent,
        conversationHistory: messages.slice(-3) // Last 3 messages for context
      };

      let response;

      switch (command) {
        case 'help':
          response = this.generateHelpResponse();
          break;
          
        case 'create-repo':
          response = await this.handleRepositoryCreation(parameters, enhancedContext);
          break;
          
        case 'infrastructure':
        case 'terraform':
          response = await this.handleInfrastructureQuery(userInput, enhancedContext);
          break;
          
        case 'ci-cd':
        case 'setup-pipeline':
          response = await this.handleCICDQuery(userInput, enhancedContext);
          break;
          
        case 'monitoring':
          response = await this.handleMonitoringQuery(userInput, enhancedContext);
          break;
          
        case 'security':
          response = await this.handleSecurityQuery(userInput, enhancedContext);
          break;
          
        case 'costs':
        case 'optimize-costs':
          response = await this.handleCostOptimization(userInput, enhancedContext);
          break;
          
        default:
          // General DevOps consultation
          response = await this.devopsAgent.consultDevOps(userInput, enhancedContext);
      }

      return this.formatCopilotResponse(response, command);
      
    } catch (error) {
      this.logger.error('Copilot Chat processing failed:', error);
      return this.generateErrorResponse(error);
    }
  }

  /**
   * Parse user input to extract command and intent
   */
  parseUserInput(input) {
    const lowerInput = input.toLowerCase();
    
    // Extract command
    let command = 'general';
    for (const cmd of this.supportedCommands) {
      if (lowerInput.includes(cmd.replace('-', ' ')) || lowerInput.includes(cmd)) {
        command = cmd;
        break;
      }
    }

    // Extract parameters for specific commands
    const parameters = {};
    
    if (command === 'create-repo') {
      const repoNameMatch = input.match(/repo(?:sitory)?\\s+(?:named?\\s+)?["']([^"']+)["']|repo(?:sitory)?\\s+(?:named?\\s+)?(\\S+)/i);
      if (repoNameMatch) {
        parameters.name = repoNameMatch[1] || repoNameMatch[2];
      }
    }

    // Determine intent
    const intent = this.determineIntent(lowerInput);

    return { command, intent, parameters };
  }

  determineIntent(input) {
    if (input.includes('how') || input.includes('setup') || input.includes('configure')) {
      return 'tutorial';
    }
    if (input.includes('create') || input.includes('generate') || input.includes('build')) {
      return 'creation';
    }
    if (input.includes('optimize') || input.includes('improve') || input.includes('reduce')) {
      return 'optimization';
    }
    if (input.includes('problem') || input.includes('issue') || input.includes('error')) {
      return 'troubleshooting';
    }
    return 'consultation';
  }

  /**
   * Generate help response
   */
  generateHelpResponse() {
    return {
      agent: "Romanian Dating DevOps Assistant",
      response: `# 🚀 Romanian Dating DevOps - Copilot Extension

Salut! Sunt expertul tău DevOps pentru aplicația de dating românească. Îți pot ajuta cu:

## 🏗️ **Infrastructure & Terraform**
\`@romanian-dating-devops setup terraform for 100K users\`
\`@romanian-dating-devops create EKS cluster configuration\`
\`@romanian-dating-devops design VPC for Romania\`

## 🚀 **CI/CD & Pipelines**
\`@romanian-dating-devops setup GitHub Actions for React Native\`
\`@romanian-dating-devops create deployment pipeline\`
\`@romanian-dating-devops configure blue-green deployment\`

## 📊 **Monitoring & Observability**
\`@romanian-dating-devops setup Prometheus for dating app\`
\`@romanian-dating-devops create Grafana dashboards\`
\`@romanian-dating-devops monitor real-time messaging\`

## 🔒 **Security & GDPR**
\`@romanian-dating-devops implement GDPR compliance\`
\`@romanian-dating-devops secure user data storage\`
\`@romanian-dating-devops setup network policies\`

## 💰 **Cost Optimization**
\`@romanian-dating-devops optimize AWS costs\`
\`@romanian-dating-devops setup spot instances\`
\`@romanian-dating-devops reduce infrastructure spending\`

## 📂 **Repository Management**
\`@romanian-dating-devops create repo "my-dating-service"\`
\`@romanian-dating-devops setup project structure\`

**Powered by Claude Sonnet 4** - Cel mai avansat model AI pentru DevOps expertise!`,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Handle repository creation requests
   */
  async handleRepositoryCreation(parameters, context) {
    if (!parameters.name) {
      return {
        agent: "DevOps Repository Creator",
        response: `# 📂 Repository Creation

Pentru a crea un repository, specifică numele:

\`@romanian-dating-devops create repo "nume-repository"\`

**Exemple:**
- \`create repo "romanian-dating-api"\`
- \`create repo "location-service"\`  
- \`create repo "chat-microservice"\`

Repository-ul va fi creat cu:
✅ Terraform configuration
✅ GitHub Actions CI/CD
✅ Kubernetes manifests
✅ Monitoring setup
✅ Security best practices
✅ GDPR compliance`,
        timestamp: new Date().toISOString()
      };
    }

    try {
      const repo = await this.devopsAgent.createRepository({
        name: parameters.name,
        description: `Romanian dating app component: ${parameters.name}`,
        private: false
      });

      return {
        agent: "DevOps Repository Creator",
        response: `# ✅ Repository Created Successfully!

**Repository:** [${parameters.name}](${repo.url})

## 🚀 **What's Included:**
- ✅ **Terraform** - Infrastructure as Code
- ✅ **GitHub Actions** - CI/CD pipeline  
- ✅ **Kubernetes** - Container orchestration
- ✅ **Docker** - Optimized containerization
- ✅ **Monitoring** - Prometheus configuration
- ✅ **Security** - GDPR compliance & best practices

## 📋 **Next Steps:**
1. Clone repository: \`git clone ${repo.cloneUrl}\`
2. Install dependencies: \`npm install\`
3. Configure environment: \`cp .env.example .env\`
4. Deploy infrastructure: \`terraform init && terraform apply\`

Repositorul este optimizat pentru aplicația de dating românească cu 100K+ utilizatori!`,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      return {
        agent: "DevOps Repository Creator",
        response: `# ❌ Repository Creation Failed

**Error:** ${error.message}

**Possible solutions:**
- Verifică dacă repository-ul nu există deja
- Asigură-te că ai permisiuni GitHub
- Încearcă un nume diferit pentru repository

**Retry cu:** \`@romanian-dating-devops create repo "alt-nume"\``,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Handle infrastructure queries
   */
  async handleInfrastructureQuery(input, context) {
    const infrastructurePrompt = `${input}

Context: Focus pe infrastructure-as-code pentru aplicația de dating românească.
Include Terraform configs, AWS setup pentru EU-West-1, și scalability pentru 100K+ users.`;

    return await this.devopsAgent.consultDevOps(infrastructurePrompt, {
      ...context,
      specialty: 'infrastructure',
      focus: ['terraform', 'aws', 'vpc', 'eks', 'scaling']
    });
  }

  /**
   * Handle CI/CD queries
   */
  async handleCICDQuery(input, context) {
    const cicdPrompt = `${input}

Context: Focus pe CI/CD pipelines pentru React Native + microservices.
Include GitHub Actions, deployment strategies, și Romanian market considerations.`;

    return await this.devopsAgent.consultDevOps(cicdPrompt, {
      ...context,
      specialty: 'cicd',
      focus: ['github-actions', 'deployment', 'react-native', 'microservices']
    });
  }

  /**
   * Handle monitoring queries
   */
  async handleMonitoringQuery(input, context) {
    const monitoringPrompt = `${input}

Context: Focus pe monitoring și observability pentru dating app.
Include Prometheus, Grafana, metrics pentru real-time messaging și location services.`;

    return await this.devopsAgent.consultDevOps(monitoringPrompt, {
      ...context,
      specialty: 'monitoring',
      focus: ['prometheus', 'grafana', 'alerting', 'real-time-metrics']
    });
  }

  /**
   * Handle security queries
   */
  async handleSecurityQuery(input, context) {
    const securityPrompt = `${input}

Context: Focus pe security și GDPR compliance pentru piața românească.
Include data encryption, network security, și user privacy protection.`;

    return await this.devopsAgent.consultDevOps(securityPrompt, {
      ...context,
      specialty: 'security',
      focus: ['gdpr', 'encryption', 'network-security', 'privacy']
    });
  }

  /**
   * Handle cost optimization queries
   */
  async handleCostOptimization(input, context) {
    const costPrompt = `${input}

Context: Focus pe cost optimization pentru startup-ul de dating din România.
Include spot instances, auto-scaling, și resource optimization strategies.`;

    return await this.devopsAgent.consultDevOps(costPrompt, {
      ...context,
      specialty: 'cost-optimization',
      focus: ['spot-instances', 'auto-scaling', 'resource-optimization', 'finops']
    });
  }

  /**
   * Format response for Copilot Chat
   */
  formatCopilotResponse(response, command) {
    const formattedResponse = typeof response === 'string' ? response : response.response;
    
    // Add command-specific formatting
    let formatted = formattedResponse;
    
    if (command === 'help') {
      formatted = response.response;
    } else {
      // Add header with agent info
      formatted = `## 🤖 DevOps Expert (Claude Sonnet 4)
*Specialized in Romanian Dating App Infrastructure*

${formattedResponse}

---
💡 **Need more help?** Type \`@romanian-dating-devops help\` for all available commands.`;
    }

    return formatted;
  }

  /**
   * Generate error response
   */
  generateErrorResponse(error) {
    return `# ❌ DevOps Consultation Error

**Error:** ${error.message}

**Possible solutions:**
- Verifică conexiunea la Claude Sonnet 4
- Asigură-te că API keys sunt configurate corect
- Încearcă din nou cu o întrebare mai specifică

**For help:** \`@romanian-dating-devops help\`

*Powered by Romanian Dating DevOps Extension*`;
  }
}
