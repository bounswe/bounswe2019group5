import {
	LOGIN_REQUESTED,
  LOGIN,
  SIGNIN_REQUESTED,
  SIGNIN,
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

    case SIGNIN_REQUESTED:
      return {
        ...state,
        token: "",
        status: -1,
        loading: true
      };

    case SIGNIN:
      return {
        ...state,
        token: action.token,
        status: action.status,
        loading: false
      };

    default:
      return state
  }
  
}
