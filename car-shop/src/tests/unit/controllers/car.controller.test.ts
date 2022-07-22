// import * as sinon from 'sinon';
// import chai from 'chai';
// import chaiHttp = require('chai-http');

// import CarService from '../../../services/car.service';
// import CarController from '../../../controllers/car.controller';

// import { carsList, updatedCar, validCar } from '../../utils/car.mocks';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Car Controller', () => {
//   const carService = new CarService();
//   const carController = new CarController(carService);

//   before(() => {
//     sinon.stub(carService, 'create').resolves(validCar);
//     sinon.stub(carService, 'read').resolves(carsList);
//     sinon.stub(carService, 'readOne').resolves(carsList[2]);
//     sinon.stub(carService, 'update').resolves(updatedCar);
//     sinon.stub(carService, 'delete').resolves(carsList[1]);
//   });

//   after(()=> {
//     sinon.restore();
//   });

//   it('', async () => {});

// });