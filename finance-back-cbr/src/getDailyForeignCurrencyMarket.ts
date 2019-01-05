import axios from 'axios';
import { Client } from "ts-nats";
import * as xml2js from 'xml2js';

const xmlParse = xml => new Promise((resolve,reject) => {
  xml2js.parseString(xml,(err, result) => {
    if(result) {
      resolve(result)
    } else {
      reject(err)
    }
  })
})

function prepareAnswer(data) {
  return { result: { model: { message: JSON.stringify(data) }}}
}

function prepareSuccessAnswer(data) {
  return prepareAnswer({ status: 'success', data })
}

function prepareFailAnswer(errors) {
  return prepareAnswer({ status: 'fail', errors })
}

export function getDailyForeignCurrencyMarket(natsClient: Client) {
  return async (data, reply) => {
    try {      
      const xml: any = await axios.get('http://www.cbr.ru/scripts/XML_daily.asp').then(r => xmlParse(r.data));
      natsClient.publish(reply, prepareSuccessAnswer(xml)) 
    } catch (error) {
      natsClient.publish(reply, prepareFailAnswer([error.message]))
    }
  }
}
