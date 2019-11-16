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
import { upload_writing } from "../../api/writing/uploadWriting";
import styles from "../writingShow/styles";
import { withStyles } from "@material-ui/core/styles";

class WritingShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.id = this.props.match.params.id;
    this.language = this.props.match.params.language;
    this.reviewer = this.props.match.params.reviewer;
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

    const { classes } = this.props;

    return (
        <div>
            <h1>Upload Your Writing Here!</h1>
            <form onSubmit={this.onSubmit.bind(this)}>
                <input 
                  type="file" 
                  id="file"
                  accept="image/*"
                  onChange={this.onChange.bind(this)} />
                <button type="submit">Upload Essay</button>
            </form>
            { 
            this.props.match.params.reviewer &&
                <text>
                    Reviewer is: {this.props.match.params.reviewer}
                </text>
            }
            {
            !this.props.match.params.reviewer &&
              <textarea 
                id="reviewer"
                value={this.state.reviewer}
                onChange={this.onChange.bind(this)}
              />
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WritingShow)
);
