'user strict';

import React, {Component} from 'react';
import {setMap} from '../managers/MapManager.js';
let map;

class MapView extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    setMap().then(function(){
      map = new google.maps.Map(document.getElementById('mapFrame'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    })
  }

  render(){
    return (
      <div id="mapFrame" className="contentFrame"/>
    );
  }
}

export default MapView;