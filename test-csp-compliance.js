const DevOpsAIAgent = require('./agents/devops-ai-agent');

async function testCSPCompliance() {
  console.log('🧪 Testing CSP compliance for calculator app...');
  
  const devops = new DevOpsAIAgent();
  
  try {
    const result = await devops.createApplication({
      description: 'creează o aplicație calculator simplu pentru teste CSP',
      timestamp: new Date().toISOString(),
      clientInfo: 'CSP Test'
    });
    
    if (result.htmlContent) {
      console.log('✅ HTML generated successfully');
      
      // Check for inline scripts
      if (result.htmlContent.includes('<script>') && !result.htmlContent.includes('src=')) {
        console.error('❌ CSP VIOLATION: Inline scripts detected');
        return false;
      } else {
        console.log('✅ No inline scripts found - CSP compliant');
      }
      
      // Check for external script references
      if (result.htmlContent.includes('<script src=')) {
        console.log('✅ External script references found');
      }
      
      console.log('🎯 CSP Compliance Test PASSED');
      return true;
    } else {
      console.error('❌ No HTML content generated');
      return false;
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

testCSPCompliance().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('💥 Test crashed:', error);
  process.exit(1);
});
