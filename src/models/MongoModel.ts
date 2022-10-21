import { isValidObjectId, Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public read(): Promise<T[]> {
    return this._model.find().exec();
  }

  public readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw Error('Invalid ID');
    return this._model.findById(id).exec();
  }

  public create(obj: T): Promise<T> {
    return this._model.create(obj);
  }
}

export default MongoModel;
