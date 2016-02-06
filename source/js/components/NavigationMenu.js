import React, {Component} from 'react';
import {Link} from 'react-router';

class NavigationMenu extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <nav>
        <ul>
          <li><Link to="/map">Map</Link></li>
          <li><Link to="/places">Places</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    );
  }
}

export default NavigationMenu;