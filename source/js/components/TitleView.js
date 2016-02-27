'user strict';

import React, {Component} from 'react';
import {Link} from 'react-router';

class TitleView extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="bu-screen bu-title-screen">
        <Link to="/map">
          <div className="bu-title-frame">
            <img className="logo" src="images/logo.png"/>
            <h1>START</h1>
          </div>
        </Link>
      </div>
    );
  }
}

export default TitleView;