import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListRentalByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user

    const listRentalByUserUseCase = container.resolve(ListRentalByUserUseCase)

    const userRentals = await listRentalByUserUseCase.execute({
      user_id: id,
    })

    return response.status(200).json(userRentals);
  }
}

export { ListRentalByUserController }
