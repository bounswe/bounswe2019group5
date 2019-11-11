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