import { Product } from "../models/Product.js";
import { defaultProducts } from "./defaultProducts.js";

export async function seedProductsIfEmpty() {
  const productCount = await Product.countDocuments();

  if (productCount === 0) {
    await Product.insertMany(defaultProducts);
  }
}

