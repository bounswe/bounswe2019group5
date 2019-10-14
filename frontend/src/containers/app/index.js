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
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Container, Row, Col, Image, Button, ButtonToolbar } from 'react-bootstrap';
import { logout } from "../../redux/action-creators/authentication";

class App extends Component {

  render() {
    return (
  <>
    <Navbar >
      <Navbar.Brand href="#home"><Link to="/"><Image width={250} height={100} alt="bonibon" src="https://github.com/bounswe/bounswe2019group5/raw/master/Images/logo.jpeg" fluid /></Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
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
      </Nav>
      <Form inline>
        <Nav.Link href="about">  <Button variant="outline-warning">
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