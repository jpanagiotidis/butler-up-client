'use strict';

import {tree} from '../managers/StateManager.js';
import scriptjs from 'scriptjs';

const _map = tree.select('map');

let mapPromise;

export function initMap(){
  if(!mapPromise){
    mapPromise = new Promise((resolve, reject) => {
      scriptjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyARWtx4Q6VoyjGAq1u5ful7J0101f-Zy70', function() {
        resolve();
      });
    });
  }
  return mapPromise;
}

export function initPosition(){
  return new Promise((resolve, reject) => {
    getCurrentPosition().then(function(position){
      _map.set(['location'], {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      resolve(position);
    }).catch(function(err){
      _map.set(['location'], {
        latitude: 37.980528,
        longitude: 23.73313
      });
      resolve();
    });

    _map.set(['zoom'], 16);
  });
}

export function setLocation(lat, lng){
  _map.set(['location'], {
    latitude: lat,
    longitude: lng
  });
}

export function getLocation(){
  return _map.get(['location']);
}

export function setZoom(zoom){
  _map.set(['zoom'], zoom);
}

export function getZoom(){
  return _map.get(['zoom']);
}

export function getCurrentPosition(){
  return new Promise((resolve, reject) => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        function(position){
          resolve(position);
        },
        function(err){
          console.log('PPPP ERR', err);
          reject(err);
        },
        { 
          maximumAge: 3000, 
          timeout: 5000, 
          enableHighAccuracy: true 
        }
      )
    }else{
      reject();
    }
  });
}