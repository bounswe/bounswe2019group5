import parameters from '../parameters'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const login = async (usernameOrEmail, password) => {
  const data = await fetch(parameters.apiUrl+'/user/login', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      email_username: usernameOrEmail,
      password: password,
    }),
  }).then(response => {
    console.log(response);
    return response.json();
  }).then(data => {
    console.log(data);
    return data;
  });
  console.log(data);
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

  return await fetch(parameters.apiUrl+'/user/register', {
    method: 'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      name,
      surname,
      email,
      username,
      password,
      native_language,
    }),
  }).then(response => {
    return response.json();
  }).then(data => {
    return data;
  });
};

export const logout = async () => {
  await timeout(500);
}
