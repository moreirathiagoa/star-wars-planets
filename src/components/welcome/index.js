import React, {Component} from 'react';
import './index.css';

class Welcome extends Component{
  render(){
      return(
        <div className="welcome">
          <div className="welcome-content">
            Welcome!<br/>
            Press start to begin.
          </div>
        </div>
      );
  }
}
export default Welcome;
