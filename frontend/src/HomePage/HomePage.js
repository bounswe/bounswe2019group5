import React from 'react';
import DataCacher from '../DataCacher.js';
//import './ResultPage.css';
import {withRouter, Link} from 'react-router-dom';
//import Select from 'react-select';


class HomePage extends DataCacher{

  
  constructor(props){
    super(props);
    this.state = {
      list : []
      
    }
  }

  getRequestHomepage = _ => {
    fetch('http://localhost:8080/home')
    .then(response => response.json())
    .then(response => this.setState({list:response}))
    .catch(err => console.error(err))
  }

  componentDidMount(){
    this.getRequestHomepage();
  }
  render() {
    return (
        <div>
          
          <p>{this.state.list.map(item => (
            <div>
              <Link to={{
                pathname:'/exercise',
                id:item.id
              }}>{item.name}</Link>  
            </div>))}
          </p> 
        </div>
    );


  }
}

export default withRouter(HomePage);

