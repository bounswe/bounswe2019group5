import React, { Component } from "react";
import { Redirect, browserHistory } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { login } from "../../redux/action-creators/authentication";
import styles from "./styles";
import { withStyles } from '@material-ui/core/styles';


class Login extends Component {
  constructor (props){
    super(props);
    console.log(props.authentication.token);
  }
  state = {
    usernameOrEmail: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    this.props.login(this.state.usernameOrEmail, this.state.password);
  };

  render() {

    const {classes} = this.props;

    if (this.props.authentication.token != null){
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    }
    else if (this.state.goToSignInPage != null) {
      return (
        <Redirect
          to={{
            pathname: "/signup",
          }}
        />
      );
    }
    else if (this.props.authentication.loading) {
      return (
        <div>
          <h1>LOADING</h1>
        </div>
      );
    } else {
      return (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}/>
              <Typography component="h1" variant="h5">Log in</Typography>

              <form className={classes.form} onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="usernameOrEmail"
                  label="Enter Your Username or Email"
                  name="usernameOrEmail"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleChange}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />

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
                  color="primary"
                  className={classes.submit}
                >
                  Log In
               </Button>

                <Grid container>
                  <Button variant="contained"
                    fullWidth
                    color="info"
                    onClick={() => this.setState({goToSignInPage: true})}>
                      Don't have an account? Sign-up now
                  </Button>
                </Grid>

              </form>

            </div>
          </Grid>
        </Grid>
      );
    }
  }
}

const mapStateToProps = ({ authentication }) => ({
  authentication
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default withStyles(styles) ( 
  connect(
    mapStateToProps,
    mapDispatchToProps
  ) (Login) );
