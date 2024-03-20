import { Router } from "express";
import MessagesController from "../../controllers/messages.controller.js";

const router = Router();
const mControl = new MessagesController()

router.delete('/', mControl.clearMessages)

export default router;