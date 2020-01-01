import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Typography from "@material-ui/core/Typography";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
//lists statistics of a user of a specific language
export default function Statistics({ userInfo, language }) {
  const [key, setKey] = React.useState("General");

  const correctAnswerRate = (n_of_true, n_of_false) => {
    if (n_of_false === null || n_of_true === null) {
      return 0
    } else {
      return Math.round((n_of_true / (n_of_false + n_of_true)) * 100 * 100) / 100
    }
  }
  const calculateProgressTotal = (progress) => {
    if (!progress.number_of_test_completed || !progress.number_of_test)
      return 0;
    else
      return Math.round((progress.number_of_test_completed / progress.number_of_test) * 100 * 100) / 100
  }
  const calculateProgressInLevel = (progress) => {
    if (!progress.completed_exercise_current_level || !progress.exercise_in_current_level)
      return 0;
    else
      return Math.round((progress.completed_exercise_current_level / progress.exercise_in_current_level) * 100 * 100) / 100
  }
  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
      <Tab eventKey="General" title="General">
        <Typography variant="h4" gutterBottom>
          You are  <strong>{userInfo.userProfile.levels[language]}</strong> level.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Progress so far: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' } }}
            value={calculateProgressTotal(userInfo.progress[language].general)} 
            text={`${calculateProgressTotal(userInfo.progress[language].general)}%`} />
        </Typography>
        <Typography variant="h6" gutterBottom>
          Progress in current level: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' }, path:{stroke: '#0f4c81'} }}
            value={calculateProgressInLevel(userInfo.progress[language].general)} 
            text={`${calculateProgressInLevel(userInfo.progress[language].general)}%`} /> out of {userInfo.progress[language].general.exercise_in_current_level} tests.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Average correct answer rate: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' } ,
          path: {stroke: '#009966'}}}
            value={correctAnswerRate(userInfo.testResult[language].general.number_of_true, userInfo.testResult[language].general.number_of_false)} 
            text={`${correctAnswerRate(userInfo.testResult[language].general.number_of_true, userInfo.testResult[language].general.number_of_false)}%`} />
        </Typography>
      </Tab>
      <Tab eventKey="Grammar" title="Grammar">
        {" "}
        <Typography variant="h6" gutterBottom>
          Progress so far: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' } }}
            value={calculateProgressTotal(userInfo.progress[language].grammar)} 
            text={`${calculateProgressTotal(userInfo.progress[language].grammar)}%`} />
        </Typography>
        <Typography variant="h6" gutterBottom>
          Progress in current level: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' }, path:{stroke: '#0f4c81'} }}
            value={calculateProgressInLevel(userInfo.progress[language].grammar)} 
            text={`${calculateProgressInLevel(userInfo.progress[language].grammar)}%`} /> out of {userInfo.progress[language].grammar.exercise_in_current_level} tests.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Average correct answer rate: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' } ,
          path: {stroke: '#009966'}}}
          value={correctAnswerRate(userInfo.testResult[language].grammar.number_of_true, userInfo.testResult[language].grammar.number_of_false)} 
            text={`${correctAnswerRate(userInfo.testResult[language].grammar.number_of_true, userInfo.testResult[language].grammar.number_of_false)}%`} />
        </Typography>
      </Tab>
      <Tab eventKey="Vocabulary" title="Vocabulary">
      <Typography variant="h6" gutterBottom>
          Progress so far: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' } }}
            value={calculateProgressTotal(userInfo.progress[language].vocabulary)} 
            text={`${calculateProgressTotal(userInfo.progress[language].vocabulary)}%`} />
        </Typography>
        <Typography variant="h6" gutterBottom>
          Progress in current level: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' }, path:{stroke: '#0f4c81'} }}
            value={calculateProgressInLevel(userInfo.progress[language].vocabulary)} 
            text={`${calculateProgressInLevel(userInfo.progress[language].vocabulary)}%`} /> out of {userInfo.progress[language].vocabulary.exercise_in_current_level} tests.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Average correct answer rate: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' } ,
          path: {stroke: '#009966'}}}
          value={correctAnswerRate(userInfo.testResult[language].vocabulary.number_of_true, userInfo.testResult[language].vocabulary.number_of_false)} 
            text={`${correctAnswerRate(userInfo.testResult[language].vocabulary.number_of_true, userInfo.testResult[language].vocabulary.number_of_false)}%`} />
        </Typography>
      </Tab>
      <Tab eventKey="Reading" title="Reading">
      <Typography variant="h6" gutterBottom>
          Progress so far: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' } }}
            value={calculateProgressTotal(userInfo.progress[language].reading)} 
            text={`${calculateProgressTotal(userInfo.progress[language].reading)}%`} />
        </Typography>
        <Typography variant="h6" gutterBottom>
          Progress in current level: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' }, path:{stroke: '#0f4c81'} }}
            value={calculateProgressInLevel(userInfo.progress[language].reading)} 
            text={`${calculateProgressInLevel(userInfo.progress[language].reading)}%`} /> out of {userInfo.progress[language].reading.exercise_in_current_level} tests.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Average correct answer rate: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' } ,
          path: {stroke: '#009966'}}}
          value={correctAnswerRate(userInfo.testResult[language].reading.number_of_true, userInfo.testResult[language].reading.number_of_false)} 
            text={`${correctAnswerRate(userInfo.testResult[language].reading.number_of_true, userInfo.testResult[language].reading.number_of_false)}%`} />
        </Typography>
      </Tab>
      <Tab eventKey="Listening" title="Listening">
      <Typography variant="h6" gutterBottom>
          Progress so far: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' } }}
            value={calculateProgressTotal(userInfo.progress[language].listening)} 
            text={`${calculateProgressTotal(userInfo.progress[language].listening)}%`} />
        </Typography>
        <Typography variant="h6" gutterBottom>
          Progress in current level: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' }, path:{stroke: '#0f4c81'} }}
            value={calculateProgressInLevel(userInfo.progress[language].listening)} 
            text={`${calculateProgressInLevel(userInfo.progress[language].listening)}%`} /> out of {userInfo.progress[language].listening.exercise_in_current_level} tests.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Average correct answer rate: <CircularProgressbar styles={{ root: { height: '80px', width: '100px' } ,
          path: {stroke: '#009966'}}}
          value={correctAnswerRate(userInfo.testResult[language].listening.number_of_true, userInfo.testResult[language].listening.number_of_false)} 
            text={`${correctAnswerRate(userInfo.testResult[language].listening.number_of_true, userInfo.testResult[language].listening.number_of_false)}%`} />
        </Typography>
      </Tab>
    </Tabs>
  );
}
