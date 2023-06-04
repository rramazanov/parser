const fs = require('fs');
const parsedData = require('./data/index-data.json');
const {GROUPS} = require('./utils/groups');

function start() {
  const additive_group = [];

  for(const value of parsedData) {
    const groups = value.categories?.split(',').map((group) => group.trim()) || null;

    if(!groups) continue;

    for(let i = 0; i < groups.length; i++) {
      const groupCategory = GROUPS.find((item) => item.name === groups[i])

      if(!groupCategory) continue;

      additive_group.push({
        id: i + 1,
        additive_id: value.id,
        group_id: groupCategory.id,
      })
    }
  }

  fs.writeFileSync('./src/data/additive_group.json', JSON.stringify(additive_group));
}

start();
