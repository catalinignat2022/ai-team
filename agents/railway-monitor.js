/**
 * Railway Deployment Monitor
 * Advanced monitoring system for Railway deployments with webhook integration
 */

const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

class RailwayMonitor {
  constructor(devopsAgent) {
    this.devopsAgent = devopsAgent;
    this.webhookSecret = process.env.RAILWAY_WEBHOOK_SECRET;
    this.railwayToken = process.env.RAILWAY_TOKEN;
    this.projectId = process.env.RAILWAY_PROJECT_ID;
    this.app = express();
    
    this.setupWebhooks();
    this.startHealthChecking();
    
    console.log('🚂 Railway Monitor initialized');
  }

  setupWebhooks() {
    this.app.use(express.raw({ type: 'application/json' }));
    
    // Railway webhook endpoint
    this.app.post('/webhook/railway', (req, res) => {
      this.handleRailwayWebhook(req, res);
    });
    
    // GitHub webhook for deployment triggers
    this.app.post('/webhook/github', (req, res) => {
      this.handleGitHubWebhook(req, res);
    });
    
    const port = process.env.WEBHOOK_PORT || 3002;
    this.app.listen(port, () => {
      console.log(`🎣 Railway webhooks listening on port ${port}`);
    });
  }

  async handleRailwayWebhook(req, res) {
    try {
      const signature = req.headers['x-railway-signature'];
      const payload = req.body;
      
      // Verify webhook signature
      if (!this.verifyRailwaySignature(payload, signature)) {
        return res.status(401).send('Unauthorized');
      }
      
      const event = JSON.parse(payload.toString());
      console.log('🚂 Railway webhook received:', event.type);
      
      await this.processRailwayEvent(event);
      res.status(200).send('OK');
      
    } catch (error) {
      console.error('❌ Railway webhook error:', error.message);
      res.status(500).send('Error processing webhook');
    }
  }

  async processRailwayEvent(event) {
    switch (event.type) {
      case 'deployment.failed':
        console.log('🚨 Deployment failed detected');
        await this.handleDeploymentFailure(event.data);
        break;
        
      case 'deployment.crashed':
        console.log('💥 Deployment crashed detected');
        await this.handleDeploymentCrash(event.data);
        break;
        
      case 'deployment.succeeded':
        console.log('✅ Deployment successful');
        await this.handleDeploymentSuccess(event.data);
        break;
        
      case 'service.updated':
        console.log('🔄 Service updated');
        await this.monitorServiceHealth(event.data);
        break;
    }
  }

  async handleDeploymentFailure(deploymentData) {
    const errorAnalysis = {
      type: 'DEPLOYMENT_FAILURE',
      deploymentId: deploymentData.id,
      projectId: deploymentData.projectId,
      error: deploymentData.error || 'Unknown deployment error',
      timestamp: new Date().toISOString(),
      buildLogs: await this.fetchBuildLogs(deploymentData.id)
    };
    
    console.log('🔍 Analyzing deployment failure...');
    const fixPlan = await this.devopsAgent.analyzeError(errorAnalysis.error);
    
    if (fixPlan.canAutoFix) {
      console.log('🤖 Attempting automatic repair...');
      const fixResult = await this.devopsAgent.executeAutoFix(fixPlan);
      
      if (fixResult.success) {
        console.log('✅ Deployment automatically repaired');
        await this.triggerRedeployment();
      } else {
        console.log('❌ Auto-repair failed, escalating...');
        await this.escalateFailure(errorAnalysis, fixResult);
      }
    }
  }

  async fetchBuildLogs(deploymentId) {
    try {
      const response = await axios.get(
        `https://backboard.railway.app/graphql`,
        {
          headers: {
            'Authorization': `Bearer ${this.railwayToken}`,
            'Content-Type': 'application/json'
          },
          data: {
            query: `{
              deployment(id: "${deploymentId}") {
                buildLogs
                deployLogs
                status
              }
            }`
          }
        }
      );
      
      return response.data?.data?.deployment?.buildLogs || 'No logs available';
    } catch (error) {
      console.error('Failed to fetch build logs:', error.message);
      return 'Log fetch failed';
    }
  }

