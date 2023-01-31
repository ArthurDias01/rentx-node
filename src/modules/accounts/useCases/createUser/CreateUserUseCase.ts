import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { hash } from 'bcryptjs'
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ name, driver_license, email, password }: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      driver_license,
      email,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
