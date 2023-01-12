import { container } from 'tsyringe';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/repositories/implementations/UsersRepository';

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
