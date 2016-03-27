'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {Link} from 'react-router';
import {getMaxListSize, getMaximumListDistance} from '../actions/app.js';
import {getActivePlaces} from '../actions/places.js';
import {getLocation} from '../actions/map.js';
import {Loader} from '../components';
import {PlaceListItem} from '../components';

class PlacesListView extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    getActivePlaces();
  }

  getPlaces(){
    const self = this;
    const loc = getLocation();

    return self.props.items
    .slice()
    .map(function(place){
      return Object.assign({}, place, {
        distance: getDistance(loc.latitude, loc.longitude, place.latitude, place.longitude)
      });
    })
    .sort(function(a, b){
      if(a.distance > b.distance){
        return 1;
      }else if(a.distance < b.distance){
        return -1;
      }else{
        return 0;
      }
    })
    .filter(function(place){
      return place.distance < getMaximumListDistance();
    })
    .map(item => {
      const props = Object.assign({
        key: item.id
      }, item);
      return (<PlaceListItem {...props}/>);
    })
    .slice(0, getMaxListSize())
  }

  render(){
    const self = this;
    console.log(self)

    if(self.props.isLoading){
      return (
        <Loader/>
      );
    }else{
      return (
        <div className="bu-places-list">
          <ul>
            {self.getPlaces()}
          </ul>
        </div>
      );
    }
  }
}

function getDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export default branch(PlacesListView, {
  cursors: {
    isLoading: ['places', 'isLoading'],
    items: ['places', 'activeItems']
  }
});