import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Statistics from "./statistics";
import Typography from '@material-ui/core/Typography';

export default function LangTab({selfProfile, attendedLang, userProfile}) {
    const [key, setKey] = React.useState('');

    return (
      <Tabs bg="secondary" text="white"  id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
        <Tab eventKey="ENGLISH" title="ENGLISH" //disabled={!attendedLang.includes('english') }
         >
           {selfProfile && <Statistics /> }
        </Tab>
        <Tab eventKey="TURKISH" title="TURKISH" //disabled={!attendedLang.includes('turkish') } 
        >
           {selfProfile && <Statistics /> }
        </Tab>
        <Tab eventKey="GERMAN" title="GERMAN" //disabled={!attendedLang.includes('german')} 
        >
           {selfProfile && <Statistics /> }
        </Tab>
      </Tabs>
    );
}