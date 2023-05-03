import Repository from "../repository/productsRepository";
import { makeError } from "../middlewares/errorHandler";

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

  const catedoryID = await Repository.verifyCategory(product.category!);

  if (catedoryID.length === 0) {
    throw makeError({ message: "Categoria nao existe", status: 400 });
  }

  const insertProduct = await Repository.insertProduct({
    ...newProduct,
    category: catedoryID[0].id,
  });

  return insertProduct;
};

export default { createProduct };
