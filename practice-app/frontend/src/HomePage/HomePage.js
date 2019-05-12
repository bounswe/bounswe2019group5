import React from 'react';
import DataCacher from '../DataCacher.js';
//import './ResultPage.css';
import {withRouter, Link} from 'react-router-dom';
//import Select from 'react-select';


class HomePage extends DataCacher{

  
  constructor(props){
    super(props);
    this.state = {
      list : [],
      lang : 'en',
      
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

          <select value={this.state.lang} onChange={e => this.setState({lang: e.target.value})}>
            <option value="en">en</option>
            <option value="tr">tr</option>
            <option value="de">de</option>
            <option value="spa">spa</option>
          </select>
          
          <p>{this.state.list.map(item => (
            <div>
              <Link to={{
                pathname:'/exercise',
                id:item.id,
                lang:this.state.lang
              }}>{item.name}</Link>  
            </div>))}
          </p> 
        </div>
    );


  }
}

export default withRouter(HomePage);

