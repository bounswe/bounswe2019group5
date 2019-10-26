import { SET_SELECTED_LANGUAGE, USER_PROFILE_CLEAR, SET_TOKEN } from "../actions";

const initialState = {
  selectedLanguage: null,
  username: null,
  email: null,
  firstName: null,
  lastName: null,
  userNativeLang: null,
  userAttendedLangs: [],
  userRateAverage: 0,
  userComments: [],
  
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.selectedLanguage,
      };

    case USER_PROFILE_CLEAR:
      return {
        ...state,
        ...initialState,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
};
