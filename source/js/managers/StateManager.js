import Baobab from 'baobab';
import { createHistory } from 'history';

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

export const history = createHistory();