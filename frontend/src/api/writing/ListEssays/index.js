import parameters from "../parameters";
import axios from "axios";

export const get_essays = async (token) => {
  return await axios
    .get(parameters.apiUrl + "/essay/", {
      params: {
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