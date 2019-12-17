import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import ExerciseTypes from "./exerciseTypes";
import { set_selected_language, set_user_profile } from "../../redux/action-creators/userInfo";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";


class Exercises extends Component {
  state = { key: "" };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.set_user_profile(this.props.userInfo.token);
  }

  render() {
    const { classes } = this.props;

    var langs = [];
    var json;
    for (json of this.props.userInfo.userProfile.attended_languages) {
      langs.push(json.language);
    }

    if (this.props.userInfo.token == null) {
      return (
        <Redirect
          to={{
            pathname: "/home"
          }}
        />
      );
    } else {
      return (
        <>
          <Grid>
            <Typography component="h4" variant="h4" align="center">
              Select the language you want to complete exercise of.
            </Typography>
          </Grid>
          <Grid>
            <Typography component="h3" variant="button" align="center">
              .{" "}
            </Typography>
          </Grid>
          <Grid container spacing={3} component="main" className={classes.paper}>
            <CssBaseline />

            <Tabs
              bg="secondary"
              text="white"
              id="controlled-tab-example"
              activeKey={this.state.key}
              onSelect={k => this.setState({ key: k })}
            >
              <Tab eventKey="ENGLISH" title="ENGLISH">
                {!langs.includes("english") ? (
                  <>
                    <Typography component="h5" variant="h5" align="center">
                      You should solve the prof test of this language first.
                    </Typography>
                    <Link to="/prof-test/english">
                      <Button 
                        onClick={() => this.props.set_selected_language("english")}
                        variant="success"                      >
                        Go To Prof Test
                      </Button>
                    </Link>
                  </>
                ) : (
                  <ExerciseTypes language={"english"} />
                )}
              </Tab>
              <Tab eventKey="TURKISH" title="TURKISH">
                {!langs.includes("turkish") ? (
                  <>
                    <Typography component="h5" variant="h5" align="center">
                      You should solve the prof test of this language first.
                    </Typography>
                    <Link to="/prof-test/turkish">
                      <Button
                        onClick={() => this.props.set_selected_language("turkish")}
                        variant="success"                      >
                        Go To Prof Test
                      </Button>
                    </Link>
                  </>
                ) : (
                  <ExerciseTypes language={"turkish"} />
                )}
              </Tab>
              <Tab eventKey="GERMAN" title="GERMAN">
                {!langs.includes("german") ? (
                  <>
                    <Typography component="h5" variant="h5" align="center">
                      You should solve the prof test of this language first.
                    </Typography>
                    <Link to="/prof-test/german">
                      <Button
                        onClick={() => this.props.set_selected_language("german")}
                        variant="success"                      >
                        Go To Prof Test
                      </Button>
                    </Link>
                  </>
                ) : (
                  <ExerciseTypes language={"german"} />
                )}
              </Tab>
            </Tabs>
          </Grid>
        </>
      );
    }
  }
}

const mapStateToProps = ({ userInfo }) => ({
  userInfo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      set_selected_language,
      set_user_profile,
    },
    dispatch
  );

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Exercises)
);
