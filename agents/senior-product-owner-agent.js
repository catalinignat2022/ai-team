/**
 * Senior Product Owner AI Agent - 15+ Years Experience (Dynamic Version)
 * Expert in product strategy, user requirements, and stakeholder alignment
 * 
 * NO HARDCODED APP TYPES - Fully dynamic analysis based on user requirements
 */

const SeniorDesignerAgent = require('./senior-designer-agent');

class SeniorProductOwnerAgent {
  constructor() {
    this.name = "Senior Product Owner AI Agent";
    this.experience = "15+ years";
    this.specialties = [
      'Dynamic Product Strategy & Vision',
      'AI-Powered User Story Generation',
      'Adaptive Market Research & Analysis',
      'Intelligent Stakeholder Management',
      'Dynamic Product Analytics & KPI Definition',
      'AI-Driven User Research & Persona Development',
      'Adaptive Feature Prioritization',
      'Dynamic A/B Testing Strategy',
      'AI-Powered Go-to-Market Strategy',
      'Cross-functional Team Leadership',
      'Agile/Scrum Methodologies'
    ];
    
    this.philosophy = 'Adapt to any user requirements through AI-powered analysis and dynamic strategy generation';
    
    console.log('🎯 Senior Product Owner AI Agent initialized (Dynamic Mode)');
    console.log(`📚 Experience: ${this.experience}`);
    console.log('🚀 Philosophy: Dynamic adaptation to ANY user requirements');
  }

  // Main method - completely dynamic analysis
  async createProductRequirements(userDescription) {
    console.log('📋 Creating dynamic product requirements...');
    
    const analysis = await this.performDynamicAnalysis(userDescription);
    
    const requirements = {
      productVision: await this.defineProductVision(userDescription, analysis),
      targetAudience: await this.identifyTargetAudience(userDescription, analysis),
      coreFeatures: await this.extractCoreFeatures(userDescription, analysis),
      userStories: await this.generateUserStories(userDescription, analysis),
      businessGoals: await this.defineBusinessGoals(userDescription, analysis),
      successMetrics: await this.defineSuccessMetrics(userDescription, analysis),
      developmentPriorities: await this.prioritizeFeatures(userDescription, analysis)
    };
    
    console.log('✅ Dynamic product requirements created');
    return requirements;
  }

  // Alias for backward compatibility with DevOps agent
  async analyzeProductRequirements(userDescription) {
    console.log('📊 Analyzing product requirements dynamically...');
    return await this.createProductRequirements(userDescription);
  }

  // Set designer collaborator (for DevOps agent compatibility)
  setDesignerCollaborator(designerAgent) {
    console.log('🤝 Setting designer collaborator...');
    this.designerAgent = designerAgent;
  }

  // Collaborate with designer (for DevOps agent compatibility)
  async collaborateWithDesigner(productRequirements) {
    console.log('🤝 Collaborating with designer agent...');
    if (this.designerAgent) {
      const designSystem = await this.designerAgent.createDesignSystem(productRequirements);
      return {
        designCollaboration: {
          designBrief: productRequirements,
          designSystem: designSystem
        }
      };
    }
    return {
      designCollaboration: {
        designBrief: productRequirements,
        designSystem: null
      }
    };
  }

  // Define product vision and mission dynamically
  async defineProductVision(userDescription, analysis) {
    console.log('🧠 Generating dynamic product vision...');
    
    const problemStatement = this.extractProblemStatement(userDescription);
    const generatedVision = await this.generateDynamicVision(userDescription, analysis);
    
    return {
      productVision: generatedVision.vision,
      missionStatement: generatedVision.mission,
      valueProposition: generatedVision.valueProposition,
      problemStatement: problemStatement,
      targetOutcome: await this.defineTargetOutcome(analysis, userDescription)
    };
  }

  // Generate dynamic vision based on user requirements
  async generateDynamicVision(userDescription, analysis) {
    console.log('🧠 Generating dynamic product vision from requirements...');
    
    const purpose = this.extractPurpose(userDescription);
    const target = this.extractTargetUser(userDescription);
    const value = this.extractValueProposition(userDescription);
    
    return {
      vision: `To ${purpose} for ${target} through innovative and user-centered design`,
      mission: `Creating solutions that address real user needs while delivering exceptional value and experience`,
      valueProposition: `${value} with outstanding design and seamless functionality`
    };
  }

