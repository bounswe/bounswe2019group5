import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Statistics from "./statistics";

export default function LangTab({attendedLang}) {
    const [key, setKey] = React.useState('ENGLISH');
  
    return (
      <Tabs bg="secondary" text="white"  id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
        <Tab eventKey="ENGLISH" title="ENGLISH" disabled={!attendedLang.includes('english')} >
          <Statistics />
        </Tab>
        <Tab eventKey="TURKISH" title="TURKISH" disabled={!attendedLang.includes('turkish')} >
        <Statistics />
        </Tab>
        <Tab eventKey="GERMAN" title="GERMAN" disabled={!attendedLang.includes('german')} >
        <Statistics />
        </Tab>
      </Tabs>
    );
}