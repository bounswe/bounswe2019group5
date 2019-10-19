import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const Home = props => {
  if (props.authentication.token != null) {
    return (
      <div>
        <h1>{props.authentication.token}</h1>
      </div>
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );
  }
};

const mapStateToProps = ({ counter, test, authentication }) => ({
  test,
  authentication
});

export default connect(mapStateToProps)(Home);
