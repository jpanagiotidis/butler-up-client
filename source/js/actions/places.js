'user strict';

import request from 'superagent';
import {filter, isArray} from 'underscore';
import {getUrl} from '../configuration';
import {tree} from '../managers/StateManager.js';
import {getActive as getActiveTypes, getTypeIcon} from '../actions/placeTypes.js';
import {cachingMilli} from '../configuration';

const _places = tree.select('places');
_places.set({
  isLoading: false,
  lastUpdate: undefined,
  items: [],
  activeItems: []
});

export function getActivePlaces(){
  return new Promise((resolve, reject) => {
    getPlaces()
    .then((res) => {
      const activeTypes = getActiveTypes();
      const activeItems = filter(res, (place) => {
        if(activeTypes === 'all' || activeTypes.indexOf(place.type) !== -1){
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
  if(lastUpdate === undefined || cachingMilli < currentTime - lastUpdate){
    return true;
  }else{
    return false;
  }
}

function fetchAllPlaces(){
  return new Promise((resolve, reject) => {
    const url = [
      getUrl(),
      'get-places'
    ];
    request
    .get(url.join('/'))
    .end(function(err, res){
      if(err){
        reject(err);
      }else{
        const out = res.body.map(function(place){
          return Object.assign(place, {
            icon: getTypeIcon(place.type)
          });
        });
        _places.set('items', out);
        _places.set('lastUpdate', (new Date()).getTime());
        resolve(out);
      }
    });
  });
};

function getLocationArg(){
  return 'all';
}

function getTypesArg(){
  const args = getActiveTypes();
  if(isArray(args)){
    return args.join('+');
  }else{
    return args;
  }
}