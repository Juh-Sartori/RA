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

const getCategoryByName = async (name: string) => {
  const find = await Repository.showCategoryByName(name);

  return find;
};

const createCategory = async (category: CategoriesParams) => {
  const categoryID = await Repository.verifyCategory(category.name!);
  //so precisa dessa validacao quando tiver interacao com o usuario

  if (categoryID.length >= 1) throw new Error("categoria ja existe");

  const insertCategory = await Repository.insertCategory(category);

  return insertCategory;
};

const deleteCategory = async (categoryName: string) => {
  const findCategory = await Repository.showCategoryByName(categoryName);

  if (findCategory.length === 0) throw new Error("Categoria nao existe");

  const newCategoryDelet = await Repository.deletCategory(categoryName);

  return newCategoryDelet; //quando nao tem o return o bd deleta normalmnete, porem o usuario nao ve oq foi dleetado kkk
};

export default { getAllCategory, getCategory, createCategory, deleteCategory };
