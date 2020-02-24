import React, {Component} from 'react';
import './index.css';

class Error extends Component{
  render(){
    return(
      <div className="erro-message">
        Problems during server access.
      </div>
    );
  }
}
export default Error;
