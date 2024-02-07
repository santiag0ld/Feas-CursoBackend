import { UserClass } from "../daos/index.js";

class UsersController {
  constructor() {
    this.service = new UserClass();
  }

  getDataUserById = async id => {
    const user = await this.service.getUserById(id);

    return {
      userId: id,
      userName: user?.first_name,
      userLName: user?.last_name,
      userEmail: user?.email,
      userRole: user?.role,
      userCart: user?.cart,
      ...this.handleAccess(user?.role)
    };
  }
}

export default UsersController;