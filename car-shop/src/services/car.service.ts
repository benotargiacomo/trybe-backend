import carSchema, { Car } from '../interfaces/CarInterface';
import CarModel from '../models/car.model';
import Service, { ServiceError } from '.';

class CarService extends Service<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  public async create(obj: Car): Promise<Car | null | ServiceError> {
    const parsed = carSchema.safeParse(obj);
    
    if (!parsed.success) return { error: parsed.error };

    const car = await this.model.create(obj);
    
    return car;
  }

  public async update(
    id: string,
    obj: Car,
  ): Promise<Car | null | ServiceError> {
    const parsed = carSchema.safeParse(obj);
    
    if (!parsed.success) return { error: parsed.error };

    const car = await this.model.update(id, obj);

    return car;
  }
}

export default CarService;