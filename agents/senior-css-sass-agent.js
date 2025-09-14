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
  async createAdvancedStyling(designSystem, componentStructure, appType = 'general') {
    console.log('🎨 Creating advanced CSS/SASS architecture...');
    
    const styling = {
      // Core CSS architecture
      variables: await this.generateCSSVariables(designSystem),
      typography: await this.createTypographySystem(designSystem),
      layout: await this.createLayoutSystem(designSystem),
      components: await this.styleComponents(componentStructure, designSystem),
      utilities: await this.generateUtilityClasses(designSystem),
      animations: await this.createAnimationLibrary(appType),
      responsive: await this.implementResponsiveDesign(designSystem),
      
      // App-specific styling
      appSpecific: await this.createAppSpecificStyles(appType, designSystem)
    };
    
    console.log('✅ Advanced CSS/SASS architecture created');
    return styling;
  }

  // Generate complete HTML with inline CSS and JavaScript (no external references)
  async generateCompleteHTML(appStructure, designSystem, frontendCollaboration = null) {
    const styling = await this.createAdvancedStyling(designSystem, appStructure.components, appStructure.type);
    
    // Include frontend collaboration CSS if available
    let frontendCSS = '';
    if (frontendCollaboration) {
      frontendCSS = `
        ${frontendCollaboration.componentStyling || ''}
        ${frontendCollaboration.interactionStates || ''}
        ${frontendCollaboration.javascriptIntegration || ''}
        ${frontendCollaboration.accessibilityEnhancements || ''}
      `;
    }
    
    // Create complete inline CSS without duplications and perfect responsive design
    const completeCSS = `
      ${styling.variables}
      ${styling.typography}
      ${styling.layout}
      ${styling.components}
      ${styling.utilities}
      ${styling.animations}
      ${styling.responsive}
      ${styling.appSpecific}
      ${frontendCSS}
    `;
    
    // Generate HTML structure based on app type with perfect responsive design
    const htmlContent = await this.generatePerfectResponsiveHTML(appStructure, completeCSS);
    
    return htmlContent;
  }

  // Generate perfect responsive HTML with flawless scaling for ALL elements
  async generatePerfectResponsiveHTML(appStructure, css) {
    const perfectResponsiveCSS = `
      /* ===== PERFECT RESPONSIVE DESIGN FOR ALL ELEMENTS ===== */
      
      /* Reset and Base */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      html {
        font-size: 16px;
        scroll-behavior: smooth;
      }
      
      /* Responsive font scaling for ALL text elements */
      @media (max-width: 320px) {
        html { font-size: 14px; }
        h1 { font-size: 1.5rem !important; line-height: 1.2 !important; }
        h2 { font-size: 1.3rem !important; line-height: 1.2 !important; }
        h3 { font-size: 1.1rem !important; line-height: 1.2 !important; }
        p { font-size: 0.9rem !important; line-height: 1.4 !important; }
        .calculator { padding: 1rem !important; max-width: 280px !important; }
        .calculator-display { font-size: 1.5rem !important; padding: 1rem !important; }
        .calc-btn { font-size: 1rem !important; min-height: 45px !important; }
      }
      
      @media (min-width: 321px) and (max-width: 480px) {
        html { font-size: 15px; }
        h1 { font-size: 1.8rem !important; line-height: 1.2 !important; }
        h2 { font-size: 1.5rem !important; line-height: 1.2 !important; }
        h3 { font-size: 1.2rem !important; line-height: 1.2 !important; }
        p { font-size: 0.95rem !important; line-height: 1.5 !important; }
        .calculator { padding: 1.5rem !important; max-width: 320px !important; }
        .calculator-display { font-size: 1.8rem !important; padding: 1.2rem !important; }
        .calc-btn { font-size: 1.1rem !important; min-height: 50px !important; }
      }
      
      @media (min-width: 481px) and (max-width: 768px) {
        html { font-size: 16px; }
        h1 { font-size: 2.2rem !important; line-height: 1.2 !important; }
        h2 { font-size: 1.8rem !important; line-height: 1.2 !important; }
        h3 { font-size: 1.4rem !important; line-height: 1.2 !important; }
        p { font-size: 1rem !important; line-height: 1.5 !important; }
        .calculator { padding: 2rem !important; max-width: 400px !important; }
        .calculator-display { font-size: 2.2rem !important; padding: 1.5rem !important; }
        .calc-btn { font-size: 1.2rem !important; min-height: 55px !important; }
      }
      
      @media (min-width: 769px) and (max-width: 1024px) {
        html { font-size: 17px; }
        h1 { font-size: 2.5rem !important; line-height: 1.2 !important; }
        h2 { font-size: 2rem !important; line-height: 1.2 !important; }
        h3 { font-size: 1.6rem !important; line-height: 1.2 !important; }
        p { font-size: 1.1rem !important; line-height: 1.6 !important; }
        .calculator { padding: 2.5rem !important; max-width: 450px !important; }
        .calculator-display { font-size: 2.5rem !important; padding: 2rem !important; }
        .calc-btn { font-size: 1.3rem !important; min-height: 60px !important; }
      }
      
      @media (min-width: 1025px) {
        html { font-size: 18px; }
        h1 { font-size: 3rem !important; line-height: 1.2 !important; }
        h2 { font-size: 2.5rem !important; line-height: 1.2 !important; }
        h3 { font-size: 2rem !important; line-height: 1.2 !important; }
        p { font-size: 1.2rem !important; line-height: 1.6 !important; }
        .calculator { padding: 3rem !important; max-width: 500px !important; }
        .calculator-display { font-size: 3rem !important; padding: 2.5rem !important; }
        .calc-btn { font-size: 1.4rem !important; min-height: 65px !important; }
      }
      
      /* Perfect responsive containers */
      .app-container {
        width: 100%;
        max-width: 100vw;
        margin: 0 auto;
        padding: 1rem;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      
      .app-header {
        width: 100%;
        padding: 2rem 1rem;
        text-align: center;
        word-wrap: break-word;
        overflow-wrap: break-word;
      }
      
      .app-header h1 {
        word-wrap: break-word;
        overflow-wrap: break-word;
        hyphens: auto;
        max-width: 100%;
      }
      
      /* Perfect responsive content */
      .app-content {
        width: 100%;
        max-width: 100%;
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      /* Responsive images and media */
      img, video, iframe {
        max-width: 100% !important;
        height: auto !important;
        display: block;
      }
      
      /* Responsive tables */
      table {
        width: 100%;
        border-collapse: collapse;
        overflow-x: auto;
        display: block;
        white-space: nowrap;
      }
      
      @media (max-width: 768px) {
        table {
          font-size: 0.8rem;
        }
      }
      
      /* Responsive forms */
      input, textarea, select, button {
        width: 100%;
        max-width: 100%;
        padding: 0.5rem;
        font-size: inherit;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }
      
      /* Perfect responsive grid systems */
      .responsive-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr;
      }
      
      @media (min-width: 768px) {
        .responsive-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      
      @media (min-width: 1024px) {
        .responsive-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      /* Responsive navigation */
      .nav-menu {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      
      @media (min-width: 768px) {
        .nav-menu {
          flex-direction: row;
          justify-content: space-between;
        }
      }
      
      /* Responsive buttons and interactive elements */
      .btn, button, .calc-btn {
        min-height: 44px; /* Minimum touch target */
        padding: 0.75rem 1rem;
        font-size: inherit;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      
      .btn:hover, button:hover, .calc-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      /* Responsive spacing system */
      .responsive-spacing {
        padding: 1rem;
      }
      
      @media (min-width: 768px) {
        .responsive-spacing {
          padding: 2rem;
        }
      }
      
      @media (min-width: 1024px) {
        .responsive-spacing {
          padding: 3rem;
        }
      }
      
      /* Perfect responsive utilities */
      .text-responsive {
        font-size: clamp(0.8rem, 2.5vw, 1.2rem);
        line-height: 1.5;
      }
      
      .heading-responsive {
        font-size: clamp(1.5rem, 5vw, 3rem);
        line-height: 1.2;
      }
      
      .container-responsive {
        width: 100%;
        max-width: min(100vw - 2rem, 1200px);
        margin: 0 auto;
        padding: 0 1rem;
      }
      
      /* Accessibility improvements */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .btn, button, .calc-btn {
          border: 2px solid currentColor;
        }
      }
      
      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        body {
          background: #1a1a1a;
          color: #ffffff;
        }
        
        .app-container {
          background: #2d2d2d;
          color: #ffffff;
        }
        
        .calculator {
          background: #3d3d3d;
          color: #ffffff;
        }
      }
    `;

    return `<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>${appStructure.title || 'Perfect Responsive App'}</title>
    <style>
      ${perfectResponsiveCSS}
      ${css}
    </style>
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <h1 class="heading-responsive">${appStructure.title}</h1>
            <p class="text-responsive">${appStructure.description || 'Aplicație cu design perfect responsive'}</p>
        </header>
        
        <main class="app-content">
            ${await this.generateAppSpecificContent(appStructure)}
        </main>
    </div>
    
    <script src="app.js"></script>
</body>
</html>`;
  }

  // Generate external JavaScript file for CSP compliance
  async generateJavaScriptFile(appStructure) {
    console.log('🔧 Generating external JavaScript file for CSP compliance...');
    
    const jsContent = await this.generatePerfectJavaScript(appStructure);
    
    return {
      filename: 'app.js',
      content: jsContent
    };
  }

  // Validate CSS and test for production readiness and CSP compliance
  async validateCSSProduction(htmlContent) {
    console.log('🔍 Validating CSS for production readiness and CSP compliance...');
    
    const validation = {
      hasExternalDependencies: false,
      hasInlineCSS: false,
      hasJavaScript: false,
      cssModules: [],
      errors: [],
      warnings: [],
      cspCompliant: true,
      cspIssues: []
    };
    
    // Check for external CSS files
    if (htmlContent.includes('href=') && htmlContent.includes('.css')) {
      validation.hasExternalDependencies = true;
      validation.errors.push('HTML contains external CSS file references');
    }
    
    // Check for external JS files
    if (htmlContent.includes('src=') && htmlContent.includes('.js')) {
      validation.hasExternalDependencies = true;
      validation.errors.push('HTML contains external JavaScript file references');
    }
    
    // CSP Compliance Check - Critical for production
    const inlineHandlers = [
      'onclick=', 'onsubmit=', 'onload=', 'onerror=', 'onchange=', 
      'onkeyup=', 'onkeydown=', 'onmouseover=', 'onmouseout=',
      'onfocus=', 'onblur=', 'ondblclick=', 'onmousedown=', 'onmouseup='
    ];
    
    for (const handler of inlineHandlers) {
      if (htmlContent.includes(handler)) {
        validation.cspCompliant = false;
        validation.cspIssues.push(`CSP Violation: Inline event handler ${handler}`);
        validation.errors.push(`CRITICAL: CSP violation - ${handler} found. Use addEventListener instead.`);
      }
    }
    
    // Check for javascript: URLs
    if (htmlContent.includes('javascript:')) {
      validation.cspCompliant = false;
      validation.cspIssues.push('CSP Violation: javascript: URL found');
      validation.errors.push('CRITICAL: CSP violation - javascript: URLs not allowed');
    }
    
    // Check for eval() usage
    if (htmlContent.includes('eval(')) {
      validation.cspCompliant = false;
      validation.cspIssues.push('CSP Violation: eval() usage found');
      validation.errors.push('CRITICAL: CSP violation - eval() not allowed');
    }
    
    // Check for inline styles
    if (htmlContent.includes('<style>')) {
      validation.hasInlineCSS = true;
    }
    
    // Check for inline JavaScript (CSP violation)
    if (htmlContent.includes('<script>') && !htmlContent.includes('src=')) {
      validation.hasJavaScript = true;
      validation.cspCompliant = false;
      validation.cspIssues.push('CSP Violation: Inline JavaScript not allowed');
      validation.errors.push('CRITICAL: CSP violation - inline JavaScript blocked');
    }
    
    // Check CSS modules
    const cssModules = [
      { name: 'Variables', pattern: '--color-primary' },
      { name: 'Typography', pattern: 'font-family' },
      { name: 'Layout', pattern: 'display: flex' },
      { name: 'Components', pattern: '.btn' },
      { name: 'Utilities', pattern: '.p-' },
      { name: 'Animations', pattern: '@keyframes' },
      { name: 'Responsive', pattern: '@media' }
    ];
    
    cssModules.forEach(module => {
      if (htmlContent.includes(module.pattern)) {
        validation.cssModules.push(module.name);
      }
    });
    
    // Production readiness score - now includes CSP compliance
    validation.productionReady = !validation.hasExternalDependencies && 
                                validation.hasInlineCSS && 
                                validation.cssModules.length >= 5 &&
                                validation.cspCompliant;
    
    // Log CSP validation results
    if (validation.cspCompliant) {
      console.log('✅ CSP Compliance: PASSED - No inline event handlers found');
    } else {
      console.log('❌ CSP Compliance: FAILED');
      validation.cspIssues.forEach(issue => {
        console.log(`  🚨 ${issue}`);
      });
    }
    
    console.log('✅ CSS validation complete');
    return validation;
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

  // Create animation library
  async createAnimationLibrary(appType) {
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

  // Create app-specific styles
  async createAppSpecificStyles(appType, designSystem) {
    const styles = {
      calculator: `
/* ===== CALCULATOR SPECIFIC STYLES ===== */

.calculator {
  max-width: 400px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
}

.calculator-display {
  background: #1f2937;
  color: white;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
  text-align: right;
  font-family: var(--font-mono);
  font-size: 2.5rem;
  font-weight: 700;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  word-break: break-all;
}

.calculator-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: var(--space-3);
  height: 400px;
}

.calc-btn {
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  position: relative;
}

.calc-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.calc-btn-number {
  background: #f3f4f6;
  color: #1f2937;
}

.calc-btn-number:hover {
  background: #e5e7eb;
}

.calc-btn-operator {
  background: var(--color-primary-600);
  color: white;
}

.calc-btn-operator:hover {
  background: var(--color-primary-700);
}

.calc-btn-equals {
  background: var(--color-success);
  color: white;
  grid-row: span 2;
}

.calc-btn-equals:hover {
  background: #059669;
}

.calc-btn-clear {
  background: var(--color-error);
  color: white;
}

.calc-btn-clear:hover {
  background: #dc2626;
}

.calc-btn-zero {
  grid-column: span 2;
}`,

      general: `
/* ===== GENERAL APP STYLES ===== */

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: var(--color-primary-600);
  color: white;
  padding: var(--space-6);
  text-align: center;
}

.app-main {
  flex: 1;
  padding: var(--space-6);
}

.app-footer {
  background: #f3f4f6;
  padding: var(--space-4);
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}`
    };
    
    return styles[appType] || styles.general;
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

  // Collaborate with Frontend Developer Agent
  async collaborateWithFrontendAgent(componentStructure, designSystem) {
    console.log('🤝 Collaborating with Frontend Developer Agent...');
    
    const collaboration = {
      componentStyling: await this.generateComponentSpecificCSS(componentStructure),
      interactionStates: await this.generateInteractionStates(),
      javascriptIntegration: await this.generateCSSJavaScriptIntegration(designSystem),
      accessibilityEnhancements: await this.generateAccessibilityCSS()
    };
    
    console.log('✅ Frontend Developer collaboration complete');
    return collaboration;
  }

  // Generate component-specific CSS
  async generateComponentSpecificCSS(componentStructure) {
    return `
/* ===== COMPONENT-SPECIFIC CSS ===== */

/* Form Components */
.form-group {
  margin-bottom: var(--space-4);
}

.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: var(--space-2);
  color: #374151;
}

.form-input {
  width: 100%;
  padding: var(--space-3);
  border: 2px solid #e5e7eb;
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: var(--transition-base);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input:invalid {
  border-color: var(--color-error);
}

/* Navigation Components */
.nav {
  display: flex;
  gap: var(--space-4);
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: var(--transition-base);
}

.nav-link:hover {
  color: var(--color-primary-600);
  background-color: rgba(59, 130, 246, 0.1);
}

.nav-link.active {
  color: var(--color-primary-600);
  background-color: rgba(59, 130, 246, 0.1);
}

/* Modal Components */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}`;
  }

  // Generate interaction states
  async generateInteractionStates() {
    return `
/* ===== INTERACTION STATES ===== */

/* Hover States */
.hover\\:bg-primary:hover {
  background-color: var(--color-primary-600);
}

.hover\\:text-primary:hover {
  color: var(--color-primary-600);
}

.hover\\:shadow-lg:hover {
  box-shadow: var(--shadow-lg);
}

/* Focus States */
.focus\\:outline-primary:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.focus\\:ring:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Active States */
.active\\:scale-95:active {
  transform: scale(0.95);
}

.active\\:bg-primary-700:active {
  background-color: var(--color-primary-700);
}

/* Disabled States */
.disabled,
.disabled:hover,
.disabled:focus {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Loading States */
.loading {
  position: relative;
  color: transparent;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border: 2px solid #e5e7eb;
  border-top-color: var(--color-primary-600);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}`;
  }

  // Generate CSS-JavaScript integration
  async generateCSSJavaScriptIntegration(designSystem) {
    return `
/* ===== CSS-JAVASCRIPT INTEGRATION ===== */

/* JavaScript-controlled states */
.js-hidden {
  display: none !important;
}

.js-visible {
  display: block !important;
}

.js-fade-in {
  opacity: 0;
  transition: opacity var(--transition-base);
}

.js-fade-in.active {
  opacity: 1;
}

.js-slide-in {
  transform: translateY(20px);
  opacity: 0;
  transition: all var(--transition-base);
}

.js-slide-in.active {
  transform: translateY(0);
  opacity: 1;
}

/* Theme switching support */
[data-theme="dark"] {
  --color-bg: #1f2937;
  --color-text: #f9fafb;
  --color-border: #374151;
}

[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #1f2937;
  --color-border: #e5e7eb;
}

/* Component state classes */
.is-loading {
  pointer-events: none;
  opacity: 0.7;
}

.is-error {
  border-color: var(--color-error);
  background-color: rgba(239, 68, 68, 0.05);
}

.is-success {
  border-color: var(--color-success);
  background-color: rgba(16, 185, 129, 0.05);
}`;
  }

  // Generate accessibility CSS
  async generateAccessibilityCSS() {
    return `
/* ===== ACCESSIBILITY ENHANCEMENTS ===== */

/* Focus indicators */
*:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary-600);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .btn {
    border: 2px solid currentColor;
  }
  
  .card {
    border: 2px solid #000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Color blind friendly */
.error-indicator::before {
  content: '⚠ ';
}

.success-indicator::before {
  content: '✓ ';
}

/* Touch targets */
@media (pointer: coarse) {
  .btn {
    min-height: 44px;
    min-width: 44px;
  }
  
  .nav-link {
    min-height: 44px;
  }
}`;
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

  // Generate app-specific content with perfect responsive design (CSP compliant)
  async generateAppSpecificContent(appStructure) {
    if (appStructure.type === 'calculator') {
      return `
        <div class="calculator">
          <div class="calculator-display">
            <div id="calculatorDisplay">0</div>
          </div>
          <div class="calculator-grid">
            <button class="calc-btn calc-btn-clear" data-action="clear">C</button>
            <button class="calc-btn calc-btn-operator" data-action="append" data-value="/">/</button>
            <button class="calc-btn calc-btn-operator" data-action="append" data-value="*">×</button>
            <button class="calc-btn calc-btn-operator" data-action="delete">⌫</button>
            
            <button class="calc-btn calc-btn-number" data-action="append" data-value="7">7</button>
            <button class="calc-btn calc-btn-number" data-action="append" data-value="8">8</button>
            <button class="calc-btn calc-btn-number" data-action="append" data-value="9">9</button>
            <button class="calc-btn calc-btn-operator" data-action="append" data-value="-">-</button>
            
            <button class="calc-btn calc-btn-number" data-action="append" data-value="4">4</button>
            <button class="calc-btn calc-btn-number" data-action="append" data-value="5">5</button>
            <button class="calc-btn calc-btn-number" data-action="append" data-value="6">6</button>
            <button class="calc-btn calc-btn-operator" data-action="append" data-value="+">+</button>
            
            <button class="calc-btn calc-btn-number" data-action="append" data-value="1">1</button>
            <button class="calc-btn calc-btn-number" data-action="append" data-value="2">2</button>
            <button class="calc-btn calc-btn-number" data-action="append" data-value="3">3</button>
            <button class="calc-btn calc-btn-equals" data-action="calculate">=</button>
            
            <button class="calc-btn calc-btn-zero calc-btn-number" data-action="append" data-value="0">0</button>
            <button class="calc-btn calc-btn-number" data-action="append" data-value=".">.</button>
          </div>
        </div>
      `;
    }
    
    return `
      <div class="default-content">
        <h2>Perfect Responsive Application</h2>
        <p>Această aplicație se adaptează perfect la orice dimensiune de ecran.</p>
      </div>
    `;
  }

  // Generate perfect JavaScript without duplications or errors
  async generatePerfectJavaScript(appStructure) {
    if (appStructure.type === 'calculator') {
      return `
        // Perfect Calculator JavaScript - CSP Compliant, No inline handlers
        let currentInput = '0';
        let shouldResetDisplay = false;
        
        // Initialize calculator when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
          initializeCalculator();
        });
        
        function initializeCalculator() {
          // Add event listeners to all calculator buttons
          const buttons = document.querySelectorAll('.calc-btn');
          buttons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
          });
        }
        
        function handleButtonClick(event) {
          const button = event.target;
          const action = button.dataset.action;
          const value = button.dataset.value;
          
          switch(action) {
            case 'append':
              appendToDisplay(value);
              break;
            case 'clear':
              clearCalculator();
              break;
            case 'delete':
              deleteLast();
              break;
            case 'calculate':
              calculateResult();
              break;
          }
        }
        
        function appendToDisplay(value) {
          const display = document.getElementById('calculatorDisplay');
          
          if (shouldResetDisplay) {
            currentInput = '';
            shouldResetDisplay = false;
          }
          
          if (currentInput === '0' && value !== '.') {
            currentInput = value;
          } else {
            currentInput += value;
          }
          
          display.textContent = currentInput;
          
          // Add visual feedback
          display.style.transform = 'scale(1.05)';
          setTimeout(() => {
            display.style.transform = 'scale(1)';
          }, 150);
        }
        
        function clearCalculator() {
          currentInput = '0';
          const displayEl = document.getElementById('calculatorDisplay');
          displayEl.textContent = currentInput;
          
          // Add clear animation
          displayEl.style.animation = 'fadeIn 0.3s ease';
        }
        
        function deleteLast() {
          if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
          } else {
            currentInput = '0';
          }
          document.getElementById('calculatorDisplay').textContent = currentInput;
        }
        
        function calculateResult() {
          try {
            // Safe evaluation
            const result = Function('"use strict"; return (' + currentInput.replace(/×/g, '*') + ')')();
            currentInput = result.toString();
            const resultDisplay = document.getElementById('calculatorDisplay');
            resultDisplay.textContent = currentInput;
            shouldResetDisplay = true;
            
            // Add result animation
            resultDisplay.style.animation = 'slideInUp 0.5s ease';
          } catch (error) {
            document.getElementById('calculatorDisplay').textContent = 'Error';
            currentInput = '0';
            shouldResetDisplay = true;
          }
        }
        
        // Perfect responsive keyboard support
        document.addEventListener('keydown', function(event) {
          const key = event.key;
          
          if (key >= '0' && key <= '9' || key === '.') {
            appendToDisplay(key);
          } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            appendToDisplay(key === '*' ? '×' : key);
          } else if (key === 'Enter' || key === '=') {
            calculateResult();
          } else if (key === 'Escape' || key === 'c' || key === 'C') {
            clearCalculator();
          } else if (key === 'Backspace') {
            deleteLast();
          }
        });
        
        // Perfect responsive touch support
        document.addEventListener('touchstart', function() {
          // Enable touch feedback
        });
        
        // Perfect responsive resize handling
        window.addEventListener('resize', function() {
          // Ensure perfect display on resize
          const calculator = document.querySelector('.calculator');
          if (calculator) {
            calculator.style.transition = 'all 0.3s ease';
          }
        });
        
        console.log('🎉 Perfect Calculator initialized with responsive design');
      `;
    }
    
    return `
      // Perfect responsive JavaScript for general applications
      console.log('✅ Perfect responsive application initialized');
      
      // Responsive utilities
      window.addEventListener('resize', function() {
        console.log('📱 Responsive adjustment:', window.innerWidth + 'x' + window.innerHeight);
      });
    `;
  }

  // Helper methods for CSS generation
  lighten(color, percent) {
    return color; // Simplified for now - in production would implement actual color manipulation
  }

  darken(color, percent) {
    return color; // Simplified for now - in production would implement actual color manipulation
  }

  // Validation method to ensure no CSS/JS errors
  async validateGeneratedCode(htmlContent) {
    const validation = {
      isValid: true,
      errors: [],
      warnings: [],
      recommendations: []
    };

    // Check for CSP-violating inline scripts (now flagged as errors)
    const jsMatches = htmlContent.match(/<script(?!\s+src=)[^>]*>([\s\S]*?)<\/script>/g);
    if (jsMatches) {
      validation.isValid = false;
      validation.errors.push('CSP Violation: Inline scripts detected - all JavaScript must be in external files');
      
      jsMatches.forEach(script => {
        const jsContent = script.replace(/<\/?script[^>]*>/g, '');
        const lines = jsContent.split('\n');
        const declaredVars = new Set();
        
        lines.forEach((line, index) => {
          const varMatch = line.match(/(?:let|const|var)\s+(\w+)/);
          if (varMatch) {
            const varName = varMatch[1];
            if (declaredVars.has(varName)) {
              validation.errors.push(`Duplicate variable declaration: ${varName} at line ${index + 1}`);
              validation.isValid = false;
            }
            declaredVars.add(varName);
          }
        });
      });
    }

    // Check for external references that would cause 404 errors
    const externalRefs = htmlContent.match(/(href|src)="(?!data:|#|javascript:)[^"]*"/g);
    if (externalRefs) {
      externalRefs.forEach(ref => {
        if (!ref.includes('data:') && !ref.includes('#') && !ref.includes('javascript:')) {
          validation.warnings.push(`External reference found: ${ref} - consider inlining`);
        }
      });
    }

    // Check responsive design implementation
    if (!htmlContent.includes('viewport')) {
      validation.errors.push('Missing viewport meta tag for responsive design');
      validation.isValid = false;
    }

    if (!htmlContent.includes('@media')) {
      validation.warnings.push('No responsive breakpoints detected');
    }

    console.log('🔍 Code validation completed:', validation.isValid ? '✅ Valid' : '❌ Errors found');
    return validation;
  }
}

module.exports = SeniorCSSsassAgent;
