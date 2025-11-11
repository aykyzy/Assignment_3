//configuration for mongodb connection
const mongoose = require('mongoose');

function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI missing in .env');
    process.exit(1);
  }

  mongoose.set('strictQuery', true);
  mongoose
    .connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      process.exit(1);
    });
}

module.exports = connectDB;