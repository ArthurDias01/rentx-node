import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import { SendForgotPassowrdMailUseCase } from './SendForgotPassowrdMailUseCase';
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

let sendForgotPassowrdMailUseCase: SendForgotPassowrdMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPassowrdMailUseCase = new SendForgotPassowrdMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "123456",
      email: "test@test.com.br",
      name: "Test",
      password: "1234"
    });

    await sendForgotPassowrdMailUseCase.execute("test@test.com.br");

    expect(sendMail).toHaveBeenCalled();

  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPassowrdMailUseCase.execute("testdoesnotexists@test.com.br")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "123456",
      email: "test@test.com.br",
      name: "Test",
      password: "1234"
    });

    await sendForgotPassowrdMailUseCase.execute("test@test.com.br");

    expect(generateTokenMail).toHaveBeenCalled();
  });

});
