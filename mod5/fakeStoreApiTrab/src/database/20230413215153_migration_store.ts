import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("product", function (table) {
    table.increments(); //cria autamaticamente o id e incrementa
    table.string("title").notNullable();
    table.double("price");
    table.string("description");
    table.string("category"); //eh uma chave estrangeira
    table.string("image");
    table.double("rate");
    table.integer("count");
    table.foreign("category").references("categories.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("product");
}
