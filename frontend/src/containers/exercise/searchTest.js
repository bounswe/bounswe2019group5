import { makeStyles } from "@material-ui/core/styles";
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

class SearchTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tag: "" , keyword:""};

    this.handleChangeTag = this.handleChangeTag.bind(this);
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);

  }

  handleChangeTag(event) {
    this.setState({ tag: event.target.value });
  }
  handleChangeKeyword(event) {
    this.setState({ keyword: event.target.value });
  }
  componentDidMount() {
    this.props.search_test(
      this.props.userInfo.token,
      "",
      "",
      this.props.language,
      this.props.type
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.language === this.props.language &&
      prevProps.type === this.props.type &&
      prevState.tag === this.state.tag &&
      prevState.keyword === this.state.keyword &&
      prevProps.exercises.searchTest === this.props.exercises.searchTest
    ) {
      return;
    }
    this.props.search_test(
      this.props.userInfo.token,
      this.state.tag,
      this.state.keyword,
      this.props.language,
      this.props.type
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <form>
          <label>
            {" "}
            <Typography component="overline" variant="block" color="primary">
              Search tag:
            </Typography>
            <input
              type="text"
              value={this.state.tag}
              onChange={this.handleChangeTag}
            />
          </label>
        </form>
        <form>
          <label>
            {" "}
            <Typography component="overline" variant="block" color="primary">
              Search keyword:
            </Typography>
            <input
              type="text"
              value={this.state.keyword}
              onChange={this.handleChangeKeyword}
            />
          </label>
        </form>

        <List className={classes.root}>
          {this.props.exercises.searchedTest[this.props.type] &&
            this.props.exercises.searchedTest[this.props.type].map((value, index) => {
              return (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={"EXERCISE ID:  " + value.id}
                      secondary={
                        <React.Fragment>
                          <Link
                            to={"/exercise/" + value.id}
                          >
                            <Button variant="success">Go to test</Button>
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
