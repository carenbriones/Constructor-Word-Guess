var Word = require("./word.js");
var inquirer = require("inquirer");

var wordBank = ["happy", "energetic", "angry", "sleepy", "hungry", "upset"];
var randomIndex = Math.floor(Math.random() * wordBank.length);
var randomWord = new Word(wordBank[randomIndex]);
const maxGuesses = 10;
var guessesLeft = maxGuesses;

console.log(randomWord.convertToString());
playRound();

// Asks user to guess the word
function playRound() {
    inquirer.prompt([{
        name: "guess",
        message: "Guess a letter: ",
        type: "input"
    }]).then(function(inquirerResponse) {
        var preGuess = randomWord.convertToString();

        randomWord.guessLetters(inquirerResponse.guess);
        var postGuess = randomWord.convertToString();

        // If the word does not change after the guess, guess was incorrect.
        if (preGuess === postGuess) {
            console.log("\nIncorrect :(");
            guessesLeft -= 1;
        } else { // Else, word changed, so guess was correct
            console.log("\nCorrect!!!");
        }

        console.log("\n" + postGuess + "\n");
        console.log("Guesses left: " + guessesLeft + "\n");

        if (guessesLeft === 0) {
            // Game is over
            console.log("Game over :(");
            // Continues game if there are still blanks to fill in
        } else if (randomWord.convertToString().includes("_")) {
            playRound();
        } else { // No more blanks, player has won the game
            console.log("You've won!");
        }
    })
}