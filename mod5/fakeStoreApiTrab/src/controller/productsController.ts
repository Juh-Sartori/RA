//AQUI Q FICA O CRUD, e as funcoes

import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { createLanguageService } from "typescript";

const knexInstance = knex(config);

type Products = {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rate: number;
  count: number;
};

//index: traz todas as entradas do banco
const index = async (req: Request, res: Response) => {
  try {
    const product: Products[] = await knexInstance("product").select("*");
    //*, para pegar todas as informacoes da coluna do BD
    //esse "product", ta acessando a tabela product
    res.status(200).json(product);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

//show: traz uma entrada so de acordo com o id (ou nome, etc)
const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await knexInstance("product").select("*").where({ id });
    if (!product.length) throw new Error("Esse produto nao existe");
    res.status(200).json(product[0]);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

//insert: insere novos dados na tabela
const insert = async (req: Request, res: Response) => {
  try {
    const { title, price, description, category, image, rate, count } =
      req.body;

    //pesquisa o id da categoria recebido por parametro
    const nameCategory = await knexInstance("categories")
      .select("name")
      .where({ name: category }); //onde name tiver essa categoria retorna ai!

    if (!nameCategory[0]) {
      throw new Error("Erro nao achei a categoria.");
    }

    const obj = {
      title,
      price,
      description,
      category: nameCategory[0].name,
      image,
      rate,
      count,
    };
    // console.log(obj);
    const id: number[] = await knexInstance("product").insert(obj);

    res.status(201).json({
      id: id[0],
      title,
      price,
      description,
      category: nameCategory[0].name,
      image,
      rate,
      count,
    });
  } catch (error: any) {
    console.log(error.message);
    res.send(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, price, description, category, image, rate, count } =
      req.body;

    //pesquisa o id da categoria recebido por parametro
    const idCategory = await knexInstance("categories")
      .select("id")
      .where({ name: category }); //onde name tiver essa categoria retorna ai!

    if (!idCategory[0]) {
      throw new Error("Erro nao achei a categoria.");
    }

    const updatedData: any = {
      title,
      price,
      description,
      category: idCategory[0].id, //como ja tratou o category e agora ele eh valido, eh so atribuir seu valor a category
      image,
      rate,
      count,
    };

    await knexInstance("product").update(updatedData).where({ id });

    res.status(200).json(updatedData);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await knexInstance("product").delete().where({ id });

    if (!product) throw new Error("Esse produto não existe");

    res.status(200).json({ msg: "Produto deletado" });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { insert, index, show, update, remove };
