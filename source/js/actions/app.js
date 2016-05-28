'use strict';

import request from 'superagent';
import {tree} from '../managers/StateManager.js';
import {init as stringsInit} from '../managers/StringsManager.js';
import {init as placeTypesInit} from './placeTypes.js';
import {getURLParams} from '../utils/tools.js';
import {isCordova} from '../configuration';

const _app = tree.select('app');

export function init(){
  return new Promise((resolve, reject) => {
    hideStatusBar();
    setMode();
    fetchInitData()
    .then((res) => {
      _app.set(['settings'], res.settings);
      initLanguage();
      stringsInit(res.strings);
      placeTypesInit(res.place_types);
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
  });
}

function hideStatusBar(){
  if(isCordova()){
    document.addEventListener("deviceready", () => {
      StatusBar.hide();
    }, false);
    // function onDeviceReady() {
    //   console.log(StatusBar);
    // }
  }
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

function initLanguage(){
  _app.set(['settings', 'currentLanguage'], _app.get(['settings', 'defaultLanguage']));
}

function setMode(){
  const params = getURLParams();
  if(params.mode === 'dev'){
    _app.set('mode', 'dev');
  }else{
    _app.set('mode', 'prod');
  }
}

export function getLanguage(){
  return _app.get(['settings', 'currentLanguage']);
}

export function setLanguage(value){
  _app.set(['settings', 'currentLanguage'], value);
}

export function getUrl(){
  if(_app.get('mode') === 'dev'){
    return 'http://localhost:8888/buttler-up-server';
  }else{
    return 'http://butlerup.gr';
    // return 'http://butlerup.jpan.webfactional.com';
  }
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
