import { Router } from 'express';
import CarController from '../controllers/Car';
import CarModel from '../models/Car';
import CarService from '../services/Car';

const router = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

router.post('/cars', (req, res) => carController.create(req, res));
router.get('/cars', (req, res) => carController.read(req, res));
router.get('/cars/:id', (req, res) => carController.readOne(req, res));
router.put('/cars/:id', (req, res) => carController.update(req, res));

export default router;
