const User = require('./models/user.model.js');

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
      return await this.model.create(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
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

exports.UserMongo = UserDaoMongo;
