import React, {Component} from 'react';

class NotFound extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;

    return(
      <h1>Not Found, please try again...</h1>
    );
  }
}

export default NotFound;