import { Router } from "express";
import ProductsController from "../../controllers/products.controller.js";

const router = Router();
const pControl = new ProductsController();

router
  .get("/", pControl.getProducts)
  .get("/:pid", pControl.getProductsById)
  .post("/", pControl.createProduct)
  .put("/:pid", pControl.updateProductById)
  .delete("/:pid", pControl.deleteProductById)
  .delete("/", pControl.deleteProductByCode)
  .get("/group/categorys", pControl.getCategorys);

export default router;
