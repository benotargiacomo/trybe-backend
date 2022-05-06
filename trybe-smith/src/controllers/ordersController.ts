import { Request, Response } from 'express';
import ordersService from '../services/ordersService';

const addOrder = async (req: Request, res: Response) => {
  try {
    const { products } = req.body;
    const { userId } = res.locals;
    
    const result = await ordersService.addOrder(products, userId);

    return res.status(result.code).json(result.message);
  } catch (err) {
    const result = ((err as Error).message);

    return res.status(500).json({ error: result });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await ordersService.getOrderById(+id);

    return res.status(result.code).json(result.message);
  } catch (err) {
    const result = ((err as Error).message);

    return res.status(500).json({ error: result });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await ordersService.getOrders();

    return res.status(result.code).json(result.message);
  } catch (err) {
    const result = ((err as Error).message);
    
    return res.status(500).json({ error: result });
  }
};

export default {
  addOrder,
  getOrderById,
  getOrders,
};