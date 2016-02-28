'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {Link} from 'react-router';

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
    location: ['location']
  }
});