  // Extract purpose from user description
  extractPurpose(description) {
    const purposeKeywords = {
      'help': 'empower users',
      'solve': 'solve problems',
      'manage': 'organize and manage',
      'create': 'enable creation',
      'connect': 'connect people',
      'learn': 'facilitate learning',
      'track': 'monitor and track',
      'calculate': 'perform calculations',
      'organize': 'organize information'
    };
    
    const lowerDesc = description.toLowerCase();
    for (const [keyword, purpose] of Object.entries(purposeKeywords)) {
      if (lowerDesc.includes(keyword)) {
        return purpose;
      }
    }
    return 'enhance user productivity and satisfaction';
  }

  // Extract target user from description
  extractTargetUser(description) {
    const userKeywords = {
      'student': 'students and learners',
      'business': 'professionals and businesses',
      'personal': 'individuals seeking personal solutions',
      'team': 'teams and collaborators',
      'family': 'families and households',
      'developer': 'developers and technical users'
    };
    
    const lowerDesc = description.toLowerCase();
    for (const [keyword, target] of Object.entries(userKeywords)) {
      if (lowerDesc.includes(keyword)) {
        return target;
      }
    }
    return 'users seeking efficient solutions';
  }

  // Extract value proposition from description
  extractValueProposition(description) {
    const valueKeywords = {
      'fast': 'Deliver results quickly and efficiently',
      'easy': 'Provide simple and intuitive experience',
      'secure': 'Ensure security and privacy',
      'beautiful': 'Offer beautiful and engaging interface',
      'smart': 'Leverage intelligent features',
      'reliable': 'Guarantee reliable performance'
    };
    
    const lowerDesc = description.toLowerCase();
    for (const [keyword, value] of Object.entries(valueKeywords)) {
      if (lowerDesc.includes(keyword)) {
        return value;
      }
    }
    return 'Solve user needs effectively';
  }

  // Perform dynamic analysis instead of hardcoded detection
  async performDynamicAnalysis(description) {
    console.log('🧠 Performing dynamic analysis of user requirements...');
    
    if (!description || typeof description !== 'string') {
      console.warn('⚠️ Product Owner: No description provided for analysis');
      return { category: 'general', confidence: 0.5, features: [] };
    }
    
    const features = this.extractRequiredFeatures(description);
    const category = this.analyzeCategory(description, features);
    const complexity = this.assessComplexity(description, features);
    
    return {
      category: category,
      confidence: 0.8,
      features: features,
      complexity: complexity,
      userIntent: this.extractUserIntent(description)
    };
  }

  // Extract required features from description
  extractRequiredFeatures(description) {
    const featureKeywords = {
      'authentication': ['login', 'register', 'auth', 'user', 'account', 'profile'],
      'data_management': ['save', 'store', 'database', 'crud', 'manage', 'organize'],
      'calculation': ['calculate', 'compute', 'math', 'operation', 'formula'],
      'visualization': ['chart', 'graph', 'display', 'show', 'visual'],
      'communication': ['message', 'chat', 'notify', 'send', 'communicate'],
      'search': ['search', 'find', 'filter', 'query', 'lookup'],
      'file_handling': ['upload', 'download', 'file', 'document', 'import', 'export'],
      'real_time': ['real-time', 'live', 'instant', 'immediate', 'sync']
    };
    
    const lowerDesc = description.toLowerCase();
    const detectedFeatures = [];
    
    for (const [feature, keywords] of Object.entries(featureKeywords)) {
      if (keywords.some(keyword => lowerDesc.includes(keyword))) {
        detectedFeatures.push(feature);
      }
    }
    
    return detectedFeatures.length > 0 ? detectedFeatures : ['basic_functionality'];
  }

