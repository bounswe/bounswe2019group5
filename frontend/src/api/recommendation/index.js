import parameters from "../parameters";
import axios from "axios";

export const get_user_recommendations = async (token, language) => {
  return await axios
    .get(parameters.apiUrl + "/recommendation/", {
      params: {
        language
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token
      },
      timeout: 10000
    })
    .then(response => {
      return response
              .data
              .sort((a,b) => (b.rating_average-a.rating_average));
    })
    .catch(err => {
      return {
        message: err.response ? err.response.data.message : "Connection Error!"
      };
    });
};