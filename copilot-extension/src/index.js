#!/usr/bin/env node

/**
 * Romanian Dating DevOps - GitHub Copilot Extension
 * Integrates Claude Sonnet 4 DevOps expertise with GitHub Copilot Chat
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { Octokit } from '@octokit/rest';
import Anthropic from '@anthropic-ai/sdk';
import winston from 'winston';
import { DevOpsAgent } from './devops-agent.js';
import { CopilotChat } from './copilot-chat.js';
import { validateRequest } from './middleware/validation.js';
import { authenticateApp } from './middleware/auth.js';

dotenv.config();

// Configure logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

class RomanianDatingDevOpsCopilotExtension {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    
    // Initialize services
    this.devopsAgent = new DevOpsAgent({
      anthropicKey: process.env.ANTHROPIC_API_KEY,
      githubToken: process.env.GITHUB_TOKEN
    });
    
    this.copilotChat = new CopilotChat({
      devopsAgent: this.devopsAgent,
      logger: logger
    });
    
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    // Security middleware
    this.app.use(helmet());
    this.app.use(cors());
    
    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    
    // Request logging
    this.app.use((req, res, next) => {
      logger.info(`${req.method} ${req.path}`, {
        userAgent: req.get('User-Agent'),
        ip: req.ip
      });
      next();
    });
  }

  setupRoutes() {
    // Health check
    this.app.get('/health', (req, res) => {
      res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0'
      });
    });

    // GitHub App webhook endpoint
    this.app.post('/github/webhooks', 
      authenticateApp,
      validateRequest,
      async (req, res) => {
        try {
          const { body, headers } = req;
          const event = headers['x-github-event'];
          
          logger.info(`Received GitHub webhook: ${event}`, { 
            action: body.action,
            repository: body.repository?.name 
          });

          await this.handleGitHubWebhook(event, body);
          res.status(200).json({ received: true });
          
        } catch (error) {
          logger.error('Webhook processing failed:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    );

    // Copilot Chat endpoint - main extension interface
    this.app.post('/copilot/chat',
      authenticateApp,
      validateRequest,
      async (req, res) => {
        try {
          const { messages, context } = req.body;
          
          logger.info('Copilot Chat request received', {
            messageCount: messages?.length,
            hasContext: !!context
          });

          const response = await this.copilotChat.processMessage(messages, context);
          
          res.setHeader('Content-Type', 'text/event-stream');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Connection', 'keep-alive');
          
          // Stream response for better UX
          await this.streamResponse(res, response);
          
        } catch (error) {
          logger.error('Copilot Chat processing failed:', error);
          res.status(500).json({ 
            error: 'DevOps consultation failed',
            message: error.message 
          });
        }
      }
    );

    // Direct DevOps consultation endpoint
    this.app.post('/devops/consult',
      authenticateApp,
      async (req, res) => {
        try {
          const { question, context } = req.body;
          
          if (!question) {
            return res.status(400).json({ error: 'Question is required' });
          }

          logger.info('Direct DevOps consultation', { question });

          const consultation = await this.devopsAgent.consultDevOps(question, context);
          res.json(consultation);
          
        } catch (error) {
          logger.error('DevOps consultation failed:', error);
          res.status(500).json({ 
            error: 'Consultation failed',
            message: error.message 
          });
        }
      }
    );

    // Repository creation endpoint
    this.app.post('/devops/create-repo',
      authenticateApp,
      async (req, res) => {
        try {
          const { name, description, template, setupAITeam } = req.body;
          
          if (!name) {
            return res.status(400).json({ error: 'Repository name is required' });
          }

          logger.info('Repository creation request', { name, setupAITeam });

          const result = await this.devopsAgent.createRepository({
            name,
            description: description || `Romanian dating app infrastructure: ${name}`,
            template
          });

          if (setupAITeam) {
            await this.devopsAgent.setupAITeam(name);
          }

          res.json(result);
          
        } catch (error) {
          logger.error('Repository creation failed:', error);
          res.status(500).json({ 
            error: 'Repository creation failed',
            message: error.message 
          });
        }
      }
    );

    // Extension configuration
    this.app.get('/copilot/extension-config', (req, res) => {
      res.json({
        name: 'Romanian Dating DevOps',
        description: 'Expert DevOps consultation powered by Claude Sonnet 4',
        trigger: '@romanian-dating-devops',
        capabilities: [
          'Infrastructure setup (Terraform, Kubernetes)',
          'CI/CD pipeline creation (GitHub Actions)',
          'Monitoring & alerting (Prometheus, Grafana)',
          'Security & GDPR compliance',
          'Cost optimization strategies',
          'Performance tuning',
          'Romanian market-specific guidance'
        ],
        examples: [
          '@romanian-dating-devops setup CI/CD for React Native app',
          '@romanian-dating-devops create Terraform for 100K users',
          '@romanian-dating-devops optimize costs for staging',
          '@romanian-dating-devops setup monitoring stack'
        ]
      });
    });

    // Error handling
    this.app.use((error, req, res, next) => {
      logger.error('Unhandled error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        requestId: req.id 
      });
    });
  }

  async handleGitHubWebhook(event, body) {
    switch (event) {
      case 'installation':
        if (body.action === 'created') {
          logger.info('Extension installed', { 
            installation: body.installation.id,
            account: body.installation.account.login 
          });
        }
        break;
        
      case 'installation_repositories':
        logger.info('Repository access changed', {
          action: body.action,
          repositories: body.repositories_added?.map(r => r.name)
        });
        break;
        
      default:
        logger.debug(`Unhandled webhook event: ${event}`);
    }
  }

  async streamResponse(res, response) {
    const chunks = response.split(' ');
    
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i] + (i < chunks.length - 1 ? ' ' : '');
      
      res.write(`data: ${JSON.stringify({
        type: 'content',
        content: chunk
      })}\\n\\n`);
      
      // Small delay for streaming effect
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    res.write(`data: ${JSON.stringify({ type: 'done' })}\\n\\n`);
    res.end();
  }

  async start() {
    try {
      await this.devopsAgent.initialize();
      
      this.app.listen(this.port, () => {
        logger.info(`🚀 Romanian Dating DevOps Copilot Extension started on port ${this.port}`);
        logger.info(`🤖 Claude Sonnet 4 integration: ${this.devopsAgent.isClaudeReady ? '✅' : '❌'}`);
        logger.info(`🐙 GitHub integration: ${this.devopsAgent.isGitHubReady ? '✅' : '❌'}`);
      });
      
    } catch (error) {
      logger.error('Failed to start extension:', error);
      process.exit(1);
    }
  }
}

// Start the extension
const extension = new RomanianDatingDevOpsCopilotExtension();
extension.start().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

export default RomanianDatingDevOpsCopilotExtension;
