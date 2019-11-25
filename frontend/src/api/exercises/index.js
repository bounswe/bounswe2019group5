import parameters from "../parameters";
import axios from "axios";

export const get_vocabulary_test = async (token, language) => {
  return await axios
    .get(parameters.apiUrl + "/search/", {
      params: {
        language,
        type: "vocabulary"
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token
      },
      timeout: 10000
    })
    .then(response => response.data[0])
    .catch(err => {
      return {
        message: err.response ? err.response.data.message : "Connection Error!"
      };
    });
};

export const get_grammar_test = async (token, language) => {
  return await axios
    .get(parameters.apiUrl + "/search/", {
      params: {
        language,
        type: "grammar"
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token
      },
      timeout: 10000
    })
    .then(response => response.data[0])
    .catch(err => {
      return {
        message: err.response ? err.response.data.message : "Connection Error!"
      };
    });
};

export const get_listening_test = async (token, language) => {
  return await axios
    .get(parameters.apiUrl + "/search/", {
      params: {
        language,
        type: "listening"
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token
      },
      timeout: 10000
    })
    .then(response => response.data[0])
    .catch(err => {
      return {
        message: err.response ? err.response.data.message : "Connection Error!"
      };
    });
};

export const search_test = async (token, tag, keyword, language, type) => {
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
  .then(response => response.data[0])
  .catch(err => {
    return {
      message: err.response ? err.response.data.message : "Connection Error!"
    };
  });
};
