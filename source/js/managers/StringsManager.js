'use strict';

import {isArray, isString, size, keys} from 'underscore';
import request from 'superagent';
import {tree} from './StateManager.js';
import {getLanguage} from '../actions/app.js';

const _strings = tree.select('strings');

export function init(data){
  _strings.set(data);
}

export function getString(keys){
  return getTranslation(_strings.get(keys));
}

export function getTranslation(obj){
  const values = getTranslations(obj);
  if(isArray(values) && values.length > 0){
    return values[0];
  }else if(isString(values)){
    return values;
  }else{
    return '';
  }
}

export function getTranslations(obj){
  if(size(obj) > 0){
    if(obj[getLanguage()]){
      return obj[getLanguage()];
    }else if(obj['und']){
      return obj['und'];
    }else{
      return obj[keys(obj)[0]];
    }
  }else{
    return '';
  }
}