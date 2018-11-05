const dbClient = require('../services').dbClient;

module.exports = async function init() {
  await dbClient.init({ path : `${process.env.HOME}/data/finance.db` });
  console.log('База данных инициализированна');
}
