import knex from "knex";
import knexConfig from "../../knexfile";
import { categoriesRouter } from "../routes/categories";

const knexInstance = knex(knexConfig);

type Product = {
  title: string;
  price: number;
  description: string;
  image: string;
  rating?: { rate: number; count: number };
  rate?: number;
  count?: number;
  category: number; //essa categoria eh do BD, seria o id
};

const verifyCategory = (category: string) =>
  knexInstance("categories").select("id").where({ name: category });

const insertProduct = (product: Product) =>
  knexInstance.insert(product).into("product");

const updateProduct = (product: Product, id: number) =>
  knexInstance.update(product).into("product").where({ id }); //product eh o nome do meu bd

const showProduct = (id: number) =>
  knexInstance.select("*").into("product").where({ id }); //esse selct foi feito com base an logica do show
//knexInstance ja tem suas funcoes dele, nao to pegando do meu controller

const deletProduct = (id: number) =>
  knexInstance.delete().into("product").where({ id });

const indexAllProduct = () => knexInstance.select("*").into("product");

export default {
  verifyCategory,
  insertProduct,
  updateProduct,
  showProduct,
  deletProduct,
  indexAllProduct,
};
