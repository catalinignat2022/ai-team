// Railway MongoDB Connection Fix
// This script fixes common MongoDB connection issues on Railway

const mongoose = require('mongoose');
require('dotenv').config();

async function fixRailwayConnection() {
  console.log('🔧 Starting Railway MongoDB connection fix...');
  
  try {
    // Multiple connection string sources
    const connectionStrings = [
      process.env.DATABASE_URL,
      process.env.MONGODB_URI,
      process.env.MONGO_URL,
      process.env.MONGOURL
    ];
    
    const validConnectionString = connectionStrings.find(str => str && str.includes('mongodb'));
    
    if (!validConnectionString) {
      console.error('❌ No valid MongoDB connection string found!');
      console.log('📋 Available environment variables:');
      console.log('   DATABASE_URL:', !!process.env.DATABASE_URL);
      console.log('   MONGODB_URI:', !!process.env.MONGODB_URI);
      console.log('   MONGO_URL:', !!process.env.MONGO_URL);
      console.log('   MONGOURL:', !!process.env.MONGOURL);
      console.log('');
      console.log('🚂 Railway Setup Instructions:');
      console.log('1. Go to Railway dashboard: https://railway.app/');
      console.log('2. Open your project');
      console.log('3. Add MongoDB service: New Service → Database → MongoDB');
      console.log('4. Railway will automatically set DATABASE_URL');
      console.log('5. Redeploy your application');
      process.exit(1);
    }
    
    console.log('🔗 Found connection string:', validConnectionString.replace(/:\/\/[^:]+:[^@]+@/, '://***:***@'));
    
    // Connection options optimized for Railway
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10,
      minPoolSize: 2,
      bufferCommands: false,
      bufferMaxEntries: 0,
      // Retry logic
      retryWrites: true,
      retryReads: true
    };
    
    console.log('🔄 Attempting MongoDB connection...');
    await mongoose.connect(validConnectionString, options);
    
    console.log('✅ MongoDB connection successful!');
    
    // Test basic operations
    const admin = mongoose.connection.db.admin();
    const dbStats = await admin.dbStats();
    console.log('📊 Database stats:', {
      collections: dbStats.collections,
      dataSize: dbStats.dataSize,
      indexes: dbStats.indexes
    });
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    await mongoose.connection.close();
    console.log('✅ Connection test completed successfully');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('🔍 Error details:', error.name);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('');
      console.log('🚨 Connection Refused Error - Common fixes:');
      console.log('1. Check if MongoDB service is running on Railway');
      console.log('2. Verify DATABASE_URL is correctly set');
      console.log('3. Ensure your Railway project has MongoDB service added');
      console.log('4. Check if IP whitelist includes Railway IPs');
    }
    
    if (error.message.includes('authentication')) {
      console.log('');
      console.log('🚨 Authentication Error - Common fixes:');
      console.log('1. Check MongoDB username/password in DATABASE_URL');
      console.log('2. Verify user has correct permissions');
      console.log('3. Check if database name is correct');
    }
    
    process.exit(1);
  }
}

fixRailwayConnection();
