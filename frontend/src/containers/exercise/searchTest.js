import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { search_test } from "../../redux/action-creators/exercises";
import styles2 from "./styles2";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { withStyles } from "@material-ui/core/styles";
import { set_selected_language } from "../../redux/action-creators/userInfo";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

class SearchTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: null };
    this.ref = React.createRef()

    this.combineTandK = this.combineTandK.bind(this);
  }

  componentDidMount() {
    this.props.search_test(
      this.props.userInfo.token,
      "",
      this.props.language,
      this.props.type
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prev", prevState.input);
    console.log("now", this.state.input);
    if (prevState.input !== this.state.input) {
      console.log("in update");
      this.props.search_test(
        this.props.userInfo.token,
        this.state.input,
        this.props.language,
        this.props.type
      );
    }
  }
  combineTandK(WT, WK) {
    if ((!WT || WT.message) && (!WK || WK.message)) {
      return [];
    }
    else if ((!WT || WT.message) && WK) {
      return WK;
    }
    else if (WT && (!WK || WK.message)) {
      return WT;
    }
    else {
      const setty = new Set([...WT, ...WK]);
      return Array.from(setty);
    }
  }

  render() {
    const { classes } = this.props;
    const searchedTest = this.combineTandK(this.props.exercises.searchedTest.T[this.props.type], this.props.exercises.searchedTest.K[this.props.type]);
    console.log(this.props.exercises.searchedTest);
    return (
      <>
        <Form inline onSubmit={(e) => {
          e.preventDefault();
          this.setState({ input: this.ref.current.value })
        }} >
          <Form.Control ref={this.ref} type="text" className="mr-sm-2" />
          <Button type="submit" variant="outline-success">Search</Button>
        </Form>

        <List className={classes.root}>
          {searchedTest.length == 0 &&
            <Typography>Great! You've solved all exercises. Try leveling up.</Typography>}
          {searchedTest &&
            searchedTest.map((value, index) => {
              return (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={(index + 1) + " :  " + value.type + " exercise "}
                      secondary={ //add tag and keywords
                        <React.Fragment>
                          <Typography>Tags: {value.tags.map((val, i) => {
                            return (val + ", ")
                          })}</Typography>
                          <Typography>Keywords: {value.keywords.map((val, i) => {
                            return (val + ", ")
                          })}</Typography>
                          <Link
                            to={"/exercise/" + value.id}
                          >
                            <Button variant="success">Go to exercise</Button>
                          </Link>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            })}
        </List>
      </>
    );
  }
}

const mapStateToProps = ({ userInfo, exercises }) => ({
  userInfo,
  exercises
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      set_selected_language,
      search_test
    },
    dispatch
  );

export default withStyles(styles2)(
  connect(mapStateToProps, mapDispatchToProps)(SearchTest)
);
