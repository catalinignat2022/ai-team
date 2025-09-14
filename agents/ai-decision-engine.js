/**
 * AI Decision Making Logic
 * Expert-level decision making for deployment errors with pattern recognition
 * Based on 15+ years of DevOps experience patterns
 */

class AIDecisionEngine {
  constructor() {
    this.experiencePatterns = this.loadExperiencePatterns();
    this.decisionTree = this.buildDecisionTree();
    this.confidenceThresholds = {
      AUTO_FIX: 0.85,
      SUPERVISED_FIX: 0.70,
      HUMAN_REQUIRED: 0.50
    };
    
    console.log('🧠 AI Decision Engine initialized');
  }

  loadExperiencePatterns() {
    // 15+ years of DevOps experience encoded as decision patterns
    return {
      // Infrastructure patterns
      INFRASTRUCTURE: {
        patterns: [
          {
            indicators: ['ECONNREFUSED', 'connection refused', 'network unreachable'],
            root_causes: ['database_down', 'network_isolation', 'firewall_block'],
            confidence: 0.90,
            urgency: 'HIGH',
            typical_resolution_time: '2-5 minutes'
          },
          {
            indicators: ['Cannot find module', 'MODULE_NOT_FOUND', 'require() of ES Module'],
            root_causes: ['missing_dependency', 'wrong_module_path', 'es6_import_issue'],
            confidence: 0.95,
            urgency: 'HIGH',
            typical_resolution_time: '1-3 minutes'
          }
        ]
      },

      // Application patterns
      APPLICATION: {
        patterns: [
          {
            indicators: ['Port already in use', 'EADDRINUSE', 'listen EADDRINUSE'],
            root_causes: ['port_conflict', 'zombie_process', 'multiple_instances'],
            confidence: 0.85,
            urgency: 'MEDIUM',
            typical_resolution_time: '1-2 minutes'
          },
          {
            indicators: ['Syntax error', 'Unexpected token', 'Parse error'],
            root_causes: ['code_syntax_error', 'encoding_issue', 'incomplete_deployment'],
            confidence: 0.80,
            urgency: 'HIGH',
            typical_resolution_time: '5-15 minutes'
          }
        ]
      },

      // Database patterns
      DATABASE: {
        patterns: [
          {
            indicators: ['MongoNetworkError', 'connection pool destroyed', 'topology closed'],
            root_causes: ['mongodb_connection_limit', 'database_restart', 'network_partition'],
            confidence: 0.90,
            urgency: 'HIGH',
            typical_resolution_time: '2-10 minutes'
          },
          {
            indicators: ['Authentication failed', 'bad auth', 'unauthorized'],
            root_causes: ['wrong_credentials', 'expired_token', 'permission_change'],
            confidence: 0.95,
            urgency: 'HIGH',
            typical_resolution_time: '1-5 minutes'
          }
        ]
      },

      // Platform-specific patterns (Railway, Heroku, etc.)
      PLATFORM: {
        patterns: [
          {
            indicators: ['R10', 'Boot timeout', 'failed to bind to port'],
            root_causes: ['slow_startup', 'port_binding_issue', 'resource_constraint'],
            confidence: 0.85,
            urgency: 'HIGH',
            typical_resolution_time: '3-10 minutes'
          },
          {
            indicators: ['build failed', 'npm ERR!', 'yarn install failed'],
            root_causes: ['dependency_conflict', 'build_script_error', 'disk_space'],
            confidence: 0.80,
            urgency: 'MEDIUM',
            typical_resolution_time: '5-20 minutes'
          }
        ]
      }
    };
  }

  buildDecisionTree() {
    return {
      // Level 1: Error Classification
      classify_error: {
        criteria: ['error_message', 'context', 'platform'],
        branches: {
          'infrastructure': 'assess_infrastructure_impact',
          'application': 'assess_application_impact', 
          'database': 'assess_database_impact',
          'platform': 'assess_platform_impact',
          'unknown': 'deep_analysis_required'
        }
      },

      // Level 2: Impact Assessment
      assess_infrastructure_impact: {
        criteria: ['service_availability', 'user_impact', 'data_integrity'],
        branches: {
          'critical': 'emergency_response',
          'high': 'immediate_action',
          'medium': 'scheduled_fix',
          'low': 'monitoring_only'
        }
      },

      assess_application_impact: {
        criteria: ['functionality_affected', 'user_experience', 'business_logic'],
        branches: {
          'breaking': 'immediate_rollback',
          'degraded': 'hotfix_required',
          'minor': 'next_deployment_cycle'
        }
      },

      // Level 3: Action Decision
      emergency_response: {
        actions: ['immediate_rollback', 'failover_activation', 'incident_declaration'],
        escalation: 'senior_engineer',
        communication: 'all_stakeholders'
      },

      immediate_action: {
        actions: ['auto_fix_attempt', 'resource_scaling', 'configuration_update'],
        escalation: 'on_failure',
        communication: 'technical_team'
      }
    };
  }

