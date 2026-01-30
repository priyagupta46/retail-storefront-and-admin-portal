const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/retailhub';

let connection = null;

async function connectDatabase() {
  if (connection && connection.readyState === 1) {
    return connection;
  }

  try {
    // Create a new connection instance with the specific database
    connection = await mongoose.createConnection(mongoUri).asPromise();
    console.log('Connected to MongoDB at', mongoUri);
    console.log('Database name:', connection.name);
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

function getConnection() {
  if (!connection) {
    throw new Error('Database not connected. Call connectDatabase() first.');
  }
  return connection;
}

module.exports = {
  connectDatabase,
  getConnection
};
