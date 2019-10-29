import parameters from '../parameters'
import axios from 'axios';

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const login = async (usernameOrEmail, password) => {

  const data = await axios
    .post(parameters.apiUrl+'/login/',
      {
        email_username: usernameOrEmail,
        password: password,
      },
      {
        headers: {'Content-Type':'application/json'},
        timeout: 10000,
      }
    )
    .then(response => response.data)
    .catch(err => 
      {
        return {
          token: null,
          message: err.response? err.response.data.message : 'Connection Error!',
        };
      }
    );

  return data;
};

export const signup = async (
  name,
  surname,
  email,
  username,
  password,
  native_language
) => {

  const data = await axios
    .post(parameters.apiUrl+'/register/',
      {
        name,
        surname,
        email,
        username,
        password,
        native_language,
      },
      {
        headers: {'Content-Type':'application/json'},
        timeout: 10000,
      }
    )
    .then(response => response.data)
    .catch( err => 
      {
        return {
          token: null,
          message: err.response? err.response.data.message : 'Connection Error!',
        };
      }
    );

  return data;
};

export const logout = async () => {
  await timeout(500);
}
