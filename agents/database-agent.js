#!/usr/bin/env node

/**
 * Database AI Agent - 20+ years Database Architecture Experience
 * Specialized in: MongoDB, PostgreSQL, MySQL, Redis, database design, optimization, and cloud deployment
 */

import Anthropic from '@anthropic-ai/sdk';
import { Octokit } from "@octokit/rest";
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

class DatabaseAgent {
  static CLAUDE_MODEL = "claude-sonnet-4-20250514";

  constructor() {
    this.config = {
      anthropicKey: process.env.ANTHROPIC_API_KEY,
      token: process.env.GITHUB_TOKEN,
      username: process.env.GITHUB_USERNAME
    };
    this.contextPath = path.join(process.cwd(), 'shared-context');
    this.octokit = null;
    this.anthropic = null;
  }

  async initialize() {
    console.log("🗄️ Database AI Agent (20+ years experience) initializing...");
    
    if (!this.config.anthropicKey || !this.config.token || !this.config.username) {
      throw new Error("Missing required environment variables");
    }

    this.octokit = new Octokit({ auth: this.config.token });
    this.anthropic = new Anthropic({ apiKey: this.config.anthropicKey });

    try {
      const { data: user } = await this.octokit.rest.users.getAuthenticated();
      console.log(`✅ GitHub authenticated as: ${user.login}`);
    } catch (error) {
      throw new Error(`GitHub authentication failed: ${error.message}`);
    }

    await fs.mkdir(this.contextPath, { recursive: true });
    console.log("🗄️ Database Agent ready for database architecture and deployment");
  }

