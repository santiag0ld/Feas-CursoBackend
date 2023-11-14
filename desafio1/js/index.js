const fs = require('fs')

class ProductManager {
  constructor (path) {
    this.path = path || "products.json"
    this.counterId = 0
    this.products = []
    /*{
        id 
        title (nombre del producto)
        description (descripción del producto)
        price (precio)
        code (código identificador)
        thumbnail (ruta de imagen)
        stock (número de piezas disponibles)
      }*/
    
    // inicializa productos
    this.getProducts(true)
  }

  getProducts = async (sincroniza = false) => {
    let obtainProducts
    const verSiExiste = fs.existsSync(this.path)
    if (!verSiExiste) {
      obtainProducts = []
    } else {
      obtainProducts = await fs.promises.readFile(this.path, "utf-8")
      obtainProducts = JSON.parse(obtainProducts)
    }

    if (sincroniza) { this.products = obtainProducts }

    return obtainProducts
  }

  getProductsById = async (id) => {
    let leerProductos = []
    leerProductos = await this.getProducts()

    const producto = leerProductos.find((prod) => prod.id === id)
    return producto ? producto : "Producto no encontrado"
  }

  async addProduct ( { title, description, price, code, thumbnail, stock } ) {

    if (!title || !description || !price || !code || !thumbnail || !stock ) {
      return "ERROR: debe completar todos los campos"
    }

    const existe = this.products.some((p) => p.code === code);
    if (existe) {
      return "ERROR: codigo repetido"
    }

    const newProduct = {
      id: this.counterId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock
    }

    this.counterId++
    this.products.push(newProduct)
    const jsonProduct = JSON.stringify(this.products, null, 2)
    await fs.promises.writeFile(this.path, jsonProduct)
    return this.products
  }

  async updateProduct ( id, cambioObj ) {
    const i = this.products.findIndex(elm => elm.id===id)

    if (i === -1) {
      return "Producto no encontrado";
    } else {
      const keys = Object.keys(cambioObj)
      keys.forEach((k) => {
        this.products[i][k]=cambioObj[k]
      })
    }
    
    const jsonProduct = JSON.stringify(this.products, null, 2)
    await fs.promises.writeFile(this.path, jsonProduct)
    return this.products
  }

  async deleteProduct (id) {
    const i = this.products.findIndex(elm => elm.id===id)

    if (i === -1) {
      return "Producto no encontrado";
    } else {
      const newProducts = this.products.filter((elm) => elm.id != id)
      this.products = newProducts
      const jsonProduct = JSON.stringify(this.products, null, 2)
      await fs.promises.writeFile(this.path, jsonProduct)
      return this.products
    }
  }
}

module.exports = {
  ProductManager: ProductManager,
};