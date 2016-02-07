'user strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {fetchPlaces} from '../managers/ActionsManager.js';
import {Link} from 'react-router';

class PlacesListView extends Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    fetchPlaces();
  }

  render(){
    const self = this;

    let content;
    if(self.props.isLoading){
      content = (<h1>Loading...</h1>)
    }else{

      content = (
        <ul>
          {self.props.items.map(getListItem)}
        </ul>
      );
    }
    return(
      <div className="contentFrame">
        {content}
      </div>
    );
  }
}

function getListItem(item){
  return (
    <li 
      key={item.id}>
      <Link to={`/place/${item.id}`}>
        <h3>{item.title}</h3>
        <img src={item.image}/>
      </Link>
    </li>
  );
}

export default branch(PlacesListView, {
  cursors: {
    isLoading: ['places', 'isLoading'],
    items: ['places', 'items']
  }
});