'use strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {getString} from '../managers/StringsManager.js';
import {getPlace} from '../actions/places.js';
import {find} from 'underscore';
import {
  Loader
} from '../components';

class EventView extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const self = this;
    getPlace(self.props.params.placeId);
  }

  render(){
    const self = this;
    let event;
    if(self.props.places[self.props.params.placeId]){
      event = find(self.props.places[self.props.params.placeId].events, function(obj){
        return obj.id === self.props.params.eventId;
      });
    }

    let content;
    if(self.props.isLoading){
      content = (<Loader/>)
    }else if(event){
      const subTitle = event.text_date ? (
        <section className="bu-description bu-section">
          <p>{event.text_date}</p>
        </section>
      ) : null;
      const description = event.description ? (
        <div>
          <h2 className="bu-section-header bu-section">{getString(['place', 'description'])}</h2>
          <section 
            className="bu-description bu-section"
            dangerouslySetInnerHTML={{__html:event.description}}
          />
        </div>
      ) : null;
      content = (
        <div>
          <article className="bu-event bu-article">
            <h1 className="bu-main-header bu-section">{event.title}</h1>
            {subTitle}
            <section className="bu-main-image-holder bu-section">
              <img src={event.image}/>
            </section>
            {description}
          </article>
        </div>
      );
    }else{
      content = (<div/>);
    }
    return content;
  }
}

export default branch(EventView, {
  cursors: {
    isLoading: ['places', 'isLoading'],
    places: ['places', 'fullItems']
  }
});