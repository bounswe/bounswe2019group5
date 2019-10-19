import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Avatar from "@material-ui/core/Avatar";
//import Button from "@material-ui/core/Button";
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
import { green, purple } from "@material-ui/core/colors";

const TestResult = props => {
  const { classes } = props;
  if (props.authentication.token != null) {
    return (
      <Container
        component="main"
        maxWidth="xs"
        justify="center"
        alignItems="center"
      >
        <CssBaseline />
        <Grid item component={Paper} square>
          <div className={classes.paper}>
            <div className="d-flex flex-column">
              <Typography component="h1" variant="h3" align="center">
                Congratulations!
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                variant="info"
                className={classes.submit}
                onClick={() => {}}
              >
                {props.test !== null
                  ? props.test.testResult !== null
                    ? "Number Of True Answers: " +
                      props.test.testResult.nuOfTrueAnswers
                    : ""
                  : "isFinished not working"}
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                variant="info"
                className={classes.submit}
                onClick={() => {}}
              >
                {props.test !== null
                  ? props.test.testResult !== null
                    ? "Number Of False Answers: " +
                      props.test.testResult.nuOfFalseAnswers
                    : ""
                  : "isFinished not working"}
              </Button>

              <Button
                size="lg"
                type="submit"
                fullWidth
                variant="contained"
                variant="warning"
                className={classes.submit}
                onClick={() => {}}
              >
                {props.test !== null
                  ? props.test.testResult !== null
                    ? "Your Level: " +
                      ((props.test.testResult.nuOfTrueAnswers * 100) / 5 === 20
                        ? "A2"
                        : (props.test.testResult.nuOfTrueAnswers * 100) / 5 ===
                          40
                        ? "B1"
                        : (props.test.testResult.nuOfTrueAnswers * 100) / 5 ===
                          60
                        ? "B2"
                        : (props.test.testResult.nuOfTrueAnswers * 100) / 5 ===
                          80
                        ? "C1"
                        : "C2")
                    : ""
                  : "props.test is not working"}
              </Button>

              <Button
                variant="contained"
                fullWidth
                variant="secondary"
                onClick={() => props.history.push("/home")}
              >
                Return To Home Page!
              </Button>
            </div>
          </div>
        </Grid>
      </Container>

      /*
      <div className="card">
        <p className="container">
          {props.test !== null
            ? props.test.testResult !== null
              ? "Number Of True Answers: " +
                props.test.testResult.nuOfTrueAnswers
              : ""
            : "isFinished not working"}
        </p>

        <p className="container">
          {props.test !== null
            ? props.test.testResult !== null
              ? "Number Of False Answers: " +
                props.test.testResult.nuOfFalseAnswers
              : ""
            : "isFinished not working"}
        </p>

        <p className="container">
          {props.test !== null
            ? props.test.testResult !== null
              ? "Your Level: " +
                ((props.test.testResult.nuOfTrueAnswers * 100) /
                  props.test.testResult.nuOfQuestions ===
                20
                  ? "A2"
                  : (props.test.testResult.nuOfTrueAnswers * 100) /
                      props.test.testResult.nuOfQuestions ===
                    40
                  ? "B1"
                  : (props.test.testResult.nuOfTrueAnswers * 100) /
                      props.test.testResult.nuOfQuestions ===
                    60
                  ? "B2"
                  : (props.test.testResult.nuOfTrueAnswers * 100) /
                      props.test.testResult.nuOfQuestions ===
                    80
                  ? "C1"
                  : "C2")
              : ""
            : "props.test is not working"}
        </p>
        <button className="button" onClick={() => props.history.push("/home")}>
          Return To Home Page!
        </button>
      </div>*/
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );
  }
};

const mapStateToProps = ({ test, authentication }) => ({
  test,
  authentication
});

export default withStyles(styles)(connect(mapStateToProps)(TestResult));
