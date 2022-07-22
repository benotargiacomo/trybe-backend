import { ZodError } from 'zod';
import MongoModel from '../models';

export interface ServiceError {
  error: ZodError;
}

class Service<T> {
  constructor(protected model: MongoModel<T>) {}

  public async create(obj: T): Promise<T | null | ServiceError> {
    const car = await this.model.create(obj);
    
    return car;
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(str: string): Promise<T | null | ServiceError> {
    return this.model.readOne(str);
  }

  public async update(str: string, obj: T): Promise<T | null | ServiceError> {
    return this.model.update(str, { ...obj });
  }

  public async delete(str: string): Promise<T | null | ServiceError> {
    return this.model.delete(str);
  }
}

export default Service;