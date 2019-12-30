import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { signup, clear_authentication } from "../../redux/action-creators/authentication";
import { clear_user_profile } from '../../redux/action-creators/userInfo';
import styles from "./styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Form } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';

class SignUp extends Component {

  state = {
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    native_language: "english",
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    this.props.signup(
      this.state.name,
      this.state.surname,
      this.state.email,
      this.state.username,
      this.state.password,
      this.state.native_language
    );
  };

  componentDidMount(){
    this.props.clear_user_profile();
    this.props.clear_authentication();
  }
  
  render() {

    const {classes} = this.props;

    if (this.props.userInfo.token != null) {
      return (
        <Redirect
          to={{
            pathname: "/lang-select",
            state: { token: this.props.userInfo.token }
          }}
        />
      );
    } else {
      return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}></Avatar>
              <Typography component="h1" variant="h5">
                Welcome! You can sign up here easily.
              </Typography>
            {this.props.authentication.loading &&
              <div>
                <h1>LOADING...</h1>
              </div>
            }
            {!this.props.authentication.loading &&
              <form className={classes.form} onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="Name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      autoComplete="fname"
                      onChange={this.handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="Surname"
                      variant="outlined"
                      required
                      fullWidth
                      id="surname"
                      label="Surname"
                      autoComplete="sname"
                      onChange={this.handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      type="email"
                      onChange={this.handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      name="username"
                      autoComplete="username"
                      onChange={this.handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={this.handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Form.Label>Native Language</Form.Label>
                    <Form.Control
                      as="select"
                      id="native_language"
                      value={this.state.native_language}
                      onChange={this.handleChange.bind(this)}>
                      <option value="english">english</option>
                      <option value="turkish">turkish</option>
                      <option value="german">german</option>
                    </Form.Control>
                  </Grid>

                </Grid>

                {this.props.authentication.message!=null &&
                  (
                    <div>
                      <label style={{color: 'red'}}>{this.props.authentication.message}</label>
                    </div>
                  )
                }

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color = "primary"
                  className={classes.submit}

                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end"></Grid>
              </form>
          }
            </div>
          </Grid>
        </Grid>
      );
    }
  }
}

const mapStateToProps = ({ authentication, userInfo }) => ({
  authentication,
  userInfo,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signup,
      clear_user_profile,
      clear_authentication,
    },
    dispatch
  );

export default withStyles(styles) ( connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp) );
