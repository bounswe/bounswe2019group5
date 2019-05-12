import React from 'react';
import DataCacher from '../DataCacher.js';
import {withRouter} from 'react-router-dom';


class ResultPage extends DataCacher{

  
  constructor(props){
    super(props);
    this.state = {
      result : {
          true:'',
          false:'',
          fback:[]
        }
    }
  }
  sendResponses(){
    fetch('http://localhost:8080/result',{
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({responses:this.props.location.response})
    })
    .then(response => response.json())
    .then(response => this.setState({result:response}))
    .catch(err => console.error(err))
  };

  componentDidMount(){
    this.sendResponses();
  }
  render() {
    return (
        <div>
          <p>{this.state.result.true} Correct Answer</p>
          <p>{this.state.result.false} Wrong Answer</p>
          <br />
          <p>INFORMATIVE FEEDBACK</p>
          <p>First Answer   is {this.state.result.fback[0]}</p>
          <p>Second Answer  is {this.state.result.fback[1]}</p>
          <p>Third Answer   is {this.state.result.fback[2]}</p>
          <p>Fourth Answer  is {this.state.result.fback[3]}</p>
        </div>
    );


  }
}

export default withRouter(ResultPage);

