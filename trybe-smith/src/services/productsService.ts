import StatusCode from '../enums/StatusCode';
import { AddProduct } from '../interfaces/interfaces';
import productsModel from '../models/productsModel';
import bodyValidations from '../validations/bodyValidations';

const addProduct = async (body: AddProduct) => {
  const validBody = bodyValidations.validateAddProduct(body);
  if (validBody.message) return validBody;

  const result = await productsModel.addProduct(body);

  return { code: StatusCode.CREATED, message: result };
};

const listProducts = async () => {
  const result = await productsModel.listProducts();

  return { code: StatusCode.OK, message: result };
};

export default {
  addProduct,
  listProducts,
};