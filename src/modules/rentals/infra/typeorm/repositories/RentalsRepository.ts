import { Repository, getRepository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";

interface IResult {
  "totalSpend": number;
  "totalSales": number;
  "inventoryOnHand": number;
  "avgCost": number;
}

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }


  async findOpenByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null }
    });
    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null }
    });
    return openByUser;
  }

  async create({ car_id, expected_return_date, user_id, id, end_date, total }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total
    });


    await this.repository.save(rental);
    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne(id);
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    return await this.repository.find({
      where: { user_id },
      relations: ["car"]
    });
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return openByCar;
  }
}

export { RentalsRepository }
