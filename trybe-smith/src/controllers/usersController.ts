import { Request, Response } from 'express';
import usersService from '../services/usersService';

const addUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const result = await usersService.addUser(req.body);
    
    return res.status(result.code).json(result.message);
  } catch (err) {
    const result = ((err as Error).message);
    
    console.log(result);
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

export default {
  addUser,
};