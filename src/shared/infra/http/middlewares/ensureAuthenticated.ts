import { NextFunction, Request, Response } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  const userTokensRepository = new UsersTokensRepository();

  if (!authToken) {
    throw new AppError("Authentication token missing.", 401)
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, auth.secret_refresh_token) as JwtPayload;
    const user_id = sub;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

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
