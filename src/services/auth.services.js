import { hash } from 'bcrypt';
import { UserMongo } from '../daos/mongo/user.daoMongo.js';
import { logger } from '../utils/logger.js';

const userMongo = new UserMongo();

const registerUser = async (email, password) => {
  try {
    const hashedPassword = await hash(password, 10);

    const newUser = { email, password: hashedPassword, role: 'user' };

    await userMongo.createUser(newUser);

    return { success: true, message: 'Usuario registrado con exito.' };
  } catch (error) {
    logger.error('Error en el registro:', error);
    return { success: false, message: 'No se pudo completar el registro.' };
  }
};

export default { registerUser };
