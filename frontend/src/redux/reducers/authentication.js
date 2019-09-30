import {
	LOGIN_REQUESTED,
	LOGIN,
} from '../actions';

const initialState = {
  loading: false,
  token: "",
  status: -1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        token: "",
		status: -1,
		loading: true,
      }

    case LOGIN:
      return {
        ...state,
		token: action.token,
		status: action.status,
		loading: false,
      }

    default:
      return state
  }
}
