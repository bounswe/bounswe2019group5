import React, { Component } from 'react';
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Link } from 'react-router-dom'

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { FormControl, InputGroup, Button, Card, CardDeck, Image, ListGroup, ListGroupItem, Dropdown, DropdownButton, ButtonToolbar, Form } from 'react-bootstrap';
import _ from 'lodash';

import {upload_file} from '../../api/upload';
import {suggest_exercise} from '../../api/suggestion';

class SuggestExercise extends Component {

    constructor(props){
        super(props);
        this.state = {
            created: false,
            exercise: {
                questions: [],
                type: "vocabulary",
                language: "english",
                level: "A1",
                tags: [],
                keywords: [],
            },
            keywordsText: '',
            tagsText: '',
            suggesting: false,
            suggested: false,
        }
    }

    componentDidUpdate(){
        if (this.state.created && this.state.exercise.questions.length==0)
            this.setState({exercise: {...this.state.exercise, questions: [{body: '', answer: '', answerIndex: -1, options: ['', '']}]}})
    }

    questionModal(qId) {
        
        return (
            <Card style={{width: '50vw'}}>
                <Card.Body>
                    <InputGroup>
                        <Card.Title inline>{"Question "+(qId+1)}</Card.Title>
                        <Button
                            inline
                            variant="light"
                            style={{width: '10vw', marginLeft: '38vw'}}
                            required
                            onClick={()=>{
                                var exercise = _.cloneDeep( this.state.exercise );
                                exercise.questions = exercise.questions
                                    .filter((question, i) => i!=qId);
                                this.setState({exercise});
                            }}
                        >Delete Question</Button>
                    </InputGroup>
                    { this.state.exercise.type!=='listening' &&
                        <Form.Group>
                            <Form.Label>Question Text:</Form.Label>
                            <Form.Control 
                                style={{width: '40vw'}} 
                                as="textarea" 
                                rows="2"
                                required
                                value={this.state.exercise.questions[qId].body}
                                onChange={e => {
                                    var exercise = _.cloneDeep( this.state.exercise );
                                    exercise.questions[qId].body = e.target.value;
                                    this.setState({exercise});
                                }}
                            />
                        </Form.Group>
                    }
                    { this.state.exercise.type==='listening' &&
                        <Form.Group>
                            <Form.Label>Question Audio:</Form.Label>
                            <Form.Control 
                                style={{width: '40vw'}} 
                                as="input"
                                type="file"
                                accept="audio/*"
                                onChange={e => {
                                    let file = _.cloneDeep(e.target.files[0]);
                                    upload_file(this.props.userInfo.token, e.target.files[0])
                                        .then(data => {
                                            console.log(data);
                                            if (!data.message){
                                                var exercise = _.cloneDeep( this.state.exercise );
                                                exercise.questions[qId].body = data.file;
                                                exercise.questions[qId].file = file;
                                                this.setState({exercise});
                                            }
                                        })
                                }}
                            />
                        </Form.Group>
                    }

                    <Form.Group>
                        <Form.Label>Options:</Form.Label>
                        {this.state.exercise.questions[qId].options
                            .map((option, index) => {
                                return (
                                        <InputGroup
                                            className="mb-3"
                                            style={{width: '40vw'}}>
                                            <InputGroup.Prepend>
                                                <InputGroup.Checkbox
                                                    checked={index == this.state.exercise.questions[qId].answerIndex}
                                                    onClick={() => {
                                                        var exercise = _.cloneDeep( this.state.exercise );
                                                        exercise.questions[qId].answerIndex = index;
                                                        exercise.questions[qId].answer = exercise.questions[qId].options[index];
                                                        this.setState({exercise});
                                                    }}
                                                />
                                            </InputGroup.Prepend>
                                            <FormControl
                                                style={{
                                                    backgroundColor: this.state.exercise.questions[qId].answerIndex==index? '#00CC00': 'white'
                                                    }}
                                                as="textarea"
                                                rows="1"
                                                value={this.state.exercise.questions[qId].options[index]}
                                                onChange={e => {
                                                    var exercise = _.cloneDeep( this.state.exercise );
                                                    exercise.questions[qId].options[index] = e.target.value;
                                                    if (index==exercise.questions[qId].answerIndex)
                                                        exercise.questions[qId].answer = e.target.value;
                                                    this.setState({exercise});
                                                }}
                                            />

                                            <InputGroup.Append>
                                                <Button
                                                    variant="danger"
                                                    onClick={()=>{
                                                        var exercise = _.cloneDeep( this.state.exercise );
                                                        exercise.questions[qId].options = exercise.questions[qId].options
                                                            .filter((option, i) => i!=index);
                                                        if (exercise.questions[qId].answerIndex==index) {
                                                            exercise.questions[qId].answerIndex = -1;
                                                            exercise.questions[qId].answer = '';
                                                        }
                                                        else if (exercise.questions[qId].answerIndex > index) 
                                                            exercise.questions[qId].answerIndex = exercise.questions[qId].answerIndex-1;
                                                        this.setState({exercise});
                                                    }}>delete</Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                );
                            })}
                    </Form.Group>
                    
                    <Button 
                        variant="light"
                        onClick={() => {
                            var exercise = _.cloneDeep( this.state.exercise );
                            exercise.questions[qId].options = exercise.questions[qId].options.concat('');
                            this.setState({exercise});
                        }}
                        >+ Option</Button>

                </Card.Body>
            </Card>
        );
    }
    
