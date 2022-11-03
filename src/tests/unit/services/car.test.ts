import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
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
      .resolves(null)
      .onCall(2)
      .resolves(null)
      .onCall(3)
      .resolves(null);
    sinon
      .stub(carModel, 'update')
      .onCall(0)
      .resolves(mockCarWithId)
      .resolves(null);
      sinon
      .stub(carModel, 'delete')
      .onCall(0)
      .resolves(mockCarWithId)
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

    it('returns an error when passing an id with size less than 24', async () => {
      let error;
      try {
        await carService.readOne('invalid id');
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidLengthId);
    });

    it('should return error when passing an invalid id', async () => {
      let error;
      try {
        await carService.readOne('2gdheug23123ad3r2t45t3gfs');
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    });
  });

  describe('update', () => {
    it('Sucess updated', async () => {
      const cars = await carService.update(mockCarWithId._id, mockCar);
      expect(cars).to.be.deep.equal(mockCarWithId);
    });

    it('returns an error when passing an id with size less than 24', async () => {
      let error;
      try {
        await carService.update('invalid id', mockCar);
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidLengthId);
    });

    it('should return error when passing an empty body', async () => {
      let error;
      try {
        await carService.update(mockCarWithId._id, {});
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidBody);
    });

    it('should return error when updating car year property', async () => {
      let error;
      try {
        await carService.update(mockCarWithId._id, {
          year: 2023,
        });
      } catch (err: any) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });

    it('should return error when searching for a car that does not exist', async () => {
      let error;
      try {
        await carService.update('aaaaaaaaaaaaaaaaaaaaaaaa', mockCar);
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    });
  });

  describe('delete', () => {
    it('Sucess delete', async () => {
      const cars = await carService.delete(mockCarWithId._id);
      expect(cars).to.be.deep.equal(mockCarWithId);
    });

    it('returns an error when passing an id with size less than 24', async () => {
      let error;
      try {
        await carService.delete('invalid id');
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidLengthId);
    });

    it('should return error when searching for a car that does not exist', async () => {
      let error;
      try {
        await carService.delete('aaaaaaaaaaaaaaaaaaaaaaaa');
      } catch (err: any) {
        error = err;
      }
      expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
    });
  });
});
