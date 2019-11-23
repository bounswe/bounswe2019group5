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
import { Button } from "react-bootstrap";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { get_essay } from "../../api/writing/getEssay";
import { delete_essay } from "../../api/writing/deleteEssay";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import ImageEssay from './imageEssay';
import TextEssay from './textEssay';

class WritingShow extends Component {
  
    constructor(props) {
    super(props);
    this.state = {
        message: "LOADING...",
        essay: null,
        isDeleted: false,
        annotation: null,
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
            pathname: "/home"
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

    return (
      <Grid container component="main" className={classes.root}>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
          }
          <div className={classes.paper}>
            <button onClick={()=>{
              delete_essay(this.props.userInfo.token, this.state.essay.id);
              this.setState({isDeleted: true});
            }}>DELETE ESSAY</button>
          </div>
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
