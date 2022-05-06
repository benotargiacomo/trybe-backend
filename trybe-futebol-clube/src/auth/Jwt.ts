import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

import { User } from '../types';

class Jwt {
  private static _options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };

  private static _secret: string = readFileSync('jwt.evaluation.key', 'utf8').toString();

  public static sign(user: User) {
    return jwt.sign(user, this._secret, this._options);
  }

  public static verify(token: string) {
    try {
      const user = jwt.verify(token, this._secret);

      return user as User;
    } catch (err) {
      return undefined;
    }
  }
}

export default Jwt;
