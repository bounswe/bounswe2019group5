import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const TestResults = props => (
  <div>
    <p>
      {props.authentication.token != null
        ? props.authentication.token
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
  </div>
);

const mapStateToProps = ({ counter, test, authentication }) => ({
  test,
  authentication
});

export default connect(
  mapStateToProps,
)(TestResults);