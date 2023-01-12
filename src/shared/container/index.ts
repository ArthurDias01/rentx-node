import { container } from 'tsyringe';
import { ICategoryRepository } from '@modules/cars/infra/typeorm/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/implementations/CategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/ISpecificationRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/implementations/SpecificationRepository';
import { IUsersRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/implementations/UsersRepository';

//ICategoryRepository
container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

//ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

// IUsersRepository
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
