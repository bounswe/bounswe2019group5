import { SET_SELECTED_LANGUAGE, USER_PROFILE_CLEAR, SET_TOKEN } from "../actions";

export const set_selected_language = (selectedLanguage) => {
  return dispatch => {
    dispatch({
      type: SET_SELECTED_LANGUAGE,
      selectedLanguage,
    });
  };
};

export const clear_user_profile = () => {
  return dispatch => {
    dispatch({
      type: USER_PROFILE_CLEAR,
    });
  };
};

export const set_token = (token) => {
  return dispatch => {
    dispatch({
      type: SET_TOKEN,
      token,
    });
  };
}
