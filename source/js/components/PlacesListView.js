'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {Link} from 'react-router';
import {getActivePlaces} from '../actions/places.js';
import {Loader} from '../components';
import {PlaceListItem} from '../components';

class PlacesListView extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    getActivePlaces();
  }

  render(){
    const self = this;

    if(self.props.isLoading){
      return (
        <Loader/>
      );
    }else{
      return (
        <div className="bu-places-list">
          <ul>
            {self.props.items.map(item => {
              const props = Object.assign({
                key: item.id
              }, item);
              return (<PlaceListItem {...props}/>);
            })}
          </ul>
        </div>
      );
    }
  }
}

export default branch(PlacesListView, {
  cursors: {
    isLoading: ['places', 'isLoading'],
    items: ['places', 'activeItems']
  }
});