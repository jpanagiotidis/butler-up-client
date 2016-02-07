import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {history} from './managers/StateManager.js';
import MainView from './components/MainView.js';
import PlacesListView from './components/PlacesListView.js';
import PlaceView from './components/PlaceView.js';
import PlaceTypes from './components/PlaceTypes.js';
import MapView from './components/MapView.js';
import SettingsView from './components/SettingsView.js';
import NotFound from './components/NotFound.js';
import '../scss/main.scss';

render(
  <Router history={history}>
    <Route path="/" component={MainView}>
      <Route path="/map" component={MapView}/>
      <Route path="/places" component={PlacesListView}/>
      <Route path="/place/:placeId" component={PlaceView}/>
      <Route path="/settings" component={SettingsView}/>
    </Route>
    <Route path="*" component={NotFound}/>
  </Router>, 
  document.getElementById('appFrame')
);