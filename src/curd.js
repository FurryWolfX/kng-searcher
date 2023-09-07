import axios from "axios";
import { get } from "lodash-es";
import { similar } from "./util/sim.js";

export async function getSimValue(content) {
  const old = await axios.post("http://localhost:9200/index/_search", {
    query: {
      match: {
        content,
      },
    },
    size: 1,
    from: 0,
    sort: [],
  });
  const result = get(old.data, "hits.hits.0._source.content") || "";
  return similar(content, result);
}

export async function insert(content, v = 1) {
  const sim = await getSimValue(content);
  if (sim >= 95) {
    throw new Error("sim >= 95");
  } else {
    return await axios.post("http://localhost:9200/index/_doc", {
      content,
      v
    });
  }
}

