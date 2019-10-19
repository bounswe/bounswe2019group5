import { SET_SELECTED_LANGUAGE } from "../actions";

export const set_selected_language = (selectedLanguage) => {
  return dispatch => {
    dispatch({
      type: SET_SELECTED_LANGUAGE,
      selectedLanguage,
    });
  };
};
