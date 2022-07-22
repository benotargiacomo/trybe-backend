import { Model as MongooseInterface, Document } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: MongooseInterface<T & Document>) { }

  async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  async read(): Promise<T[]> {
    return this.model.find();
  }

  async readOne(str: string): Promise<T | null> {
    return this.model.findById(str);
  }

  async update(str: string, obj: T): Promise<T | null> {
    return this.model.findByIdAndUpdate(str, { ...obj }, { new: true });
  }

  async delete(str: string): Promise<T | null> {
    return this.model.findByIdAndDelete(str);
  }
}

export default MongoModel;