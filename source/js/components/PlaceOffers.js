'use strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {getString} from '../managers/StringsManager.js';

class PlaceOffers extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    if(self.props.offers && self.props.offers.length > 0){

      const offers = self.props.offers.map(function(offer, index){
        return (
          <li className="bu-section" key={index}>
            <span>{offer.title}</span>
          </li>
        );
      })
      return (
        <div>
          <h2 className="bu-place-section-header bu-section">{getString(['place', 'offers'])}</h2>
          <section className="bu-place-offers">
            <ul>
              {offers}
            </ul>
          </section>
        </div>
      );
    }else{
      return null;
    }
  }
}

export default PlaceOffers;