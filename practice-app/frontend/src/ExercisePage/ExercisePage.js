import React from 'react';
import DataCacher from '../DataCacher.js';
//import './ResultPage.css';
import {withRouter,Link} from 'react-router-dom';
//import ReactRegionSelect from 'react-region-select';



class ExercisePage extends DataCacher{

  constructor(props){
    super(props);
    this.state = {
      exercise:{
        questions:[],
        exerciseId:''
      },
      answers:[]
    }
    this.recordAnswers = this.recordAnswers.bind(this);
  }

  postContentId(){
    fetch('http://localhost:8080/exercise',{
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:this.props.location.id})
    })
    .then(response => response.json())
    .then(response => this.setState({exercise:response}))
    .catch(err => console.error(err))
  };

  componentDidMount(){
    this.postContentId();
  }

  recordAnswers(event){
    var answer = event.target.value;
    var questionId = event.target.getAttribute('questionIndex');
    let answers = this.state.answers;
    answers[questionId] = answer;
    this.setState({answers});
  }

  sendResponses(){

  }

  render() {
    return (
        <div>
         {this.state.exercise.questions.map((item,index) => (
           <div>
            <img alt='null' width='300px' src={item.imageUrl}/>
            <br/>
            <select 
              size='4'  
              multiple 
              onChange={this.recordAnswers} 
              questionIndex={index}>

              <option value={item.A}>{item.A}</option>
              <option value={item.B}>{item.B} </option>
              <option value={item.C}>{item.C}</option>
              <option value={item.D}>{item.D} </option>
       
            </select>
            
            </div>
         ))}
         
        
        <Link to={{
          pathname:'/result',
          response:{
            answers:this.state.answers,
            exerciseId:this.state.exercise.exerciseId
          }
        }}>Submit Exercise</Link>
        </div>
    );


  }
}

export default withRouter(ExercisePage);