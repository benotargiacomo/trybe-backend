import { z } from 'zod';
import vehicleSchema from './VehicleInterface';

const MotorcycleSchema = vehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().lte(2500),
});

export type Motorcycle = z.infer<typeof MotorcycleSchema>;

export default MotorcycleSchema;