import React, {Component} from 'react';

class Place extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const self = this;
    return(
      <div>
        <h3>{self.props.title}</h3>
      </div>
    );
  }
}

export default Place;