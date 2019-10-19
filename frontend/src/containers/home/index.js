import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
import { Button, Card, CardDeck, Image } from 'react-bootstrap';

const Home = props => (
  <>
    <CardDeck style={{ padding: '15px' }}>
      <Card border="warning" style={{ width: '18rem' }}>
        <Card.Body align="center">
          <Card.Text>
            If you're registered, login.
    </Card.Text>
          <Button variant="outline-warning">
            <Link to="/styled-login">Login</Link>
          </Button>  </Card.Body>
      </Card>

      <Card border="success" style={{ width: '18rem' }}>
        <Card.Body align="center">
          <Card.Text>
            If you are new, sign up here.
  </Card.Text>
          <Button variant="outline-success">
            <Link to="/styled-signup">Sign-up</Link>
          </Button>  </Card.Body>
      </Card>

      <Card border="secondary" style={{ width: '18rem' }}>
        <Card.Body align="center">
          <Card.Text>
            You can continue as a guest user if you wish.
    </Card.Text>
          <Button variant="outline-secondary">
            <Link to="/guest">Guest</Link>
          </Button>  </Card.Body>
      </Card>
    </CardDeck>
    <Image src="https://github.com/bounswe/bounswe2019group5/blob/master/Images/kapak.png?raw=true" fluid />
  </>
);

const mapStateToProps = ({ counter, test, authentication }) => ({
  test,
  authentication
});

export default connect(
  mapStateToProps,
)(Home);
