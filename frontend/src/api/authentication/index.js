import parameters from '../parameters'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const login = async (usernameOrEmail, password) => {
  
  /*fetch(parameters.apiUrl+'/user/login', {
    method: 'post',
    body: {
      email_username: usernameOrEmail,
      password,
    },
  }).then(response => {
    console.log(response);
    return response.json();
  }).then(data => {
    //console.log(data);
  });*/

  await timeout(3000);
  if (usernameOrEmail === "user" && password === "12345678") {
    return { token: "this is a token", status: 0 };
  } else {
    return { token: null, status: -1 };
  }
};

export const signup = async (
  name,
  surname,
  email,
  user_name,
  password,
  native_language
) => {
  await timeout(3000);
  if (
    name === "mert" &&
    surname === "maysallar" &&
    email === "mmaysallar@gmail.com" &&
    user_name === "mm" &&
    password === "12345678" &&
    native_language === "turkish"
  ) {
    return { token: "this is a signed up user token", status: 0 };
  } else {
    return { token: null, status: -1 };
  }
};
