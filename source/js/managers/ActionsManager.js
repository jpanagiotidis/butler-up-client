import request from 'superagent';
import {getUrl} from '../configuration';
import {tree} from './StateManager.js';

const _places = tree.select('places');

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
        _places.set('items', transformPlaces(res.body.results));
        _places.set('isLoading', false);
        resolve(res);
      }
    });
  });
};

function transformPlaces(places){
  return places.map(function(obj){
    return obj['place'];
  });
}