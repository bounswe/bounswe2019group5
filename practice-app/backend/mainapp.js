var oxfordApi = require('./getDataFromOxfordApi');
var wikiData = require('./getDataFromWikiData');

//oxfordApi.createRequestsForOxfordApi('en','book',(item) => {oxfordApi.sendRequestForOxfordApi(item);});


var renderedArray = wikiData.generateRenderedArray();
setTimeout(() => {

    renderedArray.forEach(element => {

        setTimeout(() => {
            oxfordApi.createRequestsForOxfordApi('en',element.name,element.imgUrl,(item) => {oxfordApi.sendRequestForOxfordApi(item);}) 

        }, 200);
    });

}, 2000);
