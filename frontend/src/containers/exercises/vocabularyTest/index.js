import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Question from "../../question";
import { get_vocabulary_test } from "../../../redux/action-creators/exercises";
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

class VocabularyTest extends Component {
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
    this.props.get_vocabulary_test(
      this.props.userInfo.token,
      this.props.userInfo.selectedLanguage
    );
    this.state.isAnswersPrepared = false;
  }

  componentDidUpdate() {
    if (this.props.exercises.vocabularyTest && !this.state.isAnswersPrepared) {
      const answers = new Array(
        this.props.exercises.vocabularyTest.questions.length
      );
      for (let i = 0; i < answers.length; i++)
        answers[i] = this.props.exercises.vocabularyTest.questions[
          i
        ].question_options[0].text;
      console.log("YENI" + answers);
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

    const vocabularyTest = this.props.exercises.vocabularyTest;
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

    if (vocabularyTest) {
      const questionIndex = this.state.questionIndex;
      const question = vocabularyTest.questions[questionIndex];

      console.log(
        "SELAMEDDIN " + questionIndex + " " + this.state.answers[questionIndex]
      );
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
                    this.props.exercises.testResult
                      ? this.props.exercises.testResult.statusOfAnswers[
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
                        questionIndex < vocabularyTest.questions.length - 1
                          ? questionIndex + 1
                          : questionIndex
                    })
                  }
                >
                  NEXT
                </Button>

                {!this.props.exercises.isFinished && (
                  <Button
                    variant="success"
                    fullWidth
                    className={classes.submit}
                    onClick={() =>
                      this.props.get_test_result(
                        this.props.userInfo.token,
                        vocabularyTest,
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
      get_vocabulary_test,
      get_test_result
    },
    dispatch
  );

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(VocabularyTest)
);
