const { Router } = require("express");
const router = Router();
const ProductManager = require("../managers/productManager");

const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("index", { title: "Tienda Online", name: "Usuario", products });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { title: "Tienda Online", name: "Usuario", products });
});

module.exports = router;
