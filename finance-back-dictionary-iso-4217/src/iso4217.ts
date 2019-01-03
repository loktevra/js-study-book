import axios from 'axios';
import * as _ from 'lodash';
import * as xml2js from 'xml2js';
import * as fs from 'fs';

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


export function getCurrencyList(nc) {
  return async (data, reply) => {
    try {
      let list;
      const filePath = `${process.env.HOME}/data/iso4217_currencyList.json`
      if (fs.existsSync(filePath)) {
        list = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
      } else {
        const xml: any = await axios.get('https://www.currency-iso.org/dam/downloads/lists/list_one.xml').then(r => xmlParse(r.data));
        list = {
          published: xml.ISO_4217.$.Pblshd,
          items: xml.ISO_4217.CcyTbl[0].CcyNtry.map( v => ({
              char_code: _.get(v,'Ccy[0]',''),
              code: _.get(v,'CcyNbr[0]',''),
              name: _.get(v,'CcyNm[0]',''),
              entity: _.get(v,'CtryNm[0]',''),
              minor_unit: _.get(v,'CcyMnrUnts[0]',''),
          }))
        }
        fs.writeFileSync(filePath, JSON.stringify(list), { encoding: 'utf-8' });
      }
      nc.publish(reply, prepareSuccessAnswer(list)) 
    } catch (error) {      
      nc.publish(reply, prepareFailAnswer([error.message]))
    }
  }
}

export function getDenominationHistory(nc) {
  return async (data, reply) => {
    try {
      let list;
      const filePath = `${process.env.HOME}/data/iso4217_denominationHistory.json`
      if (fs.existsSync(filePath)) {
        list = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }));
      } else {
        const xml: any = await axios.get('https://www.currency-iso.org/dam/downloads/lists/list_three.xml').then(r => xmlParse(r.data));
        list = {
          published: xml.ISO_4217.$.Pblshd,
          items: xml.ISO_4217.HstrcCcyTbl[0].HstrcCcyNtry.map( v => ({
              char_code: _.get(v,'Ccy[0]',''),
              code: _.get(v,'CcyNbr[0]',''),
              name: _.get(v,'CcyNm[0]',''),
              country: _.get(v,'CtryNm[0]',''),
              Withdrawal_date: _.get(v,'WthdrwlDt[0]',''),
          }))
        }
        fs.writeFileSync(filePath, JSON.stringify(list), { encoding: 'utf-8' });
      }
      nc.publish(reply, prepareSuccessAnswer(list)) 
    } catch (error) {      
      nc.publish(reply, prepareFailAnswer([error.message]))
    }
  }
}
