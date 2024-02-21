import { ProductDao } from "../daos/factory.js";
import ProductRepository from "./products.repository.js";


const productService = new ProductRepository(new ProductDao)

export default {
    productService
}