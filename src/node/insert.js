import fs from 'fs';
import { insert } from './curd.js';

let content = fs.readFileSync('./content/1', { encoding: 'utf8' });
content = content.replace(/(\r\n)+/g, '\n').split('\n');

function save(content) {
  let count = 1;
  let total = content.length;
  for (let item of content) {
    const text = item;
    insert(text)
      .then(() => {
        console.log('progress', `${count}/${total}`);
        count++;
      })
      .catch((e) => {
        console.log('progress skip', `${count}/${total}`);
        count++;
      });
  }
}

console.log(content);
// save(content);
