import { configObject } from "../config/config.js";

let UserDao;
let ProductDao;

switch (configObject.persistance) {
  case "MONGO":
    const UserDaoMongo = require("./mongo/user.daoMongo.js");
    UserDao = UserDaoMongo;

    const ProductDaoMongo = require("./mongo/products.daoMongo.js");
    ProductDao = ProductDaoMongo;
    break;

  case "SQL":
    break;

  case "FILE":
    const ProductDaoFile = require("./File/productManagerFile.js");
    ProductDao = ProductDaoFile;
    break;

  default:
    break;
}

export default { ProductDao, UserDao };
