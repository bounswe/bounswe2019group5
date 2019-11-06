import { LOGIN_REQUESTED, LOGIN, SIGNUP_REQUESTED, SIGNUP, LOGOUT_REQUESTED, LOGOUT, SET_TOKEN, USER_PROFILE_CLEAR, AUTHENTICATION_CLEAR, USER_PROFILE_SET, } from "../actions";

import { login as login_api } from "../../api/authentication";
import { signup as signup_api } from "../../api/authentication";
import { logout as logout_api } from "../../api/authentication";
import { get_user_profile as get_user_profile_api } from "../../api/userInfo";
import { set_user_profile } from "./userInfo";

export const login = (usernameOrEmail, password) => {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUESTED
    });

    login_api(usernameOrEmail, password).then(response => {
      if (response.token) {
        dispatch({
          type: SET_TOKEN,
          token: response.token,
          username: usernameOrEmail, 
        });

        get_user_profile_api(response.token, usernameOrEmail)
          .then(profile => {
            dispatch({
              type: USER_PROFILE_SET,
              profile,
            });

            dispatch({
              type: LOGIN,
              token: response.token,
              message: response.message,
            });

          });
      }
      else {

        dispatch({
          type: LOGIN,
          token: response.token,
          message: response.message,
        });

      }
    });
  };
};

export const signup = (
  name,
  surname,
  email,
  username,
  password,
  native_language
) => {
  return dispatch => {
    dispatch({
      type: SIGNUP_REQUESTED
    });

    signup_api(name, surname, email, username, password, native_language).then(
      response => {
        if (response.token) {
          dispatch({
            type: SET_TOKEN,
            token: response.token,
            username, 
          });

          get_user_profile_api(response.token, username)
            .then(profile => {

              dispatch({
                type: USER_PROFILE_SET,
                profile,
              });

              dispatch({
                type: LOGIN,
                token: response.token,
                message: response.message,
              });

            });
        }
        else {

          dispatch({
            type: LOGIN,
            token: response.token,
            message: response.message,
          });
          
        }
      }
    );
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT_REQUESTED,
    });

    logout_api().then(() => {
      dispatch({
        type: LOGOUT,
        token: null,
        message: null,
      });
      dispatch({
        type: USER_PROFILE_CLEAR,
      });
    });


  }
}

export const clear_authentication = () => {
	return dispatch => {
		dispatch({
			type : AUTHENTICATION_CLEAR,
		});
	}
}
