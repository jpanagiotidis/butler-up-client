'use strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';

class ListBox extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;

    return (
      <li className="bu-section bu-list-box">
        <img src={self.props.image}/>
        <span className="bu-list-box-title">
          <h3>{self.props.title}</h3>
          {self.props.sub_title ? (<h4>{self.props.sub_title}</h4>) : null}
        </span>
        <span className="bu-list-box-base"/>
      </li>
    );
  }
}

export default ListBox;