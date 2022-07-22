import { Router } from 'express';
import Controller from '../controllers';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    route: string = controller.route,
  ) {
    this.router.post(route, (req, res) => controller.create(req, res));
    this.router.get(route, (req, res) => controller.read(req, res));
    this.router.get(`${route}/:id`, (req, res) => controller.readOne(req, res));

    // As implementações no controller foram feitas utilizando Arrow Functions, logo....
    // Não é necessário usar Arrow Functions como nos exemplos acima.
    this.router.put(`${route}/:id`, controller.update);
    this.router.delete(`${route}/:id`, controller.delete);
  }
}

export default CustomRouter;