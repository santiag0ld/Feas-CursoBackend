const express = require('express');
const { Router } = require('express');
const { viewsRouter } = require('./routes/views.router.js');
const { sessionsRouter } = require('./routes/sessions.router.js');
const { productsRouter } = require('./routes/products.router.js');
const { cartsRouter } = require('./routes/carts.router.js');
const { MessageMongo } = require('./daos/mongo/message.daoMongo.js');
const { connectDB } = require('./config/config.js');

const router = Router();
const messages = new MessageMongo();

connectDB()
  .then(() => {

    router.use('/', viewsRouter);
    router.use('/sessions', sessionsRouter)
    router.use('/products', productsRouter);
    router.use('/carts', cartsRouter);

    router.delete('/messages', async (req, res) => {
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
