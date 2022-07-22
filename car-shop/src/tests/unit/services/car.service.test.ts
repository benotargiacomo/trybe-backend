import mongoose from 'mongoose';
import { expect } from 'chai';
import * as sinon from 'sinon';

import CarModel from '../../../models/car.model';
import CarService from '../../../services/car.service';

import { carsList, updatedCar, validCar } from '../../utils/car.mocks';

describe('CarService', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(validCar);
    sinon.stub(carModel, 'read').resolves(carsList);
    sinon.stub(carModel, 'readOne').resolves(carsList[2]);
    sinon.stub(carModel, 'update').resolves(updatedCar);
    sinon.stub(carModel, 'delete').resolves(carsList[1]);
  });

  after(()=> {
    sinon.restore();
  });

  // Create
  it('1. Should create a new car', async () => {
    const car = await carService.create(validCar);

    expect(car).to.be.deep.equal(validCar)
  });

  // Read
  it('2. Should return all cars', async () => {
    const cars = await carService.read();
    
    expect(cars).to.be.an('array');
    expect(cars).to.have.length(3);
  });

  // ReadOne
  it('3. Should return one car', async () => {
    const car = await carService.readOne(carsList[2].id);

    expect(car).to.be.deep.equal(carsList[2]);
  });

  // // Update
  it('4. Should update a car', async () => {
    const car = await carService.update(carsList[1].id, updatedCar)

    expect(car).to.be.deep.equal(updatedCar);
  });

  // Delete
  it('5. Should delete a car', async () => {
    const car = await carService.delete(carsList[1].id);

    expect(car).to.be.deep.equal(carsList[1]);
  });
});
