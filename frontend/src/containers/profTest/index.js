import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Question from "../question";
import {
  get_prof_test,
  get_test_result
} from "../../redux/action-creators/test";
import _ from "lodash";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { login } from "../../redux/action-creators/authentication";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";

class ProfTest extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    questionIndex: 0,
    answers: [],
    isAnswersPrepared: false,
    isCompleted: false,
    isHomeRedirected: false
  };

  componentDidMount() {
    this.props.get_prof_test(this.props.authentication.token);
    this.state.isAnswersPrepared = false;
  }

  componentDidUpdate() {
    if (this.props.test.profTest && !this.state.isAnswersPrepared) {
      const answers = new Array(this.props.test.profTest.nuOfQuestions);
      for (let i = 0; i < answers.length; i++)
        answers[i] = this.props.test.profTest.testQuestions[
          i
        ].questionOptions[0].optionName;
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
    const profTest = this.props.test.profTest;
    const { classes } = this.props;

    if (this.props.test.loading) {
      return (
        <div>
          <h1>LOADING</h1>
        </div>
      );
    }

    if (this.state.isHomeRedirected) {
      //console.log(this.props);
      //console.log(this.state);
      return (
        <Redirect
          to={{
            pathname: "/test-result",
            state: {
              token: this.props.token,
              test: this.props.test
            }
          }}
        />
      );
    }

    if (profTest) {
      const question = profTest.testQuestions[this.state.questionIndex];
      const questionIndex = this.state.questionIndex;
      return (
        <Container
          component="main"
          maxWidth="md"
          justify="center"
          alignItems="center"
        >
          <CssBaseline />
          <Grid item component={Paper} square>
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                {question.questionText}
              </Typography>

              <Question
                questionOptions={question.questionOptions}
                selectedOption={this.state.answers[this.state.questionIndex]}
                questionAnswerStatus={
                  this.props.test.testResult
                    ? this.props.test.testResult.statusOfAnswers[
                        this.state.questionIndex
                      ]
                    : null
                }
                onChange={newAnswer => {
                  const newAnswers = _.cloneDeep(this.state.answers);
                  newAnswers[this.state.questionIndex] = newAnswer;
                  this.setState({ answers: newAnswers });
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() =>
                  this.setState({
                    questionIndex:
                      questionIndex > 0 ? questionIndex - 1 : questionIndex
                  })
                }
              >
                PREV
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  this.props.get_test_result(
                    this.props.authentication.token,
                    profTest.testId,
                    this.state.answers
                  );
                  this.setState({
                    isCompleted: true
                  });
                }}
              >
                NEXT
              </Button>

              <Grid container>
                <Button
                  variant="contained"
                  fullWidth
                  color="info"
                  onClick={() =>
                    this.props.get_test_result(
                      this.props.authentication.token,
                      profTest.testId,
                      this.state.answers
                    )
                  }
                >
                  Complete the Test!
                </Button>
              </Grid>

              {this.props.test.isCompleted && (
                <Grid container>
                  <Button
                    variant="contained"
                    fullWidth
                    color="info"
                    onClick={this.handleHomeRedirection}
                  >
                    Congratulations, let's go to see the test results!
                  </Button>
                </Grid>
              )}
            </div>
          </Grid>
        </Container>
      );

      /*
      const question = profTest.testQuestions[this.state.questionIndex];
      const questionIndex = this.state.questionIndex;
      return (
        <div className="TestBox">
          <div>
            <h1>{profTest.testName}</h1>
          </div>
          <div className="QuestionBox">
            <h2>{question.questionName}</h2>
            <p className="QuestionBox_content">{question.questionText}</p>
          </div>

          <Question
            questionOptions={question.questionOptions}
            selectedOption={this.state.answers[this.state.questionIndex]}
            questionAnswerStatus={
              this.props.test.testResult
                ? this.props.test.testResult.statusOfAnswers[
                    this.state.questionIndex
                  ]
                : null
            }
            onChange={newAnswer => {
              const newAnswers = _.cloneDeep(this.state.answers);
              newAnswers[this.state.questionIndex] = newAnswer;
              this.setState({ answers: newAnswers });
            }}
          />
          <div>
            <button
              className="Button"
              onClick={() =>
                this.setState({
                  questionIndex:
                    questionIndex > 0 ? questionIndex - 1 : questionIndex
                })
              }
            >
              PREV
            </button>
            <button
              className="Button"
              onClick={() =>
                this.setState({
                  questionIndex:
                    questionIndex < profTest.nuOfQuestions - 1
                      ? questionIndex + 1
                      : questionIndex
                })
              }
            >
              NEXT
            </button>
          </div>
          <div>
            <button
              className="Button_complete"
              onClick={() =>
                this.props.get_test_result(
                  this.props.authentication.token,
                  profTest.testId,
                  this.state.answers
                )
              }
            >
              Complete the Test!
            </button>
          </div>
          {this.props.test.isFinished && (
            <div>
              <button
                className="Button_complete"
                onClick={this.handleHomeRedirection}
              >
                Congratulations, let's go to see the test results!
              </button>
            </div>
          )}
        </div>
        
      );
      */
    }
    return <div />;
  }
}

const mapStateToProps = ({ test, authentication }) => ({
  test,
  authentication
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_prof_test,
      get_test_result
    },
    dispatch
  );

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfTest)
);
