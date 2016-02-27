'user strict';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {history} from './managers/StateManager.js';
import {setMap, setInitPosition} from './managers/ActionsManager.js';
import {fetchPlaceTypes} from './actions/placeTypes.js';
import {InitLoader, TitleView, MainView, PlacesListView, PlaceView, PlaceTypes, MapView, PlaceTypesSelectorView, NotFound} from './components';
import '../scss/main.scss';

render(<InitLoader/>, document.getElementById('appFrame'));

Promise.all([setInitPosition(), setMap(), fetchPlaceTypes()])
.then(function(res){
  render(
    <Router history={history}>
      <Route path="/" component={TitleView}/>
      <Route path="app" component={MainView}>
        <Route path="/map" component={MapView}/>
        <Route path="/places" component={PlacesListView}/>
        <Route path="/place/:placeId" component={PlaceView}/>
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