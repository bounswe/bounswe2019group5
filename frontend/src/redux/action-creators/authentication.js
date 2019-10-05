import {
	LOGIN_REQUESTED,
	LOGIN,
	SIGNIN_REQUESTED,
	SIGNIN,
} from '../actions';

import {login as login_api} from '../../api/authentication';
import {signin as signin_api} from '../../api/authentication';

export const login = (usernameOrEmail, password) => {
	return dispatch => {
		dispatch({
			type : LOGIN_REQUESTED
		});

		login_api(usernameOrEmail, password)
			.then(response => {
				dispatch({
					type : LOGIN,
					token : response.token,
					status : response.status,
				});
			});
	}
}

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
