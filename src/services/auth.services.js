const bcrypt = require('bcrypt');
const { UserMongo } = require('../daos/mongo/user.daoMongo.js');

const userMongo = new UserMongo();

const registerUser = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { email, password: hashedPassword, role: 'user' };

    await userMongo.addUser(newUser);

    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'Registration failed' };
  }
};

module.exports = { registerUser };
