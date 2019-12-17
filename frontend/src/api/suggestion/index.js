import parameters from '../parameters'
import axios from 'axios';

export const suggest_exercise = async (token, exercise) => {

    let newExercise = await axios
        .post(parameters.apiUrl+'/suggest/',
            {
                ...exercise,
            },
            {
                headers: {
                    'Content-Type':'application/json',
                    'Authorization': 'Token '+token,
                },
                timeout: 10000,
            }
        )
        .then(response => response.data)
        .catch(err => {
            return {
                message: err.response.data ? "Some fields are empty. You should add keyword(s), tag(s). All question bodies should be non-empty. All options should be non-empty. ": "Connection Error!",
            };
        });
    
    return newExercise;
}