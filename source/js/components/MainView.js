import React, {Component} from 'react';
import {root} from 'baobab-react/higher-order';
import tree from '../managers/StateManager.js';
import Place from './Place.js';
import PlaceTypes from './PlaceTypes.js';

class MainView extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <h1>REACT</h1>
        <Place title="Koutouki"/>
        <div className="box"/>
        <PlaceTypes/>
      </div>
    );
  }
}

const RootedApp = root(MainView, tree);

export default RootedApp;