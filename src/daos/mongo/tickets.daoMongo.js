import { Ticket } from './models/ticket.model.js';
import generateTicketCode from '../../utils/ticketCode.js';
import { CartMongo } from "./cart.daoMongo.js";
import { logger } from '../../utils/logger.js';

const cartService = new CartMongo();

class TicketdaoMongo {
  constructor(cid) {
    this.cid = cid;
  }

  async generateTicket() {
    try {
      const cart = await Cart.findById(this.cid).populate('products.product');

      const purchasedProducts = cart.products.filter(({ product, quantity }) => {
        return product.stock >= quantity;
      });

      const amount = purchasedProducts.reduce((total, { product, quantity }) => {
        return total + product.price * quantity;
      }, 0);

      const ticket = await Ticket.create({
        code: generateTicketCode(),
        purchase_datetime: new Date(),
        amount: amount,
        purchaser: cart.user,
        products: purchasedProducts.map(({ product, quantity }) => ({
          product: product._id,
          quantity: quantity
        }))
      });

      const remainingProducts = cart.products.filter(({ product, quantity }) => {
        return product.stock < quantity;
      });
      cart.products = remainingProducts;
      await cart.save();

      return ticket;
    } catch (error) {
      logger.error('Error al completar la compra:', error);
      throw error;
    }
  }
}

export const TicketMongo = TicketdaoMongo;
