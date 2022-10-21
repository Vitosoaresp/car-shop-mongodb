import chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
const { expect } = chai;

import CarController from '../../../controllers/Car';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { mockCar, mockCarWithId } from '../../mocks/car';

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(mockCarWithId);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  describe('Create car', () => {
    it('Success', async () => {
      req.body = mockCar;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mockCarWithId)).to.be
        .true;
    });
  });
});
