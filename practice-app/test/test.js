var assert = require('assert');



var getWordsOfAClass = require('../libs/create-exercise');

var expected_object = {
  "exerciseId":26,
  "questions":[
    {
      "imageUrl":"http://commons.wikimedia.org/wiki/Special:FilePath/PurportedUFO2.jpg",
      "A":"unidentified flying object",
      "B":"ice resurfacer",
      "C":"spacecraft",
      "D":"rocket"},
    {
      "imageUrl":"http://commons.wikimedia.org/wiki/Special:FilePath/Auto-rickshaw.JPG",
      "A":"autorickshaw",
      "B":"taxi",
      "C":"hovercraft",
      "D":"trailer"},
    {
      "imageUrl":"http://commons.wikimedia.org/wiki/Special:FilePath/Bulls%20Wild%20Cup%201%20%28Modell%202010%29%2020100814.jpg",
      "A":"mountain bike",
      "B":"unicycle",
      "C":"bi-directional vehicle",
      "D":"launch vehicle"},
    {
      "imageUrl":"http://commons.wikimedia.org/wiki/Special:FilePath/WarringtonPerambulatingLibrary.jpg",
      "A":"bookmobile",
      "B":"three-wheeler",
      "C":"power car",
      "D":"weather balloon"
    }]};

describe('getWordsOfAClass()',function(){
  it("should exercises object",function(){
    var returnvalue = getWordsOfAClass('Q42889');
    assert.equal(returnvalue,expected_object);
  });
});

