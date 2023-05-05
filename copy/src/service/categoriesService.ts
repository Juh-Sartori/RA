import Repository from "../repository/categoriesRepository";

type CategoriesParams = {
  id?: number;
  name: string;
};

const getAllCategory = async (name: string) => {
  const newCategoryAll: CategoriesParams[] = await Repository.indexAllCategory(
    name
  );

  if (newCategoryAll.length === 0) throw new Error("O banco esta vazio!");

  return newCategoryAll;
};

const getCategory = async (id: number) => {
  const newCategoryGet: CategoriesParams[] = await Repository.showCategory(id);
  //para poder retornar pro usuario
  const returnUser = {
    id: newCategoryGet[0].id,
    name: newCategoryGet[0].name,
  };

  if (!newCategoryGet.length) throw new Error("Essa categoria nao existe");

  return returnUser;
};

const createCategory = async (category: CategoriesParams) => {
  const categoryID = await Repository.verifyCategory(category.name!);
  //so precisa dessa validacao quando tiver interacao com o usuario

  if (categoryID.length === 0) throw new Error("categoria nao existe");

  const insertCategory = await Repository.insertCategory(category);

  return insertCategory;
};

export default { getAllCategory, getCategory, createCategory };
