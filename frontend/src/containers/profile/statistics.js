import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Typography from "@material-ui/core/Typography";

export default function Statistics() {
  const [key, setKey] = React.useState('General');

  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
      <Tab
        eventKey="General"
        title="General"
      >
        <Typography variant="h3" gutterBottom>
          Your Level: A2
        </Typography>
        <Typography variant="h4" gutterBottom>
          Progress in current level: %5
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: 12
        </Typography>
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: %59
        </Typography>
      </Tab>
      <Tab
        eventKey="Grammar"
        title="Grammar"
      >
        <Typography variant="h4" gutterBottom>
          Progress in current level: %5
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: 12
        </Typography>
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: %59
        </Typography>{" "}
      </Tab>
      <Tab
        eventKey="Vocabulary"
        title="Vocabulary"
      >
        <Typography variant="h4" gutterBottom>
          Progress in current level: %5
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: 12
        </Typography>
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: %59
        </Typography>{" "}
      </Tab>
      <Tab
        eventKey="Reading"
        title="Reading"
      >
        <Typography variant="h4" gutterBottom>
          Progress in current level: %5
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: 12
        </Typography>
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: %59
        </Typography>{" "}
      </Tab>
      <Tab
        eventKey="Writing"
        title="Writing"
      >
        <Typography variant="h4" gutterBottom>
          Progress in current level: %5
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: 12
        </Typography>
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: %59
        </Typography>{" "}
      </Tab>
      <Tab
        eventKey="Listening"
        title="Listening"
      >
        <Typography variant="h4" gutterBottom>
          Progress in current level: %5
        </Typography>
        <Typography variant="h4" gutterBottom>
          Number of tests you've completed: 12
        </Typography>
        <Typography variant="h4" gutterBottom>
          Average correct answer rate: %59
        </Typography>{" "}
      </Tab>
    </Tabs>
  );
}
