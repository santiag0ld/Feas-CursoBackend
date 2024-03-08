import User from './models/user.model.js';
import { CartMongo } from './cart.daoMongo.js';
import { logger } from '../../utils/logger.js';

const cartsService = new CartMongo();

class UserDaoMongo {
  constructor() {
    this.model = User;
  }

  async getUsersPaginate(limit = 10, page = 1) {
    return await this.model.paginate({}, { limit, page, lean: true });
  }

  async getUsers() {
    return await this.model.find({});
  }

  async getUserById(uid) {
    return await this.model.findOne({ _id: uid });
  }

  async getUserByMail(uemail) {
    return await this.model.findOne({ email: uemail });
  }

  async createUser(newUser) {
    try {
      newUser.cart = await cartsService.create();
      return await this.model.create(newUser);
    } catch (error) {
      logger.error('No se pudo crear el usuario:', error);
      throw error;
    }
  }

  async updateUser(uid, userUpdate) {
    return await this.model.findOneAndUpdate({ _id: uid }, userUpdate);
  }

  async deleteUser(uid) {
    return await this.model.findOneAndDelete({ _id: uid });
  }
}

export const UserMongo = UserDaoMongo;
