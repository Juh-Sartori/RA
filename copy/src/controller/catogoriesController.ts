import { NextFunction, Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";

import productService from "../service/productService";
import categoriesService from "../service/categoriesService";

const knexInstance = knex(config);

type CategoriesType = {
  id?: number;
  name: string;
};

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category: CategoriesType[] = await knexInstance("categories").select(
      "name"
    );
    //como category eh um array, da para usar o map, eassim cria um novo array
    const categoriesArray = category.map((category) => category.name);
    res.status(200).json(categoriesArray);
  } catch (error: any) {
    // res.send(error.message ? { error: error.message } : error);
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nameCategory = Number(req.params.nameRouter);

    const newCategoryShow = await categoriesService.getCategory(nameCategory);

    res.status(200).json(newCategoryShow);
  } catch (error: any) {
    next(error);
  }
};

///////////////refazer
const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.body;

    const newCategory = await categoriesService.createCategory(name);
    res.status(201).json({ id: newCategory[0], ...name });
  } catch (error: any) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nameUrl: string = req.params.name;
    const nameUpdate = req.body.name;
    const updateData: CategoriesType = { name: nameUpdate };
    //pesquisa o id da categoria recebido por parametro
    const nameCategory = await knexInstance("categories")
      .update(updateData)
      .where({ name: nameUrl }); //onde name tiver essa categoria retorna ai!

    if (!nameCategory) {
      throw new Error("Erro nao achei a categoria.");
    }

    res.status(200).json(nameCategory);
  } catch (error: any) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.name;
    const category = await categoriesService.deleteCategory(name);

    console.log(category);
    res.status(200).json({ msg: "Categoria deletada" });
    //res.status(200).json(category);
  } catch (error: any) {
    next(error);
  }
};

export default { index, show, insert, update, remove };
