import React,{Component} from  'react';

import { BrowserRouter, Route, Switch} from 'react-router-dom';

import ExercisePage from './ExercisePage/ExercisePage.js';
import HomePage from './HomePage/HomePage';
import ResultPage from './ResultPage/ResultPage.js';



class App extends Component {
  state = {
    message: '',
    list: []
  };


  render() {
    return(
      
      <div className="Main">
      <BrowserRouter>
      
        <Switch>
          

          <Route 
            path="/home" 
            render = {()=>(
              <HomePage></HomePage> 
          )}/>

          <Route 
            path="/exercise" 
            render = {()=>(
              <ExercisePage></ExercisePage> 
          )}/>

          <Route 
            path="/result" 
            render = {()=>(
              <ResultPage></ResultPage> 
          )}/>
  
        



        </Switch>
        
        </BrowserRouter>
          
            
      </div>
      );
  }
}

export default App;
