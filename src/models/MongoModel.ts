import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

const INVALID_ID = 'Invalid ID';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async read(): Promise<T[]> {
    return this._model.find();
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(INVALID_ID);
    return this._model.findById(_id);
  }

  public async create(obj: T): Promise<T> {
    return this._model.create(obj);
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(INVALID_ID);
    return this._model.findByIdAndUpdate({ _id }, obj);
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error(INVALID_ID);
    return this._model.findByIdAndDelete({ _id });
  }
}

export default MongoModel;
