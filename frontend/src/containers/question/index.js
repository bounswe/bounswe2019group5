import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export class Question extends Component {
  constructor(props) {
    super(props);
  }
  findColorOfText = option => {
    if (
      option.optionName != this.props.selectedOption ||
      this.props.questionAnswerStatus == undefined
    )
      return { color: "black" };
    else if (this.props.questionAnswerStatus) return { color: "green" };
    else return { color: "red" };
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          {this.props.questionOptions.map(option => (
            <div key={option.optionName}>
              <FormLabel
                component="legend"
                style={this.findColorOfText(option)}
              >
                <RadioGroup
                  name={option.optionName}
                  value={option.optionName}
                  checked={this.props.selectedOption == option.optionName}
                  onChange={() => {
                    if (this.props.questionAnswerStatus == undefined)
                      this.props.onChange(option.optionName);
                  }}
                >
                  <FormControlLabel
                    value={option.optionName}
                    control={<Radio />}
                    label={option.optionText}
                  />
                </RadioGroup>
              </FormLabel>
            </div>
          ))}
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(Question);
