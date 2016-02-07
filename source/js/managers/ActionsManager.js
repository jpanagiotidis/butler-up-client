'user strict';

import request from 'superagent';
import {getUrl} from '../configuration';
import {tree} from './StateManager.js';
import scriptjs from 'scriptjs';

const _places = tree.select('places');
const _place = tree.select('place');
const _location = tree.select('location');

export function fetchPlaces(){
  return new Promise((resolve, reject) => {
    _places.set('isLoading', true);
    request
    .get(getUrl() + '/places-finder')
    .end(function(err, res){
      if(err){
        _places.set('isLoading', false);
        reject(err);
      }else{
        const out = res.body.results.map(function(obj){
          return obj['place'];
        });
        _places.set('items', out);
        _places.set('isLoading', false);
        resolve(out);
      }
    });
  });
};

export function fetchPlace(id){
  return new Promise((resolve, reject) => {
    _place.set('isLoading', true);
    request
    .get(getUrl() + '/get-place/' + id)
    .end(function(err, res){
      if(err){
        _place.set('isLoading', false);
        reject(err);
      }else{
        let out;
        if(res.body.results.length > 0){
          out = res.body.results[0];
          _place.set('item', out);
          _place.set('isLoading', false);
        }
        resolve(out);
      }
    });
  });
}

let mapPromise;

export function setMap(){
  if(!mapPromise){
    mapPromise = new Promise((resolve, reject) => {
      scriptjs('https://maps.googleapis.com/maps/api/js?keu=AIzaSyARWtx4Q6VoyjGAq1u5ful7J0101f-Zy70', function() {
        resolve();
      });
    });
  }
  return mapPromise;
}

export function setInitPosition(){
  return new Promise((resolve, reject) => {
    getCurrentPosition().then(function(position){
      _location.set({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      resolve(position);
    }).catch(function(err){
      _location.set({
        latitude: 37.980528,
        longitude: 23.73313
      });
    });
  });
}

export function getCurrentPosition(){
  return new Promise((resolve, reject) => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        function(position){
          resolve(position);
        },
        function(err){
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