function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const signin = async (
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
export default signin;
