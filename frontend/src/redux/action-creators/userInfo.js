import { SET_SELECTED_LANGUAGE, USER_PROFILE_CLEAR, SET_TOKEN, USER_PROFILE_SET, OTHER_USER_PROFILE_SET } from "../actions";

import { get_user_profile as get_user_profile_api } from "../../api/userInfo";

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

export const set_token = (token, username) => {
  return dispatch => {
    dispatch({
      type: SET_TOKEN,
      token,
      username,
    });
  };
}

export const set_other_user_profile = (token, username) => {
  return dispatch => {
    get_user_profile_api(token)
      .then(profile => {
        dispatch({
          type: OTHER_USER_PROFILE_SET,
          profile,
        });
      });
  };
}
