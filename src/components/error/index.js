import React, {Component} from 'react';
import './index.css';

class Error extends Component{
  render(){
    return(
      <div className="erro-message">
        {this.props.errorMessage}
      </div>
    );
  }
}
export default Error;
