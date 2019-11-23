import { GET_WRITINGS, GET_WRITINGS_REQUESTED } from "../actions";

import { get_essays as get_essays_api } from "../../api/writing/ListEssays";

export const get_essays = (token) => {
  return dispatch => {
    dispatch({
      type: GET_WRITINGS_REQUESTED
    });
    get_essays_api(token).then(response => {
      dispatch({
        type: GET_WRITINGS,
        writing: response
      });
    });
  };
};