import App from './app';
import CustomRouter from './routes';
import CarController from './controllers/car.controller';
import { Car } from './interfaces/CarInterface';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

export default server;