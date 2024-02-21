import { Router } from "express";
import CartsController from "../../controllers/carts.controller.js";

const router = Router();
const cControl = new CartsController();

router
  .get('/', cControl.getCarts)
  .get('/:cid', cControl.getCartById)
  .post('/', cControl.create)
  .post('/:cid/product/:pid', cControl.addProduct)
  .put('/:cid', cControl.updateProducts) 
  .delete('/:cid', cControl.removeProducts)
  .put('/:cid/product/:pid', cControl.updateProductQuantity)
  .delete('/:cid/product/:pid', cControl.removeProductById)
  .post("/:cid/purchase", cControl.purchaseCart);

export default router;