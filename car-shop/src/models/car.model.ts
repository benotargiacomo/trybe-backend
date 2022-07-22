import { model as createModel, Schema, Document } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from '.';

interface CarDocument extends Car, Document {}

const carSchema = new Schema<CarDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean },
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },
}, { versionKey: false });

class CarModel extends MongoModel<Car> {
  constructor(model = createModel('cars', carSchema)) {
    super(model);
  }
}

export default CarModel;
