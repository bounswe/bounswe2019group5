import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
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
import Avatar from '@material-ui/core/Avatar';
import Paper from "@material-ui/core/Paper";
import Ratings from "./ratings";
import _ from "lodash";
import { get_essays } from "../../redux/action-creators/writinglist";
import Divider from '@material-ui/core/Divider';
import StarRatings from 'react-star-ratings';
import TextField from "@material-ui/core/TextField";
import {
  Button,
} from "react-bootstrap";
import { send_comment } from '../../api/comment';


class Profile extends Component {
  state = {
    selfProfile: true,
    comment: "",
    rating: 3
  };
  constructor(props) {
    super(props);
    this.changeRating = this.changeRating.bind(this);
    this.changeComment = this.changeComment.bind(this);
    this.sendComment = this.sendComment.bind(this);
  }
  componentDidMount() {
    if (
      this.props.match.params.user != this.props.userInfo.userProfile.username
    ) {
      console.log('other user')
      this.props.set_other_user_profile(
        this.props.userInfo.token,
        this.props.match.params.user
      );
      this.setState({ selfProfile: false});
    } else {
      this.props.set_user_profile(this.props.userInfo.token);
      this.props.get_essays(this.props.userInfo.token);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.match.params.user != this.props.userInfo.userProfile.username ||
      prevProps.match.params.user != this.props.match.params.user
    ) {
      this.props.set_other_user_profile(
        this.props.userInfo.token,
        this.props.match.params.user
      );
      this.setState({ selfProfile: false });
    } else {
      if (!prevState.selfProfile) {
        this.props.set_user_profile(this.props.userInfo.token);
        this.setState({ selfProfile: true });
      }
    }
  }

  changeRating(rating) {
    this.setState({ rating: rating });
  }

  changeComment(event) {
    this.setState({ comment: event.target.value });
  }

