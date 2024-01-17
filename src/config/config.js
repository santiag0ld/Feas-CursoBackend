require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb+srv://santifeas:4220@vidaverdeecomm.vddlmop.mongodb.net/VidaVerdeEcomm';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};


const sessionAtlas = (app) => {
  const uri = process.env.MONGO_URI || 'mongodb+srv://santifeas:4220@vidaverdeecomm.vddlmop.mongodb.net/VidaVerdeEcomm';
  app.use(
    
    session({
      
      store: MongoStore.create({
        mongoUrl: uri,
        mongoOptions: {},
        ttl: 3600,
      }),
      secret: process.env.SESSION_SECRET || 'default_secret',
      resave: true,
      saveUninitialized: true,
    })
  );
};


module.exports = { connectDB, sessionAtlas };
