'user strict';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {history} from './managers/StateManager.js';
import {init as appInit} from './actions/app.js';
import {initMap, initPosition} from './actions/map.js';
import {init as stringsInit} from './managers/StringsManager.js';
import {
  InitLoader, 
  TitleView, 
  MainView, 
  PlacesListView, 
  PlaceView, 
  PlaceTypes, 
  MapView,
  EventView, 
  PlaceTypesSelectorView, 
  NotFound
} from './components';
import '../scss/main.scss';

render(<InitLoader/>, document.getElementById('appFrame'));

Promise.all([
  initMap(),
  initPosition(), 
  appInit()
])
.then(function(res){
  render(
    <Router history={history}>
      <Route path="/" component={TitleView}/>
      <Route path="app" component={MainView}>
        <Route path="/map" component={MapView}/>
        <Route path="/place" component={PlacesListView}/>
        <Route path="/place/:placeId" component={PlaceView}/>
        <Route path="/place/:placeId/event/:eventId" component={EventView}/>
        <Route path="/settings" component={PlaceTypes}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>, 
    document.getElementById('appFrame')
  );
})
.catch(function(err){
  console.log('ERROR ON APP LOADING');
  console.log(err);
});