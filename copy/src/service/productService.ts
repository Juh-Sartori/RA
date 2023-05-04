import Repository from "../repository/productsRepository";

type ProductParams = {
  title: string;
  price: number;
  description: string;
  image: string;
  rating?: { rate: number; count: number };
  rate?: number;
  count?: number;
  category?: string;
};

const createProduct = async (product: ProductParams) => {
  const newProduct = { ...product, ...product.rating };
  delete newProduct.rating;
  delete newProduct.category;

  const categoryID = await Repository.verifyCategory(product.category!);
  //so precisa dessa validacao quando tiver interacao com o usuario

  if (categoryID.length === 0) throw new Error("categoria nao existe");

  const insertProduct = await Repository.insertProduct({
    ...newProduct,
    category: categoryID[0].id,
  });

  return insertProduct;
};

const putProduct = async (product: ProductParams, id: number) => {
  const newProductPut = { ...product, ...product.rating };
  delete newProductPut.rating;
  delete newProductPut.category;

  const categoryID = await Repository.verifyCategory(product.category!);

  if (categoryID.length === 0) throw new Error("categoria nao existe");

  const updateProduct = await Repository.updateProduct(
    {
      ...newProductPut,
      category: categoryID[0].id,
    },
    id
  );

  const result = await getProduct(id); //busca o produto atualizado, pq tava retornando 1 e 0
  return result;
};

const getProduct = async (id: number) => {
  const newProductGet: ProductParams[] = await Repository.showProduct(id);
  //para poder retornar pro usuario
  const returnUser = {
    title: newProductGet[0].title,
    price: newProductGet[0].price,
    description: newProductGet[0].description,
    image: newProductGet[0].image,
    rate: newProductGet[0].rate,
    count: newProductGet[0].count,
    category: newProductGet[0].category,
  };
  return returnUser;
};

const deleteProduct = async (productId: number) => {
  const newProductDelet = await Repository.deletProduct(productId);

  return newProductDelet; //quando nao tem o return o bd deleta normalmnete, porem o usuario nao ve oq foi dleetado kkk
};

export default { createProduct, putProduct, getProduct, deleteProduct };
