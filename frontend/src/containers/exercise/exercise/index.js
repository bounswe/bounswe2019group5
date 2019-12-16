import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Question from "../../question";
import { get_exercise } from "../../../redux/action-creators/exercises";
import { get_test_result } from "../../../redux/action-creators/test";
import _ from "lodash";
import { Button } from "react-bootstrap";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import AudioPlayer from "react-h5-audio-player";

class Exercise extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    questionIndex: 0,
    answers: [],
    isAnswersPrepared: false,
    isHomeRedirected: false
  };

  componentDidMount() {
    this.props.get_exercise(
      this.props.userInfo.token,
      this.props.match.params.id
    );
    this.state.isAnswersPrepared = false;
  }

  componentDidUpdate() {
    if (this.props.exercises.exercise && !this.state.isAnswersPrepared) {
      const answers = new Array(
        this.props.exercises.exercise.questions.length
      );
      for (let i = 0; i < answers.length; i++)
        answers[i] = this.props.exercises.exercise.questions[i].options[0];
      this.setState({
        isAnswersPrepared: true,
        answers
      });
    }
  }

  handleHomeRedirection = e => {
    this.setState({
      isHomeRedirected: true
    });
  };

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

    const exercise = this.props.exercises.exercise;
    const { classes } = this.props;

    if (this.props.exercises.loading) {
      return (
        <div>
          <h1>LOADING</h1>
        </div>
      );
    }

    if (this.state.isHomeRedirected) {
      return (
        <Redirect
          to={{
            pathname: "/test-result",
            state: {
              token: this.props.token,
              test: this.props.exercises
            }
          }}
        />
      );
    }

    if (exercise) {

      const questionIndex = this.state.questionIndex;
      const question = exercise.questions[questionIndex];

      return (
        <Container
          component="main"
          maxWidth="sm"
          justify="center"
          alignItems="center"
        >

          <CssBaseline />
          <Grid item component={Paper} square>
            <div className={classes.paper}>
              <div className="d-flex flex-column">
                {!question.body.includes('http://') &&
                  <Typography component="h1" variant="h5">
                    {question.body}
                  </Typography>
                }
                {question.body.includes('http://') &&
                  <AudioPlayer
                    src={question.body}
                    onPlay={e => console.log("onPlay")}
                    crossOrigin="anonymous"
                    // other props here
                  />
                }
                
                <Question
                  questionOptions={question.options}
                  selectedOption={this.state.answers[questionIndex]}
                  questionAnswerStatus={
                    this.props.exercises.testResult
                      ? this.props.exercises.testResult.result.statusOfAnswers[
                          questionIndex
                        ]
                      : null
                  }
                  onChange={newAnswer => {
                    const newAnswers = _.cloneDeep(this.state.answers);
                    newAnswers[questionIndex] = newAnswer;
                    this.setState({ answers: newAnswers });
                  }}
                />

                {questionIndex > 0 &&
                  <Button
                    type="submit"
                    fullWidth
                    variant="info"
                    className={classes.submit}
                    onClick={() =>
                      this.setState({
                        questionIndex: questionIndex - 1,
                      })
                    }
                  >
                    PREV
                  </Button>
                }

                {questionIndex < exercise.questions.length - 1 && 
                  <Button
                    type="submit"
                    fullWidth
                    variant="info"
                    className={classes.submit}
                    onClick={() =>
                      this.setState({
                        questionIndex: questionIndex + 1,
                      })
                    }
                  >
                    NEXT
                  </Button>
                }

                {!this.props.exercises.isFinished && (
                  <Button
                    variant="success"
                    fullWidth
                    className={classes.submit}
                    onClick={() =>
                      this.props.get_test_result(
                        this.props.userInfo.token,
                        exercise.id,
                        this.state.answers
                      )
                    }
                  >
                    Complete the Test!
                  </Button>
                )}

                {this.props.exercises.isFinished && (
                  <Button
                    variant="warning"
                    fullWidth
                    className={classes.submit}
                    onClick={this.handleHomeRedirection}
                  >
                    Congratulations, let's go to see the test results!
                  </Button>
                )}
              </div>
            </div>
          </Grid>
        </Container>
      );
    }
    return <div />;
  }
}

const mapStateToProps = ({ userInfo, exercises }) => ({
  userInfo,
  exercises
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_exercise,
      get_test_result,
    },
    dispatch
  );

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Exercise)
);
