import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";

interface IRentalsRepository {
  findOpenByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create({ car_id, expected_return_date, user_id }: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository }
