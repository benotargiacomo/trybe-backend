import * as express from 'express';
import * as cors from 'cors';
import routes from './routes';
import errorHandler from './middlewares/error.middleware';
import notFoundHandler from './middlewares/notfound.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/', routes);

    this.app.use(errorHandler);
    this.app.use(notFoundHandler);

    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
