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
  });

  after(() => {
    sinon.restore();
  });

  it('successfully created', async () => {
    const newCar = await carModel.create(mockCar);
    expect(newCar).to.be.deep.equal(mockCarWithId);
  });
});
