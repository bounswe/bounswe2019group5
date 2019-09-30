import { SIGNIN_REQUESTED, SIGNIN } from "../actions";

import signin_api from "../../api/authentication/signin";

export const signin = (
  name,
  surname,
  email,
  user_name,
  password,
  native_language
) => {
  return dispatch => {
    dispatch({
      type: SIGNIN_REQUESTED
    });

    signin_api(name, surname, email, user_name, password, native_language).then(
      response => {
        dispatch({
          type: SIGNIN,
          token: response.token,
          status: response.status
        });
      }
    );
  };
};
