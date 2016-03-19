'use strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {Link} from 'react-router';
import {getString} from '../managers/StringsManager.js';
import {ListBox} from '../components';

class PlaceEvents extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    if(self.props.events && self.props.events.length > 0){

      const events = self.props.events.map(function(event, index){
        return (
          <Link to={`/place/${self.props.placeId}/event/${event.id}`} key={index}>
            <ListBox
              title={event.title}
              sub_title={event.text_date}
              image={event.image}
            />
          </Link>
        );
      })

      return (
        <div>
          <h2 className="bu-section-header bu-section">{getString(['place', 'events'])}</h2>
          <section className="bu-place-events">
            <ul>
              {events}
            </ul>
          </section>
        </div>
      );
    }else{
      return null;
    }
  }
}

export default PlaceEvents;