  async triggerRedeployment() {
    try {
      const response = await axios.post(
        `https://backboard.railway.app/graphql`,
        {
          query: `mutation {
            serviceInstanceRedeploy(serviceId: "${this.projectId}") {
              id
            }
          }`
        },
        {
          headers: {
            'Authorization': `Bearer ${this.railwayToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('🚀 Redeployment triggered');
      return response.data;
    } catch (error) {
      console.error('❌ Failed to trigger redeployment:', error.message);
      throw error;
    }
  }

  verifyRailwaySignature(payload, signature) {
    if (!this.webhookSecret || !signature) return false;
    
    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(payload)
      .digest('hex');
      
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }

  // Event-driven health checking - only when needed
  startHealthChecking() {
    console.log('❤️ Event-driven health checking enabled');
    console.log('🎯 Health checks triggered only by error events or manual requests');
    
    // Remove continuous health checking - only respond to events
    // Health checks will be triggered by:
    // 1. Webhook error notifications
    // 2. Manual API requests
    // 3. Emergency situations detected by other systems
  }

  async performHealthCheck() {
    try {
      const healthUrl = process.env.RAILWAY_HEALTH_URL;
      if (!healthUrl) return;
      
      const response = await axios.get(healthUrl, { 
        timeout: 10000,
        validateStatus: (status) => status < 500 // Accept 4xx as "unhealthy but running"
      });
      
      if (response.status >= 400) {
        console.log(`⚠️ Health check warning: ${response.status}`);
        await this.handleUnhealthyStatus(response);
      } else {
        // console.log('✅ Health check passed');
      }
      
    } catch (error) {
      console.log('🚨 Health check failed:', error.message);
      await this.handleHealthCheckFailure(error);
    }
  }

  async handleUnhealthyStatus(response) {
    const issue = {
      type: 'UNHEALTHY_STATUS',
      status: response.status,
      data: response.data,
      timestamp: new Date().toISOString()
    };
    
    // Analyze the unhealthy response
    if (response.status === 503) {
      console.log('🔧 Service unavailable - checking for database issues');
      await this.checkDatabaseConnectivity();
    } else if (response.status >= 500) {
      console.log('💥 Server error detected - analyzing logs');
      await this.analyzeLiveErrors();
    }
  }

  async handleHealthCheckFailure(error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('🚨 Service completely down - initiating emergency restart');
      await this.emergencyRestart();
    } else if (error.code === 'ETIMEDOUT') {
      console.log('⏱️ Service timeout - checking resource constraints');
      await this.checkResourceUsage();
    }
  }

  async emergencyRestart() {
    console.log('🚑 Emergency restart initiated by DevOps AI');
    
    try {
      await this.triggerRedeployment();
      
      // Wait for restart and verify
      setTimeout(async () => {
        const isHealthy = await this.verifyRestartSuccess();
        if (isHealthy) {
          console.log('✅ Emergency restart successful');
        } else {
          console.log('❌ Emergency restart failed - escalating');
          await this.escalateEmergency();
        }
      }, 30000); // Wait 30 seconds for restart
      
    } catch (error) {
      console.error('❌ Emergency restart failed:', error.message);
      await this.escalateEmergency();
    }
  }

  async verifyRestartSuccess() {
    try {
      const response = await axios.get(process.env.RAILWAY_HEALTH_URL, { 
        timeout: 15000 
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async checkDatabaseConnectivity() {
    console.log('🔍 Checking database connectivity...');
    
    try {
      // Test MongoDB connection independently
      const mongoose = require('mongoose');
      const mongoURI = process.env.DATABASE_URL || process.env.MONGODB_URI;
      
      if (mongoURI) {
        await mongoose.connect(mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000
        });
        
        console.log('✅ Database connectivity confirmed');
        await mongoose.disconnect();
      }
    } catch (error) {
      console.log('❌ Database connection failed:', error.message);
      await this.fixDatabaseIssue(error);
    }
  }

  async fixDatabaseIssue(error) {
    console.log('🔧 Attempting database fix...');
    
    const dbFix = await this.devopsAgent.fixDatabaseConnection();
    if (dbFix.success) {
      console.log('✅ Database issue auto-fixed');
      await this.triggerRedeployment();
    } else {
      console.log('❌ Database fix failed - manual intervention required');
    }
  }
}

module.exports = RailwayMonitor;
