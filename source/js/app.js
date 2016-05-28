'user strict';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {history} from './managers/StateManager.js';
import 'react-fastclick';
import {init as appInit} from './actions/app.js';
import {initMap, initPosition} from './actions/map.js';
import {init as stringsInit} from './managers/StringsManager.js';
import {
  InitLoader,
  TitleView,
  MainView,
  PlacesListView,
  PlaceView,
  SettingsView,
  MapView,
  EventView,
  GalleryView,
  PlaceTypesSelectorView,
  NotFound
} from './components';
import '../scss/main.scss';
import {isCordova} from './configuration';

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
        <Route path="/place/:placeId/gallery" component={GalleryView}/>
        <Route path="/settings" component={SettingsView}/>
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>,
    document.getElementById('appFrame')
  );
  // if(isCordova()){
  //   setTimeout(() => {
  //     navigator.splashscreen.hide();
  //   }, 1600);
  // }
})
.catch(function(err){
  console.log('ERROR ON APP LOADING');
  console.log(err);
});
