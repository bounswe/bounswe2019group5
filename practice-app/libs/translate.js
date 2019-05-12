async function translate(text, toLang="en") {
    require('dotenv').config();

    const {Translate} = require('@google-cloud/translate');
    const translate = new Translate({
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });

    const [translation] = await translate.translate(text, toLang);

    return translation;

}

module.exports = {translate};