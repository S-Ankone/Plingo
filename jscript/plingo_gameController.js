console.log("from gameController.js");

// ********************************* //
// SEE INIT FILE FOR VARIABLES INIT //
// ********************************* //


sendInput.addEventListener("click", doGame); // *** CYCLES MAIN GAME LOGIC *** //
wordToGuess(); // PICK the WORD to guess
toGuessArray = toLetterArray(toGuess); // puts the word into an array format for more extensive evaluation
toScoreArray = [];

console.log(displayResult); // (** DEV - console UI, empty string with locations for letters)

function doGame(){  //*** MAIN GAME LOGIC ***//

console.log("=================");
console.log("NEW GUESS STARTED");
console.log("=================");
console.log(toGuess); // (** DEV: log the picked word to console)	

	userGuess = escapeHtml(input.value); // Set the userGuess to the input from user

console.log(userGuess); // (** DEV: log the input word to console)
console.log("toGuessArray at the start of the turn");
console.log(toGuessArray);
	
  if (checkGuess(userGuess) === false){   // check if the word is 6 letters, and if so, if it's an existing word in de database
		if(gameMode === "easy"){
			return;
		} else {   // At harder difficulty a wrong input advances the turn...
			// Some USERFEEDBACK
			turn++;  
			//SET THE NEXT PLAYER !!
			return;
		}
	} else {
	   upTurn();		
	   evaluateWords(toGuess, userGuess);
	}	
  doLog(); // (** DEV: logs the final result of the evaluation )  
}	



// Checks IF WINNER (the user input matches the the selected word)
function checkWin(){
	if (userGuess === toGuess){
		setTimeout(function(){ setUserFeedback("winner"); }, visualTimer*(amountOfLetters-1)); 
		setTimeout(function(){ keepScore("winner"); }, visualTimer*(amountOfLetters)); // (** DEV: doNOTE - only works because of timing, if not last not all letter-scores are removed from wordScore
		setTimeout(function(){ askForReplay(); }, visualTimer*(amountOfLetters-1));
		return;
	} else if (turn === amountOfTurns){
		setTimeout(function(){ setUserFeedback("lost"); }, visualTimer*(amountOfLetters-1));
		setTimeout(function(){ askForReplay(); }, visualTimer*(amountOfLetters-1));	
		return;
	} else {
		setTimeout(function(){ setUserFeedback("clear"); }, visualTimer*(amountOfLetters-2));	// (** DEV: might need to move, might be a weird place?
		return;
	}
}


// Evaluates the VALID userGuess vs the word toGuess for correct letters in the correct place, 
// or correct letters in the wrong place, and whether the word is correct;
function evaluateWords(toGuess, userGuess){
	displayResult = ""; 		// (** DEV: console.log of the result )
	setUserFeedback("processing");
	checkWin();
	for (let letter = 0; letter < amountOfLetters; letter++) {
		setTimeout(doEval, visualTimer*(letter), letter, toGuess, userGuess);		
		doResult(letter, toGuess, userGuess);  // (** DEV: for the console.log of the result ONLY !!)
	}
	setTimeout(function(){ resetInput(); }, visualTimer*(amountOfLetters-3)); 
}


// Sets the visual feedback letters for the user 	(** DEV: Clean UP! --- Score interfering also !!)
function doEval(letter, toGuess, userGuess){
	if (userGuess[letter] === toGuess[letter]){  // If the letter is correct and in the right location
		setVisual(turn.toString(), letter, toGuess[letter].toString(), "correct"); // is visual, see viewController.js
		
		if (userGuess[letter] === toGuessArray[letter]){  // If the letter is 'still' a letter to guess and it's the correct letter;
			
console.log("Scoring Correct Letter");
console.log(toGuessArray[letter]);

			keepScore("correctLetter", letter);	// ( SCORE FOR A CORRECT LETTER !)
console.log("logging the 'score' 4 correct");
console.log(score); 

			removeFromArray(toGuessArray, letter);
console.log("toGuessArray:")
console.log(toGuessArray); 

		} else if (toScoreArray.indexOf(userGuess[letter]) !== -1) { // the letter IS STILL in the score array;
			
console.log("Scoring Almost to correct Location");
console.log(userGuess[letter]);
			
			keepScore("onCorrectLocation", letter);
console.log("logging the 'score' for almost to correct location");
console.log(score); 		
			
			removeFromArray(toScoreArray, toScoreArray.indexOf(userGuess[letter]));
console.log("toScoreArray after removal for 'to correct location'");
console.log(toScoreArray);			
			
		} else {
			return;
		}
		
	} else if (toGuess.indexOf(userGuess[letter]) !== -1){ 		// If the letter is in the word 
		if(toGuessArray.indexOf(userGuess[letter]) !== -1){ 		// If the letter is still in the toGuessArray;
			setVisual(turn.toString(), letter, userGuess[letter].toString(), "almost"); // is visual, see viewController.js

console.log("Scoring Almost Letter");			
console.log(userGuess[letter]);

			keepScore("almostLetter", letter); 			// SCORE FOR AN 'ALMOST' LETTER )
console.log("logging the 'score' 4 almost");
console.log(score); // (** DEV: for development ) 
	
			toScoreArray = spliceToArray(userGuess[letter].toString(), letter);

console.log("toScoreArray:")
console.log(toScoreArray); // (** DEV: ...)

			removeFromArray(toGuessArray, toGuessArray.indexOf(userGuess[letter]));

			
		} else {
			setVisual(turn.toString(), letter, userGuess[letter].toString(), "almost"); // is visual, see viewController.js			
			// (** DEV: Not sure what to set this to! Maybe -> setVisual(turn.toString(), letter, userGuess[letter].toString(), "wrong"); 
		}
	} else {
		setVisual(turn.toString(), letter, userGuess[letter].toString(), "wrong"); // is visual, see viewController.js
	}
}









