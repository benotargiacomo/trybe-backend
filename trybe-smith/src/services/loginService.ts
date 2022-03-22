import authJWT from '../auth/authJWT';
import StatusCode from '../enums/StatusCode';
import validationErrors from '../errors/validationErrors';
import { Login } from '../interfaces/interfaces';
import loginModel from '../models/loginModel';
import bodyValidations from '../validations/bodyValidations';

const signIn = async (body: Login) => {
  const validSignIn = bodyValidations.validateSignIn(body);
  if (validSignIn.message) return validSignIn;

  const result = await loginModel.validateSignIn(body);
  if (!result) return validationErrors.signInInvalid;
  
  const token = authJWT.sign(result);
  
  return { code: StatusCode.OK, message: { token } };
};

export default {
  signIn,
};