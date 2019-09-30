import {
	LOGIN_REQUESTED,
	LOGIN,
} from '../actions';

import login_api from '../../api/authentication/login';

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
