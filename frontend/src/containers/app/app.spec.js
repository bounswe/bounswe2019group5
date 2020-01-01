import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom'
import App from '.';
import {createMemoryHistory} from 'history'


it('renders without crashing', () => {
  const div = document.createElement('div');
  const history = createMemoryHistory()

  ReactDOM.render(<Router history={history} ><App/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});