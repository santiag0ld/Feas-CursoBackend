import { CartMongo } from "../daos/mongo/cart.daoMongo.js";
import { ProductMongo } from "../daos/mongo/products.daoMongo.js";
import { TicketMongo } from "../daos/mongo/tickets.daoMongo.js";

const productsService = new ProductMongo();
const ticketMongo = new TicketMongo();

class CartsController {
  constructor() {
    this.service = new CartMongo();
  }

  getCarts = async (req, res) => {
    try {
      const populate = req.query.populate || true;

      let carts
      if(populate) {
        carts = await this.service.getCartsPopulate();
      } else {
        carts = await this.service.getCarts();
      }
    
      res.sendSuccess(carts)
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  getCartById = async (req, res) => {
    try {
      const cid = req.params.cid;
      const populate = req.query.populate || true;

      let carts
      if(populate) {
        carts = await this.service.getCartsByIdPopulate(cid);
      } else {
        carts = await this.service.getCartById(cid);
      }
    
      res.sendSuccess(carts)
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  create = async (req, res) => {
    try{
      const resp = await this.service.create();
      res.sendSuccess(resp)
    } catch(err){
      res.status(500).send({ message: err.message });
    }
  }

  addProduct = async (req, res) => {
    try {
      const { cid, pid } = req.params;

      const cart = await this.service.getCartById(cid);
      if (!cart) return res.sendNotFound('Carrito no encontrado.');

      const product = await productsService.getProductsById(pid);
      if (!product) return res.sendNotFound('Producto no encontrado.');

      if (product.stock < 1) {
        return res.status(400).send({ message: 'Producto sin stock suficiente.' });
      }

      const updatedProduct = await productsService.updateProductStock(pid, product.stock - 1);

      const updatedCart = await this.service.increaseProductQuantity(cid, pid);

      res.sendSuccess(updatedCart);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  decreaseProductQuantityById = async (req, res) => {
    try {
      const { cid, pid } = req.params;
  
      const cart = await this.service.getCartById(cid);
      if (!cart) return res.sendNotFound('Carrito no encontrado');
  
      const product = await product.getProductsById(pid);
      if (!product) return res.sendNotFound('Producto no encontrado');
  
      const updatedCart = await this.service.decreaseProductQuantity(cid, pid);

      res.sendSuccess(updatedCart)
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  updateProductQuantity = async (req, res) => {
    try {
      const {cid, pid} = req.params;
      const {quantity} = req.body*1
      
      if (isNaN(quantity) ) res.status(500).send({ message: 'Se introdujo una cantidad erronea.' });

      const cart = await this.service.getCartById(cid);
      if (!cart) return res.sendNotFound('Carrito no encontrado');
      const product = await productsService.getProductsById(pid);
      if (!product) return res.sendNotFound('Producto no encontrado');

      const updatedCart = await this.service.updateProductQuantity(cid, pid, quantity);

      res.sendSuccess(updatedCart)
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  removeProductById = async (req, res) => {
    try{
      const {cid, pid} = req.params;

      const cart = await this.service.getCartById(cid);
      if (!cart) return res.sendNotFound('Carrito no encontrado');
      const product = await productsService.getProductsById(pid);
      if (!product) return res.sendNotFound('Producto no encontrado');
    
      const updatedCart = await this.service.removeAllProducts(cid, pid);
    
      res.sendSuccess(updatedCart)
    } catch(error){
      res.status(500).send({ message: error.message });
    }
  } 

  updateProducts = async (req, res) => {
    try{
      const { cid } = req.params;
      const newProducts = req.body
    
      const cart = await this.service.getCartById(cid);
      if (!cart) return res.sendNotFound('Carrito no encontrado');

      const updatedCart = await this.service.updateCartProducts(cid, newProducts);
    
      res.sendSuccess(updatedCart)
    } catch(error){
      res.status(500).send({ message: error.message });
    }
  }

  removeProducts = async (req, res) => {
    try{
      const { cid } = req.params;

      const cart = await this.service.getCartById(cid);
      if (!cart) return res.sendNotFound('Carrito no encontrado');
    
      const updatedCart = await this.service.removeAllProducts(cid);
    
      res.sendSuccess(updatedCart)
    } catch(error){
      res.status(500).send({ message: error.message });
    }
  }

  purchaseCart = async (req, res) => {
    try {
      const { cid } = req.params;

      const cart = await this.service.getCartById(cid);
      if (!cart) return res.sendNotFound('Carrito no encontrado');

      let totalAmount = 0;
      for (const item of cart.products) {
        totalAmount += item.price * item.quantity;
      }

      const ticketCode = await ticketMongo.generateTicket();

      const ticket = await ticketMongo.createTicket({
        code: ticketCode,
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: req.user.email,
        products: cart.products,
      });

      res.sendSuccess({ message: "Se realizo con exito la compra del carrito " + cid, ticket });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}

export default CartsController;