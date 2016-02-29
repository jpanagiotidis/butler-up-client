'user strict';

import {getURLParams} from '../utils/tools.js';

export function getUrl(){
  const params = getURLParams();
  if(params.mode === 'dev'){
    return 'http://localhost:8888/buttler-up-server';
  }else{
    return 'http://butlerup.jpan.webfactional.com';
  }
}

export function isCordova(){
  if(document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1){
    return true;
  }else{
    return false;
  }
}

export const cachingMilli = 1000*60*45;
export const MapsKey = 'AIzaSyDRnkapVVieb92av9W7UlbZ7ZK6OKu-4Ps';