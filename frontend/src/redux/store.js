import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import persistState from 'redux-localstorage';
import {composeWithDevTools} from 'redux-devtools-extension';

const initialState = {}
const enhancers = []
const middleware = [
  thunk
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  persistState('userInfo'),
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
