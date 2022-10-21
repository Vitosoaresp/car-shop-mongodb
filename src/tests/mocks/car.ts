import { ICar } from '../../interfaces/ICar';

const mockCar: ICar = {
  model: 'Gol',
  year: 2020,
  color: 'Black',
  status: true,
  buyValue: 10000,
  doorsQty: 4,
  seatsQty: 5,
};

const mockCarWithId: ICar & { _id: string } = {
  ...mockCar,
  _id: '60e9b4f0f3f7b8b9b8b9b8b9',
};

export { mockCar, mockCarWithId };
