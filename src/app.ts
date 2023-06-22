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
import rateLimiter from '@middlewares/rateLimiter'
import * as Sentry from "@sentry/node";

createConnection();
const app = express();


app.use(rateLimiter);

Sentry.init({
  dsn: String(process.env.SENTRY_DSN),
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
// app.use(express.static('/public'));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());




app.use(router);

app.use(Sentry.Handlers.errorHandler());

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
