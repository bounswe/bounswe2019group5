import { LOGIN_REQUESTED, LOGIN, SIGNUP_REQUESTED, SIGNUP, LOGOUT_REQUESTED, LOGOUT } from "../actions";

const initialState = {
  loading: false,
  token: null,
  message: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        token: null,
        message: null,
        loading: true
      };

    case LOGIN:
      return {
        ...state,
        token: action.token,
        message: action.message,
        loading: false
      };

    case SIGNUP_REQUESTED:
      return {
        ...state,
        token: null,
        message: null,
        loading: true
      };

    case SIGNUP:
      return {
        ...state,
        token: action.token,
        message: action.message,
        loading: false
      };
    
    case LOGOUT_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    
    case LOGOUT:
      return {
        ...state,
        token: action.token,
        message: action.message,
        loading: false,
      };

    default:
      return state;
  }
};
