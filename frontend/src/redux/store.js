import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import persistState from 'redux-localstorage';

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

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  persistState(),
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store
