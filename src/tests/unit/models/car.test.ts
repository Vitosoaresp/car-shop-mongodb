import chai from 'chai';
import { Model } from 'mongoose';
import * as sinon from 'sinon';
const { expect } = chai;

import CarModel from '../../../models/Car';
import { mockCar, mockCarWithId } from '../../mocks/car';

describe('Car model', () => {
  const carModel = new CarModel();
  before(async () => {
    sinon.stub(Model, 'create').resolves(mockCarWithId);
    sinon.stub(Model, 'find').resolves([mockCarWithId]);
    sinon.stub(Model, 'findById').resolves(mockCarWithId);
    sinon
      .stub(Model, 'findByIdAndUpdate')
      .onCall(0)
      .resolves(mockCarWithId)
      .onCall(1)
      .resolves(null);
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
  });

  describe('update', () => {
    it('successfully', async () => {
      const cars = await carModel.update(mockCarWithId._id, mockCar);
      expect(cars).to.be.deep.equal(mockCarWithId);
    });

    it('invalid id', async () => {
      let error;
      try {
        await carModel.update('invalidId', mockCar);
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.equal('InvalidMongoId');
    });
  });
});
