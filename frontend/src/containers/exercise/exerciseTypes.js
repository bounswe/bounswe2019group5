import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import SearchTest from "./searchTest"

export default function ExerciseTypes({ language }) {
  const [key, setKey] = React.useState("");

  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
      <Tab eventKey="Grammar" title="Grammar">
        <SearchTest language={language} type={"grammar"}/>
      </Tab>
      <Tab eventKey="Vocabulary" title="Vocabulary">
      <SearchTest language={language} type={"vocabulary"}/>
      </Tab>
      <Tab eventKey="Reading" title="Reading">
      <SearchTest language={language} type={"reading"} />
      </Tab>
      <Tab eventKey="Writing" title="Writing">
        
      </Tab>
      <Tab eventKey="Listening" title="Listening">
      <SearchTest language={language} type={"listening"} />
      </Tab>
    </Tabs>
  );

}

