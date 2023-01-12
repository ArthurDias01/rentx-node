import { Request, Response } from "express";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";
import { container } from "tsyringe";


class UpdateUserAvatarController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar_file = request.file.filename;
    // console.log(avatar_file);
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ avatar_file, user_id: id });

    return response.status(204).send();

  }
}
export { UpdateUserAvatarController };
