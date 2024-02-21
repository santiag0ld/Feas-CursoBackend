import bcrypt from 'bcrypt';

export const createHash = psw => bcrypt.hashSync(psw, bcrypt.genSaltSync(10));

export const isValidPassword = (psw, user) => bcrypt.compareSync(psw, user.password)