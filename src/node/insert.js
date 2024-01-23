import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { insert } from './curd.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let content = fs.readFileSync(path.resolve(__dirname, 'content/1'), { encoding: 'utf8' });
content = content.split('---');

function save(content) {
  let count = 1;
  let total = content.length;
  for (let item of content) {
    insert(item)
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

save(content);
