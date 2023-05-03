//AQUI Q FICA O CRUD, e as funcoes

import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { createLanguageService } from "typescript";
import productService from "../service/productService";

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
    const product = req.body;

    //pesquisa o id da categoria recebido por parametro
    const newProduct = await productService.createProduct(product);

    res.status(200).json({
      id: newProduct[0],
      ...product,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//atualiza uma linha (entrada) de acordo com id
const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const productPut = req.body;

    //pesquisa o id da categoria recebido por parametro
    const newProductPut = await productService.putProduct(productPut);
    // const idCategory = await knexInstance("categories")
    //   .select("id")
    //   .where({ name: category }); //onde name tiver essa categoria retorna ai!

    // const updatedData: any = {
    //   title,
    //   price,
    //   description,
    //   category: idCategory[0].id, //como ja tratou o category e agora ele eh valido, eh so atribuir seu valor a category
    //   image,
    //   rate,
    //   count,
    // };

    // await knexInstance("product").update(updatedData).where({ id });

    res.status(200).json({ newProductPut, ...productPut });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
