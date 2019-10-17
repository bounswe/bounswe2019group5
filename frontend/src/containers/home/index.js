import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from 'react-router';

const Home = props => {
  if ( props.authentication.token!=null ) {
      return (
        <div>
          <h1>{props.authentication.token}</h1>
          <p>
            {props.test !== null
              ? props.test.testResult !== null
                ? "Number Of True Answers: " + props.test.testResult.nuOfTrueAnswers
                : ""
              : "isFinished not working"}
          </p>

          <p>
            {props.test !== null
              ? props.test.testResult !== null
                ? "Number Of False Answers: " + props.test.testResult.nuOfFalseAnswers
                : ""
              : "isFinished not working"}
          </p>

          <p>
            {props.test !== null
              ? props.test.testResult !== null
                ? "Your Level: " +
                  ((props.test.testResult.nuOfTrueAnswers * 100) /
                    props.test.testResult.nuOfQuestions ===
                  20
                    ? "Beginner"
                    : (props.test.testResult.nuOfTrueAnswers * 100) /
                        props.test.testResult.nuOfQuestions ===
                      40
                    ? "Intermediate"
                    : (props.test.testResult.nuOfTrueAnswers * 100) /
                        props.test.testResult.nuOfQuestions ===
                      60
                    ? "Upper-Intermediate"
                    : (props.test.testResult.nuOfTrueAnswers * 100) /
                        props.test.testResult.nuOfQuestions ===
                      80
                    ? "Advanced"
                    : "Upper-Advanced")
                : ""
              : "props.test is not working"}
          </p>
        </div>
      );
  }
  else {
    return (
      <Redirect
          to={{
            pathname: "/login",
          }}
        />
      );
    }
};

const mapStateToProps = ({ counter, test, authentication }) => ({
  test,
  authentication
});

export default connect(
  mapStateToProps,
)(Home);
