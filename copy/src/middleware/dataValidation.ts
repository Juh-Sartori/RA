//tem q fazer uma validacao para cada rota/funcao
import { NextFunction, Request, Response } from "express";
import { object, string, number } from "yup";

const UpdateDataValiokdation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateData = req.body;
    const updateParams = req.params;

    const updateDataSchema = object({
      title: string(),
      price: number(),
      description: string(),
      category: string().required("é obrigatorio ter categoria!"),
      image: string(),
      rate: number(),
      count: number(),
    });

    const updateParamsSchema = object({
      id: string().required("obrigatorio ter id"),
    });

    await updateDataSchema.validate(updateData);
    await updateParamsSchema.validate(updateParams);
    next(); //para ir pro controller e ai ir pra rota
  } catch (error) {
    next(error);
  }
};
