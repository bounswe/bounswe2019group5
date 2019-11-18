import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Home from "../home";
import About from "../about";
import Login from "../login";
import SignUp from "../signup";
import ProfTest from "../profTest";
import Profile from "../profile";
import VocabularyTest from "../exercises/vocabularyTest";
import GrammarTest from "../exercises/grammarTest";
import Chat from "../chat";
import WritingUpload from "../writingUpload";
import Recommendation from "../recommendation";
import WritingShow from "../writingShow";


import TestResult from "../testResult";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Form,
  Container,
  Row,
  Col,
  Image,
  Button,
  ButtonToolbar
} from "react-bootstrap";
import LanguageSelection from "../languageSelection";
import GuestLogin from "../guestLogin";

import { logout } from "../../redux/action-creators/authentication";

class App extends Component {
  render() {
    return (
      <div>
        <style type="text/css">
          {" "}
          {`
            .bg-white {
              background-color: white;
              color: blue;
            }   `}
        </style>
        <Navbar className="bg-white justify-content-between">
          <Navbar.Brand href="#home">
            <Link to="/">
              <Image
                width={250}
                height={100}
                alt="bonibon"
                src="https://github.com/bounswe/bounswe2019group5/raw/master/Images/logo.jpeg"
                fluid
              />
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto">
            {this.props.userInfo.token && (
              <Link to="/" onClick={() => this.props.logout()}>
                <Button variant="outline-warning">Logout</Button>
              </Link>
            )}

            {
              // TODO -> Profil Page hazir oldugunda buradan link edilecek
            }
            {this.props.userInfo.token && this.props.userInfo.userProfile && (
              <Link to={"/profile/"+ this.props.userInfo.userProfile.username}>
                <Button variant="outline-success">
                  My Profile({this.props.userInfo.userProfile.username})
                </Button>
              </Link>
            )}

            {!this.props.userInfo.token && (
              <Link to="/login">
                <Button variant="outline-warning">Login</Button>
              </Link>
            )}
            {!this.props.userInfo.token && (
              <Link to="/signup">
                <Button variant="outline-success">Sign-up</Button>
              </Link>
            )}
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
          <Route exact path="/lang-select" component={LanguageSelection} />
          <Route exact path="/test-result" component={TestResult} />
          <Route exact path="/guest-login" component={GuestLogin} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/vocabulary-test" component={VocabularyTest} />
          <Route exact path="/grammar-test" component={GrammarTest} />
          <Route exact path="/profile/:user" component={Profile} />
          <Route exact path="/chat/:chatWith" component={Chat} />
          <Route exact path="/upload-writing/:reviewer?" component={WritingUpload} />
          <Route exact path="/recommendation" component={Recommendation} />
          <Route exact path="/show-writing/:id" component={WritingShow} />

        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ userInfo }) => ({
  userInfo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
