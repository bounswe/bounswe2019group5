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
    isHomeRedirected: false
  };

  componentDidMount() {
    this.props.clear_prof_test();
    if (this.props.userInfo.selectedLanguage)
      this.props.get_prof_test(
        this.props.userInfo.token,
        this.props.userInfo.selectedLanguage
      );
    this.state.isAnswersPrepared = false;
  }

  componentDidUpdate() {
    if (this.props.test.profTest && !this.state.isAnswersPrepared) {
      const answers = new Array(this.props.test.profTest.questions.length);
      for (let i = 0; i < answers.length; i++)
        answers[i] = this.props.test.profTest.questions[
          i
        ].question_options[0].text;
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

    if (this.props.userInfo.selectedLanguage == null) {
      return (
        <Redirect
          to={{
            pathname: "/lang-select"
          }}
        />
      );
    }

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
      const questionIndex = this.state.questionIndex;
      const question = profTest.questions[questionIndex];

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
                <Typography component="h1" variant="h5">
                  {question.text}
                </Typography>

                <Question
                  questionOptions={question.question_options}
                  selectedOption={this.state.answers[questionIndex]}
                  questionAnswerStatus={
                    this.props.test.testResult
                      ? this.props.test.testResult.statusOfAnswers[
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

                <Button
                  type="submit"
                  fullWidth
                  variant="info"
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
                  variant="info"
                  className={classes.submit}
                  onClick={() =>
                    this.setState({
                      questionIndex:
                        questionIndex < profTest.questions.length - 1
                          ? questionIndex + 1
                          : questionIndex
                    })
                  }
                >
                  NEXT
                </Button>
                
                {!this.props.test.isFinished &&
                  <Button
                    variant="success"
                    fullWidth
                    className={classes.submit}
                    onClick={() =>
                      this.props.get_test_result(
                        this.props.userInfo.token,
                        profTest,
                        this.state.answers
                      )
                    }
                  >
                    Complete the Test!
                  </Button>
                }

                {this.props.test.isFinished &&
                  <Button
                    variant="warning"
                    fullWidth
                    className={classes.submit}
                    onClick={this.handleHomeRedirection}
                  >
                    Congratulations, let's go to see the test results!
                  </Button>
                }
              </div>
            </div>
          </Grid>
        </Container>
      );
    }
    return <div />;
  }
}

const mapStateToProps = ({ test, userInfo }) => ({
  test,
  userInfo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_prof_test,
      get_test_result,
      clear_prof_test,
    },
    dispatch
  );

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfTest)
);
