'use strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {getString} from '../managers/StringsManager.js';

class PlaceEvents extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    if(self.props.events && self.props.events.length > 0){

      const events = self.props.events.map(function(event, index){
        return (
          <li className="bu-section" key={index}>
            <span>{event.title}</span>
          </li>
        );
      })
      return (
        <div>
          <h2 className="bu-place-section-header bu-section">{getString(['place', 'events'])}</h2>
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