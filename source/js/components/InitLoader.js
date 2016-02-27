'use strict';

import React, {Component} from 'react';

class InitLoader extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    
    return(
      <div className="bu-loading">
        <h1>Buttler Up</h1>
        <img src="images/cog.svg" className="bu-spinner"/>
      </div>
    );
  }
}

export default InitLoader;