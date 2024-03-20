import { Router } from "express";
import { handleAuth } from "../middleware/auth.js";
import ViewsController from "../controllers/views.controller.js";

const router = Router();
const vControl = new ViewsController();

router
  .get("/", handleAuth(["PUBLIC"]), vControl.login)
  .get("/register", handleAuth(["PUBLIC"]), vControl.register)
  .get("/products", handleAuth(["PUBLIC"]), vControl.products)
  .get("/products/:pid", handleAuth(["PUBLIC"]), vControl.productById)
  .get("/cart", handleAuth(["USER", "USER_PREMIUM"]), vControl.cart)
  .get(
    "/realTimeProducts",
    handleAuth(["USER_PREMIUM"]),
    vControl.realTimeProducts
  )
  .get("/chat", handleAuth(["USER", "USER_PREMIUM"]), vControl.chat)
  .get("/user", handleAuth(["USER", "USER_PREMIUM"]), vControl.user);
export default router;
