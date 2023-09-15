/**
 * 相似度对比
 * @param s 文本1
 * @param t 文本2
 * @param f 小数位精确度，默认2位
 * @returns {number} 百分数前的数值，最大100. 比如 ：90.32
 */
export function similar(s, t, f = 2) {
  if (!s || !t) {
    return 0;
  }
  if (s === t) {
    return 100;
  }
  let l = s.length > t.length ? s.length : t.length;
  let n = s.length;
  let m = t.length;
  let d = [];
  let min = function (a, b, c) {
    return a < b ? (a < c ? a : c) : b < c ? b : c;
  };
  let i, j, si, tj, cost;
  if (n === 0) return m;
  if (m === 0) return n;
  for (i = 0; i <= n; i++) {
    d[i] = [];
    d[i][0] = i;
  }
  for (j = 0; j <= m; j++) {
    d[0][j] = j;
  }
  for (i = 1; i <= n; i++) {
    si = s.charAt(i - 1);
    for (j = 1; j <= m; j++) {
      tj = t.charAt(j - 1);
      if (si === tj) {
        cost = 0;
      } else {
        cost = 1;
      }
      d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    }
  }
  let res = (1 - d[n][m] / l) * 100;
  return Number(res.toFixed(f));
}
