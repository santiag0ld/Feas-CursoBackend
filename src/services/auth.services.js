const bcrypt = require('bcrypt');
const { UserMongo } = require('../daos/mongo/user.daoMongo.js');

const userMongo = new UserMongo();

const registerUser = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { email, password: hashedPassword, role: 'user' };

    await userMongo.createUser(newUser);

    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'Registration failed' };
  }
};

/*
const loginUser = async (email, password) => {
  try {
    const user = await userMongo.getUserByMail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};
*/

module.exports = { registerUser };
