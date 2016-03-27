'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {getPlace} from '../actions/places.js';
import {getTypeIcon} from '../actions/placeTypes.js';
import {getString, getTranslation} from '../managers/StringsManager.js';
import {
  Loader,
  PlaceInfoTable, 
  PlaceOffers,
  PlaceEvents,
  PlaceImages
} from '../components';

class PlaceView extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const self = this;
    getPlace(self.props.params.placeId);
  }

  getIcons(){
    const self = this;
    const place = self.props.places[self.props.params.placeId];

    return place.type.map(function(type){
      return (<i key={type} className={`fa fa-2x ${getTypeIcon(type)}`}/>);
    });
  }

  render(){
    const self = this;
    const place = self.props.places[self.props.params.placeId];
    
    let content;
    if(self.props.isLoading){
      content = (<Loader/>)
    }else if(place){
      const catalogues = place.catalogues.map(function(cat, index){
        return (
          <li className="bu-section" key={index}>
            <a href={cat.url}>
              {getTranslation(cat.title)}
            </a>
          </li>
        );
      });
      content = (
        <div>
          <article className="bu-place bu-article">
            <h1 className="bu-main-header bu-section">{getTranslation(place.title)}</h1>
            <section className="bu-description bu-section">
              {self.getIcons()}
            </section>
            <section className="bu-main-image-holder bu-section">
              <img src={place.main_image}/>
            </section>
            <h2 className="bu-section-header bu-section">{getString(['place', 'description'])}</h2>
            <section 
              className="bu-description bu-section"
              dangerouslySetInnerHTML={{__html:getTranslation(place.description)}}
            />
            <h2 className="bu-section-header bu-section">{getString(['place', 'catalogues'])}</h2>
            <section className="bu-place-catalogues">
              <ul className="catalogues">
                {catalogues}
              </ul>
            </section>
            <PlaceImages placeId={self.props.params.placeId} images={place.gallery}/>
            <PlaceEvents placeId={self.props.params.placeId} events={place.events}/>
            <PlaceOffers offers={place.offers}/>
            <h2 className="bu-section-header bu-section">{getString(['place', 'info'])}</h2>
            <section className="bu-place-info">
              <PlaceInfoTable place={place}/>
            </section>
            <a href={`https://maps.google.com/maps?daddr=${place.location.latitude},${place.location.longitude}`} target="_blank">
              <h2 className="bu-section-header bu-section">{getString(['place', 'directions'])}</h2>
            </a>
          </article>
        </div>
      );
    }else{
      content = (<div/>);
    }
    
    return content;
  }
}

export default branch(PlaceView, {
  cursors: {
    isLoading: ['places', 'isLoading'],
    places: ['places', 'fullItems']
  }
});