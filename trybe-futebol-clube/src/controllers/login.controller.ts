import { Request, Response } from 'express';
import * as Validator from '../validators';
import * as Service from '../services';

class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const body = Validator.Login.body(email, password);
    const result = await Service.Login.login(body);

    return res.status(200).json(result);
  }

  static async validate(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { role } = Validator.Token.verify(authorization);

    return res.status(200).json(role);
  }
}

export default LoginController;
