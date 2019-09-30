import { combineReducers } from 'redux'
import counter from './counter'
import authentication from './authentication'

const rootReducer = combineReducers({
	counter,
	authentication,
})

export default rootReducer
