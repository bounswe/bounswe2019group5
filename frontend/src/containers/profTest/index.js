import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { get_prof_test, get_test_result } from "../../redux/action-creators/test";

class ProfTest extends Component {

    state = {
        questionIndex: 0,
        answers: [],
        isAnswersPrepared: false,
    }

    componentDidMount(){
        this.props.get_prof_test(this.props.authentication.token);
        this.state.isAnswersPrepared = false;
        console.log("function called");
    }

    componentDidUpdate(){
        if (this.props.test.profTest && !this.state.isAnswersPrepared){
            const answers = new Array(this.props.test.profTest.nuOfQuestions);
            for(let i=0; i<answers.length; i++)
                answers[i] = this.props.test.profTest.questions[i].options[0].optionName;
            this.setState({
                isAnswersPrepared: true,
                answers,
            });
        }
    }

    render() {
        const profTest = this.props.test.profTest;
        
        if (this.props.test.loading){
            return (
                <div>
                  <h1>LOADING</h1>
                </div>
            );
        }
        if (profTest && !this.props.test.isFinished){
            const question = profTest.questions[this.state.questionIndex];
            const questionIndex = this.state.questionIndex;
            const optionMarks = question.options.map( option =>
                                    <option
                                        key={option.optionName}
                                        value={option.optionName}>
                                        {option.optionText}
                                    </option>
                                );
            return (
                <div>
                    <div><h1>{profTest.testName}</h1></div>
                    <div>
                        <h2>{question.questionName}</h2>
                        <p>{question.questionText}</p>
                    </div>
                    <select
                        value={this.state.answers[questionIndex]}
                        onChange = { event => {
                            const newAnswers = this.state.answers;
                            newAnswers[questionIndex] = event.target.value;
                            this.setState({answers: newAnswers});
                        }}
                    >
                        {optionMarks}
                    </select>
                    <div>
                        <button onClick = { () => this.setState({questionIndex: questionIndex>0 ? questionIndex-1 : questionIndex}) }>PREV</button>
                        <button onClick = { () => this.setState({questionIndex: questionIndex<profTest.nuOfQuestions-1 ? questionIndex+1 : questionIndex}) }>NEXT</button>
                    </div>
                    <div>
                        <button onClick = { () => this.props.get_test_result(this.props.authentication.token, profTest.testId, this.state.answers) }>Complete the Test!</button>
                    </div>
                </div>
            );
        }
        return (<div/>)
    }
}

const mapStateToProps = ({ test, authentication }) => ({
    test,
    authentication,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      get_prof_test,
      get_test_result,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfTest);
