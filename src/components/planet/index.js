import React, {Component} from 'react';
import './index.css';

class Planet extends Component{
  render(){
    
    //verifying quantity of films to set ideal answer to the user
    let totaFfilms;
    if (this.props.planet.films.length === 0)
      totaFfilms = "no films";
    else if (this.props.planet.films.length === 1)
      totaFfilms = "1 film";
    else
      totaFfilms = this.props.planet.films.length + " films";
      
    return(
      <div className="planet-general">
        <div className="planet-name">
          <span>{this.props.planet.name}</span>
        </div>
        <div className="planet-data"> 
          <div className="content-data">
            <div data-testid="population" className="data">{this.props.planet.population}</div>
            <div className="label"><strong>Population:</strong> </div>
            <div data-testid="climated" className="data">{this.props.planet.climate}</div>
            <div className="label"><strong>Climated:</strong> </div>
            <div data-testid="terrain" className="data">{this.props.planet.terrain}</div>
            <div className="label"><strong>Terrain:</strong> </div><br/>
            <div data-testid="totalFilms" className="data">{totaFfilms}</div>
            <div className="label"><strong>Features in:</strong> </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Planet;
