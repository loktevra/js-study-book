import axios from 'axios';
import {getRepository} from "typeorm";

import alfaCapitalUrls from '../utils/alfaCapitalUrls';
import ProductsEntity from '../entity/ProductsEntity';

export default async function getProductsInfo(msg, done) {
  const repository = getRepository(ProductsEntity);
  const productsCount = await repository.count();
  if (!productsCount) {
    const products = await axios.get<ProductsEntity[]>(alfaCapitalUrls.getProductsInfoUrl()).then(response => response.data);
    await repository.insert(products);
  }
  done(null, await repository.find());
}
