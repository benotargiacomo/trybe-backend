// import Users from '../database/models/Users';
import Jwt from '../auth/Jwt';
import * as Model from '../model';

import { LoginReq } from '../types';

class LoginService {
  static async login(body: LoginReq) {
    const { email, password } = body;

    const user = await Model.Login.auth(email, password);

    const token = Jwt.sign(user);

    return { user, token };
  }
}

export default LoginService;
