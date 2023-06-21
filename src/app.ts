import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import "reflect-metadata";
import 'dotenv/config';
import upload from '@config/upload';
import swaggerUi from 'swagger-ui-express';
import { router } from './shared/infra/http/routes';
import swaggerFile from './swagger.json';
import "./shared/container"
import createConnection from "./shared/infra/typeorm/index";
import cors from 'cors';
import { AppError } from '@shared/errors/AppError';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter'

createConnection();
const app = express();
app.use(rateLimiter);
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// app.use(express.static('/public'));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    console.log('App err ================', err)
    return response.status(err.statusCode).json({
      message: err.message
    });
  }
  console.log('App err ================', err)
  return response.status(500).json({
    status: "Error",
    message: `Internal server error ${err.message}`
  });
});

// app.listen(3333, () => console.log('Server is running! ON PORT 3333'));
export { app }
