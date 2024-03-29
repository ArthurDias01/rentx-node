import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post("/", ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

// specificationRoutes.get("/", (req, res) => {
//   const all = specificationRepository.list();
//   return res.status(201).json(all);
// });

export { specificationRoutes };
