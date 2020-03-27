console.log("from the plingo_setup.js");

// INIT gameCONTROLLER //
let localisation = "Dutch";

let input = document.getElementById("input");  // get the input text field/line
let sendInput = document.getElementById("jsSendInput"); // get the send button

let amountOfLetters = 6; // The amount of letters for this game session (**DEV: hard coded to 6 for Plingo)
let startingLetter = "P"; // The starting letter for this game session (**DEV: hard coded to "P" for Plingo)
const amountOfTurns = 4; //*** Index starts at 0 ; The amount of turns people get (** DEV: hardcoded to be 5)
let turn = 0; // The guessing turn, 1st try, 2nd try, etc.

let score = 0; // Keeping scores
let points = 100; // Points for a correct word

let toGuess; // The game assigns the picked word to this variable
let userGuess; // Stores the word inputted by the user



// INIT viewCONTROLLER //
let visualTimer = 865;
let displayResult = " _ _ _ _ _ _ "; // (**DEV: A variable to display on console.log )

buildBoard();

function buildBoard(){

	clearBoard();

	let firstLetter = document.getElementsByClassName("first");
	for (i = 0; i <= amountOfTurns; i++){
		firstLetter[i].textContent = startingLetter;
		firstLetter[i].classList.add("correct");
	}
}

function clearBoard(){
	let display = document.getElementsByClassName("letter");
	for (i = 0; i < display.length; i++){
		display[i].textContent = undefined;
		display[i].classList.remove("correct");
		display[i].classList.remove("almost");
		display[i].classList.remove("wrong");
		display[i].classList.remove("error");		
	}
}
