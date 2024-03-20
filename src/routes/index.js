import { Router } from "express";
import viewsRouter from "./views.router.js";
import productsRouter from "./api/products.router.js";
import mailRouter from "./api/mail.router.js";
import messagesRouter from "./api/messages.router.js";
import sessionsRouter from "./api/sessions.router.js";
import cartsRouter from "./api/carts.router.js";
import { handleAuth } from "../middleware/auth.js";
import { logger } from "../utils/logger.js";

const router = Router();

router
  .use("/", viewsRouter)

  .use("/api/products/", productsRouter)
  .use("/api/carts/", cartsRouter)
  .use("/api/sessions/", sessionsRouter)
  .use("/api/mail", mailRouter)
  .use("/api/messages", messagesRouter)
  .use("/api/users/", () => {})
  .get("/current", handleAuth(["USER"]), () => {
    logger.info("datos sensibles");
  })
  .use("*", (req, res) => res.status(404).send("Not Found"))
  .use((err, req, res, next) =>
    res.status(500).json({ message: "Error Server", err })
  );

export default router;
