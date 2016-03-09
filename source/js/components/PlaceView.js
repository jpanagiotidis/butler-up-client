'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {getPlace} from '../actions/places.js';
import {getString} from '../managers/StringsManager.js';
import {Loader} from '../components';

class PlaceView extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const self = this;
    getPlace(self.props.params.placeId);
  }

  getInfoTable(){
    const self = this;
    const place = self.props.places[self.props.params.placeId];
    const out = [];
    if(place.phones && place.phones.length > 0){
      place.phones.forEach(function(phone, index){
        out.push({
          "label": index === 0 ? getString(['place', 'phone']) : "",
          "value": phone
        });
      });
    }

    if(place.location){
      if(place.location.street){
        out.push({
          "label": getString(['place', 'street']),
          "value": place.location.street
        });
      }
      if(place.location.city){
        out.push({
          "label": getString(['place', 'city']),
          "value": place.location.city
        });
      }
    }

    return (
      <table>
        <tbody>
          {out.map(function(info, index){
            return (
              <tr key={index}>
                <th>
                  {info.label}
                </th>
                <td>
                  {info.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
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
              {cat.title}
            </a>
          </li>
        );
      });
      content = (
        <div>
          <article className="bu-place">
            <h1 className="bu-place-header bu-section">{place.title}</h1>
            <section className="bu-place-image-holder bu-section">
              <img src={place.main_image}/>
            </section>
            <h2 className="bu-place-section-header bu-section">{getString(['place', 'description'])}</h2>
            <section 
              className="bu-place-description bu-section"
              dangerouslySetInnerHTML={{__html:place.description}}
            />
            <h2 className="bu-place-section-header bu-section">{getString(['place', 'catalogues'])}</h2>
            <section className="bu-place-catalogues">
              <ul className="catalogues">
                {catalogues}
              </ul>
            </section>
            <h2 className="bu-place-section-header bu-section">{getString(['place', 'info'])}</h2>
            <section className="bu-place-info">
              {self.getInfoTable()}
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

export default branch(PlaceView, {
  cursors: {
    isLoading: ['places', 'isLoading'],
    places: ['places', 'fullItems']
  }
});