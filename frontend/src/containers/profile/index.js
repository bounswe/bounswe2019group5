import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  set_user_profile,
  set_other_user_profile
} from "../../redux/action-creators/userInfo";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import LangTab from "./langTab";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Paper from "@material-ui/core/Paper";
import Ratings from "./ratings";

class Profile extends Component {
  state = { selfProfile: true };
  constructor(props) {
    super(props);
    console.log(props.userInfo.token);
  }
  componentDidMount() {
    if (
      this.props.match.params.user !=
      ":" + this.props.userInfo.userProfile.username
    ) {
      this.props.set_other_user_profile(
        this.props.userInfo.token,
        this.props.match.params.user.substring(1)
      );
      this.setState({ selfProfile: false });
      console.log("other profile");
      console.log("SELF PROFILE" + this.state.selfProfile);

    } else  {
      this.props.set_user_profile(this.props.userInfo.token);
      console.log("self profile");
    }
  }
  render() {
    const { classes } = this.props;
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
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid xs={3} className={classes.paper}>
            <div className={classes.paper}>
              <Card
                border="warning"
                className="text-center"
                style={{ width: "18rem" }}
              >
                <Card.Header>
                  <AccountCircleIcon fontSize="large"> </AccountCircleIcon>
                </Card.Header>
                <Card.Body>
                  {this.state.selfProfile ? (
                    <Card.Title>
                      {" "}
                      {this.props.userInfo.userProfile.username}{" "}
                    </Card.Title>
                  ) : (
                    <Card.Title>
                      {" "}
                      {this.props.userInfo.otherUserProfile.username}{" "}
                    </Card.Title>
                  )}
                  <Card.Text>
                    {this.state.selfProfile ? (
                      <Typography variant="h4" gutterBottom>
                        {this.props.userInfo.userProfile.first_name}{" "}
                        {this.props.userInfo.userProfile.last_name}
                      </Typography>
                    ) : (
                      <Typography variant="h4" gutterBottom>
                        {this.props.userInfo.otherUserProfile.first_name}{" "}
                        {this.props.userInfo.otherUserProfile.last_name}
                      </Typography>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Grid>
          <Grid item component={Paper}>
            <div className={classes.paper}>
              {this.state.selfProfile && (
                <LangTab
                  attendedLang={
                    this.props.userInfo.userProfile.attended_languages
                  }
                />
              )}
            </div>
            <Grid>
            <div className={classes.paper}>
              {this.state.selfProfile ? (
                <Ratings userProfile={this.props.userInfo.userProfile} />
              ) : (
                <Ratings userProfile={this.props.userInfo.otherUserProfile} />
              )}
              </div>
          </Grid>
          </Grid>
        </Grid>
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
      set_user_profile,
      set_other_user_profile
    },
    dispatch
  );

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
