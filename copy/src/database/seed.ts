import knex from "knex";
import config from "../../knexfile";
import { createLanguageService } from "typescript";
import database from "./database";

const knexInstance = knex(config);

//funcao para add direto no banco
(async () => {
  console.log("TESTEC");
  try {
    await knexInstance("categories").insert([
      { name: "electronics" },
      { name: "jewelery" },
      { name: "men's clothing" },
      { name: "women's clothing" },
    ]);
  } catch (error: any) {
    console.log(error.message);
  }
})();

//funcao para add direto no banco
export const seed = (async () => {
  console.log("TESTEP");
  try {
    await knexInstance.batchInsert("product", database, 10);
    //esse 10 eh para ir de 10 em 10
  } catch (error: any) {
    console.log(error.message);
  }
})();
