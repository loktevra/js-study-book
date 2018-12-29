import * as SenecaWeb from 'seneca-web';
import * as Express from 'express';
import * as senecaWebAdapter from 'seneca-web-adapter-express';

function web() {
  try {
    const expressApp = Express()
    expressApp.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    })
    this.use(SenecaWeb, {
      routes: [],
      adapter: senecaWebAdapter,
      context: expressApp,
    }).ready(() => {
      const server = this.export('web/context')()
  
      server.listen('4000', () => {
        console.log('server started on: 4000')
      })
    });
  } catch (error) {
    console.error('error in web', error)
  }
}

export default web;
