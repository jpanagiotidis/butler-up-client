'use strict';

import request from 'superagent';
import {tree} from '../managers/StateManager.js';
import {getUrl} from '../configuration';
import {init as stringsInit} from '../managers/StringsManager.js';
import {init as placeTypesInit} from './placeTypes.js';

const _app = tree.select('app');

export function init(){
  return new Promise((resolve, reject) => {
    fetchInitData()
    .then((res) => {
      _app.set(['settings'], res.settings);
      stringsInit(res.strings);
      placeTypesInit(res.place_types);
      resolve();
    })
    .catch((err) => {
      reject();
    });
  });
}

function fetchInitData(){
  return new Promise((resolve, reject) => {
    const url = [
      getUrl(),
      'api/init-data'
    ];

    request
    .get(url.join('/'))
    .end(function(err, res){
      if(err){
        reject(err);
      }else{
        resolve(res.body);
      }
    });
  });
}

export function getMaximumListDistance(){
  return _app.get(['settings', 'listMaxDistance']);
}

export function getMaxListSize(){
  return _app.get(['settings', 'listItems']);
}

export function getCachingMillis(){
  return _app.get(['settings', 'cachingMilli']);
}