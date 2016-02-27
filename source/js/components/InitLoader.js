'use strict';

import React, {Component} from 'react';

class InitLoader extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    
    return(
      <div className="bu-screen">
        <div className="bu-loading">
          <i className="fa fa-cog fa-3x fa-spin"></i>
        </div>
      </div>
    );
  }
}

export default InitLoader;