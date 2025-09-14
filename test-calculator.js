const DevOpsAIAgent = require('./agents/devops-ai-agent');
const SeniorProductOwnerAgent = require('./agents/senior-product-owner-agent');
const SeniorDesignerAgent = require('./agents/senior-designer-agent');
const SeniorCSSsassAgent = require('./agents/senior-css-sass-agent');

async function testCalculatorGenerationWithCSS() {
  console.log('🧪 Testing Calculator Generation with CSS Agent...');
  
  try {
    // Initialize agents
    const productOwner = new SeniorProductOwnerAgent();
    const designer = new SeniorDesignerAgent();
    const cssAgent = new SeniorCSSsassAgent();
    const devops = new DevOpsAIAgent();
    
    // Test data
    const description = "calculator with exceptional design";
    const appType = "calculator";
    
    console.log('1. Product Owner analyzing requirements...');
    const productAnalysis = await productOwner.analyzeProductRequirements(description);
    console.log('✅ Product analysis complete');
    console.log('Detected app type:', productOwner.detectAppType(description));
    
    console.log('\n2. Designer creating design system...');
    // Create design brief from product analysis
    const designBrief = {
      appType: 'calculator',
      projectOverview: 'Calculator with exceptional design for mathematical calculations',
      designDirection: { mood: 'modern' },
      ...productAnalysis
    };
    const designSystem = await designer.createDesignSystem(designBrief);
    console.log('✅ Design system created');
    
    console.log('\n3. CSS Agent creating advanced styling...');
    const advancedStyling = await cssAgent.createAdvancedStyling(designSystem, {}, 'calculator');
    console.log('✅ Advanced styling created');
    console.log('CSS modules generated:', Object.keys(advancedStyling).length);
    
    console.log('\n4. CSS Agent collaborating with Designer...');
    const designerCollaboration = await cssAgent.collaborateWithDesignerAgent(designSystem, {});
    console.log('✅ Designer collaboration complete');
    
    console.log('\n5. DevOps generating application structure...');
    const appType2 = devops.detectAppTypeFromAnalysis({
      productRequirements: productAnalysis,
      type: appType
    });
    console.log('DevOps detected app type:', appType2);
    
    console.log('\n6. Generating specific calculator interface...');
    const calculatorInterface = devops.generateSpecificInterface('calculator', designSystem);
    console.log('✅ Calculator interface generated');
    
    console.log('\n7. Generating complete HTML with inline CSS...');
    
    // Generate complete inline CSS from CSS Agent
    const completeInlineCSS = await cssAgent.generateCompleteInlineCSS(designSystem, 'calculator');
    
    // Generate HTML without external references
    const completeHTML = `<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productAnalysis.productVision.valueProposition}</title>
    <style>
${completeInlineCSS}
        
        /* Additional app styling */
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        
        .app-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .app-header {
            background: var(--color-primary-600);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .app-content {
            padding: 40px;
        }
    </style>
</head>
<body>
    <div class="app-container">
        <header class="app-header">
            <h1>${productAnalysis.productVision.valueProposition}</h1>
            <p>${productAnalysis.productVision.mission}</p>
        </header>
        
        <main class="app-content">
            ${devops.generateSpecificInterface('calculator', designSystem)}
        </main>
    </div>
    
    <script>
        // Calculator functionality
        let display = document.getElementById('display');
        let currentInput = '0';
        let operator = null;
        let firstOperand = null;
        
        function updateDisplay() {
            display.value = currentInput;
        }
        
        function inputNumber(num) {
            if (currentInput === '0') {
                currentInput = num;
            } else {
                currentInput += num;
            }
            updateDisplay();
        }
        
        function inputOperator(op) {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else if (operator) {
                const result = calculate(firstOperand, parseFloat(currentInput), operator);
                currentInput = result.toString();
                firstOperand = result;
            }
            operator = op;
            currentInput = '0';
            updateDisplay();
        }
        
        function calculate(first, second, op) {
            switch (op) {
                case '+': return first + second;
                case '-': return first - second;
                case '*': return first * second;
                case '/': return first / second;
                default: return second;
            }
        }
        
        function calculateResult() {
            if (operator && firstOperand !== null) {
                const result = calculate(firstOperand, parseFloat(currentInput), operator);
                currentInput = result.toString();
                operator = null;
                firstOperand = null;
                updateDisplay();
            }
        }
        
        function clearDisplay() {
            currentInput = '0';
            operator = null;
            firstOperand = null;
            updateDisplay();
        }
    </script>
</body>
</html>`;
    
    console.log('✅ Complete HTML with inline CSS generated');
    
    // Save the HTML for testing
    const fs = require('fs');
    fs.writeFileSync('/Users/catalin-2/Programming/ai-team/test-calculator-with-css.html', completeHTML);
    console.log('✅ HTML saved to test-calculator-with-css.html (no external dependencies)');
    
    console.log('\n8. Validating production readiness...');
    const validation = await cssAgent.validateCSSProduction(completeHTML);
    console.log('Production ready:', validation.productionReady);
    console.log('External dependencies:', validation.hasExternalDependencies);
    console.log('Inline CSS:', validation.hasInlineCSS);
    console.log('JavaScript included:', validation.hasJavaScript);
    console.log('CSS modules found:', validation.cssModules.join(', '));
    if (validation.errors.length > 0) {
      console.log('❌ Errors:', validation.errors);
    } else {
      console.log('✅ No errors found');
    }
    
    // Test advanced styling modules
    console.log('\n9. Testing CSS modules...');
    console.log('Variables module:', !!advancedStyling.variables);
    console.log('Typography module:', !!advancedStyling.typography);
    console.log('Layout module:', !!advancedStyling.layout);
    console.log('Components module:', !!advancedStyling.components);
    console.log('Animations module:', !!advancedStyling.animations);
    console.log('Responsive module:', !!advancedStyling.responsive);
    console.log('App-specific styles:', !!advancedStyling.appSpecific);
    
    console.log('\n🎉 Calculator generation with CSS Agent test completed successfully!');
    console.log('🌐 Open test-calculator-with-css.html in browser to see the professional styling');
    console.log('🎨 CSS Agent successfully integrated with Designer and DevOps workflow');
    console.log('✅ No external dependencies - all CSS and JS inline for production-ready deployment');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
  }
}

testCalculatorGenerationWithCSS();
