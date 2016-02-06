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
  colors: ['yellow', 'blue', 'orange']
});

export const history = createHistory();