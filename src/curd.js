import axios from 'axios';
import { get } from 'lodash-es';
import { similar } from './util/sim.js';

export async function queryMatch(content, size = 10) {
  return await axios.post('http://localhost:9200/index/_search', {
    query: {
      match: {
        content,
      },
    },
    size,
    from: 0,
    sort: [],
  });
}

export async function getSimValue(content) {
  const old = await queryMatch(content, 1);
  const result = get(old.data, 'hits.hits.0._source.content') || '';
  return similar(content, result);
}

export async function insert(content, v = 1) {
  const sim = await getSimValue(content);
  if (sim >= 95) {
    throw new Error('sim >= 95');
  } else {
    return await axios.post('http://localhost:9200/index/_doc', {
      content,
      v,
    });
  }
}
