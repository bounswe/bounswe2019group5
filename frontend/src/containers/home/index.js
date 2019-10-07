import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from "../../redux/action-creators/counter";

const Home = props => (
  <div>
    <p>
      {props.location.state !== null && props.location.state !== undefined
        ? props.location.state.token
        : "NO TOKEN"}
    </p>

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

    <h1>Home</h1>
    <p>Count: {props.count}</p>

    <p>
      <button onClick={props.increment}>Increment</button>
      <button onClick={props.incrementAsync} disabled={props.isIncrementing}>
        Increment Async
      </button>
    </p>

    <p>
      <button onClick={props.decrement}>Decrementing</button>
      <button onClick={props.decrementAsync} disabled={props.isDecrementing}>
        Decrement Async
      </button>
    </p>

    <p>
      <button onClick={() => props.history.push("/about-us")}>
        Go to about page via redux
      </button>
    </p>
  </div>
);

const mapStateToProps = ({ counter, test }) => ({
  count: counter.count,
  isIncrementing: counter.isIncrementing,
  isDecrementing: counter.isDecrementing,
  test
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
