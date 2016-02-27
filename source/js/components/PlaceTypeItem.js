'use strict';

import React, {Component} from 'react';

class PlaceTypeItem extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    // const classes
    const iconClasses = ['fa', 'fa-4x', self.props.icon];
    return (
      <div className>
        <i className={iconClasses.join(' ')}></i>
      </div>
    );
  }
}

export default PlaceTypeItem;