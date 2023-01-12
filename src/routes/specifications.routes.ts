import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationRepository';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post("/", ensureAuthenticated, createSpecificationController.handle);

// specificationRoutes.get("/", (req, res) => {
//   const all = specificationRepository.list();
//   return res.status(201).json(all);
// });

export { specificationRoutes };
