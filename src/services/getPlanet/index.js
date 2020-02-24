export default (appState) => {
  
  //call function to get total planets if appState information is zero
  if (appState.state.totalPlanets === 0)
    appState.getTotalPlanet();

  //get aleatory number from ramdom method of Math class and complete the URL of API
  let aleatoryNumber = Math.floor(Math.random() * appState.state.totalPlanets) + 1;
  let planetAPIURL = appState.planetAPIURL+aleatoryNumber+'/';
  
  //get actual state
  let state = appState.state;

  //update button name to NEXT 
  state.buttonName = "Next";

  //run a filter to search the URL (id of planet) in the memory cach
  let filterResult = state.planetsCache.filter((item)=>{
    return(item.url === planetAPIURL);
  });

  //if filter get no result, call the API
  if(filterResult.length === 0){
    
    //set state to loading to show gif to user
    appState.setState ({loading: true});
    
    //fetch the data from the API
    fetch(planetAPIURL)
      .then((r)=> r.json())
      .then((json)=>{
        state.planet = json;
        state.planetsCache = [...state.planetsCache,state.planet];
        appState.setState(state);
        
        //finish actual stage loading to false (stop the gif)
        appState.setState ({loading: false});

        //stop timer loading counter
        appState.setState ({timer: null});

        //set actual stage errorLoading to false
        appState.setState ({errorLoading: false});
      })
  }

  //if filter get result use appState data to set actual planet on the stage
  else{
    state.planet = filterResult[0];
    appState.setState(state);

    //set actual stage errorLoading to false
    appState.setState ({errorLoading: false});
  }

  //timeout waiting API
  appState.timer = setTimeout(()=>{ 
    if (appState.state.loading){

      //update button name alowing user try again
      appState.setState ({buttonName: "Try Again"});

      //stop gif loading information
      appState.setState ({loading: false}); 

      //set stage errorLoading true to be user on render to show message to user
      appState.setState ({errorLoading: true});
    }
  }, 10000);
}
