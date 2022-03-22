import authJWT from '../auth/authJWT';
import usersModel from '../models/usersModel';
import { AddUser } from '../interfaces/interfaces';
import usersValidations from '../validations/bodyValidations';
import StatusCode from '../enums/StatusCode';

const addUser = async (body: AddUser) => {
  const validBody = usersValidations.validateAddUser(body);
  if (validBody.message) return validBody;
  
  const result = await usersModel.addUser(body);
  const token = authJWT.sign(result);
  
  return { code: StatusCode.CREATED, message: { token } };
};

export default {
  addUser,
};