import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";

interface IRequest {
  user_id: string;
}

@injectable()
class ListRentalByUserUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
  ) { }

  async execute({ user_id }: IRequest) {
    if (!user_id) {
      throw new AppError("User id is required! Please, provide a valid user id.");
    }

    const rentalsByUser = await this.rentalsRepository.findByUserId(user_id);

    return rentalsByUser;
  }
}

export { ListRentalByUserUseCase }
