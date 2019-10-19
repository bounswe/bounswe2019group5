import React, {Component} from "react";
import { Route, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Home from "../home";
import About from "../about";
import Login from "../login";
import SignUp from "../signup";
import ProfTest from "../profTest";
import GuestLogin from "../guestLogin"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Container, Row, Col, Image, Button, ButtonToolbar } from 'react-bootstrap';
import { logout } from "../../redux/action-creators/authentication";

class App extends Component {

  render() {
    return (
      <div>
        <style type="text/css">    {`
            .bg-white {
              background-color: white;
              color: blue;
            }   `
          }
        </style> 
        <Navbar className="bg-white justify-content-between">
          <Navbar.Brand href="#home">
            <Link to="/">
              <Image  width={250} 
                      height={100}
                      alt="bonibon"
                      src="https://github.com/bounswe/bounswe2019group5/raw/master/Images/logo.jpeg"
                      fluid />
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto">
            {this.props.authentication.token &&
              (
                <Link to="/login" onClick={() => this.props.logout()}>
                  <Button variant="outline-warning">Logout</Button>
                </Link>
              )
            }
            {!this.props.authentication.token &&
              (
                
                <Link to="/login">
                  <Button variant="outline-warning">Login</Button>
                </Link>
                
              )
            }
            {!this.props.authentication.token &&
              (
                <Link to="/signup">
                  <Button variant="outline-success">Sign-up</Button>
                </Link>
              )
            }
          </Nav>
          <Form inline>
            <Nav.Link href="about-us">
              <Link to="/about-us">
                <Button variant="outline-info">About</Button>
              </Link> 
            </Nav.Link>
          </Form>
        </Navbar>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/prof-test" component={ProfTest} />
          <Route exact path="/guest-login" component={GuestLogin} />
          <Route exact path="/home" component={Home} />
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
