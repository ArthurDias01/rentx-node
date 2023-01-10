import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {

  async handle(req: Request, res: Response): Promise<Response> {
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    const { file } = req;
    await importCategoryUseCase.execute(file);
    return res.status(201).send();
  }
}

export { ImportCategoryController }
