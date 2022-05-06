import HttpException from '../utils/HttpException';
import Bcrypt from '../auth/Bcript';
import Users from '../database/models/Users';

class LoginModel {
  static async auth(email: string, password: string) {
    const user = await Users.findOne({ where: { email } });
    if (user === null) throw new HttpException(401, 'Incorrect email or password');

    const pwd = Bcrypt.compare(password, user.password);
    if (!pwd) throw new HttpException(401, 'Incorrect email or password');

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
  }
}

export default LoginModel;
