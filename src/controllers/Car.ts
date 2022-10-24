import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>) {
    const result = await this._service.create(req.body);
    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response<ICar[] | []>) {
    const result = await this._service.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result as ICar);
  }

  public async update(req: Request, res: Response<ICar>) {
    const result = await this._service.update(req.params.id, req.body);
    return res.status(200).json(result as ICar);
  }
}
