'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {fetchPlace} from '../managers/ActionsManager.js';

class PlaceView extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const self = this;
    fetchPlace(self.props.params.placeId);
  }

  render(){
    const self = this;
    
    let content;
    if(self.props.isLoading){
      content = (<h1>Loading...</h1>)
    }else if(self.props.item){
      content = (
        <article>
          <h1>{self.props.item.title}</h1>
          <img src={self.props.item.image}/>
          <p>{self.props.item.description}</p>
        </article>
      );
    }
    return(
      <div>
        {content}
      </div>
    );
  }
}

export default branch(PlaceView, {
  cursors: {
    isLoading: ['place', 'isLoading'],
    item: ['place', 'item']
  }
});