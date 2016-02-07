'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';

class PlaceTypes extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;

    const types = self.props.placeTypes.map(function(type){
      return (<li key={type}>{type}</li>);
    });

    return(
      <ul>{types}</ul>
    );
  }
}

export default branch(PlaceTypes, {
  cursors: {
    placeTypes: ['placeTypes']
  }
});