/**
 * Test local pentru API-ul de creare aplicații
 * Pentru debugging problema cu 'analysis' variable initialization
 */

const DevOpsAIAgent = require('./agents/devops-ai-agent');

async function testCreateAppLocal() {
  console.log('🧪 Testing Create App API locally...');
  
  try {
    const devops = new DevOpsAIAgent();
    
    const options = {
      description: "vreau sa creezi o aplicatie de dating completa si comlexa care sa fie in stilul bumble. Toate rutele vor fi perfect functionale. Vei crea baza de date in mongo si date dummy pentru persoane de test. Repet! Aplicatia trebuie sa fie perfect functionala!",
      timestamp: new Date().toISOString(),
      clientInfo: { test: true }
    };
    
    console.log('📝 Testing with description:', options.description.substring(0, 100) + '...');
    
    const result = await devops.createApplication(options);
    
    console.log('\n✅ Test completed!');
    console.log('Result:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ Test failed with error:');
    console.error('Error message:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

testCreateAppLocal();
