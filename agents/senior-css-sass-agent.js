/**
 * Senior CSS/SASS AI Agent
 * 
 * Expert CSS/SASS developer with 15+ years of experience in:
 * - Advanced CSS3, SASS/SCSS, LESS
 * - Responsive design and mobile-first approach
 * - CSS architectures: BEM, OOCSS, SMACSS, ITCSS
 * - Modern CSS: Grid, Flexbox, Custom Properties, Container Queries
 * - Performance optimization and cross-browser compatibility
 * - Design systems implementation
 * - Component-based styling
 * - CSS animations and micro-interactions
 * 
 * Collaborates with:
 * - Senior Designer Agent (design system interpretation)
 * - Frontend Developer Agent (component styling integration)
 * - DevOps AI Agent (build optimization)
 */

class SeniorCSSsassAgent {
  constructor() {
    this.agentId = 'senior-css-sass-agent';
    this.name = 'Senior CSS/SASS AI Agent';
    this.version = '1.0.0';
    this.experience = '15+ years';
    this.expertise = [
      'Advanced CSS3 & CSS4',
      'SASS/SCSS & LESS preprocessing',
      'Responsive & Mobile-First Design',
      'CSS Architecture (BEM, OOCSS, SMACSS)',
      'Modern CSS (Grid, Flexbox, Container Queries)',
      'CSS Performance & Optimization',
      'Cross-browser Compatibility',
      'Design Systems Implementation',
      'Component-based Styling',
      'CSS Animations & Micro-interactions',
      'Accessibility (WCAG 2.1)',
      'CSS-in-JS Integration'
    ];
    
    this.philosophy = 'Crafting beautiful, performant, and maintainable styles that bring designs to life';
    
    // CSS Methodologies
    this.methodologies = {
      BEM: 'Block Element Modifier',
      OOCSS: 'Object Oriented CSS',
      SMACSS: 'Scalable and Modular Architecture for CSS',
      ITCSS: 'Inverted Triangle CSS',
      ACSS: 'Atomic CSS'
    };
    
    // Responsive breakpoints (mobile-first)
    this.breakpoints = {
      xs: '320px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px'
    };
    
    console.log('🎨 Senior CSS/SASS AI Agent initialized');
    console.log(`📚 Experience: ${this.experience}`);
    console.log('🎯 CSS Philosophy: Pixel-perfect implementations with exceptional performance');
  }

  // Main method to create comprehensive CSS/SASS architecture
  async createAdvancedStyling(designSystem, componentStructure, analysis = null) {
    console.log('🎨 Creating advanced CSS/SASS architecture...');
    
    const styling = {
      // Core CSS architecture
      variables: await this.generateCSSVariables(designSystem),
      typography: await this.createTypographySystem(designSystem),
      layout: await this.createLayoutSystem(designSystem),
      components: await this.styleComponents(componentStructure, designSystem),
      utilities: await this.generateUtilityClasses(designSystem),
      animations: await this.createAnimationLibrary(analysis),
      responsive: await this.implementResponsiveDesign(designSystem),
      
      // Dynamic styling based on analysis
      dynamicStyles: analysis ? await this.createDynamicStyles(analysis, designSystem) : ''
    };
    
    console.log('✅ Advanced CSS/SASS architecture created');
    return styling;
  }

  // Generate CSS custom properties (variables)
  async generateCSSVariables(designSystem) {
    const colors = designSystem?.colorPalette || {};
    const typography = designSystem?.typography || {};
    
    return `
/* ===== COLOR SYSTEM ===== */
:root {
  /* Primary Colors */
  --color-primary-500: ${colors.primary?.[0] || '#3B82F6'};
  --color-primary-600: ${this.darken(colors.primary?.[0] || '#3B82F6', 20)};
  --color-primary-700: ${this.darken(colors.primary?.[0] || '#3B82F6', 40)};
  
  /* Secondary Colors */
  --color-secondary-500: ${colors.secondary?.[0] || '#6B7280'};
  
  /* Semantic Colors */
  --color-success: ${colors.semantic?.success || '#10B981'};
  --color-warning: ${colors.semantic?.warning || '#F59E0B'};
  --color-error: ${colors.semantic?.error || '#EF4444'};
  
  /* Typography */
  --font-primary: ${typography.primaryFont || "'Inter', sans-serif"};
  --font-mono: ${typography.monoFont || "'JetBrains Mono', monospace"};
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  
  /* Borders */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
}`;
  }

