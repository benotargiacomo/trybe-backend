import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';

function errorHandler(error: HttpException, _req: Request, res: Response, _next: NextFunction) {
  const { statusCode, message } = error;

  const status = statusCode || 500;

  res.status(status).send({ message });
}

export default errorHandler;
