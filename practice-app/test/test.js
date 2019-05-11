const expect = require('chai').expect;

var createExercise = require('../libs/create-exercise').createExercise;
var getWordsOfAClass = require('../libs/create-exercise').getWordsOfAClass;
var wikiData = require('../libs/getDatafromWikiData');

describe('createExercise()',function(){
    it("should questions randomized",async () => {
        var wikiDataArray = await wikiData.generateRenderedArray('Q42889');
        var arr = [];
        for (var i=0; i<100; i++) {
            arr.push(await createExercise(wikiDataArray));
            for (var j=0; j<i; j++)
                expect(arr[i]).to.not.deep.equal(arr[j]);
        }
    });
  });

  describe('getWordsOfAClass()',function(){
    it("should exercises object",async () => {
      var q = await getWordsOfAClass('Q42889');
      expect(q).to.have.property("exerciseId");
      expect(q).to.have.property("questions");

      var questions = q.questions;
      expect(Array.isArray( questions )).to.equal(true);
      expect(questions).to.have.lengthOf(4);
      for (var i=0; i<4; i++) {
        var question = questions[i];
        expect(question).to.have.property("imageUrl");
        expect(question.imageUrl).to.be.a('string');

        expect(question).to.have.property("A");
        expect(question.A).to.be.a('string');

        expect(question).to.have.property("B");
        expect(question.B).to.be.a('string');

        expect(question).to.have.property("C");
        expect(question.C).to.be.a('string');

        expect(question).to.have.property("D");
        expect(question.D).to.be.a('string');
      }

    });
  });