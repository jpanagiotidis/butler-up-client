'use strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {Link} from 'react-router';
import {getActivePlaces} from '../actions/places.js';
import {getTypeIcon} from '../actions/placeTypes.js';

class PlaceListItem extends Component{
  constructor(props){
    super(props);
  }

  getIcons(){
    const self = this;
    
    return self.props.type.map(function(type){
      return (<i key={type} className={`fa fa-2x ${getTypeIcon(type)}`}/>);
    });
  }

  render(){
    const self = this;

    // const iconClasses = [
    //   'fa',
    //   'fa-3x',
    //   self.props.icon
    // ];
    return (
      <li className="bu-place-list-item">
        <Link to={`/place/${self.props.id}`}>
          <h3>{self.props.title}</h3>
          <div className="bu-list-item-content">
            <div className="bu-image-holder">
              <img src={self.props.image}/>
            </div>
            <div className="bu-list-item-type">
              <div className="bu-list-item-type-holder">
                {self.getIcons()}
              </div>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

export default PlaceListItem;