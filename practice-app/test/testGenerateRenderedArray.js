const expect = require('chai').expect;

var wikiData = require('../libs/getDatafromWikiData');

describe('generateRenderedArray()',function(){
    it("should not return more than 30 items",async () => {
        var wikiDataArray = await wikiData.generateRenderedArray('Q42889');
        expect(wikiDataArray.length).to.be.lessThan(31);
    });
});

describe('generateRenderedArray()',function(){
    it("should return empty array with non-valid class id",async () => {
        var wikiDataArray = await wikiData.generateRenderedArray('KF2114123');
        expect(wikiDataArray.length).to.be.equals(0);
    });
});

describe('generateRenderedArray()',function(){
    it("each item should have name and imgUrl fields",async () => {
        var wikiDataArray = await wikiData.generateRenderedArray('Q42889');
        for (var i=0; i<wikiDataArray.length; i++) {
            expect(wikiDataArray[i]).to.have.property("name");
            expect(wikiDataArray[i]).to.have.property("imgUrl");
            expect(wikiDataArray[i].name).to.be.a('string');
            expect(wikiDataArray[i].imgUrl).to.be.a('string');
        }
    });
});

describe('generateRenderedArray()',function(){
    it("each item should be unique",async () => {
        var wikiDataArray = await wikiData.generateRenderedArray('Q42889');
        for (var i=0; i<wikiDataArray.length; i++) {
            for(var j = i+1; j < wikiDataArray.length; j++) {
                expect(wikiDataArray[i]).to.not.deep.equal(wikiDataArray[j]);
            }
        }
    });
});