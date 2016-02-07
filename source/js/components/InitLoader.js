'use strict';

import React, {Component} from 'react';

class InitLoader extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    
    return(
      <h1>Init Loader, please wait...</h1>
    );
  }
}

export default InitLoader;