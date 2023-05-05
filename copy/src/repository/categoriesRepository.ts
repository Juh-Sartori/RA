import knex from "knex";
import knexConfig from "../../knexfile";

const knexInstance = knex(knexConfig);

type Categories = {
  id?: number;
  name: string;
};

const verifyCategory = (category: string) =>
  knexInstance("categories").select("id").where({ name: category });

const indexAllCategory = (name: string) =>
  knexInstance.select(name).into("categories");

const showCategory = (id: number) =>
  knexInstance.select("*").into("categories").where({ id });

const insertCategory = (categories: Categories) =>
  knexInstance.insert(categories).into("categories");

const updateCategory = (categories: Categories, id: number) =>
  knexInstance.update(categories).into("categories").where({ id });

const deletCategory = (id: number) =>
  knexInstance.delete().into("categories").where({ id });

export default {
  verifyCategory,
  indexAllCategory,
  showCategory,
  insertCategory,
  updateCategory,
  deletCategory,
};
