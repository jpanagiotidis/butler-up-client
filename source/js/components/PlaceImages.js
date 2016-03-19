'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import {getString} from '../managers/StringsManager.js';

class PlaceImages extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    if(self.props.images && self.props.images.length > 0){
      const images = self.props.images.map(function(image, index){
        return (
          <li key={index} className="bu-image-item">
            <img src={image.thumbnail}/>
          </li>
        );
      });

      return (
        <div>
          <h2 className="bu-section-header bu-section">{getString(['place', 'images'])}</h2>
          <section className="bu-place-images bu-section">
            <Link to={`/place/${self.props.placeId}/gallery`}>
              <ul>
                {images}
              </ul>
            </Link>
          </section>
        </div>
      );
    }else{
      return null;
    }
  }
}

export default PlaceImages;