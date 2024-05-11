import axios from 'axios';
import { get } from 'lodash-es';
import { similar } from './util/sim.js';

const url = 'http://localhost:9200';

export async function queryMatch(content, size = 10) {
  return await axios.post(url + '/index/_search', {
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

export function contentFilter(content) {
  return content
    .replace(/(\r\n)+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .replace(/^\d+\./g, '')
    .trim();
}

export async function getSimValue(content) {
  const old = await queryMatch(content, 1);
  const result = get(old.data, 'hits.hits.0._source.content') || '';
  return similar(content, result);
}

export async function insert(content, tag) {
  if (tag) {
    content = `[${tag}] ${contentFilter(content)}`;
  } else {
    content = contentFilter(content);
  }
  const sim = await getSimValue(content);
  if (sim >= 95) {
    throw new Error('sim >= 95 skip');
  } else {
    return await axios.post(url + '/index/_doc', {
      content,
      v: 1,
    });
  }
}

export async function updateById(id, content, v = 1) {
  content = contentFilter(content);
  return await axios.post(url + '/index/_doc/' + id, {
    content,
    v,
  });
}

export async function deleteById(id) {
  return await axios.delete(url + '/index/_doc/' + id);
}
