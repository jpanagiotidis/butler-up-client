'user strict';

import request from 'superagent';
import {getUrl} from '../configuration';
import {tree} from './StateManager.js';

const _places = tree.select('places');
const _place = tree.select('place');

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