'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {getString} from '../managers/StringsManager.js';

class PlaceInfoTable extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    const place = self.props.place;
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
}

export default PlaceInfoTable;