import Baobab from 'baobab';
import {isCordova} from '../configuration';
import {hashHistory} from 'react-router';
import {createHistory} from 'history';

export const tree = new Baobab({
  placeTypes: [
    'Bar',
    'Cafe',
    'Restaurant'
  ],
  places: {
    isLoading: true,
    items: []
  },
  place: {
    isLoading: true,
    item: undefined
  }
});

let _history;
if(isCordova()){
  _history = hashHistory;
}else{
  _history = createHistory();
}
export const history = _history;