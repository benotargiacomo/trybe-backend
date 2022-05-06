import HttpException from '../utils/HttpException';
import Jwt from '../auth/Jwt';

const tokenValidator = {
  verify(authorization?: string) {
    if (authorization === undefined || authorization === '') {
      throw new HttpException(401, 'Token not found');
    }

    const user = Jwt.verify(authorization);
    if (user === undefined) throw new HttpException(401, 'Invalid Token');

    return user;
  },
};

export default tokenValidator;
