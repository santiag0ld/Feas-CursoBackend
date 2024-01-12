// index.js
const express = require('express');
const { Router } = require('express');
const { viewsRouter } = require('./views.router.js');
const { productsRouter } = require('./products.router.js');
const { cartsRouter } = require('./carts.router.js');
const { MessageMongo } = require('../daos/mongo/message.daoMongo.js');
const { connectDB } = require('../config/config.js');

const router = Router();
const messages = new MessageMongo();

connectDB()
  .then(() => {

    router.use('/', viewsRouter);

    router.use('/api/products/', productsRouter);
    router.use('/api/carts/', cartsRouter);
    router.delete('/api/messages', async (req, res) => {
      await messages.clearMessages();
      res.status(200).json({
        status: 'ok',
      });
    });
    router.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Error de server');
    });

    const app = express();
    const port = process.env.PORT || 3000;

    app.use('/', router);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start the server:', error.message);
    process.exit(1);
  });
