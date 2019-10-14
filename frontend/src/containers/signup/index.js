import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { signup } from "../../redux/action-creators/authentication";

class SignUp extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    native_language: ""
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
            <div>
              <label>Name:</label>
              <input type="text" id="name" onChange={this.handleChange} />
            </div>

            <div>
              <label>Surname:</label>
              <input type="text" id="surname" onChange={this.handleChange} />
            </div>

            <div>
              <label>Email:</label>
              <input type="email" id="email" onChange={this.handleChange} />
            </div>

            <div>
              <label>Username:</label>
              <input type="text" id="username" onChange={this.handleChange} />
            </div>

            <div>
              <label>Password:</label>
              <input
                type="password"
                id="password"
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label>Native Language:</label>
              <select id="native_language" onChange={this.handleChange}>
                <option value="">Please choose your native language</option>
                <option value="turkish">Turkish</option>
                <option value="english">English</option>
              </select>
            </div>

            <button>Sign Up</button>
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
      signup
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
