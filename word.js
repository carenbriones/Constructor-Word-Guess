var Letter = require("./letter.js");

function Word(word) {
    this.letters = [];
    for (var i = 0; i < word.length; i++) {
        this.letters.push(new Letter(word[i]));
    }

    this.convertToString = function() {
        // Converts the word to a string of underscores and/or letters
        var str = "";
        for (var i = 0; i < this.letters.length; i++) {
            str += this.letters[i].convertToString();
        }
        return str;
    }

    this.guessLetters = function(character) {
        // Guesses the character for each letter in the word
        for (var i = 0; i < this.letters.length; i++) {
            this.letters[i].letterCheck(character);
        }
    }
}

module.exports = Word;