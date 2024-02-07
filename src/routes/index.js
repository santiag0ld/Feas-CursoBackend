const express = require('express');
const { Router } = require('express');
const { viewsRouter } = require('./routes/views.router.js');
const { sessionsRouter } = require('./routes/sessions.router.js');
const { productsRouter } = require('./routes/products.router.js');
const { cartsRouter } = require('./routes/carts.router.js');
const { connectDB } = require('./config/config.js');

const router = Router();

connectDB()
  .then(() => {

    router.use('/', viewsRouter);

    router.use('/api/products', productsRouter);
    router.use('/api/carts', cartsRouter);
    router.use('/api/sessions', sessionsRouter);
    router.use('/api/messages', messagesRouter);
    router.use('/api/users', () => {});

    router.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Server error');
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
