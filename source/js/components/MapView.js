'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {Link} from 'react-router';
import {getActivePlaces} from '../actions/places.js';

const markers = [];

class MapView extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    getActivePlaces();
  }

  componentDidMount(){
    const self = this;

    self.map = new google.maps.Map(document.getElementById('mapFrame'), {
      center: {lat: self.props.location.latitude, lng: self.props.location.longitude},
      zoom: 12
    });

    self.drawPlaces();
  }

  clearPlaces(){
    const self = this;
    if(self.map){
      markers.forEach(m => {
        m.setMap(null);
      });
    }
  }

  drawPlaces(){
    const self = this;

    self.clearPlaces();
    
    if(self.map){
      self.props.items.forEach(function(place){
        const pos = new google.maps.LatLng(place.latitude, place.longitude);

        const marker = new google.maps.Marker({
          position: pos,
          label: place.type
        });

        marker.setMap(self.map);

        markers.push(marker);
      });
    }
  }

  render(){
    const self = this;
    self.drawPlaces();
    return (
      <div className="bu-map-holder">
        <div className="bu-map-switch">
          <Link to="/place">
            <i className="fa fa-2x fa-bars"/>
          </Link>
        </div>
        <div id="mapFrame"/>
      </div>
    );
  }
}

export default branch(MapView, {
  cursors: {
    location: ['location'],
    items: ['places', 'activeItems']
  }
});