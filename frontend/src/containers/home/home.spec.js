import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {Router} from 'react-router-dom'
import reducer from '../../redux/reducers'
import { render, fireEvent } from '@testing-library/react'
import Home from '../home';


const initialState = {
    userInfo: null
}


function renderWithRedux(
    ui,
    { initialState, store = createStore(reducer, initialState, applyMiddleware(thunk)) } = {}
) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store,
    }
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  renderWithRedux(<Router><Home/></Router>, { initialState })
  ReactDOM.unmountComponentAtNode(div);
});