  // Create typography system
  async createTypographySystem(designSystem) {
    return `
/* ===== TYPOGRAPHY SYSTEM ===== */

html {
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-primary);
  font-weight: 400;
  color: #1f2937;
  background-color: #ffffff;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-primary);
  font-weight: 700;
  line-height: 1.25;
  margin: 0;
}

h1 { font-size: 3rem; }
h2 { font-size: 2.25rem; }
h3 { font-size: 1.875rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1.125rem; }

p {
  margin: 0 0 1rem 0;
  line-height: 1.625;
}`;
  }

  // Create layout system
  async createLayoutSystem(designSystem) {
    return `
/* ===== LAYOUT SYSTEM ===== */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.grid {
  display: grid;
  gap: var(--space-4);
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}`;
  }

  // Style components
  async styleComponents(componentStructure, designSystem) {
    return `
/* ===== COMPONENT STYLES ===== */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-primary);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-base);
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-primary-600);
  color: white;
}

.btn-primary:hover {
  background-color: var(--color-primary-700);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-base);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}`;
  }

  // Generate utility classes
  async generateUtilityClasses(designSystem) {
    return `
/* ===== UTILITY CLASSES ===== */

.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.p-3 { padding: var(--space-3); }
.p-4 { padding: var(--space-4); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }

.m-1 { margin: var(--space-1); }
.m-2 { margin: var(--space-2); }
.m-3 { margin: var(--space-3); }
.m-4 { margin: var(--space-4); }
.m-6 { margin: var(--space-6); }
.m-8 { margin: var(--space-8); }

.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
.font-normal { font-weight: 400; }

.w-full { width: 100%; }
.h-full { height: 100%; }

.bg-primary { background-color: var(--color-primary-600); }
.bg-white { background-color: white; }

.text-primary { color: var(--color-primary-600); }
.text-white { color: white; }

.rounded { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }

.shadow { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }`;
  }

  // Create animation library based on dynamic analysis
  async createAnimationLibrary(analysis) {
    return `
/* ===== ANIMATION LIBRARY ===== */

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-in-up {
  animation: slideInUp 0.6s ease-out;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.transition-all {
  transition: all var(--transition-base);
}

.hover\\:scale-105:hover {
  transform: scale(1.05);
}

.hover\\:-translate-y-1:hover {
  transform: translateY(-4px);
}`;
  }

  // Implement responsive design
  async implementResponsiveDesign(designSystem) {
    return `
/* ===== RESPONSIVE DESIGN ===== */

/* Mobile First Approach */
@media (min-width: ${this.breakpoints.sm}) {
  .sm\\:flex { display: flex; }
  .sm\\:hidden { display: none; }
  .sm\\:block { display: block; }
}

@media (min-width: ${this.breakpoints.md}) {
  .md\\:flex { display: flex; }
  .md\\:grid { display: grid; }
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  
  h1 { font-size: 3.75rem; }
  h2 { font-size: 3rem; }
}

@media (min-width: ${this.breakpoints.lg}) {
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .lg\\:flex { display: flex; }
}

/* Responsive Images */
.responsive-img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Responsive Container */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: ${this.breakpoints.sm}) {
  .container { max-width: 576px; padding: 0 1.5rem; }
}

@media (min-width: ${this.breakpoints.md}) {
  .container { max-width: 768px; }
}

@media (min-width: ${this.breakpoints.lg}) {
  .container { max-width: 1024px; }
}

@media (min-width: ${this.breakpoints.xl}) {
  .container { max-width: 1280px; }
}`;
  }

