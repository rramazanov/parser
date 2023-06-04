const fs = require('fs');
const parsedData = require('./data/index-data.json');
const {GROUPS} = require('./utils/groups');

function start() {
  const additive_group = [];

  let count = 1;

  for(const value of parsedData) {
    const groups = value.categories?.split(',').map((group) => group.trim()) || null;

    if(!groups) continue;

    for(let i = 0; i < groups.length; i++) {
      const groupCategory = GROUPS.find((item) => item.name === groups[i])

      if(!groupCategory) continue;

      additive_group.push({
        //id: count,
        additive_id: value.id,
        group_id: groupCategory.id,
      })

      count++;
    }
  }

  fs.writeFileSync('./src/data/additive_group.json', JSON.stringify(additive_group));
}

start();
