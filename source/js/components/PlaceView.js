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
    console.log(self.props.item);
    
    let content;
    if(self.props.isLoading){
      content = (<h1>Loading...</h1>)
    }else if(self.props.item){
      content = (
        <article className="bu-place">
          <h1 className="bu-place-header">{self.props.item.title}</h1>
          <div className="bu-place-image-holder">
            <img src={self.props.item.image}/>
          </div>
          <div className="bu-place-description">
            <p>{self.props.item.description}</p>
          </div>
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