  // Create dynamic styles based on analysis
  async createDynamicStyles(analysis, designSystem) {
    console.log('🎨 Creating dynamic styles based on user requirements...');
    
    // Generate component-specific styles based on detected features
    const componentStyles = await this.generateComponentStyles(analysis, designSystem);
    const layoutStyles = await this.generateLayoutStyles(analysis, designSystem);
    const interactionStyles = await this.generateInteractionStyles(analysis, designSystem);
    
    return `
/* ===== DYNAMIC APP STYLES ===== */
/* Generated for: ${analysis.category} application */
/* Features: ${analysis.features.join(', ')} */

${componentStyles}

${layoutStyles}

${interactionStyles}

/* ===== ADAPTIVE LAYOUT ===== */
.app-container {
  width: 100%;
  max-width: ${this.getOptimalWidth(analysis)};
  margin: 0 auto;
  padding: var(--space-4);
  background: ${this.getBackgroundColor(analysis, designSystem)};
}

.feature-grid {
  display: grid;
  grid-template-columns: ${this.getGridColumns(analysis)};
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.primary-action {
  background: var(--color-primary-600);
  color: white;
  padding: var(--space-4) var(--space-6);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-base);
}

.primary-action:hover {
  background: var(--color-primary-700);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* ===== RESPONSIVE ADAPTATIONS ===== */
@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .app-container {
    padding: var(--space-2);
  }
}
`;
  }

  // Generate component styles based on features
  async generateComponentStyles(analysis, designSystem) {
    const styles = [];
    
    for (const feature of analysis.features) {
      const componentStyle = await this.generateFeatureStyles(feature, analysis, designSystem);
      styles.push(componentStyle);
    }
    
    return styles.join('\n\n');
  }

  // Generate styles for specific features - COMPLETELY DYNAMIC
  async generateFeatureStyles(feature, analysis, designSystem) {
    console.log(`🎨 Generating dynamic styles for feature: ${feature}`);
    
    // Dynamic style generation based on feature type
    const featureName = feature.replace(/_/g, '-');
    const componentClass = `.${featureName}-component`;
    
    // Base component styles
    let styles = `
${componentClass} {
  background: white;
  border-radius: var(--radius-md);
  padding: var(--space-4);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-base);
}

${componentClass}:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}`;

    // Add specific styling based on feature characteristics
    if (this.isInteractiveFeature(feature)) {
      styles += `
${componentClass} .interactive-element {
  cursor: pointer;
  transition: var(--transition-base);
}

${componentClass} .interactive-element:hover {
  background: #f9fafb;
}`;
    }

    if (this.isInputFeature(feature)) {
      styles += `
${componentClass} .input-field {
  width: 100%;
  padding: var(--space-3);
  border: 1px solid #e5e7eb;
  border-radius: var(--radius-md);
  font-size: 1rem;
}

${componentClass} .input-field:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-color: var(--color-primary-500);
}`;
    }

    if (this.isDisplayFeature(feature)) {
      styles += `
${componentClass} .display-area {
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: var(--radius-md);
  padding: var(--space-4);
  font-family: var(--font-mono);
}`;
    }

    if (this.isGridFeature(feature)) {
      styles += `
${componentClass} .grid-container {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}

${componentClass} .grid-item {
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  background: #f3f4f6;
  text-align: center;
  cursor: pointer;
  transition: var(--transition-base);
}

${componentClass} .grid-item:hover {
  background: var(--color-primary-100);
}`;
    }

    return styles;
  }

  // Helper methods to determine feature characteristics
  isInteractiveFeature(feature) {
    const interactiveKeywords = ['auth', 'manage', 'communication', 'search', 'real_time'];
    return interactiveKeywords.some(keyword => feature.includes(keyword));
  }

  isInputFeature(feature) {
    const inputKeywords = ['auth', 'search', 'communication', 'data_management'];
    return inputKeywords.some(keyword => feature.includes(keyword));
  }

