import { UserMongo } from "../daos/mongo/user.daoMongo.js";
import { logger } from "../utils/logger.js";

class UsersController {
  constructor() {
    this.service = new UserMongo();
  }

  getDataUserById = async (id) => {
    const user = await this.service.getUserById(id);

    return {
      userId: id,
      userName: user?.first_name,
      userLName: user?.last_name,
      userEmail: user?.email,
      userRole: user?.role,
      userCart: user?.cart,
      ...this.handleAccess(user?.role),
    };
  };

  createUser = async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;

      const newUser = { first_name, last_name, password, email };

      const result = await this.usersService.create(newUser);

      res.status(201).send({
        status: "success",
        payload: result,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  updateUser = async (req, res) => {
    const { uid } = req.params;
    const userToReplace = req.body;

    const result = await this.usersService.update({ _id: uid }, userToReplace);
    res.status(201).send({
      status: "success",
      payload: result,
    });
  };

  deleteUser = async (req, res) => {
    const { uid } = req.params;

    const result = await this.usersService.delete({ _id: uid });
    res.status(200).send({
      status: "success",
      payload: result,
    });
  };

  toggleUserRole = async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await this.service.getUserById(uid);
      if (!user) return res.status(404).send({ message: "User not found" });

      user.role = user.role === "user" ? "premium" : "user";
      await user.save();

      res.sendSuccess({ message: "Rol del usuario actualizado", user });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
}

export default UsersController;
