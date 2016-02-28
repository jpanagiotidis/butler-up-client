'use strict';

import React, {Component} from 'react';

class Loader extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    
    return(
      <div className="bu-loading">
        <i className="fa fa-cog fa-3x fa-spin"></i>
      </div>
    );
  }
}

export default Loader;