import chai from 'chai';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
const { expect } = chai;

import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import { mockCar, mockCarWithId } from '../../mocks/car';

describe('Car model', () => {
  const carModel = new CarModel();
  before(async () => {
    sinon.stub(Model, 'create').resolves(mockCarWithId);
    sinon.stub(Model, 'find').resolves([mockCarWithId]);
    sinon.stub(Model, 'findById').resolves(mockCarWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('create', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(mockCar);
      expect(newCar).to.be.deep.equal(mockCarWithId);
    });
  });

  describe('read', () => {
    it('successfully', async () => {
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal([mockCarWithId]);
    });
  });

  describe('readOne', () => {
    it('successfully', async () => {
      const cars = await carModel.readOne('60e9b4f0f3f7b8b9b8b9b8b9');
      expect(cars).to.be.deep.equal(mockCarWithId);
    });

    it('invalid id', async () => {
      let error;
      try {
        await carModel.readOne('invalid id');
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    });
  });
});