  async analyzeAndDecide(errorData) {
    console.log('🧠 AI Decision Engine analyzing error...');
    
    const analysis = {
      timestamp: new Date().toISOString(),
      error_classification: await this.classifyError(errorData),
      impact_assessment: await this.assessImpact(errorData),
      confidence_score: 0,
      recommended_action: null,
      escalation_needed: false,
      estimated_resolution_time: null,
      risk_factors: []
    };

    // Calculate confidence based on pattern matching
    analysis.confidence_score = this.calculateConfidence(errorData, analysis.error_classification);
    
    // Determine recommended action
    analysis.recommended_action = this.determineAction(analysis);
    
    // Assess if escalation is needed
    analysis.escalation_needed = this.shouldEscalate(analysis);
    
    // Estimate resolution time
    analysis.estimated_resolution_time = this.estimateResolutionTime(analysis);
    
    // Identify risk factors
    analysis.risk_factors = this.identifyRiskFactors(errorData, analysis);
    
    console.log('📊 Decision analysis completed:', {
      classification: analysis.error_classification.category,
      confidence: analysis.confidence_score,
      action: analysis.recommended_action.type,
      escalation: analysis.escalation_needed
    });
    
    return analysis;
  }

  async classifyError(errorData) {
    const errorMessage = errorData.error || errorData.message || '';
    const context = errorData.context || {};
    
    let bestMatch = {
      category: 'UNKNOWN',
      subcategory: 'unclassified',
      confidence: 0,
      pattern: null
    };

    // Pattern matching across all experience categories
    for (const [category, categoryData] of Object.entries(this.experiencePatterns)) {
      for (const pattern of categoryData.patterns) {
        const matchScore = this.calculatePatternMatch(errorMessage, pattern.indicators);
        
        if (matchScore > bestMatch.confidence) {
          bestMatch = {
            category,
            subcategory: pattern.root_causes[0],
            confidence: matchScore * pattern.confidence,
            pattern: pattern,
            urgency: pattern.urgency,
            typical_resolution_time: pattern.typical_resolution_time
          };
        }
      }
    }

    // Enhanced classification with contextual analysis
    if (bestMatch.confidence < 0.7) {
      bestMatch = await this.performDeepAnalysis(errorData, bestMatch);
    }

    return bestMatch;
  }

  calculatePatternMatch(errorMessage, indicators) {
    const message = errorMessage.toLowerCase();
    let matchCount = 0;
    let totalIndicators = indicators.length;

    for (const indicator of indicators) {
      if (message.includes(indicator.toLowerCase())) {
        matchCount++;
      }
    }

    return matchCount / totalIndicators;
  }

  async performDeepAnalysis(errorData, initialMatch) {
    console.log('🔍 Performing deep error analysis...');
    
    const contextualFactors = {
      timing: this.analyzeErrorTiming(errorData),
      frequency: this.analyzeErrorFrequency(errorData),
      environment: this.analyzeEnvironment(errorData),
      dependencies: this.analyzeDependencies(errorData)
    };

    // Apply machine learning-like heuristics
    const enhancedClassification = {
      ...initialMatch,
      confidence: Math.min(initialMatch.confidence + 0.1, 0.95),
      contextual_factors: contextualFactors,
      analysis_method: 'deep_heuristic'
    };

    // Special case handling
    if (contextualFactors.timing.is_deployment_related) {
      enhancedClassification.category = 'DEPLOYMENT';
      enhancedClassification.confidence = Math.max(enhancedClassification.confidence, 0.75);
    }

    if (contextualFactors.frequency.is_recurring) {
      enhancedClassification.urgency = 'HIGH';
      enhancedClassification.subcategory = 'recurring_issue';
    }

    return enhancedClassification;
  }

