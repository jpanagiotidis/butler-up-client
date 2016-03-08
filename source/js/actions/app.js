'use strict';

import request from 'superagent';
import {getUrl} from '../configuration';
import {init as stringsInit} from '../managers/StringsManager.js';
import {init as placeTypesInit} from './placeTypes.js';

export function init(){
  return new Promise((resolve, reject) => {
    fetchInitData()
    .then((res) => {
      console.log(res);
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