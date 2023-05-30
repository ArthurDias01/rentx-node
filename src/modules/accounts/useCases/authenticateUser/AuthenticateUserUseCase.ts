import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { AppError } from "@shared/errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";

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
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private userTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: DayjsDateProvider
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    //usuário existe
    const user = await this.usersRepository.findByEmail(email);
    const { expires_in_token, secret_refresh_token, secret_token, expires_in_refresh_token } = auth;

    if (!user) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const test = user.id;

    //senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!", 401);
    }

    //generate JWT token
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(Number(expires_in_refresh_token.replace("d", "")));

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    });

    await this.userTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user.id,
    });

    return {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token,
    }
  }
}

export { AuthenticateUserUseCase }
