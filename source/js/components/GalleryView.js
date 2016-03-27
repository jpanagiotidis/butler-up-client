'use strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {Loader} from '../components';
import {getPlace} from '../actions/places.js';
import {getString, getTranslation} from '../managers/StringsManager.js';

class GalleryView extends Component{
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
      content = (<Loader/>)
    }else if(place){
      const images = place.gallery.map(function(image, index){
        return (
          <li key={index} className="bu-section">
            <img src={image.url} title={image.title} alt={image.alt}/>
            {image.title ? (
              <span className="bu-image-title">
                {image.title}
              </span>
            ) : null}
          </li>
        );
      });

      content = (
        <div>
          <article className="bu-article">
            <h1 className="bu-main-header bu-section">{getTranslation(place.title)}</h1>
            <section className="bu-description bu-section">
              <p>{getString(['place', 'images'])}</p>
            </section>
            <section className="bu-gallery">
              <ul>
                {images}
              </ul>
            </section>
          </article>
        </div>
      );
    }else{
      content = (<div/>);
    }
    
    return content;
  }
}

export default branch(GalleryView, {
  cursors: {
    isLoading: ['places', 'isLoading'],
    places: ['places', 'fullItems']
  }
});