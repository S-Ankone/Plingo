console.log("from the plingo_setup.js");

// INIT gameCONTROLLER //
let localisation = "Dutch";
let gameMode = "easy"; // (** DEV: hardcoded to be easy, possible other difficulties )

let input = document.getElementById("input");  // get the input text field/line
let sendInput = document.getElementById("jsSendInput"); // get the send button

let amountOfLetters = 6; // The amount of letters for this game session (**DEV: hard coded to 6 for Plingo)
let startingLetter = "P"; // The starting letter for this game session (**DEV: hard coded to "P" for Plingo)
const amountOfTurns = 5; //*** Index starts at 0 ; The amount of turns people get (** DEV: hardcoded to be 5)
let turn = 0; // The guessing turn, 1st try, 2nd try, etc.

let toGuess; // The game assigns the picked word to this variable
let userGuess; // Stores the word inputted by the user
let toGuessArray;  // Array to store all the letters for extensive evaluation.


// INIT scoreCONTROLLER //
let score = 0; // Keeping scores, init to ZERO;
let scoreBase = 100; // keep in relation to correctPoinst && almostPoints; Base value for score keeping 
let wordScore = amountOfLetters * scoreBase;// total points for a correct word
let correctPoints = 0.5 * scoreBase;
let almostPoints = 0.2 * scoreBase;
let toScoreArray; // Stores rest scores for putting a letter in the right location;


// INIT viewCONTROLLER //
let visualTimer = 865; // play timer 865;
let displayResult = " _ _ _ _ _ _ "; // (**DEV: A variable to display on console.log )

buildBoard();

function buildBoard(){

	clearBoard();

	let firstLetter = document.getElementsByClassName("first");
	for (i = 0; i < amountOfTurns; i++){
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
