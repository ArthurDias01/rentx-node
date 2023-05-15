import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/Implementations/DayjsDateProvider";
import dayjs from "dayjs";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute(
      {
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24hours
      }
    );

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there's another existing rental for the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute(
        {
          user_id: "12345",
          car_id: "121212",
          expected_return_date: dayAdd24hours
        }
      );

      await createRentalUseCase.execute(
        {
          user_id: "12345",
          car_id: "121212",
          expected_return_date: dayAdd24hours
        }
      );
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there's another existing rental for the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute(
        {
          user_id: "12344",
          car_id: "test",
          expected_return_date: dayAdd24hours
        }
      );

      const rental = await createRentalUseCase.execute(
        {
          user_id: "12345",
          car_id: "test",
          expected_return_date: dayAdd24hours
        }
      );
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute(
        {
          user_id: "12344",
          car_id: "test",
          expected_return_date: dayjs().toDate(),
        }
      );
    }).rejects.toBeInstanceOf(AppError);
  });
})
