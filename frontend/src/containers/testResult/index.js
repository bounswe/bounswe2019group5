import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "./testResult.css";

const TestResult = props => {
  if (props.authentication.token != null) {
    return (
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
      </div>
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

export default connect(mapStateToProps)(TestResult);