  sendComment() {
    send_comment(this.props.userInfo.token, this.props.userInfo.otherUserProfile.username,
      this.state.comment, this.state.rating)
      .then(newComment => {
        if (!newComment.message) {
          this.props.set_other_user_profile(
            this.props.userInfo.token,
            this.props.match.params.user
          );
          this.setState({ comment: "", rating: 3 });
        }

      }

      );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
    );
  }

  render() {
    const { classes } = this.props;

    if(
      (this.state.selfProfile && this.props.userInfo.userProfile && this.props.userInfo.userProfile.message) ||
      (!this.state.selfProfile && this.props.userInfo.otherUserProfile && this.props.userInfo.otherUserProfile.message)
    ) {
      return(
      <Typography variand="h2">CONNECTION ERROR</Typography>
      )
    }
    else if ((this.props.userInfo.otherUserProfile && !this.props.userInfo.otherUserProfile.username) && !this.state.selfProfile) {
      return (
        <div>
          <h1>NO SUCH USER FOUND</h1>
        </div>)
    }
    else if (this.props.userInfo.token == null) {
      return (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      );
    } else if (this.props.userInfo.loadingS || this.props.userInfo.loadingO) {
      return (
        <div>
          <h1>LOADING</h1>
        </div>
      );
    } else {
      const ratingS = this.props.userInfo.userProfile.rating_average;
      const ratingO = !this.state.selfProfile ? this.props.userInfo.otherUserProfile.rating_average : 0;
      return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={3} alignContent="center">
            <Card
              border="warning"
              className="text-center"
            >
              <Card.Header>
                <Avatar style={{ margin: "0 auto" }} src={this.state.selfProfile ? ("https://ui-avatars.com/api/?rounded=true&name=" + this.props.userInfo.userProfile.username) : ("https://ui-avatars.com/api/?rounded=true&name=" + this.props.userInfo.otherUserProfile.username)} fontSize="large"> </Avatar>
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
                    <>
                      <Typography variant="h4" gutterBottom>
                        {this.props.userInfo.userProfile.first_name}{" "}
                        {this.props.userInfo.userProfile.last_name}
                      </Typography>
                      <Typography>Native Language: {this.props.userInfo.userProfile.native_language} </Typography>
                      <Typography variant="h5" gutterBottom color="primary">
                        Overall rating:
                          <StarRatings rating={ratingS} numberOfStars={5} starRatedColor="orange" starDimension="35px" starSpacing="2px" />
                        <Typography variant="h7" gutterBottom color="primary">
                          out of{" "}
                          {this.props.userInfo.userProfile && !this.props.userInfo.userProfile.message ?
                            this.props.userInfo.userProfile.user_comments.length : 0}{" "}
                          ratings.
                          </Typography>
                      </Typography>
                    </>
                  ) : (
                      <>
                        <Typography variant="h4" gutterBottom>
                          {this.props.userInfo.otherUserProfile.first_name}{" "}
                          {this.props.userInfo.otherUserProfile.last_name}
                        </Typography>
                        <Typography>Native Language: {this.props.userInfo.otherUserProfile.native_language} </Typography>
                        <Typography variant="h5" gutterBottom color="primary">
                          Overall rating:
                          <StarRatings rating={ratingO} numberOfStars={5} starRatedColor="orange" starDimension="35px" starSpacing="2px" />
                          <Typography variant="h7" gutterBottom color="primary">
                            out of{" "}
                            {this.props.userInfo.otherUserProfile && !this.props.userInfo.otherUserProfile.message ?
                              this.props.userInfo.otherUserProfile.user_comments.length : 0}{" "}
                            ratings.
                        </Typography>
                        </Typography>
                        <Link to={{
                          pathname: "/chat/" + this.props.userInfo.otherUserProfile.username
                        }
                        }>
                          <Button variant="primary" > Chat With </Button></Link>

                        <Link to={{
                          pathname: "/upload-writing/" + this.props.userInfo.otherUserProfile.username
                        }
                        }> <Button variant="warning" >Send Essay Reviewing Request</Button></Link>
                      </>
                    )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Grid>
          <Grid item xs={9} component={Paper}>
            <div className={classes.paper}>
              {this.state.selfProfile && !this.props.userInfo.userProfile.message && (
                <LangTab
                  userInfo={this.props.userInfo}
                  attendedLang={
                    this.props.userInfo.userProfile.attended_languages
                  }
                  writings={
                    this.props.writinglist && this.props.writinglist.writings
                  }
                />
              )}
            </div>
            <Grid>
              <Divider variant="inset" />
              <div className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                  {this.state.selfProfile ? this.props.userInfo.userProfile.username : this.props.userInfo.otherUserProfile.username}'s ratings and comments:
                </Typography>
                {this.state.selfProfile && !this.props.userInfo.userProfile.message ? (
                  <Ratings userProfile={this.props.userInfo.userProfile} />
                ) : ( !this.props.userInfo.otherUserProfile.message &&
                    (<Ratings userProfile={this.props.userInfo.otherUserProfile} />  )
                  )}
              </div>
            </Grid>
            {
              !this.state.selfProfile && this.props.userInfo.otherUserProfile && 
              !this.props.userInfo.otherUserProfile.message && this.props.userInfo.otherUserProfile.can_rate &&
              <div>
                <Grid>
                  <Divider variant="inset" />
                  <div className={classes.paper}>
                    <Typography variant="h5" gutterBottom>
                      Rate this user:
                  </Typography>
                    <StarRatings
                      rating={this.state.rating}
                      starRatedColor="orange"
                      changeRating={this.changeRating}
                      numberOfStars={5}
                      name='rating'
                    />


                    <TextField
                      id="full-width-text-field"
                      placeholder="Enter your comment"
                      multiline={true}
                      rows={2}
                      rowsMax={10}
                      value={this.state.comment}
                      onChange={this.changeComment}
                    />
                    <br></br>
                    <Button
                      onClick={this.sendComment}
                      style={{
                        width: "fit-content"
                      }} variant="primary">Send</Button>
                  </div>
                </Grid>

              </div>

            }

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
      set_other_user_profile,
      get_essays
    },
    dispatch
  );

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
