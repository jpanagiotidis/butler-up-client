'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {Link} from 'react-router';
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
    .sort(function(a, b){
      const distA = getDistance(loc.latitude, loc.longitude, a.latitude, a.longitude);
      const distB = getDistance(loc.latitude, loc.longitude, b.latitude, b.longitude);
      if(distA > distB){
        return 1;
      }else if(distA < distB){
        return -1;
      }else{
        return 0;
      }
    })
    .map(item => {
      const props = Object.assign({
        key: item.id
      }, item);
      return (<PlaceListItem {...props}/>);
    })
    .slice(0, 1)
  }

  render(){
    const self = this;

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

// function calculateDistance(a, b){
//   console.log('a', a.latitude, a.longitud);
//   console.log('b', b.latitude, b.longitud);
//   console.log('sub', Math.pow(parseFloat(b.longitude) - parseFloat(a.longitude), 2) - 
//       Math.pow(parseFloat(b.latitude) - parseFloat(a.latitude), 2))
//   return Math.sqrt(
//     Math.abs(
//       Math.pow(parseFloat(b.longitude) - parseFloat(a.longitude), 2) - 
//       Math.pow(parseFloat(b.latitude) - parseFloat(a.latitude), 2)
//     )
//   );
// }

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