  analyzeErrorTiming(errorData) {
    const now = new Date();
    const errorTime = new Date(errorData.timestamp || now);
    const timeSinceError = now - errorTime;

    return {
      is_recent: timeSinceError < 300000, // 5 minutes
      is_deployment_related: timeSinceError < 900000, // 15 minutes (typical deployment window)
      hour_of_day: errorTime.getHours(),
      is_business_hours: errorTime.getHours() >= 9 && errorTime.getHours() <= 17,
      day_of_week: errorTime.getDay()
    };
  }

  analyzeErrorFrequency(errorData) {
    // This would typically connect to error tracking systems
    return {
      is_recurring: false, // Placeholder
      frequency_score: 1,
      similar_errors_count: 0,
      escalation_pattern: 'none'
    };
  }

  analyzeEnvironment(errorData) {
    return {
      platform: errorData.platform || 'railway',
      node_version: errorData.node_version || 'unknown',
      deployment_stage: errorData.stage || 'production',
      resource_usage: errorData.resources || 'normal',
      geographic_region: errorData.region || 'unknown'
    };
  }

  analyzeDependencies(errorData) {
    return {
      external_services: errorData.external_deps || [],
      database_status: errorData.db_status || 'unknown',
      third_party_apis: errorData.apis || [],
      cdn_status: errorData.cdn || 'unknown'
    };
  }

  async assessImpact(errorData) {
    const impact = {
      user_facing: this.isUserFacing(errorData),
      business_critical: this.isBusinessCritical(errorData),
      data_integrity: this.threatsDataIntegrity(errorData),
      service_availability: this.affectsAvailability(errorData),
      performance_impact: this.assessPerformanceImpact(errorData)
    };

    // Calculate overall impact score
    impact.overall_score = this.calculateImpactScore(impact);
    impact.severity = this.determineSeverity(impact.overall_score);

    return impact;
  }

  isUserFacing(errorData) {
    const userFacingIndicators = [
      'server error', '500', '503', 'service unavailable',
      'connection refused', 'timeout', 'cannot connect'
    ];

    const errorMessage = (errorData.error || '').toLowerCase();
    return userFacingIndicators.some(indicator => errorMessage.includes(indicator));
  }

  isBusinessCritical(errorData) {
    const criticalPaths = [
      '/auth', '/login', '/payment', '/checkout',
      '/api/users', '/api/matches', '/api/messages'
    ];

    const path = errorData.path || errorData.endpoint || '';
    return criticalPaths.some(criticalPath => path.includes(criticalPath));
  }

  threatsDataIntegrity(errorData) {
    const dataThreats = [
      'mongodb error', 'database', 'transaction failed',
      'data corruption', 'connection pool'
    ];

    const errorMessage = (errorData.error || '').toLowerCase();
    return dataThreats.some(threat => errorMessage.includes(threat));
  }

  affectsAvailability(errorData) {
    const availabilityIndicators = [
      'cannot start', 'failed to bind', 'service down',
      'health check failed', 'boot timeout'
    ];

    const errorMessage = (errorData.error || '').toLowerCase();
    return availabilityIndicators.some(indicator => errorMessage.includes(indicator));
  }

  calculateConfidence(errorData, classification) {
    let confidence = classification.confidence || 0;

    // Boost confidence based on clear error indicators
    if (classification.pattern) {
      confidence += 0.1;
    }

    // Reduce confidence for complex scenarios
    if (errorData.stack_trace && errorData.stack_trace.length > 10) {
      confidence -= 0.05;
    }

    // Environmental factors
    if (errorData.platform === 'railway') {
      confidence += 0.05; // We have specific Railway experience
    }

    return Math.max(0, Math.min(1, confidence));
  }

  determineAction(analysis) {
    const confidence = analysis.confidence_score;
    const impact = analysis.impact_assessment.overall_score;
    const urgency = analysis.error_classification.urgency;

    if (confidence >= this.confidenceThresholds.AUTO_FIX && urgency === 'HIGH') {
      return {
        type: 'AUTO_FIX',
        priority: 'IMMEDIATE',
        automation_level: 'FULL',
        human_oversight: 'NOTIFICATION_ONLY'
      };
    }

    if (confidence >= this.confidenceThresholds.SUPERVISED_FIX) {
      return {
        type: 'SUPERVISED_FIX',
        priority: urgency === 'HIGH' ? 'IMMEDIATE' : 'HIGH',
        automation_level: 'SEMI',
        human_oversight: 'APPROVAL_REQUIRED'
      };
    }

    if (confidence >= this.confidenceThresholds.HUMAN_REQUIRED) {
      return {
        type: 'HUMAN_ANALYSIS',
        priority: 'HIGH',
        automation_level: 'DIAGNOSTIC_ONLY',
        human_oversight: 'FULL_CONTROL'
      };
    }

    return {
      type: 'ESCALATE',
      priority: 'CRITICAL',
      automation_level: 'NONE',
      human_oversight: 'IMMEDIATE_INTERVENTION'
    };
  }

