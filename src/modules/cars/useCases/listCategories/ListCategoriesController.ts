import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


class ListCategoriesController {

  constructor(private listCategories: ListCategoriesUseCase) { }

  handle(req: Request, res: Response): Response {
    const all = this.listCategories.execute();
    return res.status(200).json(all);
  }
}

export { ListCategoriesController }
