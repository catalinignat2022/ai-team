// Frontend API Routes for AI App Creator
const express = require('express');
const path = require('path');
const router = express.Router();

// Serve static frontend files
router.use(express.static(path.join(__dirname, '../frontend')));

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        service: 'AI App Creator',
        version: '1.0.0'
    });
});

// Main API endpoint for creating apps
router.post('/api/create-app', async (req, res) => {
    try {
        const { description, timestamp } = req.body;
        
        if (!description || description.trim().length < 10) {
            return res.status(400).json({
                error: 'Descrierea aplicației trebuie să aibă cel puțin 10 caractere',
                code: 'INVALID_DESCRIPTION'
            });
        }

        console.log(`🚀 New app creation request: ${description}`);
        
        // Here we'll integrate with the DevOps AI Agent
        const appCreationResult = await processAppCreation(description);
        
        res.json({
            success: true,
            message: 'Aplicația a fost procesată cu succes!',
            data: appCreationResult,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error creating app:', error);
        res.status(500).json({
            error: 'Eroare internă la crearea aplicației',
            details: error.message,
            code: 'INTERNAL_ERROR'
        });
    }
});

// Function to process app creation with AI Agent
async function processAppCreation(description) {
    const startTime = Date.now();
    
    try {
        // Step 1: Analyze the app description with AI
        const analysis = await analyzeAppDescription(description);
        
        // Step 2: Generate project structure
        const projectStructure = await generateProjectStructure(analysis);
        
        // Step 3: Create GitHub repository
        const repoInfo = await createGitHubRepository(analysis.appName, projectStructure);
        
        // Step 4: Set up Railway deployment
        const deploymentInfo = await setupRailwayDeployment(repoInfo);
        
        const processingTime = Date.now() - startTime;
        
        return {
            appName: analysis.appName,
            description: description,
            analysis: analysis,
            repository: repoInfo,
            deployment: deploymentInfo,
            processingTime: `${Math.round(processingTime / 1000)}s`,
            status: 'completed',
            nextSteps: [
                '✅ Repository created on GitHub',
                '✅ Basic project structure generated',
                '✅ Railway deployment configured',
                '🔄 CI/CD pipeline setting up',
                '📱 App will be live in 2-3 minutes'
            ]
        };
        
    } catch (error) {
        console.error('App creation failed:', error);
        throw new Error(`Procesarea aplicației a eșuat: ${error.message}`);
    }
}

// AI-powered app description analysis
async function analyzeAppDescription(description) {
    const patterns = {
        // App types
        chat: /chat|mesaj|conversație|discuț/i,
        ecommerce: /magazin|shop|vânzare|produs|e-commerce|ecommerce/i,
        social: /social|prieten|urmări|follow|like|post/i,
        education: /învăț|curs|școală|educație|student/i,
        productivity: /task|sarcin|productivity|organizare|planificare/i,
        dating: /dating|întâlnir|relații|cuplu|partener/i,
        finance: /bani|plată|banking|financiar|wallet/i,
        health: /sănătate|fitness|sport|medical|doctor/i
    };

    // Technologies detection
    const techPatterns = {
        realtime: /timp real|live|instant|notificar/i,
        auth: /autentificare|login|cont|utilizator/i,
        payments: /plată|plăți|payment|stripe|paypal/i,
        mobile: /mobil|android|ios|react native/i,
        ai: /ai|inteligent|recomandar|machine learning/i,
        video: /video|streaming|call|apel/i,
        location: /locație|gps|hartă|map/i
    };

    // Analyze app type
    let appType = 'general';
    let confidence = 0;
    
    for (const [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(description)) {
            appType = type;
            confidence = 0.8;
            break;
        }
    }

    // Detect required technologies
    const technologies = [];
    for (const [tech, pattern] of Object.entries(techPatterns)) {
        if (pattern.test(description)) {
            technologies.push(tech);
        }
    }

    // Generate app name from description
    const appName = generateAppName(description, appType);

    return {
        appName,
        appType,
        confidence,
        technologies,
        estimatedComplexity: calculateComplexity(technologies.length),
        suggestedStack: getSuggestedStack(appType, technologies),
        features: extractFeatures(description),
        timeline: getEstimatedTimeline(technologies.length)
    };
}

function generateAppName(description, appType) {
    // Extract key words and create a meaningful app name
    const words = description.toLowerCase()
        .replace(/vreau să creez|aplicație|app|care să/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3)
        .slice(0, 3);
    
    const typePrefix = {
        chat: 'Chat',
        ecommerce: 'Shop',
        social: 'Social',
        education: 'Learn',
        productivity: 'Task',
        dating: 'Love',
        finance: 'Money',
        health: 'Health'
    };

    const prefix = typePrefix[appType] || 'My';
    const suffix = words.join('').replace(/[^a-zA-Z]/g, '');
    
    return `${prefix}${suffix.charAt(0).toUpperCase() + suffix.slice(1)}App`;
}

function calculateComplexity(techCount) {
    if (techCount <= 2) return 'Simple';
    if (techCount <= 4) return 'Medium';
    return 'Complex';
}

function getSuggestedStack(appType, technologies) {
    const baseStack = {
        frontend: 'React.js',
        backend: 'Node.js + Express',
        database: 'MongoDB',
        hosting: 'Railway'
    };

    // Customize based on app type and technologies
    if (technologies.includes('realtime')) {
        baseStack.realtime = 'Socket.io';
    }
    
    if (technologies.includes('auth')) {
        baseStack.auth = 'JWT + bcrypt';
    }
    
    if (technologies.includes('payments')) {
        baseStack.payments = 'Stripe API';
    }
    
    if (technologies.includes('mobile')) {
        baseStack.mobile = 'React Native';
    }

    return baseStack;
}

function extractFeatures(description) {
    const features = [];
    
    const featurePatterns = {
        'User Authentication': /autentificare|login|cont|înregistrare/i,
        'Real-time Communication': /timp real|live|instant|chat/i,
        'Payment Processing': /plată|plăți|payment|cumpăr/i,
        'File Upload': /upload|încărcare|fișier|imagine/i,
        'Push Notifications': /notificar|alert|anunț/i,
        'Search Functionality': /căutare|search|filtrar/i,
        'Admin Dashboard': /admin|administrare|dashboard/i,
        'Mobile Responsive': /mobil|responsive|telefon/i
    };

    for (const [feature, pattern] of Object.entries(featurePatterns)) {
        if (pattern.test(description)) {
            features.push(feature);
        }
    }

    return features;
}

function getEstimatedTimeline(complexity) {
    const timelines = {
        0: '1-2 zile',
        1: '2-3 zile', 
        2: '3-5 zile',
        3: '5-7 zile',
        4: '1-2 săptămâni'
    };
    
    return timelines[Math.min(complexity, 4)] || '2+ săptămâni';
}

async function generateProjectStructure(analysis) {
    // Generate basic project structure based on analysis
    const structure = {
        type: 'fullstack-webapp',
        frontend: {
            framework: 'react',
            styling: 'tailwind',
            features: analysis.features
        },
        backend: {
            framework: 'express',
            database: 'mongodb',
            auth: analysis.technologies.includes('auth'),
            realtime: analysis.technologies.includes('realtime')
        },
        deployment: {
            platform: 'railway',
            environment: 'production'
        }
    };

    return structure;
}

async function createGitHubRepository(appName, structure) {
    // Mock GitHub repository creation
    // In production, this would use GitHub API
    const repoName = appName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    return {
        name: repoName,
        url: `https://github.com/ai-team/${repoName}`,
        status: 'created',
        visibility: 'public',
        structure: structure
    };
}

async function setupRailwayDeployment(repoInfo) {
    // Mock Railway deployment setup
    // In production, this would use Railway API
    const deployUrl = `https://${repoInfo.name}-production.up.railway.app`;
    
    return {
        url: deployUrl,
        status: 'deploying',
        environment: 'production',
        estimatedTime: '2-3 minutes'
    };
}

// Get app creation statistics
router.get('/api/stats', (req, res) => {
    // Mock statistics
    res.json({
        totalApps: Math.floor(Math.random() * 50) + 100,
        todayApps: Math.floor(Math.random() * 10) + 5,
        averageTime: '3.2 minutes',
        successRate: '98.5%',
        popularTypes: [
            { type: 'E-commerce', count: 45 },
            { type: 'Chat Apps', count: 38 },
            { type: 'Productivity', count: 32 }
        ]
    });
});

module.exports = router;
