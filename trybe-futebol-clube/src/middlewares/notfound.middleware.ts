import { Request, Response, NextFunction } from 'express';

const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => {
  const message = 'Resource not found';

  res.status(404).send({ message });
};

export default notFoundHandler;
