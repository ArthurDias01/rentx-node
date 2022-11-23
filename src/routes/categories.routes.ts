import { Router } from 'express';
const categoriesRoutes = Router();
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return res.status(400).json({ error: "Category already exists!" });
  }

  categoriesRepository.create({ name, description });

  return res.status(201).send();

});

categoriesRoutes.get("/", (req, res) => {
  const all = categoriesRepository.list();
  return res.status(201).json(all);

});

export { categoriesRoutes };
