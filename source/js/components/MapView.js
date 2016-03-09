'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {Link, browserHistory} from 'react-router';
import {setLocation, getLocation, setZoom, getZoom} from '../actions/map.js';
import {getActivePlaces} from '../actions/places.js';

let markers = [];

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
      center: {lat: getLocation().latitude, lng: getLocation().longitude},
      disableDefaultUI: true,
      zoom: getZoom()
    });

    self.map.addListener('dragend', function(){
      const center = self.map.getCenter();
      setLocation(center.lat(), center.lng());
    });

    self.map.addListener('zoom_changed', function(){
      setZoom(self.map.getZoom());
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

    markers = [];
  }

  drawPlaces(){
    const self = this;

    self.clearPlaces();
    
    if(self.map){
      self.props.items.forEach(function(place){
        const pos = new google.maps.LatLng(place.latitude, place.longitude);

        const marker = new google.maps.Marker({
          position: pos,
          label: place.type[0]
        });

        marker.setMap(self.map);

        marker.addListener('click', function(){
          self.props.history.pushState(null, '/place/' + place.id);
        });

        markers.push(marker);
      });
    }
  }

  render(){
    const self = this;
    self.drawPlaces();
    return (
      <div className="bu-map-holder">
        <Link to="/">
          <img className="bu-map-logo" src="images/logo-icon.png"/>
        </Link>
        <div id="mapFrame"/>
      </div>
    );
  }
}

export default branch(MapView, {
  cursors: {
    items: ['places', 'activeItems']
  }
});