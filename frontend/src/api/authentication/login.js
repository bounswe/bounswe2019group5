function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const login = async (usernameOrEmail, password) => {
	await timeout(3000);
	if (usernameOrEmail==="user" && password==="12345678") {
		return {token: "this is a token", status: 0};
	}
	else {
		return {token: null, status: -1};
	}
}
export default login
