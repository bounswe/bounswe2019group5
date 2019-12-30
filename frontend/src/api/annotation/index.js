import parameters from '../parameters'
import axios from 'axios';

export const send_annotation = async (token, annotation) => {

    let newAnnotation = await axios
        .post(parameters.apiUrl+'/annotation/',
            {
                body: annotation.body,
                target: annotation.target,
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
                message: 'Annotation Cannot Send!',
            };
        });
    
    return newAnnotation;
}

export const get_annotations = async (token, source) => {

    let profile = await axios
        .get( parameters.apiUrl + "/annotation/",
            {
                params: {
                    source,
                },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Token "+token,
                },
                timeout: 10000
            }
        )
        .then(response => response.data)
        .catch(err => {
            return {
                message: err.response ? err.response.data.message : "Connection Error!"
            };
        });

    return profile;
        
};