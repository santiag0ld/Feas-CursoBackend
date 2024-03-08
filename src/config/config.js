import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { program } from "./commander.js";
import { logger } from '../utils/logger.js';

const opts = program.opts();

dotenv.config({
  path: opts.mode == 'production' ? './.env.production' : './.env.development'
})


const configObject = {
    port: process.env.PORT,
    jwt_code: process.env.JWT_SECRET_CODE,
    cookies_code: process.env.COOKIES_SECRET_CODE,
    mongo_url: process.env.MONGO_URI,
    admin: process.env.USERS_ADMIN,
    admin_pass: process.env.USER_ADMIN_PASS,
    persistance: process.env.PERSISTANCE,
    gmail_user_app: process.env.GMAIL_USER_APP,
    gmail_pass_app: process.env.GMAIL_PASS_APP,
    gh_client_id: process.env.GITHUB_CLIENT_ID,
    gh_client_secret: process.env.GITHUB_CLIENT_SECRET,
    development: opts.mode == 'development',
}

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

const sessionAtlas = (app) => {
  const uri = process.env.MONGO_URI;
  app.use(
    
    session({

      store: MongoStore.create({
        mongoUrl: uri,
        mongoOptions: {},
        ttl: 3600,
      }),
      secret: process.env.COOKIES_SECRET_CODE,
      resave: true,
      saveUninitialized: true,
    })
  );
};

export { connectDB, sessionAtlas, configObject };

