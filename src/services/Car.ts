import { isValidObjectId } from 'mongoose';
import { ErrorTypes } from '../errors/catalog';
import { carZodSchema, ICar } from '../interfaces/ICar';
import IModel from '../interfaces/IModel';
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

  public read(): Promise<ICar[] | []> {
    return this._car.read();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidLengthId);
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);

    const car = await this._car.readOne(_id);
    if (!car) throw Error(ErrorTypes.InvalidMongoId);

    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar | null> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidLengthId);
    if (JSON.stringify(obj) === '{}') throw new Error(ErrorTypes.InvalidBody);
    const carParsed = carZodSchema.safeParse(obj);
    if (!carParsed.success) throw carParsed.error;

    const car = await this._car.update(_id, obj as ICar);
    if (!car) throw Error(ErrorTypes.InvalidMongoId);
    return car;
  }

  public async delete(_id: string): Promise<void> {
    if (_id.length < 24) throw new Error(ErrorTypes.InvalidLengthId);
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);

    const car = await this._car.readOne(_id);
    if (!car) throw Error(ErrorTypes.InvalidMongoId);

    await this._car.delete(_id);
  }
}