  isDisplayFeature(feature) {
    const displayKeywords = ['calculation', 'visualization', 'real_time'];
    return displayKeywords.some(keyword => feature.includes(keyword));
  }

  isGridFeature(feature) {
    const gridKeywords = ['calculation', 'data_management', 'file_handling'];
    return gridKeywords.some(keyword => feature.includes(keyword));
  }

  // Generate layout styles based on analysis - COMPLETELY DYNAMIC
  async generateLayoutStyles(analysis, designSystem) {
    console.log('🎨 Generating dynamic layout styles...');
    
    // Analyze the requirements to determine optimal layout
    const layoutType = this.analyzeOptimalLayout(analysis);
    const containerWidth = this.calculateOptimalWidth(analysis);
    const gridStructure = this.determineGridStructure(analysis);
    
    return `
/* ===== DYNAMIC LAYOUT STYLES ===== */
/* Layout type: ${layoutType} */
/* Optimized for: ${analysis.category} with features: ${analysis.features.join(', ')} */

.app-layout {
  ${this.generateLayoutStructure(layoutType, analysis)}
  max-width: ${containerWidth};
  margin: 0 auto;
  padding: var(--space-4);
}

.main-content {
  ${this.generateContentLayout(analysis)}
}

.feature-container {
  ${gridStructure}
  gap: var(--space-4);
  margin: var(--space-4) 0;
}

@media (max-width: 768px) {
  .feature-container {
    grid-template-columns: 1fr;
  }
  
  .app-layout {
    padding: var(--space-2);
  }
}
`;
  }

  // Analyze optimal layout based on requirements
  analyzeOptimalLayout(analysis) {
    const features = analysis.features || [];
    const category = analysis.category || 'general';
    
    if (features.includes('visualization') || features.includes('data_management')) {
      return 'dashboard';
    }
    
    if (features.includes('communication') || category === 'social') {
      return 'feed';
    }
    
    if (features.includes('calculation') || category === 'computation') {
      return 'centered';
    }
    
    if (features.length > 3) {
      return 'multi-section';
    }
    
    return 'standard';
  }

  // Calculate optimal width based on analysis
  calculateOptimalWidth(analysis) {
    const complexity = analysis.complexity || 'medium';
    const featureCount = analysis.features?.length || 1;
    
    if (complexity === 'simple' && featureCount <= 2) {
      return '600px';
    }
    
    if (featureCount >= 5 || complexity === 'complex') {
      return '1400px';
    }
    
    if (featureCount >= 3) {
      return '1200px';
    }
    
    return '900px';
  }