// (** DEV: should receive a word and turn it into an aray of letter; **NOTE: currently no Array gets inputted.)
function toLetterArray(theWord){
	let theArray = [];
	for(let i = 0; i < theWord.length; i++){
		theArray.push(theWord[i]);
	}
	return theArray;
}

// REMOVES a letter at certain index FROM the desired ARRAY
function removeFromArray(theArray, theIndex){
	delete theArray[theIndex];	
}

function spliceToArray(theLetter, letter){
	let myArray = [];
	myArray[letter] = theLetter;
	return myArray;
}



// ********************************** //
// -- ALL THE FUNCTIONS ARE BELOW --  //
// ********************************** //

function upTurn(){
	turn++;
}

// WORD PICKER from the swingo_database.js
function wordToGuess (){
	// toGuess = "prisma"; // (** DEV: SETS toGuess to 'Prisma' for debugging, comment out lines below !! )
	let i = Math.round(Math.random() * (wordStartP.length-1));
	toGuess = wordStartP[i];  // Sets a word from the database to 'toGuess'
}

// CHECKS if the WORD is an EXISTING word and of the correct length.
function checkGuess(theGuess){
	if (theGuess == ""){
			setUserFeedback("noLetters");
		return false;
	} else if (theGuess.length < amountOfLetters || theGuess.length > amountOfLetters){
			setUserFeedback("amountLetters");
			resetInput(); 
		return false;
	} else if (wordStartP.indexOf(theGuess) === -1){
			setUserFeedback("existingWord");		
			resetInput(); 
		return false;
	} else {
		return true;
	}
}

// CHECKS and 'cleans' the user input, from: https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// ASKS 4 RESTART the game at any end state for the game
function askForReplay(){
	let again = document.getElementById("inputBtnTxt");
	sendInput.removeEventListener("click", doGame); 
	sendInput.addEventListener("click", gameReset);
	again.innerHTML = "Again?";	
}

// RESETS the GAME, if 'askForReplay' IS CLICKED 
function gameReset(){
	let send = document.getElementById("inputBtnTxt");
	sendInput.removeEventListener("click", gameReset);
	sendInput.addEventListener("click", doGame); // add new eventlistener to the input button (** DEV: not yet sure where to put this )
	send.innerHTML = "Send";
	buildBoard(); // in context: rebuilds the board
	wordToGuess(); // in context: picks a new word to guess
	toGuessArray = toLetterArray(toGuess); // in context: builds the new letter array
	resetWordScore();
	setUserFeedback("clear");
	resetInput();
	turn = 0;
}






// ********************************** //
// -- SOME DEVELOPMENT TOOLS BELOW -- //
// ********************************** //

// (** DEV: ONLY FOR THE CONSOLE, displays the correct/almost/false letters in the console)
function doResult(letter, toGuess, userGuess){   //(** building up the result string: solely for DEV console.log, )
	if (toGuess[letter] === userGuess[letter]){  // If the letter is correct and in the right location
		displayResult += (userGuess[letter] + " "); 
	} else if (toGuess.indexOf(userGuess[letter]) !== -1){ // If the letter is in the word (** DEV: NEEDS another check for doubles!)
		displayResult += " *" + userGuess[letter] + "* "; 
	} else {
		displayResult += " _ ";  
	}
}

// (** DEV: ONLY FOR THE CONSOLE, displays the build-up result string in the console )
function doLog(){
	console.log(displayResult);	
}

// (** DEV: Meant to log the Letter Array for debugging )
function Dev_log(array){  
	console.log(array);
}
