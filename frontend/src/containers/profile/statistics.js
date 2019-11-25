import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Typography from "@material-ui/core/Typography";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { Button, Card, CardDeck, Image, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function Statistics({ userInfo, language, writings}) {
  const [key, setKey] = React.useState("General");

  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
      <Tab eventKey="General" title="General">
        <Typography variant="h3" gutterBottom>
          Your Level: A2
        </Typography>
        {/*  not functional yet 
        <Typography variant="h4" gutterBottom>
          Progress in current level: %5 
        </Typography>
 
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: 12
        </Typography>       */}
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: 
          {console.log(userInfo)}
          {language == "english"
            ? userInfo.english_general_test_result.number_of_true /
              (userInfo.english_general_test_result.number_of_true +
                userInfo.english_general_test_result.number_of_false)
            : language == "turkish"
            ? userInfo.turkish_general_test_result.number_of_true /
              (userInfo.turkish_general_test_result.number_of_true +
                userInfo.turkish_general_test_result.number_of_false)
            : userInfo.german_general_test_result.number_of_true /
              (userInfo.german_general_test_result.number_of_true +
                userInfo.german_general_test_result.number_of_false)}
        </Typography>
      </Tab>
      <Tab eventKey="Grammar" title="Grammar">
        {" "}
        {/*
        <Typography variant="h4" gutterBottom>
          Progress in current level: %5
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: 12
        </Typography>
      */}
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: 
          {language == "english"
            ? userInfo.english_grammar.number_of_true /
              (userInfo.english_grammar.number_of_true +
                userInfo.english_grammar.number_of_false)
            : language == "turkish"
            ? userInfo.turkish_grammar.number_of_true /
              (userInfo.turkish_grammar.number_of_true +
                userInfo.turkish_grammar.number_of_false)
            : userInfo.german_grammar.number_of_true /
              (userInfo.german_grammar.number_of_true +
                userInfo.german_grammar.number_of_false)}
        </Typography>
      </Tab>
      <Tab eventKey="Vocabulary" title="Vocabulary">
        {/*
        <Typography variant="h4" gutterBottom>
          Progress in current level: %5
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: 12
        </Typography>
      */}
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: 
          {language == "english"
            ? userInfo.english_voc.number_of_true /
              (userInfo.english_voc.number_of_true +
                userInfo.english_voc.number_of_false)
            : language == "turkish"
            ? userInfo.turkish_voc.number_of_true /
              (userInfo.turkish_voc.number_of_true +
                userInfo.turkish_voc.number_of_false)
            : userInfo.german_voc.number_of_true /
              (userInfo.german_voc.number_of_true +
                userInfo.german_voc.number_of_false)}{" "}
        </Typography>
      </Tab>
      <Tab eventKey="Reading" title="Reading">
        {/*
        <Typography variant="h4" gutterBottom>
          Progress in current level: %5
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: 12
        </Typography>
      */}
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: 
          {language == "english"
            ? userInfo.english_read.number_of_true /
              (userInfo.english_read.number_of_true +
                userInfo.english_read.number_of_false)
            : language == "turkish"
            ? userInfo.turkish_read.number_of_true /
              (userInfo.turkish_read.number_of_true +
                userInfo.turkish_read.number_of_false)
            : userInfo.german_read.number_of_true /
              (userInfo.german_read.number_of_true +
                userInfo.german_read.number_of_false)}
        </Typography>
      </Tab>
      <Tab eventKey="Writing" title="Writing">
        {/*
        <Typography variant="h4" gutterBottom>
          Progress in current level: %5
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: 12
        </Typography>
      */}
        {writings && (writings.map(item => {
          if (item.author === this.props.userInfo.username)
            return (
              <div>
                <Card bg="light" style={{ width: "36rem" }}>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Reviewer: {item.reviewer}</ListGroupItem>
                    <ListGroupItem>Status: {item.status}</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Link
                      to={{
                        pathname: "/show-writing/" + item.id
                      }}
                    >
                      See Essay
                    </Link>
                  </Card.Body>
                </Card>
                <br />
              </div>
            );
        }))}
      </Tab>
      <Tab eventKey="Listening" title="Listening">
        {/*
        <Typography variant="h4" gutterBottom>
          Progress in current level: %5
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: 12
        </Typography>
      */}
        <Typography variant="h4" gutterBottom>
        Average correct answer rate: 
          {language == "english"
            ? userInfo.english_listen.number_of_true /
              (userInfo.english_listen.number_of_true +
                userInfo.english_listen.number_of_false)
            : language == "turkish"
            ? userInfo.turkish_listen.number_of_true /
              (userInfo.turkish_listen.number_of_true +
                userInfo.turkish_listen.number_of_false)
            : userInfo.german_listen.number_of_true /
              (userInfo.german_listen.number_of_true +
                userInfo.german_listen.number_of_false)}
        </Typography>
      </Tab>
    </Tabs>
  );
}
