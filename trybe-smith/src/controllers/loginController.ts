import { Request, Response } from 'express';
import loginService from '../services/loginService';

const signIn = async (req: Request, res: Response) => {
  try {
    const result = await loginService.signIn(req.body);

    return res.status(result.code).json(result.message);
  } catch (err) {
    const result = ((err as Error).message);
    
    console.log(result);

    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

export default {
  signIn,
};