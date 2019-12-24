import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {Router} from 'react-router-dom'
import reducer from '../../redux/reducers'
import {createMemoryHistory} from 'history'
import { render, fireEvent } from '@testing-library/react'
import Search from '.'

const initialState = {
    search: {
        input: "",
        searchedExercises: {
            searchedExercisesWT: null, //with tag=input
            searchedExercisesWK: null
        },
        searchedUsers: [
            {
                "id": 0,
                "username": "selmos",
                "first_name": "selma",
                "last_name": "string",
                "native_language": "turkish",
            }
        ]
    }
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

it('redirect correctly when button is clicked', () => {
    const history = createMemoryHistory()
    const { container, getByText } = renderWithRedux(<Router history={history}><Search/></Router>, { initialState })

    const button = getByText('Send Essay Reviewing Request')

    fireEvent(button, new MouseEvent('click', { bubbles: true, cancelable: true }))

    expect(container.querySelector('main h1').innerHTML).toBe('Upload Your Writing Here!')
    expect(window.location.pathname).toBe('/upload-writing/' + 'selmos')
})