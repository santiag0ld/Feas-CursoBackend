const { ObjectId } = require("bson");
const { cartModel } = require("./models/carts.model.js");

class CartDaoMongo {
  constructor() {
    this.model = cartModel;
  }

  async create() {
    try {
      return await this.model.create({});
    } catch (error) {
      console.log(error);
      throw new Error("Error creando el carrito.");
    }
  }

  async getCarts(cid) {
    try {
      return await this.model.findOne({ _id: new ObjectId(cid) }).populate('products');
    } catch (error) {
      console.log(error);
      throw new Error("Error localizando el carrito.");
    }
  }

  async updateCart(cid, products) {
    try {
      return await this.model.updateOne({ _id: new ObjectId(cid) }, { $set: { products } });
    } catch (error) {
      console.log(error);
      throw new Error("Error actualizando el carrito.");
    }
  }

  async updateProductQuantity(cid, productId, quantity) {
    try {
      const cart = await this.getCarts(cid);
      if (!cart) {
        throw new Error("No se encontró el carrito.");
      }

      const productIndex = cart.products.findIndex((elm) => elm.productId.toString() === productId);
      if (productIndex === -1) {
        throw new Error("El producto no se encuentra en el carrito.");
      }

      cart.products[productIndex].quantity = quantity;

      return await cart.save();
    } catch (error) {
      console.log(error);
      throw new Error("Error actualizando los productos.");
    }
  }

  async removeAllProducts(cid) {
    try {
      return await this.model.updateOne({ _id: new ObjectId(cid) }, { $set: { products: [] } });
    } catch (error) {
      console.log(error);
      throw new Error("Hubo un error.");
    }
  }

  async addProduct(cid, productId) {
    try {
      const cart = await this.getCarts(cid);
      if (!cart) {
        throw new Error("No se encontró el carrito.");
      }

      const productIndex = cart.products.findIndex((elm) => elm.productId.toString() === productId);
      if (productIndex === -1) {
        cart.products.push({
          productId: new ObjectId(productId),
          quantity: 1,
        });
      } else {
        cart.products[productIndex].quantity++;
      }

      return await cart.save();
    } catch (error) {
      console.log(error);
      throw new Error("Error agregando el producto.");
    }
  }
}

exports.CartMongo = CartDaoMongo;
