'use strict';

import React, {Component} from 'react';
import {Loader} from '../components';

class InitLoader extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    
    return(
      <div className="bu-screen">
        <Loader/>
      </div>
    );
  }
}

export default InitLoader;