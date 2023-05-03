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

  if (categoryID.length === 0) throw new Error("categoria nao existe");

  const insertProduct = await Repository.insertProduct({
    ...newProduct,
    category: categoryID[0].id,
  });

  return insertProduct;
};

const putProduct = async (product: ProductParams) => {
  const newProductPut = { ...product, ...product.rating };
  delete newProductPut.rating;
  delete newProductPut.category;

  const categoryID = await Repository.verifyCategory(product.category!);

  if (categoryID.length === 0) throw new Error("categoria nao existe");
  const updateProduct = await Repository.updateProduct({
    ...newProductPut,
    category: categoryID[0].id,
  });

  return updateProduct;
};
export default { createProduct, putProduct };
