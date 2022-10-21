import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { mockCar, mockCarWithId } from '../../mocks/car';

describe('Car service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  before(async () => {
    sinon.stub(carModel, 'create').resolves(mockCarWithId);
    sinon.stub(carModel, 'read').resolves([mockCarWithId]);
    sinon
      .stub(carModel, 'readOne')
      .onCall(0)
      .resolves(mockCarWithId)
      .onCall(1)
      .resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('Sucess', async () => {
      const newCar = await carService.create(mockCar);
      expect(newCar).to.be.deep.equal(mockCarWithId);
    });
    it('Failure', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('read', () => {
    it('Sucess', async () => {
      const cars = await carService.read();
      expect(cars).to.be.an('array');
      expect(cars).to.be.deep.equal([mockCarWithId]);
    });
  });

  describe('readOne', () => {
    it('Sucess', async () => {
      const cars = await carService.readOne('60e9b4f0f3f7b8b9b8b9b8b9');
      expect(cars).to.be.deep.equal(mockCarWithId);
    });

    //   it('Invalid id', async () => {
    //     let error;
    //     try {
    //       await carService.readOne('invalid id');
    //     } catch (err: any) {
    //       console.log(err);
    //       error = err;
    //     }
    //     expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    //   });
  });
});
