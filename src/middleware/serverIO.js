import { Server } from 'socket.io';
import { MessageMongo } from '../daos/mongo/message.daoMongo.js';
import { ProductMongo } from '../daos/mongo/products.daoMongo.js';
import { logger } from '../utils/logger.js';

export function serverIo(server) {
  const io = new Server(server);
  const products = new ProductMongo();
  const messages = new MessageMongo();

  io.on('connection', ios => {
    logger.info("Nuevo cliente conectado");

    ios.on('newProduct', async newProduct => {
      await products.addProduct(newProduct);
      const listProduct = await products.getProducts();
      
      io.emit('productos', listProduct);
    });
  
    ios.on('deleteProduct', async code => {
      await products.deleteProductByCode(code);
      const listProduct = await products.getProducts();
      
      io.emit('products', listProduct);
    });

    ios.on('message', async (data) => {
      const newMessages = await messages.addMessage(data);
      io.emit('messageLogs', newMessages);
    });
  
    ios.on('init', async () => {
      const initialMessages = await messages.getMessages();
      ios.emit('messageLogs', initialMessages);
    });
  
    ios.on('clean', async () => {
      await messages.clearMessages();
      io.emit('messageLogs', []);
    });
  });
}
