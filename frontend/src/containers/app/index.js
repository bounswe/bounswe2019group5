import React, {Component} from "react";
import { Route, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Home from "../home";
import About from "../about";
import Login from "../login";
import SignUp from "../signup";
import ProfTest from "../profTest";
import { logout } from "../../redux/action-creators/authentication";

class App extends Component {

  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/about-us">About</Link>
          {this.props.authentication.token && 
            (
              <Link to="/" onClick={() => this.props.logout()}>Logout</Link>
            )
          }
          {!this.props.authentication.token && 
            (
              <Link to="/login">Login</Link>
            )
          }
          {!this.props.authentication.token && 
            (
              <Link to="/signup">Singup</Link>
            )
          }
          
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/prof-test" component={ProfTest} />
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ authentication }) => ({
  authentication
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
