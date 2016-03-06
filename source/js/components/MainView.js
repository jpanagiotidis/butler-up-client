'user strict';

import React, {Component} from 'react';
import {root} from 'baobab-react/higher-order';
import {tree} from '../managers/StateManager.js';
import NavigationMenu from './NavigationMenu.js';

class MainView extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    return (
      <div className="bu-screen">
        <div className="bu-content-frame">
          {self.props.children}
        </div>
        <NavigationMenu pathname={self.props.location.pathname}/>
      </div>
    );
  }
}

const RootedApp = root(MainView, tree);

export default RootedApp;