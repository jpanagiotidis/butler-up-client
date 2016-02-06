import React from 'react';
import {render} from 'react-dom';
import MainView from './components/MainView.js';

import '../scss/main.scss';

render(<MainView/>, document.getElementById('appFrame'));