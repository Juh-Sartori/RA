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

const updateProduct = (product: Product) => {
  knexInstance.update(product).into("product"); //product eh o nome do meu bd
};
export default { verifyCategory, insertProduct, updateProduct };
