import { Router } from "express";
import MessagesController from "../../controller/messages.controller.js";

const router = Router();

const control = new MessagesController()

router.delete('/', control.clearMessages)

module.exports = {  messagesRouter: router };