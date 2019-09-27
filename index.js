var Word = require("./word.js");
var inquirer = require("inquirer");

var wordBank = ["blissful", "delighted", "joyous", "jubilant", "ecstatic", "euphoric", "overjoyed", "appeased", "thrilled", "cheerful", "merry", "jubilant"];
var randomIndex = Math.floor(Math.random() * wordBank.length);
var randomWord = new Word(wordBank[randomIndex]);
const MAX_GUESSES = 10;
var guessesLeft = MAX_GUESSES;

playRound();

// Asks user to guess the word
function playRound() {
    // Displays current state of guessed word
    console.log("\n" + randomWord.convertToString() + "\n");

    inquirer.prompt([{
        name: "guess",
        message: "Guess a letter: ",
        type: "input"
    }]).then(function(inquirerResponse) {
        // Stores current state (or String) of the word prior to the user's guess
        var preGuess = randomWord.convertToString();

        // Guesses if the letter is in the word
        randomWord.guessLetters(inquirerResponse.guess);
        var postGuess = randomWord.convertToString();

        // If the word does not change after the guess, guess was incorrect.
        if (preGuess === postGuess) {
            console.log("\nIncorrect :(");
            guessesLeft -= 1;
            console.log("Guesses left: " + guessesLeft + "\n");
        }
        // Else, word changed, so guess was correct
        else {
            console.log("\nCorrect!!!");
        }

        // Game is over
        if (guessesLeft === 0) {
            console.log("Game over :(");
            promptNewGame();
        }
        // Continues game if there are still blanks to fill in
        else if (randomWord.convertToString().includes("_")) {
            playRound();
        }
        // No more blanks, player has won the game
        else {
            console.log("You've won! \n");
            promptNewGame();
        }
    })
}

// Asks user if they want to play again
function promptNewGame() {
    inquirer.prompt([{
        name: "playAgain",
        message: "Would you like to play again?",
        type: "confirm"
    }]).then(function(inquirerResponse) {
        // If user confirms, reset game and play a new round
        if (inquirerResponse.playAgain) {
            resetGame();
            playRound();
        }
    })
}

// Resets game stats to play a new game
function resetGame() {
    guessesLeft = MAX_GUESSES;
    randomIndex = Math.floor(Math.random() * wordBank.length);
    randomWord = new Word(wordBank[randomIndex]);
}