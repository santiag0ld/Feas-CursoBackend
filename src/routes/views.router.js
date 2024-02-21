import { Router } from "express";
import { handleAuthFront } from "../middleware/handlePoliciesPASP.js";
import ViewsController from "../controllers/views.controller.js";

const router = Router();
const vControl = new ViewsController();

router
  .get("/", handleAuthFront(["PUBLIC"]), vControl.login)
  .get("/register", handleAuthFront(["PUBLIC"]), vControl.register)
  .get("/products", handleAuthFront(["PUBLIC"]), vControl.products)
  .get("/products/:pid", handleAuthFront(["PUBLIC"]), vControl.productById)
  .get("/cart", handleAuthFront(["USER", "USER_PREMIUM"]), vControl.cart)
  .get(
    "/realTimeProducts",
    handleAuthFront(["USER_PREMIUM"]),
    vControl.realTimeProducts
  )
  .get("/chat", handleAuthFront(["USER", "USER_PREMIUM"]), vControl.chat)
  .get("/user", handleAuthFront(["USER", "USER_PREMIUM"]), vControl.user);

export default router;
