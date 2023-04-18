import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";

const knexInstance = knex(config);

type Categories = {
  id?: number;
  name: string;
};

const index = async (req: Request, res: Response) => {
  try {
    const category: Categories[] = await knexInstance("categories").select(
      "name"
    );
    //como category eh um array, da para usar o map, eassim cria um novo array
    const categoriesArray = category.map((category) => category.name);
    res.status(200).json(categoriesArray);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const nameCategory = req.params.nameRouter;
    const category = await knexInstance("product")
      .select("*")
      .where({ category: nameCategory });
    if (!category.length) throw new Error("Essa categoria nao existe");
    res.status(200).json(category);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const id: number[] = await knexInstance("categories").insert({
      name,
    });

    res.status(201).json({ id: id[0], name });
  } catch (error: any) {
    res.send(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    //pesquisa o id da categoria recebido por parametro
    const nameCategory = await knexInstance("categories")
      .select("name")
      .where({ name: name }); //onde name tiver essa categoria retorna ai!

    if (!nameCategory[0]) {
      throw new Error("Erro nao achei a categoria.");
    }

    res.status(200).json(nameCategory);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const category = await knexInstance("categories").delete().where({ name });

    if (!category) throw new Error("Essa categoria não existe");

    res.status(200).json({ msg: "Categoria deletada" });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { index, show, insert, update, remove };
