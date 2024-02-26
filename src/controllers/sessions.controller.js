import { configObject } from "../config/config.js";
import { UserMongo } from "../daos/mongo/user.daoMongo.js";
import  createToken  from "../utils/jwt.js";
import CustomError from "../utils/errors.js";
import { createHash, isValidPassword } from "../utils/passwords.js";
import validateFields from "../utils/validatefields.js";
const userService = new UserMongo();

class SessionsController {
  constructor() {
    this.service = new UserMongo();
  }
  requieredfield = {
    register: ["first_name", "last_name", "email", "birthday", "password"],
    login: ["email", "password"],
  };
  admins = configObject.uadmins || [];
  admin_pass = configObject.uadmin_pass;

  register = async (req, res) => {
    try {
      const userData = validateFields(req.body, this.requieredfield.register);
      userData.password = createHash(userData.password);

      const userFound = await userService.getUserByMail(userData.email);

      if (userFound)
        throw new CustomError(
          `Ya existe un usuario con ese email. pruebe con otro`
        );

      await userService.createUser(userData);

      res.render("login", { title: "Login", answer: "Se ha registrado satisfactoriamente" });
    } catch (error) {
      if (error instanceof CustomError) {
        res.render("register", { title: "Nuevo Registro", answer: error.message });
      } else {
        res.render("register", { title: "Nuevo Registro", answer: "Ocurrió un error, vuelva a intentarlo" });
      }
    }
  };

  login = async (req, res) => {
    const userData = validateFields(req.body, this.requieredfield.login);

    try {
      if (
        this.admins.includes(userData.email) &&
        isValidPassword(userData.password, { password: this.admin_pass })
      ) {
        const token = createToken({ id: 0, role: "Admin" });
        return res.sendTokenCookieSuccess(
          token,
          "Log In exitoso con Usuario Administrador"
        );
      }

      const userFound = await userService.getUserByMail(userData.email);

      if (!userFound || !isValidPassword(userData.password, userFound)) {
        throw new CustomError(`Email o contraseña equivocado`);
      }

      const token = createToken({ id: userFound._id, role: userFound.role });
      res.sendTokenCookieSuccess(
        token,
        "Log In exitoso con Id: " + userFound.first_name
      );
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  loginSession = async (req, res) => {
    const userData = validateFields(req.body, this.requieredfield.login);

    try {
      if (
        userData.email == configObject.uadmin &&
        isValidPassword(userData.password, {
          password: configObject.uadmin_pass,
        })
      ) {
        req.session.user = {
          first_name: "Admin",
          email: userData.email,
          role: "Admin",
        };
        return res.redirect("/products");
      }

      const userFound = await users.getUserByMail(userData.email);
      if (
        !userFound ||
        isValidPassword(createHash(userData.password), userFound)
      ) {
        throw new CustomError(`Email o contraseña equivocado`);
      }

      req.session.user = {
        user: userFound._id,
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        email: userFound.email,
        role: userFound.role,
      };

      res.redirect("/products");
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(500).send({ message: error.message });
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  };

  logout = (req, res) => {
    res.clearCookie("token").redirect("/");
  };

  github = async (req, res) => {};
  githubcallback = (req, res) => {
    const token = createToken({ id: req.user._id, role: req.user.role });

    res.tokenCookie(token).redirect("/products");
  };
}

export default SessionsController;
