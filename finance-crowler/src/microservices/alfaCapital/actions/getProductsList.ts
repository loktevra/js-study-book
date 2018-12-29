import axios from 'axios';
import {getRepository} from "typeorm";

import alfaCapitalUrls from '../utils/alfaCapitalUrls';
import ProductsEntity from '../entity/ProductsEntity';

interface IGetProductsInfoMsg {
  onlyActualPifs: string;
}

export default async function getProductsInfo({ args }, done) {
  const repository = getRepository(ProductsEntity);
  const productsCount = await repository.count();
  if (!productsCount) {
    let products = await axios.get<ProductsEntity[]>(alfaCapitalUrls.getProductsInfoUrl()).then(response => response.data);
    await repository.insert(products);
  }
  let resultList = await repository.find()
  if (args && args.query && args.query.onlyActualPifs) {
    resultList = resultList.filter(({ type }) => type === 'pif').filter(({ alias }) => alias !== 'zpif_osk');
  }
  done(null, { data: resultList, status: 'success' });
}
