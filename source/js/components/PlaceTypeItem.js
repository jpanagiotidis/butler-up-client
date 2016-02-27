'use strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {switchType as switchPlaceType} from '../actions/placeTypes.js';

class PlaceTypeItem extends Component{
  constructor(props){
    super(props);
  }

  onClick(){
    const self = this;
    switchPlaceType(self.props.id);
  }

  render(){
    const self = this;
    const classes = ['bu-place-type-item'];
    if(self.props.isActive){
      classes.push('active');
    }
    const iconClasses = ['fa', 'fa-5x', self.props.icon];
    return (
      <div 
        className={classes.join(' ')}
        onClick={self.onClick.bind(self)}>
        <i className={iconClasses.join(' ')}></i>
      </div>
    );
  }
}

export default branch(PlaceTypeItem, {
  cursors: {
    placeTypes: ['placeTypes']
  }
});