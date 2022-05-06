import HttpException from '../utils/HttpException';

const loginValidator = {
  body(email: string, password: string) {
    if (!email || email === '') throw new HttpException(400, 'All fields must be filled');
    if (!password || password === '') throw new HttpException(400, 'All fields must be filled');

    const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email);
    if (!isValid) throw new HttpException(401, 'Incorrect email or password');

    if (password.length <= 6) throw new HttpException(401, 'Incorrect email or password');

    return { email, password };
  },
  token(authorization?: string): string {
    if (authorization === undefined || authorization === '') {
      throw new HttpException(401, 'Token not found');
    }

    return authorization;
  },
};

export default loginValidator;
