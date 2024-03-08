import { logger } from '../../utils/logger.js';
import { messageModel } from './models/messages.model.js';

class MessageDaoMongo {
  constructor (){
    this.model = messageModel
  }

  async addMessage (newMessage){
    await this.model.create(newMessage)
    return await this.getMessages()
  }

  async getMessages (){
    try {
      return await this.model.find({})
    } catch (error) {
      logger.error(error);
    }
  }

  async clearMessages() {
    try {
      return await this.model.deleteMany({})
    } catch (error) {
      logger.error(error);
    }
  }
}

export const MessageMongo = MessageDaoMongo;