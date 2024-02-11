import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { program } from "../config/commander.js";

dotenv.config();

const { mode } = program.opts();

console.log('mode config: ', mode);

const configPath = mode === 'production' ? './.env.production' : './.env.development';
dotenv.config({ path: configPath });

const configObject = {
    PORT: process.env.PORT || 4000,
    mongo_url: process.env.MONGO_URI,
    gh_client_id:'',
    gh_client_secret: ''
}

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

export { connectDB, sessionAtlas, configObject };
