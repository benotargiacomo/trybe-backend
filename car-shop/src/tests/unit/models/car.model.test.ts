import { Model } from 'mongoose';
import { expect } from 'chai';
import * as sinon from 'sinon';

import CarModel from '../../../models/car.model';

import { carsList, validCar, updatedCar } from '../../utils/car.mocks';

describe('CarModel', () => {
  const carModel = new CarModel();
  
  before(() => {
    sinon.stub(Model, 'create').resolves(validCar);
    sinon.stub(Model, 'find').resolves(carsList);
    sinon.stub(Model, 'findById').resolves(carsList[2]);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(updatedCar);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carsList[1]);
  });

  after(()=> {
    sinon.restore();
  });

  // Create
  it('1. Should create a new car', async () => {
    const car = await carModel.create(validCar);

    expect(car).to.be.deep.equal(validCar)
  });

  // Read
  it('2. Should return all cars', async () => {
    const cars = await carModel.read();
    
    expect(cars).to.be.an('array');
    expect(cars).to.have.length(3);
  });

  // ReadOne
  it('3. Should return one car', async () => {
    const car = await carModel.readOne(carsList[2].id);

    expect(car).to.be.deep.equal(carsList[2]);
  });

  // // Update
  it('4. Should update a car', async () => {
    const car = await carModel.update(carsList[1].id, updatedCar)

    expect(car).to.be.deep.equal(updatedCar);
  });

  // Delete
  it('5. Should delete a car', async () => {
    const car = await carModel.delete(carsList[1].id);

    expect(car).to.be.deep.equal(carsList[1]);
  });
});