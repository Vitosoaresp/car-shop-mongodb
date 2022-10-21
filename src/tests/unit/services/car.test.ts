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
});