  /**
   * Design and configure complete database infrastructure
   */
  async configureDatabase(projectRequirements, projectName) {
    console.log(`🗄️ Database Agent configuring database for: ${projectName}`);
    console.log(`📋 Requirements: ${projectRequirements}`);

    try {
      // Phase 1: Database Analysis & Selection
      console.log("\n🔍 Phase 1: Database technology selection...");
      const dbSelection = await this.selectDatabaseTechnology(projectRequirements);
      
      // Phase 2: Schema Design
      console.log("\n🏗️ Phase 2: Database schema design...");
      const schemaDesign = await this.designDatabaseSchema(projectRequirements, dbSelection);
      
      // Phase 3: Railway Database Setup
      console.log("\n☁️ Phase 3: Railway database deployment...");
      const railwayConfig = await this.setupRailwayDatabase(projectName, dbSelection);
      
      // Phase 4: Connection Configuration
      console.log("\n🔗 Phase 4: Database connection setup...");
      const connectionConfig = await this.createConnectionConfig(projectName, dbSelection, railwayConfig);
      
      // Phase 5: Environment Variables
      console.log("\n⚙️ Phase 5: Environment variables configuration...");
      await this.setupEnvironmentVariables(projectName, connectionConfig);
      
      return {
        agent: "Database AI Agent (20+ years)",
        project_name: projectName,
        database_type: dbSelection.selected_database,
        schema: schemaDesign.schema,
        railway_config: railwayConfig,
        connection_string: connectionConfig.connection_string,
        environment_setup: true,
        success: true,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ Database configuration failed: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async selectDatabaseTechnology(projectRequirements) {
    console.log("🔍 Analyzing project requirements for optimal database selection...");

    const DB_SELECTION_PROMPT = `Tu ești un Database Architect cu 20+ ani experiență în:

🗄️ **DATABASE EXPERTISE:**
- MongoDB, PostgreSQL, MySQL, Redis, Elasticsearch
- Cloud databases: AWS RDS, Google Cloud SQL, Railway
- Database design patterns și optimization
- Scalability, performance tuning, indexing strategies
- ACID compliance, transactions, data integrity

📋 **PROJECT REQUIREMENTS:**
${projectRequirements}

🎯 **TASK:** Selectează tehnologia de bază de date optimă pentru acest proiect.

**ANALYSIS CRITERIA:**
1. **Data Structure** - Relational vs Document vs Key-Value
2. **Scalability Requirements** - Expected load și growth
3. **ACID Requirements** - Transaction needs
4. **Performance** - Read/write patterns
5. **Development Speed** - Time to market
6. **Railway.com Compatibility** - Easy deployment
7. **Team Expertise** - Learning curve

**DELIVERABLES:**
1. **RECOMMENDED DATABASE:** Primary choice cu justificare
2. **ALTERNATIVE OPTIONS:** 2-3 alternatives cu pros/cons
3. **SCHEMA APPROACH:** Document/Relational structure recommendation
4. **RAILWAY DEPLOYMENT:** Specific Railway database service
5. **CONNECTION STRATEGY:** Connection pooling, environment setup
6. **PERFORMANCE OPTIMIZATION:** Indexing strategy, query optimization
7. **BACKUP & SECURITY:** Data protection recommendations

Răspunde ca un senior database architect cu focus pe production-ready solutions.`;

    try {
      const completion = await this.anthropic.messages.create({
        model: DatabaseAgent.CLAUDE_MODEL,
        max_tokens: 3000,
        temperature: 0.3,
        system: DB_SELECTION_PROMPT,
        messages: [
          { role: "user", content: `Select optimal database for: ${projectRequirements}` }
        ]
      });

      const dbAnalysis = completion.content[0].text;
      
      console.log("🗄️ Database Technology Analysis:");
      console.log(dbAnalysis);
      
      // Extract selected database type
      const selectedDb = this.extractDatabaseChoice(dbAnalysis);
      
      // Save database decision
      await this.saveDatabaseDecision(projectRequirements, dbAnalysis, selectedDb);

      return {
        database_analysis: dbAnalysis,
        selected_database: selectedDb,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error(`❌ Database selection failed: ${error.message}`);
      throw error;
    }
  }

  extractDatabaseChoice(analysis) {
    // Simple extraction logic - look for common database mentions
    const databases = ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'];
    const lowerAnalysis = analysis.toLowerCase();
    
    for (const db of databases) {
      if (lowerAnalysis.includes(db.toLowerCase()) && 
          (lowerAnalysis.includes('recommend') || lowerAnalysis.includes('primary choice'))) {
        return db;
      }
    }
    
    // Default fallback based on project type
    if (lowerAnalysis.includes('dating') || lowerAnalysis.includes('social')) {
      return 'MongoDB'; // Good for user profiles, flexible schema
    } else if (lowerAnalysis.includes('financial') || lowerAnalysis.includes('betting')) {
      return 'PostgreSQL'; // ACID compliance for transactions
    }
    
    return 'MongoDB'; // Default choice for rapid development
  }

  async designDatabaseSchema(projectRequirements, dbSelection) {
    console.log(`🏗️ Designing ${dbSelection.selected_database} schema...`);

    const SCHEMA_DESIGN_PROMPT = `Tu ești un Database Architect cu 20+ ani experiență specializat în ${dbSelection.selected_database}.

PROJECT: ${projectRequirements}
DATABASE: ${dbSelection.selected_database}

🎯 **TASK:** Creează schema completă de bază de date optimizată.

**SCHEMA REQUIREMENTS:**
1. **COLLECTIONS/TABLES:** Complete structure
2. **FIELDS/COLUMNS:** Data types, constraints, validation
3. **RELATIONSHIPS:** Foreign keys, references, embedding strategy
4. **INDEXES:** Performance optimization indexes
5. **VALIDATION:** Data integrity rules
6. **SEED DATA:** Sample data pentru testing

**DELIVERABLES:**
- Complete schema definition
- Database initialization script
- Sample data pentru development
- Performance optimization recommendations

Răspunde cu cod complet ready pentru implementation.`;

    try {
      const completion = await this.anthropic.messages.create({
        model: DatabaseAgent.CLAUDE_MODEL,
        max_tokens: 4000,
        temperature: 0.2,
        system: SCHEMA_DESIGN_PROMPT,
        messages: [
          { role: "user", content: `Design complete ${dbSelection.selected_database} schema for: ${projectRequirements}` }
        ]
      });

      const schemaDesign = completion.content[0].text;
      
      console.log("🏗️ Database Schema Design:");
      console.log(schemaDesign);

      return {
        schema: schemaDesign,
        database_type: dbSelection.selected_database,
        design_approach: "production-ready with optimization"
      };

    } catch (error) {
      console.error(`❌ Schema design failed: ${error.message}`);
      throw error;
    }
  }

  async setupRailwayDatabase(projectName, dbSelection) {
    console.log("☁️ Setting up Railway database service...");
    
    // Railway database configuration based on selected database
    const railwayDbConfig = {
      MongoDB: {
        service: "mongodb",
        version: "7.0",
        memory: "512MB",
        storage: "1GB"
      },
      PostgreSQL: {
        service: "postgresql", 
        version: "15",
        memory: "512MB",
        storage: "1GB"
      },
      MySQL: {
        service: "mysql",
        version: "8.0",
        memory: "512MB", 
        storage: "1GB"
      }
    };

    const dbType = dbSelection.selected_database;
    const config = railwayDbConfig[dbType] || railwayDbConfig.MongoDB;

    console.log(`📦 Railway ${dbType} Configuration:`);
    console.log(`   Service: ${config.service}`);
    console.log(`   Version: ${config.version}`);
    console.log(`   Memory: ${config.memory}`);
    console.log(`   Storage: ${config.storage}`);

    // Generate Railway database setup instructions
    const setupInstructions = `
🚂 **Railway Database Setup Instructions:**

1. **Add Database Service:**
   - Go to Railway dashboard: https://railway.app/
   - Open project: ${projectName}
   - Click "New Service" → "Database" → "${config.service}"
   
2. **Database Configuration:**
   - Version: ${config.version}
   - Memory: ${config.memory}
   - Storage: ${config.storage}
   
3. **Environment Variables (Auto-generated by Railway):**
   - DATABASE_URL (connection string)
   - DATABASE_HOST
   - DATABASE_PORT
   - DATABASE_NAME
   - DATABASE_USER
   - DATABASE_PASSWORD

4. **Connection String Format:**
   ${this.generateConnectionStringFormat(dbType)}
`;

    console.log(setupInstructions);

    return {
      database_type: dbType,
      railway_service: config.service,
      configuration: config,
      setup_instructions: setupInstructions,
      ready_for_backend: true
    };
  }

  generateConnectionStringFormat(dbType) {
    const formats = {
      MongoDB: "mongodb://username:password@host:port/database",
      PostgreSQL: "postgresql://username:password@host:port/database", 
      MySQL: "mysql://username:password@host:port/database"
    };
    
    return formats[dbType] || formats.MongoDB;
  }

  async createConnectionConfig(projectName, dbSelection, railwayConfig) {
    console.log("🔗 Creating database connection configuration...");

    const dbType = dbSelection.selected_database;
    
    // Generate connection configuration code
    const connectionCode = this.generateConnectionCode(dbType);
    
    // Create database configuration file for the project
    await this.createDatabaseConfigFile(projectName, connectionCode, dbType);

    return {
      database_type: dbType,
      connection_code: connectionCode,
      connection_string: `process.env.DATABASE_URL`,
      config_file_created: true
    };
  }

  generateConnectionCode(dbType) {
    const connectionConfigs = {
      MongoDB: `
// database/connection.js
const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const mongoURI = process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/defaultdb';
    
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      bufferCommands: false,
      bufferMaxEntries: 0
    };

    await mongoose.connect(mongoURI, options);
    console.log('✅ MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected');
    });
    
    return mongoose.connection;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDatabase };
`,
      PostgreSQL: `
// database/connection.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const connectDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL connected successfully');
    client.release();
    return pool;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { pool, connectDatabase };
`,
      MySQL: `
// database/connection.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000
});

const connectDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL connected successfully');
    connection.release();
    return pool;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { pool, connectDatabase };
`
    };

    return connectionConfigs[dbType] || connectionConfigs.MongoDB;
  }

  async createDatabaseConfigFile(projectName, connectionCode, dbType) {
    try {
      // Add database configuration to repository
      await this.octokit.rest.repos.createOrUpdateFileContents({
        owner: this.config.username,
        repo: projectName,
        path: 'database/connection.js',
        message: `Add ${dbType} database connection configuration`,
        content: Buffer.from(connectionCode).toString('base64')
      });

      console.log(`✅ Database configuration file created: database/connection.js`);
    } catch (error) {
      console.log(`⚠️ Could not create database config file: ${error.message}`);
    }
  }

  async setupEnvironmentVariables(projectName, connectionConfig) {
    console.log("⚙️ Setting up environment variables...");

    const envTemplate = `# Database Configuration
DATABASE_URL=your_railway_database_url_here
NODE_ENV=production

# Development Database (local)
# DATABASE_URL=mongodb://localhost:27017/${projectName}
# DATABASE_URL=postgresql://localhost:5432/${projectName}

# Database Connection Settings
DB_MAX_CONNECTIONS=10
DB_TIMEOUT=5000
DB_RETRY_ATTEMPTS=3

# Application Settings
PORT=3001
JWT_SECRET=your_jwt_secret_here
`;

    try {
      await this.octokit.rest.repos.createOrUpdateFileContents({
        owner: this.config.username,
        repo: projectName,
        path: '.env.example',
        message: 'Add database environment variables template',
        content: Buffer.from(envTemplate).toString('base64')
      });

      console.log(`✅ Environment variables template created`);
    } catch (error) {
      console.log(`⚠️ Could not create .env.example: ${error.message}`);
    }
  }

  async testDatabaseConnection(projectName, connectionConfig) {
    console.log("🧪 Creating database connection test...");

    const testCode = `
// test/database-test.js
const { connectDatabase } = require('../database/connection');

const testDatabaseConnection = async () => {
  console.log('🧪 Testing database connection...');
  
  try {
    await connectDatabase();
    console.log('✅ Database connection test PASSED');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection test FAILED:', error.message);
    process.exit(1);
  }
};

// Run test if called directly
if (require.main === module) {
  testDatabaseConnection();
}

module.exports = { testDatabaseConnection };
`;

    try {
      await this.octokit.rest.repos.createOrUpdateFileContents({
        owner: this.config.username,
        repo: projectName,
        path: 'test/database-test.js',
        message: 'Add database connection test',
        content: Buffer.from(testCode).toString('base64')
      });

      console.log(`✅ Database connection test created`);
    } catch (error) {
      console.log(`⚠️ Could not create database test: ${error.message}`);
    }
  }

  async saveDatabaseDecision(requirements, analysis, selectedDb) {
    try {
      const decision = {
        version: "1.0.0",
        created_at: new Date().toISOString(),
        project_requirements: requirements,
        database_analysis: analysis,
        selected_database: selectedDb,
        decided_by: "Database AI Agent (20+ years)",
        status: "database_configured"
      };

      const filePath = path.join(this.contextPath, "database-architecture-decision.json");
      await fs.writeFile(filePath, JSON.stringify(decision, null, 2));
      
      console.log("✅ Database architecture decision saved to shared context");
    } catch (error) {
      console.warn(`⚠️ Could not save database decision: ${error.message}`);
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
}

// CLI Interface
async function main() {
  const dbAgent = new DatabaseAgent();

  try {
    await dbAgent.initialize();
    
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      console.log("🗄️ Database AI Agent Commands:");
      console.log("  configure \"project requirements\" \"project-name\"  - Configure complete database");
      console.log("  select \"project requirements\"                     - Select optimal database technology");
      console.log("  schema \"requirements\" \"database-type\"           - Design database schema");
      console.log("\nExample:");
      console.log("  node database-agent.js configure \"Dating app with user profiles\" \"romanian-dating-app\"");
      return;
    }

    const command = args[0];
    const params = args.slice(1);

    switch (command) {
      case "configure":
        if (params.length >= 2) {
          const [requirements, projectName] = params;
          await dbAgent.configureDatabase(requirements, projectName);
        } else {
          console.log("❌ Missing requirements or project name");
        }
        break;
        
      case "select":
        if (params.length >= 1) {
          const requirements = params.join(" ");
          await dbAgent.selectDatabaseTechnology(requirements);
        } else {
          console.log("❌ Missing project requirements");
        }
        break;
        
      case "schema":
        if (params.length >= 2) {
          const requirements = params[0];
          const dbType = params[1];
          await dbAgent.designDatabaseSchema(requirements, { selected_database: dbType });
        } else {
          console.log("❌ Missing requirements or database type");
        }
        break;
        
      case "test":
        if (params.length >= 1) {
          const testProjectName = params[0];
          await dbAgent.testDatabaseConnection(testProjectName, "MongoDB");
        } else {
          console.log("❌ Missing project name for test");
        }
        break;
        
      default:
        console.log(`❌ Unknown command: ${command}`);
    }
    
  } catch (error) {
    console.error(`❌ Database Agent Error: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default DatabaseAgent;
