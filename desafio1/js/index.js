class Product {
    constructor(id, title, description, price, thumbnail, code, stock) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor() {
        this.products = [];
        this.id = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Por favor, complete todos los campos.");
            return;
        }
        if (this.products.some(product => product.title === title)) {
            console.error("Ya existe un producto con el mismo título.");
            return;
        }

        const product = new Product(this.id, title, description, price, thumbnail, code, stock);
        this.products.push(product);
        this.id++;
    }

    getProducts() {
        return this.products;
    }

    getProductById(code) {
        const product = this.products.find(product => product.code === code);
        if (!product) {
            console.error("Not Found.");
        }
        return product;
    }
}

const productManager = new ProductManager();

productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "abc123", "Sin imagen", 25);
productManager.addProduct("otra prueba", "Este es otro producto de prueba", 150, "abc124", "Sin imagen", 25);
productManager.addProduct("tercer prueba", "Este es la tercer prueba", 150, "abc125", "Sin imagen", 25);
productManager.addProduct("producto prueba", "Este es un producto de prueba", 200, "abc123", "Sin imagen", 25);
productManager.addProduct("producto sin codigo");

const getProducts = productManager.getProducts();
console.log(getProducts);

const productById = productManager.getProductById();
console.log(productById);
