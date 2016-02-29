'use strict';

export function getURLParams() {
  const query = location.search.substring(1);
  let ret = {};
  if (query) {
    query.split('&').map(function(pair) {
      const p = pair.split('=');
      ret[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
    });
  }
  return ret;
}