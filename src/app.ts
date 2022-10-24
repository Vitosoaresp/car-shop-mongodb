import express from 'express';
import 'express-async-errors';
import errorHandler from './middleware/error';

import carRoutes from './routes/car';

const app = express();

app.use(express.json());
app.use(carRoutes);
app.use(errorHandler);

export default app;
