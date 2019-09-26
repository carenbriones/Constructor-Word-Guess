var Word = require("./word.js");
var inquirer = require("inquirer");

var wordBank = ["happy", "energetic", "angry", "sleepy", "hungry", "upset"];
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
        var preGuess = randomWord.convertToString();

        randomWord.guessLetters(inquirerResponse.guess);
        var postGuess = randomWord.convertToString();

        // If the word does not change after the guess, guess was incorrect.
        if (preGuess === postGuess) {
            console.log("\nIncorrect :(");
            guessesLeft -= 1;
            console.log("Guesses left: " + guessesLeft + "\n");
        } else { // Else, word changed, so guess was correct
            console.log("\nCorrect!!!");
        }

        if (guessesLeft === 0) {
            // Game is over
            console.log("Game over :(");
            promptNewGame();
            // Continues game if there are still blanks to fill in
        } else if (randomWord.convertToString().includes("_")) {
            playRound();
        } else { // No more blanks, player has won the game
            console.log("You've won! \n");
            promptNewGame();
        }
    })
}

function promptNewGame() {
    inquirer.prompt([{
        name: "playAgain",
        message: "Would you like to play again?",
        type: "confirm"
    }]).then(function(inquirerResponse) {
        if (inquirerResponse.playAgain) {
            resetGame();
            playRound();
        }
    })
}

function resetGame() {
    guessesLeft = MAX_GUESSES;
    randomIndex = Math.floor(Math.random() * wordBank.length);
    randomWord = new Word(wordBank[randomIndex]);
}