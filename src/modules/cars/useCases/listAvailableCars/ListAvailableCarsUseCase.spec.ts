import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars - Use Case", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  })

  it("should be able to list all available cars", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Carro 1",
      description: "car description",
      daily_rate: 110,
      license_plate: "XXX-xxX",
      fine_amount: 40,
      brand: "brand",
      category_id: "category_id"
    })


    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);

  });

  it("should be able to list all available cars by name", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Carro 1",
      description: "car description",
      daily_rate: 110,
      license_plate: "XXX-xxX",
      fine_amount: 40,
      brand: "brand 1",
      category_id: "category_id"
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Carro 2",
      description: "car description",
      daily_rate: 110,
      license_plate: "XXX-xxX",
      fine_amount: 40,
      brand: "brand 2",
      category_id: "category_id_2"
    })


    const cars = await listAvailableCarsUseCase.execute({ name: "Carro 1" });

    expect(cars).toEqual([car]);

  });

  it("should be able to list all available cars by brand", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Carro 1",
      description: "car description",
      daily_rate: 110,
      license_plate: "XXX-xxX",
      fine_amount: 40,
      brand: "brand 1",
      category_id: "category_id"
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Carro 2",
      description: "car description",
      daily_rate: 110,
      license_plate: "XXX-xxX",
      fine_amount: 40,
      brand: "brand 2",
      category_id: "category_id_2"
    })


    const cars = await listAvailableCarsUseCase.execute({ brand: "brand 2" });

    expect(cars).toEqual([car2]);

  });

  it("should be able to list all available cars by category_id", async () => {

    const car = await carsRepositoryInMemory.create({
      name: "Carro 1",
      description: "car description",
      daily_rate: 110,
      license_plate: "XXX-xxX",
      fine_amount: 40,
      brand: "brand 1",
      category_id: "category_id"
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Carro 2",
      description: "car description",
      daily_rate: 110,
      license_plate: "XXX-xxX",
      fine_amount: 40,
      brand: "brand 2",
      category_id: "category_id_2"
    })


    const cars = await listAvailableCarsUseCase.execute({ brand: "brand 2" });

    expect(cars).toEqual([car2]);

  });
});
