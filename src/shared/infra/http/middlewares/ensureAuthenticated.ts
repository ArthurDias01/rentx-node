import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/implementations/UsersRepository";
import { AppError } from "../../../errors/AppError";


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError("Authentication token missing.", 401)
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, "e13db3ceea69c2cf4c48446c99d919e4") as JwtPayload;
    const user_id = sub;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401)
    }

    request.user = {
      id: user_id
    }

    return next();
  } catch (err) {
    throw new AppError("Invalid Token", 401)
  }
}
