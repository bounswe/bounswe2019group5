import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Home from "../home";
import About from "../about";
import Login from "../login";
import SignUp from "../signup";
import ProfTest from "../profTest";
import TestResults from "../test-results";
import Guest from "../guest"
import StyledLogin from "../styledLogin"
import StyledSignup from "../styledSignup"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Container, Row, Col, Image, Button, ButtonToolbar } from 'react-bootstrap';
import { logout } from "../../redux/action-creators/authentication";

class App extends Component {

  render() {
    return (
  <>
    <style type="text/css">    {`

    .bg-white {
      background-color: white;
      color: blue;
    }   `}
    </style> 
    <Navbar className="bg-white justify-content-between">
      <Navbar.Brand href="#home"><Link to="/"><Image width={250} height={100} alt="bonibon" src="https://github.com/bounswe/bounswe2019group5/raw/master/Images/logo.jpeg" fluid /></Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
      {this.props.authentication.token &&
            (
              <Link to="/" onClick={() => this.props.logout()}>Logout</Link>
            )
          }
          {!this.props.authentication.token &&
            (<Button variant="outline-warning">
              <Link to="/login">Login</Link></Button>
            )
          }
          {!this.props.authentication.token &&
            (<Button variant="outline-success">
              <Link to="/signup">Sign-up</Link></Button>
            )
          }
      </Nav>
      <Form inline>
        <Nav.Link href="about">  <Button variant="outline-info">
          <Link to="/about-us">About</Link>

        </Button> </Nav.Link>
      </Form>
    </Navbar>


    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/prof-test" component={ProfTest} />
      <Route exact path="/guest" component={Guest} />
      <Route exact path="/test-results" component={TestResults} />
      <Route exact path="/styled-login" component={StyledLogin} />
      <Route exact path="/styled-signup" component={StyledSignup} />
    </main>
  </>
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