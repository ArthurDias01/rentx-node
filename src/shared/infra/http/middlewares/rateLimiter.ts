import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import * as redis from "redis";

import { AppError } from "@shared/errors/AppError";

const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});
(async () => await redisClient.connect())()

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 10,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (process.env.NODE_ENV === 'production') {
      await limiter.consume(request.ip);
    }
    return next();
  } catch (e) {
    if (e instanceof Error && e.message === "Not enough points") {
      return next();
    }
    throw new AppError("Too many requests", 429);
  } finally {
    await redisClient.disconnect();
  }
}