  shouldEscalate(analysis) {
    const conditions = [
      analysis.confidence_score < 0.5,
      analysis.impact_assessment.business_critical && analysis.confidence_score < 0.8,
      analysis.error_classification.category === 'UNKNOWN',
      analysis.impact_assessment.data_integrity && analysis.confidence_score < 0.9
    ];

    return conditions.some(condition => condition);
  }

  estimateResolutionTime(analysis) {
    const baseTime = analysis.error_classification.typical_resolution_time || '5-15 minutes';
    const confidence = analysis.confidence_score;
    const complexity = this.assessComplexity(analysis);

    // Adjust based on confidence
    if (confidence > 0.9) {
      return baseTime.replace(/(\d+)-(\d+)/, (match, min, max) => 
        `${Math.ceil(min * 0.7)}-${Math.ceil(max * 0.7)}`
      );
    }

    if (confidence < 0.6) {
      return baseTime.replace(/(\d+)-(\d+)/, (match, min, max) => 
        `${Math.ceil(min * 1.5)}-${Math.ceil(max * 2)}`
      );
    }

    return baseTime;
  }

  assessComplexity(analysis) {
    let complexity = 'MEDIUM';

    if (analysis.error_classification.category === 'UNKNOWN') {
      complexity = 'HIGH';
    }

    if (analysis.impact_assessment.data_integrity) {
      complexity = 'HIGH';
    }

    if (analysis.confidence_score > 0.9) {
      complexity = 'LOW';
    }

    return complexity;
  }

  identifyRiskFactors(errorData, analysis) {
    const risks = [];

    if (analysis.impact_assessment.data_integrity) {
      risks.push({
        type: 'DATA_LOSS',
        severity: 'HIGH',
        description: 'Potential data integrity compromise'
      });
    }

    if (analysis.confidence_score < 0.7) {
      risks.push({
        type: 'UNCERTAIN_DIAGNOSIS',
        severity: 'MEDIUM',
        description: 'Low confidence in error analysis'
      });
    }

    if (analysis.impact_assessment.business_critical) {
      risks.push({
        type: 'BUSINESS_IMPACT',
        severity: 'HIGH',
        description: 'Critical business functionality affected'
      });
    }

    return risks;
  }

  calculateImpactScore(impact) {
    let score = 0;
    
    if (impact.user_facing) score += 0.3;
    if (impact.business_critical) score += 0.4;
    if (impact.data_integrity) score += 0.2;
    if (impact.service_availability) score += 0.1;
    
    return Math.min(1, score);
  }

  determineSeverity(impactScore) {
    if (impactScore >= 0.8) return 'CRITICAL';
    if (impactScore >= 0.6) return 'HIGH';
    if (impactScore >= 0.3) return 'MEDIUM';
    return 'LOW';
  }

  // Learning and adaptation methods
  learnFromResolution(errorData, analysis, resolution) {
    console.log('📚 Learning from resolution outcome...');
    
    // This would update the experience patterns based on successful/failed resolutions
    // For now, we'll log the learning opportunity
    
    const learningData = {
      timestamp: new Date().toISOString(),
      original_analysis: analysis,
      resolution_outcome: resolution,
      accuracy_score: this.calculateAccuracy(analysis, resolution),
      lessons_learned: this.extractLessons(analysis, resolution)
    };

    console.log('🧠 Learning data captured:', learningData);
    return learningData;
  }

  calculateAccuracy(analysis, resolution) {
    // Simple accuracy calculation based on predicted vs actual resolution time
    return 0.85; // Placeholder
  }

  extractLessons(analysis, resolution) {
    const lessons = [];
    
    if (resolution.success && analysis.confidence_score < 0.8) {
      lessons.push('Confidence threshold may be too conservative');
    }
    
    if (!resolution.success && analysis.confidence_score > 0.8) {
      lessons.push('Pattern matching needs refinement for this error type');
    }

    return lessons;
  }
}

module.exports = AIDecisionEngine;
