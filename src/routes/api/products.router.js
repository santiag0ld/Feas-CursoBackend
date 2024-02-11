import { Router } from "express";
import ProductsController from "../../controllers/products.controller.js";
const router = Router();

const {
  getProducts,
  getProductsById,
  createProduct,
  updateProductById,
  deleteProductById,
  deleteProductByCode,
  getCategorys,
} = new ProductsController();

router
  .get("/", getProducts)
  .get("/:pid", getProductsById)
  .post("/", createProduct)
  .put("/:pid", updateProductById)
  .delete("/:pid", deleteProductById)
  .delete("/", deleteProductByCode)
  .get("/group/categorys", getCategorys);

export default router;
