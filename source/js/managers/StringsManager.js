'use strict';

import request from 'superagent';
import {tree} from './StateManager.js';

const _strings = tree.select('strings');

export function init(data){
  _strings.set(data);
}

export function getString(keys){
  return _strings.get(keys);
}