import { MessageMongo } from "../daos/mongo/message.daoMongo.js";


class MessagesController {
  constructor() {
    this.service = new MessageMongo();
  };

  clearMessages = async (req, res) => {
    try{
      await this.service.clearMessages();
      res.sendSuccess({})
    } catch(error){
      res.status(500).send({ message: error.message });
    }
  }
}

export default MessagesController;