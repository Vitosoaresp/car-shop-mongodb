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
});
