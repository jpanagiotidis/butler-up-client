'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';

class MapView extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const self = this;

    self.map = new google.maps.Map(document.getElementById('mapFrame'), {
      center: {lat: self.props.location.latitude, lng: self.props.location.longitude},
      zoom: 16
    });
  }

  render(){
    return (
      <div id="mapFrame" className="contentFrame"/>
    );
  }
}

export default branch(MapView, {
  cursors: {
    location: ['location']
  }
});