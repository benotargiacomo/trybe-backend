import { NextFunction, Request, Response } from 'express';
import authJWT from '../auth/authJWT';

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  
  if (!token || token === '') return res.status(401).json({ error: 'Token not found' });
  
  try {
    const decoded = authJWT.verify(token);
    res.locals.userId = +decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default authToken;