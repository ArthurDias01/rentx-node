import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotPassowrdMailUseCase } from './SendForgotPassowrdMailUseCase'

class SendForgotPassowrdMailController {

  async handle(request: Request, response: Response): Promise<Response> {

    const { email } = request.body;

    const sendForgotPassowrdMailUseCase = container.resolve(SendForgotPassowrdMailUseCase);

    await sendForgotPassowrdMailUseCase.execute(email);

    return response.send();
  }

}

export { SendForgotPassowrdMailController }
