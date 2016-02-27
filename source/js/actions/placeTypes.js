'user strict';

import request from 'superagent';
import {getUrl} from '../configuration';
import {tree} from '../managers/StateManager.js';

const icons = {
  'bar': 'fa-glass',
  'cafe': 'fa-coffee',
  'restaurant': 'fa-cutlery'
};
const _placeTypes = tree.select('placeTypes');

export function fetchPlaceTypes(){
  return new Promise((resolve, reject) => {
    request
    .get(getUrl() + '/get-place-types')
    .end(function(err, res){
      if(err){
        reject(err);
      }else{
        setPlaceTypes(res.body.place_types);
        resolve();
      }
    });
  });
}

function setPlaceTypes(data){
  var types = {};

  data.forEach(function(obj){
    const type = obj.type;
    if(icons[type.name]){
      types[type.tid] = {
        id: type.tid,
        name: type.name,
        visible: type.field_cf_place_type_visible_name,
        icon: icons[type.name],
        isActive: true
      };
    }
  });
  _placeTypes.set(types);
}

export function switchType(id){
  _placeTypes.set([id, 'isActive'], !_placeTypes.get([id, 'isActive']));
}