export default (appState, planetAPIURL) =>{

  //fetch to total planet of the API and do cache of first list
  fetch(planetAPIURL)
    .then((r)=> r.json())
    .then((json)=>{

      //save total planets on API
      let state = appState.state;
      state.totalPlanets = json.count;
      appState.setState(state);
      
      //for each planet on the first list got on the API message
      json.results.map((planetJson)=>{

        //filter each planetJson of message on the stage planets cache 
        //  and return planetJson if ir not exists on cache
        let state = appState.state;
        let filterResult = state.planetsCache.filter((planetFiltred)=>{
          if (planetFiltred !== undefined)
            return(planetJson.url === planetFiltred.url);
          return null;
        });

        //add planetJson to cache
        if(filterResult.length === 0){
          state.planetsCache = [...state.planetsCache,planetJson];
        }
        appState.setState(state);
        return null;
      })

      //save next url to use on next access to save more 10 cache planets
      appState.setState ({nextUrl: json.next});
    })
}
