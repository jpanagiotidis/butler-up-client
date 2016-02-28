'user strict';

import Baobab from 'baobab';
import {isCordova} from '../configuration';
import {hashHistory} from 'react-router';
import {createHistory} from 'history';

export const tree = new Baobab({
  placeTypes: [],
  place: {
    isLoading: true,
    item: undefined
  },
  map: {
    isLoading: true,
    items: []
  }
});

let _history;
if(isCordova()){
  _history = hashHistory;
}else{
  _history = createHistory();
}
export const history = _history;