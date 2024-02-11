import { ProductClass } from "../daos/index.js";

const productService = new ProductClass();

export const convertSort = (option, element) => {
  const sortOptions = {
    "1": 1,
    "-1": -1,
    asc: "asc",
    desc: "desc",
  };
  if(!option) return {}
  const objectReturn = {}
  objectReturn[element] = sortOptions[option];
  return objectReturn;
}

export const convertAvailability = (availability) => {
  if (availability == "true") return { stock: { $gt: 0 } }
}

export const checkCategory = async (category) => {
  const categories = await productService.getCategorys();
  return categories.includes(category);
}