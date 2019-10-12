import React, { Component } from "react";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../../redux/action-creators/authentication";

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
    if (this.props.authentication.token != null){
      return (
        <Redirect
          to={{
            pathname: "/",
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
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Username or Email:</label>
              <input
                type="text"
                id="usernameOrEmail"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" id="password" onChange={this.handleChange} />
            </div>
            {this.props.authentication.message!=null &&
              (
                <div>
                  <label style={{color: 'red'}}>{this.props.authentication.message}</label>
                </div>
              )
            }
            <div>
              <button>Login</button>
            </div>
          </form>
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
