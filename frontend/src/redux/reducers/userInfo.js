import { SET_SELECTED_LANGUAGE, USER_PROFILE_CLEAR, SET_TOKEN, USER_PROFILE_SET, OTHER_USER_PROFILE_SET } from "../actions";

const initialState = {

  selectedLanguage: null,
  token: null,

  userProfile: null,
  otherUserProfile: null,

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
        username: action.username,
      };

    case USER_PROFILE_SET:
      return {
        ...state,
        userProfile: action.profile,
      };

    case OTHER_USER_PROFILE_SET:
        return {
          ...state,
          otherUserProfile: action.profile,
        };

    default:
      return state;
  }
};
