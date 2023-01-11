import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
};

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    //usuário existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    //senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    //generate JWT token
    const token = sign({}, "e13db3ceea69c2cf4c48446c99d919e4", {
      subject: user.id,
      expiresIn: "1d"
    });

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }
  }
}

export { AuthenticateUserUseCase }