    render() {

        if (this.props.userInfo.token == null) {
            return (
              <Redirect
                to={{
                  pathname: "/home"
                }}
              />
            );
          }
      
          if (this.state.suggested) {
            return (
              <Redirect
                to={{
                  pathname: "/home"
                }}
              />
            );
          }

        return (
            <div>

                <ButtonToolbar>

                    {!this.state.created &&
                    <DropdownButton id="dropdown-basic-button" title={"Type: "+this.state.exercise.type} variant="primary">
                        <Dropdown.Item 
                            active={this.state.exercise.type==='vocabulary'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, type: 'vocabulary'}})}}
                        >Vocabulary</Dropdown.Item>

                        <Dropdown.Item 
                            active={this.state.exercise.type==='grammer'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, type: 'grammer'}})}}
                        >Grammer</Dropdown.Item>

                        <Dropdown.Item 
                            active={this.state.exercise.type==='reading'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, type: 'reading'}})}}
                        >Reading</Dropdown.Item>

                        <Dropdown.Item 
                            active={this.state.exercise.type==='listening'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, type: 'listening'}})}}
                        >Listening</Dropdown.Item>
                       
                        <Dropdown.Item 
                            active={this.state.exercise.type==='proficiency'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, type: 'proficiency'}})}}
                        >Proficiency</Dropdown.Item>
                    </DropdownButton>
                    }
                    {this.state.created &&
                    <Button
                        variant="secondary" 
                    >Type: {this.state.exercise.type}</Button>
                    }

                    <DropdownButton id="dropdown-basic-button" title={"Language: "+this.state.exercise.language} variant="info">
                        <Dropdown.Item 
                            active={this.state.exercise.language==='english'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, language: 'english'}})}}
                        >English</Dropdown.Item>

                        <Dropdown.Item 
                            active={this.state.exercise.language==='german'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, language: 'german'}})}}
                        >German</Dropdown.Item>

                        <Dropdown.Item 
                            active={this.state.exercise.language==='turkish'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, language: 'turkish'}})}}
                        >Turkish</Dropdown.Item>

                    </DropdownButton>

                    <DropdownButton id="dropdown-basic-button" title={"Level: "+this.state.exercise.level} variant="primary">
                        <Dropdown.Item 
                            active={this.state.exercise.level==='A1'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, level: 'A1'}})}}
                        >A1</Dropdown.Item>

                        <Dropdown.Item 
                            active={this.state.exercise.level==='A2'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, level: 'A2'}})}}
                        >A2</Dropdown.Item>

                        <Dropdown.Item 
                            active={this.state.exercise.level==='B1'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, level: 'B1'}})}}
                        >B1</Dropdown.Item>

                        <Dropdown.Item 
                            active={this.state.exercise.level==='B2'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, level: 'B2'}})}}
                        >B2</Dropdown.Item>

                        <Dropdown.Item 
                            active={this.state.exercise.level==='C1'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, level: 'C1'}})}}
                        >C1</Dropdown.Item>

                        <Dropdown.Item 
                            active={this.state.exercise.level==='C2'} 
                            onClick={()=>{this.setState({exercise: {...this.state.exercise, level: 'C2'}})}}
                        >C2</Dropdown.Item>

                    </DropdownButton>
                    { !this.state.created &&
                        <Button 
                            style={{'margin-left': 10}}
                            variant="success" 
                            onClick={()=>this.setState({created: true})}
                        >Create Empty Exercise</Button>
                    }
                    { this.state.created &&
                        <Button 
                            style={{'margin-left': 10}}
                            variant="success" 
                            onClick={()=>{
                                this.setState({suggesting: true});
                                suggest_exercise(this.props.userInfo.token, this.state.exercise)
                                    .then(newExercise => {
                                        if (!newExercise.message){
                                            this.setState({suggested: true});
                                        }
                                        else{
                                            this.setState({suggesting: false});
                                        }
                                    });
                            }}
                        >Finish and Suggest This Exercise</Button>
                    }

                </ButtonToolbar>
                
                {this.state.created && 
                    <ListGroup>
                        {
                            this.state.exercise.questions
                                .map((question, qId) => {return this.questionModal(qId)})
                        }

                        <Button 
                            variant="light"
                            style={{width: "10vw", marginLeft: "20vw", marginRight: "70vw"}}
                            onClick={() => {
                                var exercise = _.cloneDeep( this.state.exercise );
                                exercise.questions = exercise.questions.concat({body: '', answer: '', answerIndex: -1, options: ['', '']});
                                this.setState({exercise});
                            }}
                            >+ Question</Button>
                    </ListGroup>
                }

                {this.state.created &&
                    <div style={{marginLeft: '5vw'}}>
                        <Form.Group>
                            <Form.Label>Keywords(write with comma seperator or space):</Form.Label>
                            <Form.Control 
                                style={{width: '40vw'}} 
                                as="textarea" 
                                rows="1"
                                value={this.state.keywordsText}
                                onChange={e => {
                                    let temp = e.target.value
                                        .split('\n').join(',').split('\t').join(',').split(' ').join(',').split(',');
                                    let keywords = temp
                                        .filter(t => t && t.length>0);
                                    let keywordsText = temp
                                        .filter((t, i) => i==temp.length-1 || (t && t.length>0))
                                        .join(', ');
                                    this.setState({keywordsText, exercise: {...this.state.exercise, keywords}});
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Tags(write with comma seperator or space):</Form.Label>
                            <Form.Control 
                                style={{width: '40vw'}} 
                                as="textarea" 
                                rows="1"
                                value={this.state.tagsText}
                                onChange={e => {
                                    let temp = e.target.value
                                        .split('\n').join(',').split('\t').join(',').split(' ').join(',').split(',');
                                    let tags = temp
                                        .filter(t => t && t.length>0);
                                    let tagsText = temp
                                        .filter((t, i) => i==temp.length-1 || (t && t.length>0))
                                        .join(', ');
                                    this.setState({tagsText, exercise: {...this.state.exercise, tags}});
                                }}
                            />
                        </Form.Group>
                    </div>
                }

            </div>
        );
    }
}

const mapStateToProps = ({ userInfo }) => ({
    userInfo,
  });
  
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
        },
        dispatch
    );

    export default (
        connect(
          mapStateToProps,
          mapDispatchToProps
        )(SuggestExercise)
    );