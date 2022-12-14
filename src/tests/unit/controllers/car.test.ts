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
    sinon.stub(carService, 'read').resolves([mockCarWithId]);
    sinon.stub(carService, 'readOne').resolves(mockCarWithId);
    sinon.stub(carService, 'update').resolves(mockCarWithId);
    sinon.stub(carService, 'delete').resolves(mockCarWithId);

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

  describe('Read cars', () => {
    it('Success', async () => {
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([mockCarWithId])).to.be
        .true;
    });
  });

  describe('ReadOne Car', () => {
    it('Success', async () => {
      req.params = { id: mockCarWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mockCarWithId)).to.be
        .true;
    });
  });

  describe('Update Car', () => {
    it('Success', async () => {
      req.params = { id: mockCarWithId._id };
      req.body = mockCar;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mockCarWithId)).to.be
        .true;
    });
  });

  describe('Delete Car', () => {
    it('Success', async () => {
      req.params = { id: mockCarWithId._id };
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(mockCarWithId)).to.be
        .true;
    });
  });
});
