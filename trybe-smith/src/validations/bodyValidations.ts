import { AddProduct, AddUser, Login, ServiceResponse } from '../interfaces/interfaces';
import validationErrors from '../errors/validationErrors';

const validateUsername = (username: string) => {
  if (!username || username === '') return validationErrors.usernameBlank; 
  if (typeof (username) !== 'string') return validationErrors.usernameType;
  if (username.length < 3) return validationErrors.usernameLength;

  return validationErrors.ok;
};

const validateName = (name: string) => {
  if (!name || name === '') return validationErrors.nameBlank; 
  if (typeof (name) !== 'string') return validationErrors.nameType;
  if (name.length < 3) return validationErrors.nameLength;

  return validationErrors.ok;
};

const validateClasse = (classe: string) => {
  if (!classe || classe === '') return validationErrors.classeBlank; 
  if (typeof (classe) !== 'string') return validationErrors.classeType;
  if (classe.length < 3) return validationErrors.classeLength;

  return validationErrors.ok;
};

const validateLevel = (level: number) => {
  if (level === undefined) return validationErrors.levelBlank;
  if (typeof (level) !== 'number') return validationErrors.levelType;
  if (level < 1) return validationErrors.levelLength;

  return validationErrors.ok;
};

const validatePassword = (password: string) => {
  if (!password || password === '') return validationErrors.passwordBlank;
  if (typeof (password) !== 'string') return validationErrors.passwordType;
  if (password.length < 8) return validationErrors.passwordLength;

  return validationErrors.ok;
};

const validateAmount = (amount: string) => {
  if (!amount || amount === '') return validationErrors.amountBlank;
  if (typeof (amount) !== 'string') return validationErrors.amountType;
  if (amount.length < 2) return validationErrors.amountLength;

  return validationErrors.ok;
};

const validateAddUser = (body: AddUser): ServiceResponse => {
  const { username, classe, level, password } = body;
  
  const validUsername = validateUsername(username);
  if (validUsername.message) return validUsername;

  const validClasse = validateClasse(classe);
  if (validClasse.message) return validClasse;

  const validLevel = validateLevel(level);
  if (validLevel.message) return validLevel;

  const validPassword = validatePassword(password);
  if (validPassword.message) return validPassword;

  return validationErrors.ok;
};

const validateSignIn = (body: Login) => {
  const { username, password } = body;
  
  if (!username || username === '') return validationErrors.usernameBlank;
  if (!password || password === '') return validationErrors.passwordBlank;

  return validationErrors.ok;
};

const validateAddProduct = (body: AddProduct) => {
  const { name, amount } = body;
  
  const validName = validateName(name);
  if (validName.message) return validName;

  const validAmount = validateAmount(amount);
  if (validAmount.message) return validAmount;

  return validationErrors.ok;
};

const validateAddOrder = (products: number[]) => {
  if (!products) return validationErrors.productsBlank;
  if (!Array.isArray(products)) return validationErrors.productsType;
  if (products.length === 0) return validationErrors.productsLength;

  return validationErrors.ok;
};

export default {
  validateAddUser,
  validateSignIn,
  validateAddProduct,
  validateAddOrder,
};