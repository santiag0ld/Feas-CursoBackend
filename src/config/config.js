const mongoose = require('mongoose');

exports.connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@vidaverdeecomm.vddlmop.mongodb.net/VidaVerdeEcomm?retryWrites=true&w=majority`,
  );
  console.log('Base de datos conectada');
};

const session = require('express-session');
const MongoStore = require('connect-mongo');

exports.sessionAtlas = (app) => {
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@vidaverdeecomm.vddlmop.mongodb.net/VidaVerdeEcomm?retryWrites=true&w=majority`,
        mongoOptions: {},
        ttl: 3600, // milisegundos --> hs
      }),
      secret: 4220,
      resave: true,
      saveUninitialized: true,
    })
  );
};
