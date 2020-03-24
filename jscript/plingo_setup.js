console.log("from the plingo_setup.js");

// INIT gameCONTROLLER //
let toGuess; // The game assigns the picked word to this variable
let userGuess; 
let sendWord = document.getElementById("jsSendInput"); // get the send button
let turn = 0; // the guessing turn, 1st try, 2nd try, etc.
const amountOfTurns = 5;  // The amount of turns people get (** DEV: hardcoded to be 5)
let amountOfLetters = 6; // The amount of letters for this game session (**DEV: hard coded for Plingo)
let startingLetter = "p"; // The starting letter for this game session (**DEV: hard coded for Plingo)
let check; // a check variable Boolean for the do/while loop.
let displayResult = " _ _ _ _ _ _ "; // a variable to display after evaluation of the words (**DEV: to be an Array of Letters)


// INIT viewCONTROLLER //
let beginLetter = "P";  // (** DEV: beginLetter hardcoded voor Plingo als "P")
let input = document.getElementById("input");
let eersteLetter = document.getElementsByClassName("eerste");
for (i = 0; i < amountOfTurns; i++){
	eersteLetter[i].textContent = beginLetter;
	eersteLetter[i].classList.add("correct");
}