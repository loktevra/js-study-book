import axios from 'axios';

import alfaCapitalUrls from '../utils/alfaCapitalUrls';
import { IRespondCreator } from '../interfaces';

export default ({ getConnection }: IRespondCreator) => async function getProductsInfo(msg, done) {
  const response = await axios.get(alfaCapitalUrls.getProductsInfoUrl());

  // done(null, String(response));
}
