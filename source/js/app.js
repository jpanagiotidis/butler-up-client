import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {history} from './managers/StateManager.js';
import MainView from './components/MainView.js';
import PlacesListView from './components/PlacesListView.js';
import Place from './components/Place.js';
import PlaceTypes from './components/PlaceTypes.js';
import MapView from './components/MapView.js';
import SettingsView from './components/SettingsView.js';
import '../scss/main.scss';

render(
  <Router history={history}>
    <Route path="/" component={MainView}>
      <Route path="/map" component={MapView}/>
      <Route path="/places" component={PlacesListView}/>
      <Route path="/settings" component={SettingsView}/>
    </Route>
  </Router>, 
  document.getElementById('appFrame')
);