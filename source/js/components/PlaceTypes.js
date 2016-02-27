'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {PlaceTypeItem} from '../components';

class PlaceTypes extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;

    const types = self.props.placeTypes.map(function(type){
      const props = Object.assign({
        key: type.id
      }, type);
      return (<PlaceTypeItem {...props}/>);
    });

    return(
      <div className="bu-place-types">
        {types}
      </div>
    );
  }
}

export default branch(PlaceTypes, {
  cursors: {
    placeTypes: ['placeTypes']
  }
});