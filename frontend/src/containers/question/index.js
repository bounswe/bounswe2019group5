import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";

export class Question extends Component {
  constructor(props) {
    super(props);
  }

  // this function is for specify the color of the option, black(not decided or not related options), green for selected true answer, red for selected wrong answers.
  findColorOfText = option => {
    if (
      option != this.props.selectedOption ||
      this.props.questionAnswerStatus == undefined
    )
      return { color: "black" };
    else if (this.props.questionAnswerStatus) return { color: "green" };
    else return { color: "red" };
  };

  // this function is for specify the color of the radio buttons
  findColorOfRadioButton = option => {
    if (
      option != this.props.selectedOption ||
      this.props.questionAnswerStatus == undefined
    )
      return { color: "orange" };
    else if (this.props.questionAnswerStatus) return { color: "green" };
    else return { color: "red" };
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup>
            {this.props.questionOptions.map(option => (
              <FormControlLabel
                control={<Radio style={this.findColorOfRadioButton(option)} />}
                label={option}
                checked={this.props.selectedOption === option}
                onChange={() => {
                  if (this.props.questionAnswerStatus == undefined)
                    this.props.onChange(option);
                }}
                style={this.findColorOfText(option)}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(Question);
