const fs = require('fs');
const json = require('./data/index-data.json');

async function start() {
  const additive = json.map((item, index) => ({
    id: item.id,
    code: item.code,
    name: item.name || null,
    name_eng: item.nameEng || null,
    description: item.description || 'Не назначен',
    risk: item.risk || null,
  }))

  fs.writeFileSync('./src/data/additives.json', JSON.stringify(additive));
}

start();