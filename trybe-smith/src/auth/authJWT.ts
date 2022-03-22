import jwt, { SignOptions } from 'jsonwebtoken';

import { User, UserJwt } from '../interfaces/interfaces';

const JWT_SECRET = 'PxA<v9Z!';

const sign = (payload: User) => {
  const JWT_CONFIG: SignOptions = { algorithm: 'HS256', expiresIn: '7d' };
  
  const token = jwt.sign(payload, JWT_SECRET, JWT_CONFIG);
  
  return token;
};

const verify = (token: string): UserJwt => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    return decoded as UserJwt;
  } catch (err) {
    const result = ((err as Error).message);
    
    throw new Error(result);
  }
};

export default {
  sign,
  verify,
};