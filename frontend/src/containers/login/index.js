import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../../redux/action-creators/authentication";

class Login extends Component {
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
    if (this.props.loading) {
      return (
        <div>
          <h1>LOADING</h1>
        </div>
      );
    } else if (this.props.status === 0) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { token: this.props.token }
          }}
        />
      );
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Username or Email:</label>
            <input
              type="text"
              id="usernameOrEmail"
              onChange={this.handleChange}
            />
            <label>Password:</label>
            <input type="password" id="password" onChange={this.handleChange} />
            <button>Login</button>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ authentication }) => ({
  token: authentication.token,
  status: authentication.status,
  loading: authentication.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
