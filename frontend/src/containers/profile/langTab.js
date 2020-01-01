import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Statistics from "./statistics";
import Typography from '@material-ui/core/Typography';

//this is a small component to reduce code size
//each language will have statistics of its own
export default function LangTab({userInfo, attendedLang, writings}) {
    const [key, setKey] = React.useState('');
    var langs = [];
    var json;
    for (json of attendedLang) {
      langs.push(json.language)
    }
    return (
      <>
      <Typography variant="h6" gutterBottom>
      You can view the statistics of your learning progress of the languages you're learning.
      </Typography>
      <Tabs text="white"  size="big" id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
        <Tab eventKey="ENGLISH" title="ENGLISH" disabled={!langs.includes('english') }
         >
           {<Statistics userInfo={userInfo} language={"english"} writings={writings}/> }
        </Tab>
        <Tab eventKey="TURKISH" title="TURKISH" disabled={!langs.includes('turkish')  } 
        >
           {<Statistics userInfo={userInfo} language={"turkish"} writings={writings}/> }
        </Tab>
        <Tab eventKey="GERMAN" title="GERMAN" disabled={!langs.includes('german')} 
        >
           {<Statistics userInfo={userInfo} language={"german"} writings={writings}/> }
        </Tab>
      </Tabs>
      </>
    );
}