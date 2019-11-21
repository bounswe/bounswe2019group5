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
import Link from "@material-ui/core/Link";
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
    };

    this.id = this.props.match.params.id;
  }

  componentDidMount() {
    get_essay(this.props.userInfo.token, this.id)
        .then(essay => {
            console.log(essay);
            if (essay.message)
                this.setState({message: essay.message});
            else
                this.setState({essay, message: null});
        });
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
    
    console.log(this.state.message);
    console.log(this.state.essay);

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
            />
        }
        {this.state.essay.writing.endsWith('.txt') &&
            <TextEssay
                essay = {this.state.essay}
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
