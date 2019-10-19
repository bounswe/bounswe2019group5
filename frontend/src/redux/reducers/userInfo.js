import { SET_SELECTED_LANGUAGE } from "../actions";

const initialState = {
  selectedLanguage: '',
  username: null,
  email: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.selectedLanguage,
      };

    default:
      return state;
  }
};
