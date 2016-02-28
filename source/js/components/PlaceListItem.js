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

    const iconClasses = [
      'fa',
      'fa-3x',
      self.props.icon
    ];
    return (
      <li className="bu-place-list-item">
        <Link to={`/place/${self.props.id}`}>
          <h3>{self.props.title}</h3>
          <div className="bu-list-item-content">
            <div className="bu-image-holder">
              <img src={self.props.image}/>
            </div>
            <div className="bu-list-item-type">
              <i className={iconClasses.join(' ')}/>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

export default PlaceListItem;