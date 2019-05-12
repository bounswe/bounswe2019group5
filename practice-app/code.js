console.log("sadf");

require('dotenv').config();

async function quickstart(
  projectId = 'practice-app-1557615265421' // Your GCP Project Id
) {
  // Imports the Google Cloud client library
  const {Translate} = require('@google-cloud/translate');

  // Instantiates a client
  const translate = new Translate({
    projectId
  });

  // The text to translate
  const text = 'Hello, world!';

  // The target language
  const target = 'tr';

  // Translates some text into Russian
  const [translation] = await translate.translate(text, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
}

quickstart()