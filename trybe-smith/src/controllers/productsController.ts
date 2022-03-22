import { Request, Response } from 'express';
import productsService from '../services/productsService';

const addProduct = async (req: Request, res: Response) => {
  try {
    const result = await productsService.addProduct(req.body);

    return res.status(result.code).json(result.message);
  } catch (err) {
    const result = ((err as Error).message);
    
    console.log(result);

    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const listProducts = async (req: Request, res: Response) => {
  try {
    const result = await productsService.listProducts();

    return res.status(result.code).json(result.message);
  } catch (err) {
    const result = ((err as Error).message);
    
    console.log(result);

    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

export default {
  addProduct,
  listProducts,
};