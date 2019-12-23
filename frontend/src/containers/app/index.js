import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Home from "../home";
import About from "../about";
import Login from "../login";
import SignUp from "../signup";
import ProfTest from "../profTest";
import Profile from "../profile";
import Exercise from "../exercise/exercise";
import Chat from "../chat";
import WritingUpload from "../writingUpload";
import Recommendation from "../recommendation";
import WritingShow from "../writingShow";
import WritingList from "../WritingList";
import Exercises from "../exercise";
import SuggestExercise from "../SuggestExercise";
import TestResult from "../testResult";
import ChatHistory from "../chat/chatHistory";
import {
  set_user_profile,
  clear_user_profile,
} from "../../redux/action-creators/userInfo";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import {
  Navbar,
  Nav,
  Form,
  Image,
  Button,
} from "react-bootstrap";
import LanguageSelection from "../languageSelection";
import GuestLogin from "../guestLogin";
import Search from "../search";
import { set_input } from "../../redux/action-creators/search";
import { logout } from "../../redux/action-creators/authentication";


class App extends Component {

  constructor() {
    super();
    this.state = {
      shouldShowNavBar: true,
    }
    this.ref = React.createRef()
    this.search = this.search.bind(this)
  }

  componentDidMount() {
    const f = () => {
      if (this.props.userInfo.token) {
        this.props.set_user_profile(this.props.userInfo.token);
        console.log("user profile set");
      }
      this.timer = setTimeout(f, 3000);
    }
    f();
  }

  componentWillUnmount() {
    if (this.timer)
      clearTimeout(this.timer);
  }

  search(e) {
    e.preventDefault()
    this.props.set_input(this.ref.current.value);
    this.props.history.push('/search')
  }

  render() {
    return (
      <div
        onMouseMove={(e) => {
          let per = window.innerWidth / (e.screenX + 1);
          if (this.state.shouldShowNavBar && per < 3) {
            this.setState({ shouldShowNavBar: false });
          }
          else if (!this.state.shouldShowNavBar && per > 100) {
            this.setState({ shouldShowNavBar: true });
          }
        }}>
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
              <Link to="/logout">
                <Button variant="outline-warning">Logout</Button>
              </Link>
            )}
            {this.props.userInfo.token && this.props.userInfo.userProfile && (
              <Link to={"/profile/" + this.props.userInfo.userProfile.username}>
                <Button variant="outline-success">
                  <img style={{width: 20, height: 20, marginRight: 5}} src={"https://ui-avatars.com/api/?rounded=true&name="+this.props.userInfo.username}/>
                  My Profile
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
          {this.props.userInfo.token && (
          <Form inline onSubmit={this.search} >
            <Form.Control ref={this.ref} type="text" placeholder="Search user/exercise" className="mr-sm-2" />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>)}
          <Form inline>
            <Nav.Link href="about-us">
              <Link to="/about-us">
                <Button variant="outline-info">About</Button>
              </Link>
            </Nav.Link>
          </Form>
        </Navbar>


        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {(this.props.userInfo.token && this.props.userInfo.userProfile) &&
            <div style={{ flex: 1 }} id="left-navigation">
              <div className="container-fluid">
                <Navbar variant="light" className="flex-column navigation-full-width">
                  <Nav className="flex-column navigation-full-width">
                    <Nav.Link className="navigation" href="/" >Home</Nav.Link>
                    <Nav.Link className="navigation" href={"/profile/" + this.props.userInfo.userProfile.username}>My Profile</Nav.Link>
                    <Nav.Link className="navigation" href="/exercises" >Exercises</Nav.Link>
                    <Nav.Link className="navigation" href="/upload-writing" >Write an Essay</Nav.Link>
                    <Nav.Link className="navigation" href="/recommendation" >Recommend Expert</Nav.Link>
                    <Nav.Link className="navigation" href="/writing-list" >My Essays</Nav.Link>
                    <Nav.Link className="navigation" href="/chatHistory" >Chats</Nav.Link>
                    <Nav.Link className="navigation" href="/suggestion" >Contribute</Nav.Link>
                  </Nav>
                </Navbar>
              </div>
            </div>
          }
          <div style={{ flex: 8 }}>
            <main>
              <Route exact path="/" component={Home} />
              <Route exact path="/about-us" component={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/prof-test/:lang" component={ProfTest} />
              <Route exact path="/lang-select" component={LanguageSelection} />
              <Route exact path="/test-result" component={TestResult} />
              <Route exact path="/guest-login" component={GuestLogin} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/exercise/:id" component={Exercise} />
              <Route exact path="/profile/:user" component={Profile} />
              <Route exact path="/chat/:chatWith" component={Chat} />
              <Route exact path="/chatHistory" component={ChatHistory} />
              <Route exact path="/exercises" component={Exercises} />
              <Route
                exact
                path="/upload-writing/:reviewer?"
                component={WritingUpload}
              />
              <Route exact path="/recommendation" component={Recommendation} />
              <Route exact path="/show-writing/:id" component={WritingShow} />
              <Route exact path="/writing-list" component={WritingList} />
              <Route exact path="/suggestion" component={SuggestExercise} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/logout" component={ () => {
                  this.props.logout();
                  return (
                    <div>
                      <Redirect to={{pathname: "/home"}}/>
                    </div>
                  );
                }
              }/>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userInfo, search }) => ({
  userInfo,
  search
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout,
      set_user_profile,
      clear_user_profile,
      set_input
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
