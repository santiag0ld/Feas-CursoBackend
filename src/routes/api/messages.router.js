const { Router } = require("express");
const { MessagesController } = require ( "../../controller/messages.controller.js");

const router = Router();

const mControl = new MessagesController()

router.delete('/', mControl.clearMessages)

module.exports = { messagesRouter: router };