import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { Button, Card, CardDeck, Image } from 'react-bootstrap';

const Home = (props) => { 
  return (
  <>    <CardDeck >

    {!props.userInfo.token && (
      <Card border="warning" >
        <Card.Body align="center">
          <Card.Text>
            If you're registered, login.
</Card.Text>
          <Link to="/login"><Button variant="outline-warning">Login </Button>  </Link>
        </Card.Body>
      </Card>
    )}
    {!props.userInfo.token && (
      <Card border="success">
        <Card.Body align="center">
          <Card.Text>
            If you are new, sign up here.
  </Card.Text>
          <Link to="/signup"><Button variant="outline-success">Sign-up </Button>  </Link>
        </Card.Body>
      </Card>
    )}
    {!props.userInfo.token && (
      <Card border="secondary">
        <Card.Body align="center">
          <Card.Text>
            You can continue as a guest user if you wish.
    </Card.Text>
          <Link to="/guest-login"><Button variant="outline-secondary">Guest  </Button> </Link>
        </Card.Body>
      </Card>
    )}
  </CardDeck>
    <Image src="https://github.com/bounswe/bounswe2019group5/blob/master/Images/kapak.png?raw=true" fluid />
  </>
);
    }
const mapStateToProps = ({  userInfo, authentication }) => ({
  userInfo,
  authentication,
});
export default connect(
  mapStateToProps,
)(Home);