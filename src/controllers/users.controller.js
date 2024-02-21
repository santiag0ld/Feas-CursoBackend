import { UserMongo } from "../daos/mongo/user.daoMongo.js";

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
      console.log(error);
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
}

export default UsersController;
