function Word(word, classId, definition, audio, image, wordType) {       
    this.word = word || null;
    this.classId = classId || null;
    this.definition = definition || null;
    this.audio = audio || null;
    this.image = image || null;
    this.wordType = wordType || null;
}

module.exports = Word;