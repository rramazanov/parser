const axios = require('axios');
const fs = require('fs');
const jsdom = require("jsdom");
const {sleep} = require("./utils/sleep");

const {JSDOM} = jsdom;
const BASE_LINK = 'https://medum.ru/e';

let currentID = 1;
async function start() {
  const result = [];
  const startCodeElement = 100;
  const endCodeElement = 200;
  const delayTime = 4200;

  for (let i = startCodeElement; i < endCodeElement; i++) {
    const link = `${BASE_LINK}${i}`
    sleep(delayTime);
    console.log('request to: ', link)

    const item = await request(link, i);
    result.push(item);
    currentID++;
  }

  fs.writeFileSync('./src/data/index-data.json', JSON.stringify(result));
}

async function request(link, element) {
  return axios.get(link)
    .then(response => {
      const page = response.data;

      return processing(page, element);
    }).catch((e) => {
      console.log('error', e)
      return {
        element: element,
        code: `e${element}`,
      }
    });
}

function processing(page, element) {
  const dom = new JSDOM(page);
  const code = dom.window.document.querySelector('ul.characteristics').querySelector('li').textContent;
  const name = dom.window.document.querySelector('li.name').querySelectorAll('span')[1].textContent;
  const nameEng = dom.window.document.querySelector('li.eng').querySelectorAll('span')[1].textContent;
  const categories = dom.window.document.querySelector('li.category').querySelector('div').textContent;
  const risk = dom.window.document.querySelector('li.risk').querySelector('div').textContent;
  const description = dom.window.document.getElementById('description').querySelector('p').textContent;

  return {
    id: currentID,
    element: element,
    code: code,
    name: name,
    nameEng: nameEng,
    description: description,
    risk: risk,
    categories: categories,
  }
}

start();