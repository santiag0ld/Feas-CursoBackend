const { Router } = require("express");
const { ProductMongo } = require("../daos/mongo/products.daoMongo.js");
const { userModel } = require("../daos/mongo/models/user.model");
const { authentication } = require("../middleware/auth.js");
const router = Router();
const productsMongo = new ProductMongo();

router.get("/", async (req, res) => {
  let product = await productsMongo.getProducts();
  product.forEach((prd) => {
    prd.price = new Intl.NumberFormat("es-ES", { style: "decimal" }).format(
      prd.price
    );
  });
  res.render("index", {
    title: "Inicio",
    product,
  });
});

router.get("/realTimeProducts", async (req, res) => {
  try {
    const { limit, pageNumber, sort, query } = req.query;
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    const userId =
      req.session && req.session.user ? req.session.user.user : null;
    const user = await userModel.findOne({ _id: userId }).lean();
    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, page } =
      await productViewService.getProducts({
        limit: parsedLimit,
        pageNumber,
        sort,
        query,
      });
    res.render("realTimeProducts", {
      title: "Real Time",
      user,
      docs,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      page,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

router.get("/chat", async (req, res) => {
  const userId = req.session && req.session.user ? req.session.user.user : null;
  const user = await userModel.findOne({ _id: userId }).lean();
  try {
    res.render("chat", {
      title: "Chat",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

router.get("/products", authentication, async (req, res) => {
  let product = await productsMongo.getProducts();
  product.forEach((prd) => {
    prd.price = new Intl.NumberFormat("es-ES", { style: "decimal" }).format(
      prd.price
    );
  });
  res.render("Products", {
    title: "Productos",
    product,
    scriptView: "./js/index.js",
    userName: req.session?.user?.first_name,
  });
});

router.get("/chat", async (req, res) => {
  res.render("chat");
});

module.exports = { viewsRouter: router };
