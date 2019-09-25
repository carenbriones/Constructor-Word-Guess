var Word = require("./word.js");
var inquirer = require("inquirer");

var wordBank = ["happy", "sad", "angry", "sleepy", "hungry", "upset"];
var randomIndex = Math.floor(Math.random() * wordBank.length);
var randomWord = new Word(wordBank[randomIndex]);

console.log(randomWord.convertToString());
playRound();

// Asks user to guess the word
function playRound() {
    inquirer.prompt([{
        name: "guess",
        message: "Guess a letter: ",
        type: "input"
    }]).then(function(inquirerResponse) {
        randomWord.guessLetters(inquirerResponse.guess);
        console.log(randomWord.convertToString());
        if (randomWord.convertToString().includes("_")) {
            playRound();
        } else {
            console.log("You've won!");
        }
    })
}