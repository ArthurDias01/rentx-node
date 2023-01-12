import { Category } from "../../entities/Category";
import { ICreateCategoryDTO } from "../ICategoriesRepository";
import { Repository, getRepository } from "typeorm";

class CategoriesRepository {
  // private categories: Category[];

  private repository: Repository<Category>;

  private static INSTANCE: CategoriesRepository;

  constructor() {
    this.repository = getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.INSTANCE;
  // }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category)
  };

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category | undefined> {
    const category = this.repository.findOne({ name });
    return category;
  }
}

export { CategoriesRepository };
