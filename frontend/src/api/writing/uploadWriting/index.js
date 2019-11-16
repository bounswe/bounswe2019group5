import parameters from '../../parameters'
import axios from 'axios';

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export const upload_writing = async (token, language, file, reviewer) => {

    var bodyFormData = new FormData();
    bodyFormData.set('language', language);
    if (reviewer)
        bodyFormData.set('reviewer', reviewer);
    bodyFormData.set('writing', file);

    const data = await axios({
        method: 'post',
        url: parameters.apiUrl+'/essay/',
        data: bodyFormData,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token "+token,
        },
    })
    .then(response => response.data)
    .catch(err => 
    {
        return {
            message: 'File cannot Uploaded!'
        };
    });
    
    console.log(data);
    timeout(10000);
  
    return data;
  };