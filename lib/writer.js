const fs = require('fs');

module.exports = async (stores) => {
  const json = JSON.stringify(stores, null, 2);

  fs.writeFileSync(`${__dirname}/../reports/stores.json`, json, 'utf8');
}