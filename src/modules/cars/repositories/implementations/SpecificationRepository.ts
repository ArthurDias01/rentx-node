import { Repository, getRepository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "../ISpecificationRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  private static INSTANCE: SpecificationsRepository;

  constructor() {
    this.repository = getRepository(Specification);
  }


  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async list(): Promise<Specification[]> {
    return this.repository.find();
  }
}

export { SpecificationsRepository };
