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
        <article className="bu-place">
          <h1 className="bu-place-header">{place.title}</h1>
          <section className="bu-place-image-holder">
            <img src={place.main_image}/>
          </section>
          <h2 className="bu-place-section-header bu-section">Περιγραφή</h2>
          <section 
            className="bu-place-description bu-section"
            dangerouslySetInnerHTML={{__html:place.description}}
          />
          <h2 className="bu-place-section-header bu-section">Κατάλογοι</h2>
          <section className="bu-place-catalogues">
            <ul className="catalogues">
              {catalogues}
            </ul>
          </section>
          <h2 className="bu-place-section-header bu-section">Πληροφορίες</h2>
          <section className="bu-place-info">
            <table>
              <tbody>
                <tr>
                  <th>
                    Διεύθυνση:
                  </th>
                  <td>
                    asdfasfads
                  </td>
                </tr>
                <tr>
                  <th>
                    Τηλέφωνο:
                  </th>
                  <td>
                    asdfasfads
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
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