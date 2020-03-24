console.log("from gameController.js");

// ********************************* //
// SEE SETUP FILE FOR VARIABLES INIT //
// ********************************* //


sendWord.addEventListener("click", getInput); // add eventlistener to the button (** DEV: not yet sure where to put this )
wordToGuess(); // pick the word to guess
console.log(toGuess); // (** DEV: log the picked word to console)
console.log(displayResult); // UI, empty string with locations for letters (** DEV: html array of div's)

function getInput(){
   	userGuess = input.value; // Set the userGuess to the input from user
	console.log(userGuess); // (** DEV: log the input word to console)
	checkGuess(userGuess); // check if the word is 6 letters, and if so, if it's an existing word in de database
	if (check === false){
		return;
	} else {
		turn++;
		evaluateWords(toGuess, userGuess);
		if (checkWin() === false){
			return;
		} else {
			return; // (** DEV: PLAY AGAIN ?!? )
		};
	}
}


//*-- ALL THE FUNCTIONS ARE BELOW -- *//

// Word picker
function wordToGuess (){
	let i = Math.round(Math.random() * (woordMetP.length-1));
	toGuess = woordMetP[i];  // Sets a word from the database to 'toGuess'
}

// Checks if the word is an excisting word and of the correct length.
function checkGuess(x){
	if (x.length < amountOfLetters || x.length > amountOfLetters){
			alert("The given word is not a " + amountOfLetters + " letter word");
			resetInput(); // is visual, see viewController.js
		check = false;
	} else if (woordMetP.indexOf(x) === -1){
			alert("The given word is not an existing " + amountOfLetters + " letter word starting with a " + startingLetter);
			resetInput(); // is visual, see viewController.js
		check = false;
	} else {
		check = true;
	}
}



// Evaluates the VALID userGuess vs the word toGuess for correct letters in the correct place, 
// or correct letters in the wrong place, and whether the word is correct;
function evaluateWords(toGuess, userGuess){

	displayResult = ""; // (** DEV console.log)
	
	for (let letter = 0; letter < amountOfLetters; letter++) {

		if (toGuess[letter] === userGuess[letter]){  // If the letter is correct and in the right location
			setVisual(turn.toString(), letter, userGuess[letter].toString(), "correct");
			displayResult += (toGuess[letter] + " "); // (** DEV console.log)
		} else if (toGuess.indexOf(userGuess[letter]) !== -1){ // If the letter is in the word (** DEV: NEEDS another check for doubles!)
			setVisual(turn.toString(), letter, userGuess[letter].toString(), "almost");
			displayResult += " *" + userGuess[letter] + "* "; // (** DEV console.log)
		} else {
			setVisual(turn.toString(), letter, userGuess[letter].toString(), "wrong");
			displayResult += " _ ";  // (**DEV console.log)
		}
	}
	console.log(displayResult);
	resetInput(); // is visual, see viewController.js	
}


function checkWin(){
		if (userGuess === toGuess){
			alert("SCORE, you guessed correctly");
		} else {
			return false;
		}
}



