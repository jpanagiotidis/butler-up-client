'use strict';

import React, {Component} from 'react';
import {branch} from 'baobab-react/higher-order';
import {setLanguage} from '../actions/app.js';

class LanguageItem extends Component{
  constructor(props){
    super(props);
  }

  setLanguage(evt){
    evt.preventDefault();
    evt.stopPropagation();
    const self = this;
    setLanguage(self.props.id);
  }

  render(){
    const self = this;

    const classes = ["bu-section"];
    if(self.props.id === self.props.currentLanguage){
      classes.push("active");
    }
    return (
      <li 
        key={self.props.id} 
        className= {classes.join(' ')}
        onClick={self.setLanguage.bind(self)}>
        <a href="#">
          {self.props.title}
        </a>
      </li>
    );
  }
}

export default branch(LanguageItem, {
  cursors: {
    currentLanguage: ['app', 'settings', 'currentLanguage']
  }
});