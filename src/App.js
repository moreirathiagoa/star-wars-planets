import React, {Component} from 'react';
import './App.css';
import serverGetTotalPlanets from './services/getPlanets';
import serverGetPlanet from './services/getPlanet';
import Planet from './components/planet';
import Header from './components/header';
import Error from './components/error';
import Loading from './components/loading';
import Button from './components/button';
import Welcome from './components/welcome';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      planet:{
        url: null,
        name: null,
        population: null,
        climate: null,
        terrain: null,
        films: []
      },
      planetsCache: [],
      totalPlanets: 0,
      buttonName: 'Start',
      loading: false,
      errorLoading: false,
      nextUrl: null,
      timer: null
    }
    this.planetAPIURL = 'https://swapi.co/api/planets/';
  }

  componentDidMount(){
    if(this.state.totalPlanets===0)
      this.getTotalPlanet(this.planetAPIURL);
    
    //veriffy if the data of localstorange has more than 10 minuts, clear cache
    if ((Date.now() - localStorage.getItem('lastSave'))/60000 > 10){
      localStorage.removeItem("starWarsState")
      localStorage.removeItem("lastSave")
    }
    
    //get planets cache from localstorange
    let starWarsState = localStorage.getItem('starWarsState');
    if (starWarsState !== null)
      this.setState({planetsCache:JSON.parse(starWarsState)});
  }
  
  //get total planet and cache first page of API
  getTotalPlanet = (planetAPIURL)=>{
    serverGetTotalPlanets(this, planetAPIURL);
  }

  //method to get next aleatory planet
  nextPlanet =()=>{

    //call function to get total planets if appState information is zero
    if (this.state.totalPlanets === 0)
      this.getTotalPlanet(this.planetAPIURL); 

    //call server to get next planet
    serverGetPlanet(this);

    //call getTotalPlanet to save more cache
    if (this.state.nextUrl !== null)
      this.getTotalPlanet(this.state.nextUrl) 
      
    //set localstorange planetscache and last save data
    localStorage.setItem('starWarsState', JSON.stringify(this.state.planetsCache));
    localStorage.setItem('lastSave', Date.now());
  }

  //render the result
  render(){
    return(
      <div className="aplication">
        <Header/>
        <div className="content">
          {this.state.loading ?
            <div>
              <Loading/>
            </div> :
            <div>
              {this.state.errorLoading ?
                <div>
                  <Error/>
                </div>:
                <div>
                  {this.state.planet.url !== null ?
                    <Planet planet={this.state.planet}/>:
                    <Welcome/>
                  }
                </div>
              }
              <div>
                <Button onClick={this.nextPlanet} buttonName={this.state.buttonName}/>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
export default App;
