import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public create(obj: unknown): Promise<ICar> {
    const carParsed = carZodSchema.safeParse(obj);

    if (!carParsed.success) throw carParsed.error;
    return this._car.create(carParsed.data);
  }
}
