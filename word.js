var Letter = require("./letter.js");

function Word(word) {
    this.letters = [];
    for (var i = 0; i < word.length; i++) {
        this.letters.push(new Letter(word[i]));
    }

    this.convertToString = function() {
        var str = "";
        for (var i = 0; i < this.letters.length; i++) {
            str += this.letters[i].convertToString();
        }
    }

    this.guessLetters = function(character) {
        for (var i = 0; i < this.letters.length; i++) {
            this.letters[i].letterCheck(character);
        }
    }
}

var word = new Word("Twice");
word.guessLetters("T");
console.log(word);