import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Statistics from "./statistics";
import Typography from '@material-ui/core/Typography';

export default function LangTab({userInfo, attendedLang, writings}) {
    const [key, setKey] = React.useState('');
    var langs = [];
    var json;
    console.log(attendedLang);
    for (json of attendedLang) {
      langs.push(json.language)
    }
    console.log(langs);
    return (
      <Tabs bg="secondary" text="white"  id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
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
    );
}