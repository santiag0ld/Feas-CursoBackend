const fs = require("node:fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async clearProducts() {
    this.products = [];
    const productsJSON = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, productsJSON);
  }

  validateProduct = ({ title, description, price, thumbnails, code, stock, status, category }) => {
    if (!title || !description || !price || thumbnails?.length === 0 || !code || !stock || typeof status !== "boolean" || !category) {
      throw new Error("Por favor, complete todos los campos");
    }

    const existingProduct = this.products.find((product) => product.code === code);
    if (existingProduct) {
      throw new Error("Producto con codigo ya existente.");
    }
  };

  async saveProducts() {
    const productsJSON = JSON.stringify(this.products, null, 2);
    await fs.promises.writeFile(this.path, productsJSON);
  }

  async addProduct(title, description, price, thumbnails, code, stock, status, category) {
    const newProduct = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      status,
      category,
    };
    console.log(newProduct);

    this.validateProduct(newProduct);
    this.products.push(newProduct);
    await this.saveProducts();
    return newProduct;
  }

  async getProducts() {
    const productsJSON = await fs.promises.readFile(this.path, "utf-8");
    this.products = JSON.parse(productsJSON);
    return this.products;
  }

  async getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error("Producto no encontrado.");
    }
    return product;
  }

  async updateProduct(id, title, description, price, thumbnails, code, stock, status, category) {

    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error("Producto no encontrado.");
    }

    if (!title || !description || !price || thumbnails?.length === 0 || !code || !stock || typeof status !== "boolean" || !category) {
      throw new Error("Missing properties");
    }
    this.products[productIndex] = { id, title, description, price, thumbnails, code, stock, status, category };
    await this.saveProducts();
    return this.products[productIndex];
  }

  async deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error("Producto no encontrado.");
    }
    const deletedProduct = this.products[productIndex];
    this.products.splice(productIndex, 1);
    await this.saveProducts();
    return deletedProduct;
  }
}

module.exports = ProductManager;
