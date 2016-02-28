'use strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {Link} from 'react-router';
import {getActivePlaces} from '../actions/places.js';

class PlaceListItem extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    return (
      <li>
        <Link to={`/place/${self.props.id}`}>
          <h3>{self.props.title}</h3>
          <img src={self.props.image}/>
        </Link>
      </li>
    );
  }
}

export default PlaceListItem;