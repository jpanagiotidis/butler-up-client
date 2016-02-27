'user strict';

import React, {Component} from 'react';
import {Link} from 'react-router';

class TitleView extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Link to="/map">
        <div className="bu-title-screen">
          <div className="bu-title-frame">
            <img className="logo" src="images/logo.png"/>
            <h1>ΑΝΑΖΗΤΗΣΗ</h1>
          </div>
        </div>
      </Link>
    );
  }
}

export default TitleView;