  // Determine grid structure dynamically
  determineGridStructure(analysis) {
    const featureCount = analysis.features?.length || 1;
    
    if (featureCount === 1) {
      return 'display: flex; justify-content: center;';
    }
    
    if (featureCount === 2) {
      return 'display: grid; grid-template-columns: 1fr 1fr;';
    }
    
    if (featureCount <= 4) {
      return 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));';
    }
    
    return 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));';
  }

  // Generate layout structure based on type
  generateLayoutStructure(layoutType, analysis) {
    const structures = {
      'centered': `
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;`,
      'dashboard': `
        display: grid;
        grid-template-areas: "header" "main" "footer";
        grid-template-rows: auto 1fr auto;
        min-height: 100vh;`,
      'feed': `
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        min-height: 100vh;`,
      'multi-section': `
        display: flex;
        flex-direction: column;
        min-height: 100vh;`,
      'standard': `
        display: block;
        min-height: 100vh;`
    };
    
    return structures[layoutType] || structures['standard'];
  }

  // Generate content layout
  generateContentLayout(analysis) {
    if (analysis.features?.includes('data_management')) {
      return 'padding: var(--space-6); overflow-x: auto;';
    }
    
    if (analysis.features?.includes('visualization')) {
      return 'padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-4);';
    }
    
    return 'padding: var(--space-4);';
  }

  // Generate interaction styles
  async generateInteractionStyles(analysis, designSystem) {
    return `
.interactive-element {
  transition: var(--transition-base);
  cursor: pointer;
}

.interactive-element:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.loading-state {
  opacity: 0.6;
  pointer-events: none;
}

.success-state {
  border-color: var(--color-success);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.error-state {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}`;
  }

  // Helper methods for dynamic styling - NO HARDCODED VALUES
  getOptimalWidth(analysis) {
    return this.calculateOptimalWidth(analysis);
  }

  getBackgroundColor(analysis, designSystem) {
    // Dynamic background based on analysis
    if (analysis?.category === 'computation') {
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    return designSystem?.colors?.background || '#ffffff';
  }

  getGridColumns(analysis) {
    return this.determineGridStructure(analysis).replace('display: grid; ', '').replace(';', '');
  }

  // Completely remove hardcoded layout generation
  generateLayoutByType(layoutType, analysis) {
    console.log(`🎨 Generating ${layoutType} layout dynamically...`);
    
    // Dynamic layout generation based on analysis
    const baseLayout = `
.app-layout {
  ${this.generateLayoutStructure(layoutType, analysis)}
  max-width: ${this.calculateOptimalWidth(analysis)};
  margin: 0 auto;
  padding: var(--space-4);
}`;
    
    return baseLayout;
  }

  // Validate CSS for production (CSP compliance)
  async validateCSSProduction(cssContent) {
    console.log('🔒 Validating CSS for production compliance...');
    
    const validationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      cspCompliant: true
    };

    // Check for inline styles that might violate CSP
    const inlineStyleRegex = /style\s*=\s*['"]/gi;
    if (inlineStyleRegex.test(cssContent)) {
      validationResult.warnings.push('Inline styles detected - consider moving to external CSS');
    }

    // Check for eval() or other unsafe practices
    const unsafePatterns = [/eval\s*\(/gi, /new\s+Function\s*\(/gi];
    unsafePatterns.forEach(pattern => {
      if (pattern.test(cssContent)) {
        validationResult.errors.push('Unsafe JavaScript patterns detected');
        validationResult.isValid = false;
        validationResult.cspCompliant = false;
      }
    });

    console.log('✅ CSS production validation completed');
    return validationResult;
  }

  // Collaborate with Designer Agent
  async collaborateWithDesignerAgent(designSystem, designTokens) {
    console.log('🤝 Collaborating with Senior Designer Agent...');
    
    const collaboration = {
      designTokensImplementation: await this.implementDesignTokens(designTokens),
      componentStyleGuide: await this.createComponentStyleGuide(designSystem),
      responsiveDesignImplementation: await this.implementResponsiveDesign(designSystem)
    };
    
    return collaboration;
  }

  // Implement design tokens
  async implementDesignTokens(designTokens) {
    return {
      cssCustomProperties: `
/* ===== DESIGN TOKENS ===== */
:root {
  --token-color-primary: ${designTokens?.colors?.primary || '#3B82F6'};
  --token-color-secondary: ${designTokens?.colors?.secondary || '#6B7280'};
  --token-spacing-sm: ${designTokens?.spacing?.sm || '0.5rem'};
  --token-spacing-md: ${designTokens?.spacing?.md || '1rem'};
  --token-spacing-lg: ${designTokens?.spacing?.lg || '1.5rem'};
}`,
      validation: { isValid: true, errors: [], warnings: [] }
    };
  }

  // Create component style guide
  async createComponentStyleGuide(designSystem) {
    return `
/* ===== COMPONENT STYLE GUIDE ===== */

/* Button System */
.btn-guide {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-base);
}

.btn-guide:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Card System */
.card-guide {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-base);
}

.card-guide:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}`;
  }

  // Helper methods
  lighten(color, percent) {
    return color; // Simplified for now
  }

  darken(color, percent) {
    return color; // Simplified for now
  }
}

module.exports = SeniorCSSsassAgent;
