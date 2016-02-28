'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {Link} from 'react-router';
import {getPlaces} from '../actions/places.js';

class MapView extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    getPlaces();
  }

  componentDidMount(){
    const self = this;

    self.map = new google.maps.Map(document.getElementById('mapFrame'), {
      center: {lat: self.props.location.latitude, lng: self.props.location.longitude},
      zoom: 12
    });

    self.drawPlaces();
  }

  drawPlaces(){
    const self = this;

    if(self.map){
      self.props.items.forEach(function(place){
        const pos = new google.maps.LatLng(place.latitude, place.longitude);

        var marker = new google.maps.Marker({
          position: pos,
          title:"Hello World!"
        });

        marker.setMap(self.map);
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
    items: ['places', 'items']
  }
});