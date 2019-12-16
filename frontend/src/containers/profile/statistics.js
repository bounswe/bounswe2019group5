import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function Statistics({ userInfo, language, writings}) {
  const [key, setKey] = React.useState("General");

  const correctAnswerRate = (n_of_true, n_of_false) => {
    if (n_of_false === null || n_of_true === null) {
      return 0
    } else {
      return Math.round((n_of_true / (n_of_false + n_of_true))*100)/100
    }
  }
  const calculateProgress = (progress) => {
    if(!progress)
      return 0;
    else 
      return Math.round( (progress.number_of_test_completed / progress.number_of_test) * 100 ) / 100
  }

  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
      <Tab eventKey="General" title="General">
        <Typography variant="h3" gutterBottom>
          Your Level: {userInfo.userProfile.levels[language]}
        </Typography>
        
        <Typography variant="h4" gutterBottom>
          Progress so far: {calculateProgress(userInfo.progress[language].general)}
        </Typography>
 
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: {userInfo.progress[language].general.number_of_test_completed}
        </Typography>       */}
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: 
          {correctAnswerRate(userInfo.testResult[language].general.number_of_true, userInfo.testResult[language].general.number_of_false)
          }
        </Typography>
      </Tab>
      <Tab eventKey="Grammar" title="Grammar">
        {" "}
        <Typography variant="h4" gutterBottom>
          Progress so far: {calculateProgress(userInfo.progress[language].grammar)}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: {userInfo.progress[language].grammar.number_of_test_completed}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: 
          {correctAnswerRate(userInfo.testResult[language].grammar.number_of_true, userInfo.testResult[language].grammar.number_of_false)
          }
        </Typography>
      </Tab>
      <Tab eventKey="Vocabulary" title="Vocabulary">
        <Typography variant="h4" gutterBottom>
          Progress so far: {calculateProgress(userInfo.progress[language].vocabulary)}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: {userInfo.progress[language].vocabulary.number_of_test_completed}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: 
          {correctAnswerRate(userInfo.testResult[language].vocabulary.number_of_true, userInfo.testResult[language].vocabulary.number_of_false)}
        </Typography>
      </Tab>
      <Tab eventKey="Reading" title="Reading">
        <Typography variant="h4" gutterBottom>
          Progress so far: {calculateProgress(userInfo.progress[language].reading)}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: {userInfo.progress[language].reading.number_of_test_completed}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: 
          {correctAnswerRate(userInfo.testResult[language].reading.number_of_true, userInfo.testResult[language].reading.number_of_false)
          }
        </Typography>
      </Tab>
      <Tab eventKey="Writing" title="Writing">
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
        <Typography variant="h4" gutterBottom>
          Progress so far: {calculateProgress(userInfo.progress[language].listening)}
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: {userInfo.progress[language].listening}
        </Typography>
        <Typography variant="h4" gutterBottom>
        Average correct answer rate: 
        {correctAnswerRate(userInfo.testResult[language].listening.number_of_true, userInfo.testResult[language].listening.number_of_false)
        }
        </Typography>
      </Tab>
    </Tabs>
  );
}
