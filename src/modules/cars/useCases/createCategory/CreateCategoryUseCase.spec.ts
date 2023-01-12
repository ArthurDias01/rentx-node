import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;


describe("Create Category - Use Case", () => {
  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  })

  it("should be able to create a new category", async () => {
    await createCategoryUseCase.execute({
      name: "Category Test",
      description: "Category description Test",
    });

    const category = await categoriesRepositoryInMemory.findByName("Category Test");

    // console.log(category)

    expect(category).toHaveProperty("id");
  });

  it("should not be able to create a new category with duplicated name", async () => {

    expect(async () => {
      await createCategoryUseCase.execute({
        name: "Category Test",
        description: "Category description Test",
      });

      await createCategoryUseCase.execute({
        name: "Category Test",
        description: "Category description Test",
      });
    }).rejects.toBeInstanceOf(AppError);


  });
});
