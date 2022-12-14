import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import "reflect-metadata";
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import swaggerFile from './swagger.json';
import "./shared/container"
import "./shared/infra/typeorm/index";
import { AppError } from '@shared/errors/AppError';


const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal server error ${err.message}`
  });
});

app.listen(3333, () => console.log('Server is running!'));
