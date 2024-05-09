import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { contentFilter, insert } from './curd.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let content = fs.readFileSync(path.resolve(__dirname, 'content/1.txt'), { encoding: 'utf8' });
content = content.split('---');

function save(content, tag) {
  let count = 1;
  let total = content.length;
  for (let item of content) {
    insert(item, tag)
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

function test(content) {
  for (let item of content) {
    console.log('===');
    item = contentFilter(item);
    console.log(item);
  }
}

test(content);
// save(content, 'mPaaS');
