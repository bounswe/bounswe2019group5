function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const login = async (
    usernameOrEmail, 
    password
) => {
	await timeout(3000);
	if (usernameOrEmail==="user" && password==="12345678") {
		return {token: "this is a token", status: 0};
	}
	else {
		return {token: null, status: -1};
	}
}

export const signin = async (
    name,
    surname,
    email,
    user_name,
    password,
    native_language
  ) => {

    await timeout(3000);
    if (
      name === "Mert" &&
      surname === "Maysallar" &&
      email === "mmaysallar@gmail.com" &&
      user_name === "MM" &&
      password === "12345678" &&
      native_language === "Turkish"
    ) {
      return { token: "this is a signed user token", status: 0 };
    } else {
      return { token: null, status: -1 };
    }
    
  };
