import { z } from 'zod';
import vehicleSchema from './VehicleInterface';

const carSchema = vehicleSchema.extend({
  doorsQty: z.number().lte(4).gte(2),
  seatsQty: z.number().lte(7).gte(2),
});

export type Car = z.infer<typeof carSchema>;

export default carSchema;