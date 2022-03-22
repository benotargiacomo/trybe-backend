import { ServiceResponse } from '../interfaces/interfaces';
import StatusCode from '../enums/StatusCode';

const tokenNotFound: ServiceResponse = {
  code: StatusCode.UNAUTHORIZED,
  message: { error: 'Token not found' },
};

const tokenInvalid: ServiceResponse = {
  code: StatusCode.UNAUTHORIZED,
  message: { error: 'Invalid token' },
};

const usernameBlank: ServiceResponse = { 
  code: StatusCode.BAD_REQUEST,
  message: { error: 'Username is required' },
};

const usernameType: ServiceResponse = { 
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Username must be a string' },
};

const usernameLength: ServiceResponse = { 
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Username must be longer than 2 characters' },
};

const classeBlank: ServiceResponse = { 
  code: StatusCode.BAD_REQUEST,
  message: { error: 'Classe is required' },
};

const classeType: ServiceResponse = { 
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Classe must be a string' },
};

const classeLength: ServiceResponse = { 
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Classe must be longer than 2 characters' },
};

const levelBlank: ServiceResponse = { 
  code: StatusCode.BAD_REQUEST,
  message: { error: 'Level is required' },
};

const levelType: ServiceResponse = { 
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Level must be a number' },
};

const levelLength: ServiceResponse = { 
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Level must be greater than 0' },
};

const passwordBlank: ServiceResponse = { 
  code: StatusCode.BAD_REQUEST,
  message: { error: 'Password is required' },
};

const passwordType: ServiceResponse = { 
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Password must be a string' },
};

const passwordLength: ServiceResponse = { 
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Password must be longer than 7 characters' },
};

const signInInvalid: ServiceResponse = { 
  code: StatusCode.UNAUTHORIZED,
  message: { error: 'Username or password invalid' },
};

const nameBlank: ServiceResponse = {
  code: StatusCode.BAD_REQUEST,
  message: { error: 'Name is required' },
};

const nameType: ServiceResponse = {
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Name must be a string' },
};

const nameLength: ServiceResponse = {
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Name must be longer than 2 characters' },
};

const amountBlank: ServiceResponse = {
  code: StatusCode.BAD_REQUEST,
  message: { error: 'Amount is required' },
};

const amountType: ServiceResponse = {
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Amount must be a string' },
};

const amountLength: ServiceResponse = {
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Amount must be longer than 2 characters' },
};

const productsBlank: ServiceResponse = {
  code: StatusCode.BAD_REQUEST,
  message: { error: 'Products is required' },
};

const productsType: ServiceResponse = {
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Products must be an array of numbers' },
};

const productsLength: ServiceResponse = {
  code: StatusCode.UNPROCESSABLE_ENTITY,
  message: { error: 'Products can\'t be empty' },
};

const orderNotFound: ServiceResponse = {
  code: StatusCode.NOT_FOUND,
  message: { error: 'Order not found' },
};

const ok: ServiceResponse = {
  code: StatusCode.OK,
};

export default {
  tokenNotFound,
  tokenInvalid,
  usernameBlank,
  usernameType,
  usernameLength,
  classeBlank,
  classeType,
  classeLength,
  levelBlank,
  levelType,
  levelLength,
  passwordBlank,
  passwordType,
  passwordLength,
  nameBlank,
  nameType,
  nameLength,
  amountBlank,
  amountType,
  amountLength,
  productsBlank,
  productsType,
  productsLength,
  signInInvalid,
  orderNotFound,
  ok,
};