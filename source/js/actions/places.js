'user strict';

import request from 'superagent';
import {filter, isArray, intersection} from 'underscore';
import {getUrl} from '../actions/app.js';
import {tree} from '../managers/StateManager.js';
import {getCachingMillis} from '../actions/app.js';
import {getActive as getActiveTypes} from '../actions/placeTypes.js';

const _places = tree.select('places');
_places.set({
  isLoading: false,
  lastUpdate: undefined,
  items: [],
  activeItems: [],
  fullItems: {}
});

export function getActivePlaces(){
  return new Promise((resolve, reject) => {
    getPlaces()
    .then((res) => {
      const activeTypes = getActiveTypes();
      const activeItems = filter(res, (place) => {
        if(activeTypes === 'all' || intersection(activeTypes, place.type).length > 0){
          return true;
        }else{
          return false;
        }
      });

      _places.set(['activeItems'], activeItems);
      resolve(activeItems);
    })
    .catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}

export function getPlaces(){
  return new Promise((resolve, reject) => {
    _places.set('isLoading', true);
    if(shouldUpdatePlaces()){
      fetchAllPlaces()
      .then((res) => {
        _places.set('isLoading', false);
        resolve(_places.get(['items']));
      })
      .catch((err) => {
        _places.set('isLoading', false);
        console.log(err);
        reject(err);
      });
    }else{
      _places.set('isLoading', false);
      resolve(_places.get(['items']));
    }
  });
}

function shouldUpdatePlaces(){
  const lastUpdate = _places.get(['lastUpdate']);
  const currentTime = (new Date()).getTime();
  if(lastUpdate === undefined || getCachingMillis() < currentTime - lastUpdate){
    return true;
  }else{
    return false;
  }
}

function fetchAllPlaces(){
  return new Promise((resolve, reject) => {
    const url = [
      getUrl(),
      'api/get-places'
    ];
    request
    .get(url.join('/'))
    .end(function(err, res){
      if(err){
        reject(err);
      }else{
        // const out = res.body.map(function(place){
        //   return Object.assign(place, {
        //     type: place.type.split(', ')
        //   });
        // });
        _places.set('items', res.body);
        _places.set('lastUpdate', (new Date()).getTime());
        resolve(res.body);
      }
    });
  });
};

export function getPlace(id){
  return new Promise((resolve, reject) => {
    _places.set('isLoading', true);
    if(shouldUpdatePlace(id)){
      fetchPlace(id)
      .then((res) => {
        _places.set('isLoading', false);
        resolve(res);
      })
      .catch((err) => {
        _places.set('isLoading', false);
        console.log(err);
        reject(err);
      });
    }else{
      _places.set('isLoading', false);
      resolve(_places.get(['fullItems', id]));
    }
  });
}

function shouldUpdatePlace(id){
  const place = _places.get(['fullItems', id]);

  if(place){
    const currentTime = (new Date()).getTime();
    if(place.lastUpdate === undefined || getCachingMillis() < currentTime - place.lastUpdate){
      return true;
    }else{
      return false;
    }
  }else{
    return true;
  }
}

function fetchPlace(id){
  return new Promise((resolve, reject) => {
    const url = [
      getUrl(),
      'api/get-place',
      id
    ];

    request
    .get(url.join('/'))
    .end(function(err, res){
      if(err){
        reject(err);
      }else{
        const out = res.body;
        out.lastUpdate = (new Date()).getTime();
        _places.set(['fullItems', id], out);
        resolve(res);
      }
    });
  });
}