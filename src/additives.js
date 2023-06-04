const fs = require('fs');
const json = require('./data/index-data.json');

async function start() {
  const additive = json.map((item, index) => ({
    id: item.id,
    code: item.code,
    name: item.name || null,
    name_eng: item.nameEng || null,
    risk: item.risk || null,
    description: item.description || 'Не назначен',
  }))

  fs.writeFileSync('./src/data/additives.json', JSON.stringify(additive));
}

start();