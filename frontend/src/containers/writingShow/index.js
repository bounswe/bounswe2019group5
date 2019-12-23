import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Question from "../question";
import {
  get_prof_test,
  get_test_result,
  clear_prof_test,
} from "../../redux/action-creators/test";
import _ from "lodash";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { get_essay } from "../../api/writing/getEssay";
import { delete_essay } from "../../api/writing/deleteEssay";
import { respond_to_essay, change_reviewer_of_essay } from "../../api/writing/updateEssay";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import ImageEssay from './imageEssay';
import TextEssay from './textEssay';
import Popup from 'reactjs-popup';
import Chat from '../chat';

import {Modal, Button} from "react-bootstrap";

import Recommendation from '../recommendation';

class WritingShow extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
        message: "LOADING...",
        essay: null,
        isDeleted: false,
        annotation: null,
        isRejected: false,
    };

    this.id = this.props.match.params.id;
  }

  componentDidMount() {
    get_essay(this.props.userInfo.token, this.id)
        .then(essay => {
            if (essay.message)
                this.setState({message: essay.message});
            else
                this.setState({essay, message: null});
        });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
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

    if (this.state.isDeleted) {
      return (
        <Redirect
          to={{
            pathname: "/writing-list"
          }}
        />
      );
    }

    if (this.state.isRejected) {
      return (
        <Redirect
          to={{
            pathname: "/writing-list"
          }}
        />
      );
    }

    const { classes } = this.props;

    if (this.state.message) {
        return (
            <div>
                <h1>{this.state.message}</h1>
            </div>
          );
    }

    console.log("Essay");

    console.log(this.state.essay);

    return (
      <Grid container component="main" className={classes.root}>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <h4>
            Author:
            <Link to={{
                pathname: "/profile/" + this.state.essay.author
              }}>{this.state.essay.author}</Link>
          </h4>

          {this.state.essay.reviewer && 
            <h4>
            Reviewer:
            <Link to={{
                pathname: "/profile/" + this.state.essay.reviewer
              }}>{this.state.essay.reviewer}</Link>
            </h4>
          ||
            <h4>
              There is no reviewer yet!
            </h4>
          }

          {
            <h4>
              Status: {this.state.essay.status}
            </h4>
          }

          { this.state.essay.reviewer && this.props.userInfo.username === this.state.essay.reviewer && this.state.essay.status === 'pending' &&
            <div>
              <Button 
                variant="success"
                onClick={()=>{
                  respond_to_essay(this.props.userInfo.token, 'accepted', this.state.essay.id)
                    .then(essay => {
                      if(!essay.message)
                        this.setState({essay});
                    })}}
              >
                Accept Essay
              </Button>
              <Button
                variant="danger"
                onClick={()=>{
                  respond_to_essay(this.props.userInfo.token, 'rejected', this.state.essay.id)
                    .then(essay => {
                      if(!essay.message)
                        this.setState({isRejected: true});
                    })
                }}
              >
                Reject Essay
              </Button>
            </div>
          }

          { this.state.essay.reviewer && this.props.userInfo.username === this.state.essay.reviewer && this.state.essay.status === 'accepted' &&
            <div>
              <Button 
                variant="warning"
                onClick={()=>{
                  respond_to_essay(this.props.userInfo.token, 'completed', this.state.essay.id)
                    .then(essay => {
                      if(!essay.message)
                        this.setState({essay});
                    })}}
              >
                Essay is Completed!
              </Button>
            </div>
          }

          {this.state.annotation &&
            <div>
              <div>
                <Link to={{
                  pathname: "/profile/" + this.state.annotation.username
                }}>{this.state.annotation.username}</Link>
              </div>
              { this.state.annotation.text && this.state.annotation.text.length>0 &&
                <div>
                  <mark style={{backgroundColor: this.state.annotation.highlightColor}}>{this.state.annotation.text}</mark>
                </div>
              }
              <div>
                <label>{this.state.annotation.annotationText}</label>
              </div>
            </div>
            ||
            <div>
              <div><Link style={{color:'white'}}>.</Link></div>
              <div><mark style={{color:'white', backgroundColor: 'white'}}>.</mark></div>
              <div><label style={{color:'white'}}>.</label></div>
            </div>
          }

          {this.state.essay.reviewer &&
            <Chat 
              chatWith={this.props.userInfo.username === this.state.essay.reviewer ?
                              this.state.essay.author : this.state.essay.reviewer}
              notShowTitle
              notShowHistory/>
          }

          { this.state.essay.author === this.props.userInfo.username &&
            <div className={classes.paper}>
              <Button
                variant="danger"
                onClick={()=>{
                  delete_essay(this.props.userInfo.token, this.state.essay.id);
                  this.setState({isDeleted: true});
                }}>DELETE ESSAY</Button>
            </div>
          }
        </Grid>

        {!this.state.essay.writing.endsWith('.txt') &&
            <ImageEssay
                essay = {this.state.essay}
                setAnnotation = {(annotation) => {this.setState({annotation})}}
            />
        }
        {this.state.essay.writing.endsWith('.txt') &&
            <TextEssay
                essay = {this.state.essay}
                setAnnotation = {(annotation) => {this.setState({annotation})}}
            />
        }
      </Grid>
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WritingShow)
);
