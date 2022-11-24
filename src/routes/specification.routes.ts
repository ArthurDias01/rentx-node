import { Router } from 'express';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationRepository';

const specificationRoutes = Router();
const specificationRepository = new SpecificationsRepository();

specificationRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationService(specificationRepository);

  createSpecificationService.execute({ name, description });

  return res.status(201).send();

});

specificationRoutes.get("/", (req, res) => {
  const all = specificationRepository.list();
  return res.status(201).json(all);

});

export { specificationRoutes };
