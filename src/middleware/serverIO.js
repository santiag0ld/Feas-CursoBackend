module.exports = function (server) {
  const { Server } = require('socket.io');
  const { MessageMongo } = require('../daos/mongo/message.daoMongo');
  const { ProductMongo } = require('../daos/mongo/products.daoMongo');

  const io = new Server(server)

  const products = new ProductMongo();
  const messages = new MessageMongo();

  io.on('connection', ios => {
    console.log("Nuevo cliente conectado");

    ios.on('newProduct', async newProduct => {
      await products.addProduct(newProduct);
      const listProduct = await products.getProducts()
      
      io.emit('productos', listProduct)
    })
  
    ios.on('deleteProduct', async code => {
      await products.deleteProductByCode(code);
      const listProduct = await products.getProducts()
      
      io.emit('products', listProduct)
    })

    ios.on('message', async (data) => {
      const newMessaegs = await messages.addMessage(data);
      io.emit('messageLogs', newMessaegs)
    })
  
    ios.on('init', async () => {
      ios.emit('messageLogs', newMessaegs)
    })
  
    ios.on('clean', async () => {
      await messages.clearMessages()
      io.emit('messageLogs', newMessaegs)
    })
  })
}

