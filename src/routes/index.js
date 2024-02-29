import { Router } from "express";
import viewsRouter from "./views.router.js";
import productsRouter from "./api/products.router.js";
import mailRouter from "./api/mail.router.js";
import messagesRouter from "./api/messages.router.js";
import sessionsRouter from "./api/sessions.router.js";
import cartsRouter from "./api/carts.router.js";
import { handleAuthFront } from "../middleware/auth.js";

const router = Router();

router.use("/", viewsRouter);

router.use("/api/products/", productsRouter);
router.use("/api/carts/", cartsRouter);
router.use("/api/sessions/", sessionsRouter);
router.use('/api/mail', mailRouter)
router.use("/api/messages", messagesRouter);
router.use("/api/users/", () => {});

router.get('/current', handleAuthFront(['USER']), ()=> {
  console.log("datos sensibles");
})
router.use("*", (req, res) => res.status(404).send("Not Found"));
router.use((err, req, res, next) =>
  res.status(500).json({ message: "Error Server", err })
);

export default router;
