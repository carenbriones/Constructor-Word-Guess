function Letter(character) {
    this.character = character;
    this.guessed = false;
}

Letter.prototype.convertToString = function() {
    // If letter has been guessed, return the character
    if (this.guessed) {
        return this.character + " ";
    } else { // Else, return an underscore placeholder
        return "_ ";
    }
}

Letter.prototype.letterCheck = function(letter) {
    if (this.character === letter) {
        this.guessed = true;
    }
}

module.exports = Letter;