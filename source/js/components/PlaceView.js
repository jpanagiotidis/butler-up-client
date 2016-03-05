'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {getPlace} from '../actions/places.js';

class PlaceView extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const self = this;
    getPlace(self.props.params.placeId);
  }

  render(){
    const self = this;
    const place = self.props.places[self.props.params.placeId];
    
    let content;
    if(self.props.isLoading){
      content = (<h1>Loading...</h1>)
    }else if(place){
      content = (
        <article className="bu-place">
          <h1 className="bu-place-header">{place.title}</h1>
          <div className="bu-place-image-holder">
            <img src={place.main_image}/>
          </div>
          <div className="bu-place-description">
            {place.description}
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
    isLoading: ['places', 'isLoading'],
    places: ['places', 'fullItems']
  }
});