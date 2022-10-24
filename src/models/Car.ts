import { model as mongooseCreateModel, Schema } from 'mongoose';

import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carMongooseSchema = new Schema<ICar>(
  {
    model: { type: String, required: true, minlength: 3 },
    year: { type: Number, required: true, min: 1900, max: 2022 },
    color: { type: String, required: true, minlength: 3 },
    status: { type: Boolean, required: false },
    buyValue: { type: Number, required: true, min: 0 },
    doorsQty: { type: Number, required: true, min: 2, max: 4 },
    seatsQty: { type: Number, required: true, min: 2, max: 7 },
  },
  {
    versionKey: false,
  },
);

export default class Car extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', carMongooseSchema)) {
    super(model);
  }
}
