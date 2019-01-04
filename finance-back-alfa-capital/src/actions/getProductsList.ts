import axios from 'axios';
import {getRepository} from "typeorm";
import { Client } from 'ts-nats';

import alfaCapitalUrls from '../utils/alfaCapitalUrls';
import { prepareSuccessAnswer, prepareFailAnswer } from '../utils/prepareAnswer';
import ProductsEntity from '../entity/ProductsEntity';

interface IGetProductsInfoMsg {
  onlyActualPifs: string;
}

export default function getProductsInfo(natsClient: Client) {
  return async (data: IGetProductsInfoMsg, reply: string) => {
    try {
      const repository = getRepository(ProductsEntity);
      const productsCount = await repository.count();
      if (!productsCount) {
        let products = await axios.get<ProductsEntity[]>(alfaCapitalUrls.getProductsInfoUrl()).then(response => response.data);
        await repository.insert(products);
      }
      let resultList = await repository.find()
      resultList = resultList.filter(({ type }) => type === 'pif').filter(({ alias }) => alias !== 'zpif_osk');
      natsClient.publish(reply, prepareSuccessAnswer(resultList));
    } catch (error) {
      console.log(error);
      
      natsClient.publish(reply, prepareFailAnswer([String(error)]));
    }
  }
}