  // Analyze category dynamically based on content and features
  analyzeCategory(description, features) {
    const lowerDesc = description.toLowerCase();
    
    const categoryScores = {};
    const categoryKeywords = {
      'computation': ['math', 'calculate', 'compute', 'formula', 'operation', 'number'],
      'productivity': ['task', 'manage', 'organize', 'plan', 'schedule', 'work'],
      'social': ['social', 'friend', 'share', 'community', 'connect', 'follow'],
      'ecommerce': ['shop', 'buy', 'sell', 'product', 'cart', 'payment'],
      'entertainment': ['game', 'play', 'fun', 'entertainment', 'music', 'video'],
      'utility': ['tool', 'utility', 'convert', 'transform', 'helper'],
      'information': ['news', 'info', 'data', 'display', 'show', 'weather']
    };
    
    // Calculate scores for each category
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      let score = 0;
      keywords.forEach(keyword => {
        if (lowerDesc.includes(keyword)) score += 1;
      });
      categoryScores[category] = score;
    }
    
    // Find highest scoring category
    const bestCategory = Object.keys(categoryScores).reduce((a, b) => 
      categoryScores[a] > categoryScores[b] ? a : b
    );
    
    return categoryScores[bestCategory] > 0 ? bestCategory : 'general';
  }

  // Extract user intent from description
  extractUserIntent(description) {
    const intentKeywords = {
      'create': 'creation',
      'manage': 'management', 
      'share': 'sharing',
      'find': 'discovery',
      'learn': 'education',
      'communicate': 'communication',
      'organize': 'organization'
    };
    
    const lowerDesc = description.toLowerCase();
    for (const [keyword, intent] of Object.entries(intentKeywords)) {
      if (lowerDesc.includes(keyword)) {
        return intent;
      }
    }
    return 'general_use';
  }

  // Assess complexity based on features and description
  assessComplexity(description, features) {
    let complexityScore = features.length;
    
    const complexityIndicators = ['integration', 'api', 'real-time', 'authentication', 'database'];
    complexityIndicators.forEach(indicator => {
      if (description.toLowerCase().includes(indicator)) {
        complexityScore += 1;
      }
    });
    
    if (complexityScore <= 2) return 'simple';
    if (complexityScore <= 5) return 'medium';
    return 'complex';
  }

  // Dynamic target outcome definition
  async defineTargetOutcome(analysis, description) {
    console.log('🎯 Defining target outcome dynamically...');
    
    const outcomes = {
      'computation': 'Accurate and efficient calculations with excellent user experience',
      'productivity': 'Improved efficiency and reduced time waste for users',
      'social': 'Active user engagement and meaningful connections',
      'ecommerce': 'Increased conversions and customer satisfaction',
      'entertainment': 'High user engagement and retention through fun experiences',
      'utility': 'Simplified workflows and enhanced productivity',
      'information': 'Quick access to relevant and timely information'
    };
    
    return outcomes[analysis.category] || 'Enhanced user experience and business value';
  }

  // Dynamic problem statement extraction
  extractProblemStatement(description) {
    if (!description || typeof description !== 'string') {
      return 'Solving general user needs for web application';
    }
    
    return `Solving user needs identified in: "${description.substring(0, 150)}..."`;
  }

  // All remaining methods adapted for dynamic behavior...
  async identifyTargetAudience(userDescription, analysis) {
    console.log('👥 Identifying target audience dynamically...');
    
    return {
      primaryAudience: this.extractTargetUser(userDescription),
      demographics: this.extractDemographics(userDescription),
      userNeeds: analysis.features,
      painPoints: this.extractPainPoints(userDescription),
      goals: this.extractUserGoals(userDescription)
    };
  }

  async extractCoreFeatures(userDescription, analysis) {
    console.log('⚙️ Extracting core features dynamically...');
    
    return analysis.features.map(feature => ({
      name: this.humanizeFeatureName(feature),
      description: this.generateFeatureDescription(feature, userDescription),
      priority: this.calculateFeaturePriority(feature, analysis),
      complexity: this.assessFeatureComplexity(feature)
    }));
  }

  async generateUserStories(userDescription, analysis) {
    console.log('📝 Generating user stories dynamically...');
    
    return analysis.features.map(feature => ({
      feature: this.humanizeFeatureName(feature),
      story: this.generateStoryForFeature(feature, userDescription),
      acceptanceCriteria: this.generateAcceptanceCriteria(feature),
      priority: this.calculateFeaturePriority(feature, analysis)
    }));
  }

  // Helper methods for dynamic generation
  humanizeFeatureName(feature) {
    return feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  generateFeatureDescription(feature, description) {
    const templates = {
      'authentication': 'User registration and login system',
      'data_management': 'Data storage and management capabilities',
      'calculation': 'Mathematical computation functionality',
      'visualization': 'Data visualization and display features',
      'communication': 'Communication and messaging features',
      'search': 'Search and filtering capabilities',
      'file_handling': 'File upload and management features',
      'real_time': 'Real-time updates and synchronization'
    };
    
    return templates[feature] || `${this.humanizeFeatureName(feature)} functionality`;
  }

  generateStoryForFeature(feature, description) {
    const storyTemplates = {
      'authentication': 'As a user, I want to create an account so that I can access personalized features',
      'data_management': 'As a user, I want to save my data so that I can access it later',
      'calculation': 'As a user, I want to perform calculations so that I can get accurate results',
      'visualization': 'As a user, I want to see visual representations so that I can understand data better',
      'communication': 'As a user, I want to communicate with others so that I can share information',
      'search': 'As a user, I want to search for information so that I can find what I need quickly',
      'file_handling': 'As a user, I want to upload files so that I can work with my documents',
      'real_time': 'As a user, I want real-time updates so that I have the latest information'
    };
    
    return storyTemplates[feature] || `As a user, I want to use ${this.humanizeFeatureName(feature)} so that I can achieve my goals`;
  }

  generateAcceptanceCriteria(feature) {
    const criteriaTemplates = {
      'authentication': ['User can register with email', 'User can login securely', 'Password reset functionality'],
      'data_management': ['Data is saved correctly', 'Data can be retrieved', 'Data validation works'],
      'calculation': ['Calculations are accurate', 'Results display correctly', 'Error handling works'],
      'visualization': ['Charts render correctly', 'Data is accurate', 'Interactive features work'],
      'communication': ['Messages send successfully', 'Real-time delivery', 'Message history'],
      'search': ['Search returns relevant results', 'Filters work correctly', 'Fast response time'],
      'file_handling': ['Files upload successfully', 'File types validated', 'Download works'],
      'real_time': ['Updates in real-time', 'No data conflicts', 'Connection stability']
    };
    
    return criteriaTemplates[feature] || ['Basic functionality works', 'User-friendly interface', 'Error handling'];
  }

  calculateFeaturePriority(feature, analysis) {
    const priorities = {
      'authentication': 'high',
      'data_management': 'high',
      'calculation': analysis.category === 'computation' ? 'high' : 'medium',
      'visualization': 'medium',
      'communication': 'medium',
      'search': 'medium',
      'file_handling': 'low',
      'real_time': 'medium'
    };
    
    return priorities[feature] || 'medium';
  }

  assessFeatureComplexity(feature) {
    const complexities = {
      'authentication': 'medium',
      'data_management': 'high',
      'calculation': 'low',
      'visualization': 'medium',
      'communication': 'high',
      'search': 'medium',
      'file_handling': 'medium',
      'real_time': 'high'
    };
    
    return complexities[feature] || 'medium';
  }

  // Additional helper methods
  extractDemographics(description) {
    return {
      ageRange: 'All ages',
      techSavviness: 'Moderate',
      devicePreference: 'Mobile and Desktop'
    };
  }

  extractPainPoints(description) {
    return ['Complex workflows', 'Time-consuming processes', 'Lack of integrated solutions'];
  }

  extractUserGoals(description) {
    return ['Increase efficiency', 'Save time', 'Achieve better results'];
  }

  async defineBusinessGoals(userDescription, analysis) {
    return {
      primary: 'User satisfaction and engagement',
      secondary: 'Market penetration and growth',
      metrics: ['User retention', 'Feature adoption', 'User satisfaction scores']
    };
  }

  async defineSuccessMetrics(userDescription, analysis) {
    return {
      userMetrics: ['Daily active users', 'Feature usage', 'User satisfaction'],
      businessMetrics: ['Revenue growth', 'Market share', 'Cost efficiency'],
      technicalMetrics: ['Performance', 'Uptime', 'Security']
    };
  }

  async prioritizeFeatures(userDescription, analysis) {
    return analysis.features.map(feature => ({
      feature: this.humanizeFeatureName(feature),
      priority: this.calculateFeaturePriority(feature, analysis),
      effort: this.assessFeatureComplexity(feature),
      value: 'High'
    }));
  }
}

module.exports = SeniorProductOwnerAgent;
