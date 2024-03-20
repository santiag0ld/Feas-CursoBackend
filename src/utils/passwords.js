import bcrypt from 'bcrypt';
import crypto from 'crypto';

function generateResetToken() {
    return crypto.randomBytes(20).toString('hex');
  }

export default generateResetToken;

export const createHash = psw => bcrypt.hashSync(psw, bcrypt.genSaltSync(10));

export const isValidPassword = (psw, user) => bcrypt.compareSync(psw, user.password)