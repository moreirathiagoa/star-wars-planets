import React, {Component} from 'react';
import './index.css';

class Button extends Component{
  render(){
    return(
      <div className="button-container">
        <button onClick={this.props.onClick} className="button">{this.props.buttonName}</button>
      </div>
    );
  }
}
export default Button;
