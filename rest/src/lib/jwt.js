import jwt from 'jsonwebtoken';
import util from 'util';

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

export default {
  sign,
  verify
};