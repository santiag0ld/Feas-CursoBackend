class ProductManager {
  constructor() {
    this.counterId = 0;
    this.products = [];
  }
  getProducts = () => {
    return this.products;
  };

  getProductsById = (id) => {
    return this.products[id] ? this.products[id] : console.error("Not found");
  };

  addProduct({ title, description, price, code, thumbnail, stock }) {
    if (!title || !description || !price || !code || !thumbnail || !stock) {
      console.error("Por favor, complete todos los campos.");
      return;
    }

    const existe = this.products.some((p) => p.code === code);
    if (existe) {
      console.error("Codigo de producto ya existente.");
      return;
    }

    const newProduct = {
      id: this.counterId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    this.counterId++;
    this.products.push(newProduct);
  }
}

module.exports = {
  ProductManager: ProductManager,
};
