'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {getPlace} from '../actions/places.js';
import {getTypeIcon} from '../actions/placeTypes.js';
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

    if(place.email){
      out.push({
        "label": getString(['place', 'email']),
        "value_email": place.email
      })
    }

    if(place.website){
      out.push({
        "label": getString(['place', 'website']),
        "value_href": place.website
      })
    }

    return (
      <table>
        <tbody>
          {out.map(function(info, index){
            let value;
            if(info.value){
              value = info.value;
            }else if(info.value_href){
              value = (<a href={info.value_href}>{info.value_href}</a>);
            }else if(info.value_email){
              value = (<a href={"mailto:" + info.value_email}>{info.value_email}</a>);
            }
            return (
              <tr key={index}>
                <th>
                  {info.label}
                </th>
                <td>
                  {value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
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
              {cat.title}
            </a>
          </li>
        );
      });
      content = (
        <div>
          <article className="bu-place">
            <h1 className="bu-place-header bu-section">{place.title}</h1>
            <section className="bu-place-description bu-section">
              {self.getIcons()}
            </section>
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