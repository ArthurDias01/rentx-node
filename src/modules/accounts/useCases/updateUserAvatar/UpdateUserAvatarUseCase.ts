import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/infra/typeorm/repositories/IUsersRepository";
import { deleteFile } from '@utils/file'

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;
    // console.log(user.avatar);
    await this.usersRepository.create(user);

  }
}

export { UpdateUserAvatarUseCase };
