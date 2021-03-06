import parameters from "../parameters";
import axios from "axios";

export const search_users = async (token, language, username) => {
  return await axios
    .get(parameters.apiUrl + "/users/", {
        params: {
            language,
            username
          },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token
      },
      timeout: 10000
    })
    .then(response => response.data)
    .catch(err => {
      return {
        message: err.response ? err.response.data.message : "Connection Error!"
      };
    });
};

export const search_exercises = async (token, tag, keyword, language, type) => {
  return await axios
    .get(parameters.apiUrl + "/search/", {
      params: {
        tag,
        keyword,
        language,
        type
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token
      },
      timeout: 10000
    })
    .then(response => response.data)
    .catch(err => {
      return {
        message: err.response ? err.response.data.message : "Connection Error!"
      };
    });
};