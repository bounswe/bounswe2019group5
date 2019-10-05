import React, { Component } from 'react'

export class Question extends Component {

    findColorOfText = (option) => {
        if (option.optionName!=this.props.selectedOption || this.props.questionAnswerStatus==undefined)
            return {color: 'black'};
        else if(this.props.questionAnswerStatus)
            return {color: 'green'};
        else
            return {color: 'red'};
    }

    render() {
        return (
            <div>
                <form>
                    {
                        this.props.options.map( option => (
                            <div key={option.optionName}>
                                <label style={ this.findColorOfText(option)  }>
                                    <input
                                        onChange={() => {
                                            if (this.props.questionAnswerStatus==undefined)
                                                this.props.onChange(option.optionName);
                                        }}
                                        type="radio"
                                        value={option.optionName}
                                        name={option.optionName}
                                        checked={this.props.selectedOption == option.optionName}/>
                                    {option.optionText}
                                </label>
                            </div>
                        ))
                    }
                </form>
            </div>
        );
    }
}

export default Question;
