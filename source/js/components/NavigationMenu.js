'user strict';

import React, {Component} from 'react';
import {Link} from 'react-router';

class NavigationMenu extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <nav className="bu-nav-menu">
        <ul>
          <li>
            <Link to="/settings">
              <i className="bu-btn-settings fa fa-2x fa-cog"></i>
            </Link>
          </li>
          <li>
            <Link to="/map">
              <i className="bu-btn-map fa fa-2x fa-search"></i>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavigationMenu;