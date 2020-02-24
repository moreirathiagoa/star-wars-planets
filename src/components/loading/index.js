import React, {Component} from 'react';
import './index.css';

class Loaging extends Component{
  render(){
    return(
      <div className="loading">
        <img src={require('../../asset/img/loading.gif')} alt="Loading"/>
      </div>
    );
  }
}
export default Loaging;
