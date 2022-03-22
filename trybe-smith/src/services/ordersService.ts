import StatusCode from '../enums/StatusCode';
import validationErrors from '../errors/validationErrors';
import ordersModel from '../models/ordersModel';
import bodyValidations from '../validations/bodyValidations';

const addOrder = async (products: number[], userId: number) => {
  const validBody = bodyValidations.validateAddOrder(products);
  if (validBody.message) return validBody;

  const result = await ordersModel.addOrder(userId, products);

  return { code: StatusCode.CREATED, message: result };
};

const getOrderById = async (id: number) => {
  const result = await ordersModel.getOrderById(id);
  if (!result) return validationErrors.orderNotFound;

  return { code: StatusCode.OK, message: result };
};

const getOrders = async () => {
  const result = await ordersModel.getOrders();

  return { code: StatusCode.OK, message: result };
};

export default {
  addOrder,
  getOrderById,
  getOrders,
};