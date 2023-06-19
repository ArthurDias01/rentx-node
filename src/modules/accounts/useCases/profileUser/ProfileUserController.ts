import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {

  async handle(request: Request, response: Response) {
    const userId = request.user.id;
    const profileUserUseCase = container.resolve(ProfileUserUseCase);
    const user = await profileUserUseCase.execute(userId);

    return response.json(user);
  }
}

export { ProfileUserController }
