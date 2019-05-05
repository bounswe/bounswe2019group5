import React,{Component} from  'react';

import { BrowserRouter, Route, Switch} from 'react-router-dom';

import ExercisePage from './ExercisePage/ExercisePage.js';
import HomePage from './HomePage/HomePage';
import ResultPage from './ResultPage/ResultPage.js';



class App extends Component {
  state = {
    message: '',
    list: []
  }
  
  getMyApi = _ => {
    fetch('http://localhost:8080')
    .then(response => response.json())
    .then(response => this.setState({message:response}))
    .catch(err => console.error(err))
  }
  

  postMyApi = _ => {
    fetch('http://localhost:8080/deneme',{
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({dd: 'dsasaasd'})
    })
    .then(response => response.json())
    .then(response => this.setState({message:response}))
    .then(response => console.log(this.state.message))
    .catch(err => console.error(err))
  }


  render(){
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
