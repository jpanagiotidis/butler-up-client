'user strict';

import React, {Component} from 'react';
import {Link} from 'react-router';
import {getString} from '../managers/StringsManager.js';

class TitleView extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="bu-screen bu-title-screen">
        <Link to="/place">
          <div className="bu-title-frame">
            <img className="logo" src="images/logo.png"/>
            <h1>{getString(['generic', 'start'])}</h1>
          </div>
        </Link>
      </div>
    );
  }
}

export default TitleView;
