import mongoose from 'mongoose';

export const connectDB = async (retries = 5, delay = 5000): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('❌ MONGODB_URI environment variable is not defined');
    return;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await mongoose.connect(mongoUri, {
        dbName: 'knightora',
        serverSelectionTimeoutMS: 15000,
      } as any);

      console.log(`✅ MongoDB Atlas connected: ${conn.connection.host}`);
      return;
    } catch (error: any) {
      console.error(`❌ MongoDB connection attempt ${attempt}/${retries} failed:`, error.message || error);
      if (attempt < retries) {
        console.log(`⏳ Retrying MongoDB connection in ${delay / 1000} seconds...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error('🚨 All MongoDB connection attempts failed. Check Atlas Network Access (IP whitelist).');
      }
    }
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected successfully');
});

export default mongoose;
