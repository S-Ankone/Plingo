console.log("from gameController.js");

// ********************************* //
// SEE SETUP FILE FOR VARIABLES INIT //
// ********************************* //


sendInput.addEventListener("click", getInput); // *** CYCLES MAIN GAME LOGIC *** //
wordToGuess(); // pick the word to guess
console.log(displayResult); // (** DEV - console UI, empty string with locations for letters)

function getInput(){  //*** MAIN GAME LOGIC ***//

  console.log(toGuess); // (** DEV: log the picked word to console)	
  userGuess = input.value; // Set the userGuess to the input from user
  console.log(userGuess); // (** DEV: log the input word to console)
	
  if (checkGuess(userGuess) === false){   // check if the word is 6 letters, and if so, if it's an existing word in de database
	return;
  } else {
	if (turn < amountOfTurns){
  	   turn++;
	   evaluateWords(toGuess, userGuess);
	   if(checkWin() === true){
	     setTimeout(function(){ askForReplay(); }, visualTimer*(amountOfLetters-1));}
    } else if (turn === amountOfTurns){
	   turn++;			
	   evaluateWords(toGuess, userGuess);
	   if (checkWin() === false){
		 setTimeout(function(){ setUserFeedback("lost"); }, visualTimer*(amountOfLetters-1));
		 setTimeout(function(){ askForReplay(); }, visualTimer*(amountOfLetters-1));	
	   } else {
		 setTimeout(function(){ askForReplay(); }, visualTimer*(amountOfLetters-1));	
	     return;}
	} else {
	   setTimeout(function(){ askForReplay(); }, visualTimer*(amountOfLetters-1));		
	   setUserFeedback("error");
	   return;
	}
  }	
}	


// ********************************** //
// -- ALL THE FUNCTIONS ARE BELOW --  //
// ********************************** //


// Word picker
function wordToGuess (){
	let i = Math.round(Math.random() * (woordMetP.length-1));
	toGuess = woordMetP[i];  // Sets a word from the database to 'toGuess'
}

// Checks if the word is an excisting word and of the correct length.
function checkGuess(theGuess){
	if (theGuess == ""){
			setUserFeedback("noLetters");
		return false;
	} else if (theGuess.length < amountOfLetters || theGuess.length > amountOfLetters){
			console.log("The given word is not a " + amountOfLetters + " letter word");
			setUserFeedback("amountLetters");
			resetInput(); 
		return false;
	} else if (woordMetP.indexOf(theGuess) === -1){
			console.log("The given word is not an existing " + localisation + " word starting with a " + startingLetter);
			setUserFeedback("existingWord");		
			resetInput(); 
		return false;
	} else {
		return true;
	}
}

// Checks if the input word matches the selected word
function checkWin(){
	console.log("checkWIN");
	setTimeout(function(){ setUserFeedback("clear"); }, visualTimer*(amountOfLetters-1));	
	if (userGuess === toGuess){
		setTimeout(function(){ setUserFeedback("winner"); }, visualTimer*(amountOfLetters-1)); 
		setTimeout(function(){ keepScore(); }, visualTimer*(amountOfLetters-1));
		console.log("SCORE, you guessed correctly"); // (** DEV: logs the outcome if correct )
		return true;
	} else {
		return false;
	}
}

// Keeps the score within a playsession
function keepScore (){
	score = score + points;
	showScore();  // is visual, see viewController.js
}

// Evaluates the VALID userGuess vs the word toGuess for correct letters in the correct place, 
// or correct letters in the wrong place, and whether the word is correct;
function evaluateWords(toGuess, userGuess){
	displayResult = ""; // (** DEV: console.log of the result )
	for (let letter = 0; letter < amountOfLetters; letter++) {
		doResult(letter, toGuess, userGuess);  // (** DEV: for the console.log of the result ONLY !!)
		setTimeout(doVisual, visualTimer*(letter), letter, toGuess, userGuess);		
	}
	setTimeout(function(){ resetInput(); }, visualTimer*(amountOfLetters-3)); 
	doLog(); // (** DEV: logs the final result of the evaluation )
}

// Sets the visual feedback letters for the user
function doVisual(letter, toGuess, userGuess){
	setUserFeedback("processing");
	if (toGuess[letter] === userGuess[letter]){  // If the letter is correct and in the right location
		setVisual(turn.toString(), letter, userGuess[letter].toString(), "correct"); // is visual, see viewController.js
	} else if (toGuess.indexOf(userGuess[letter]) !== -1){ // If the letter is in the word (** DEV: NEEDS another check for doubles!)
		setVisual(turn.toString(), letter, userGuess[letter].toString(), "almost"); // is visual, see viewController.js
	} else {
		setVisual(turn.toString(), letter, userGuess[letter].toString(), "wrong"); // is visual, see viewController.js
	}
}

// At any end state for the game, lets the player restart the game
function askForReplay(){
	let again = document.getElementById("inputBtnTxt");
	sendInput.removeEventListener("click", getInput); 
	sendInput.addEventListener("click", gameReset);
	again.innerHTML = "Again?";	
	console.log("asked to replay"); // (** DEV: confirmation of execution in the log )
}

// Resets the game without a refresh
function gameReset(){
	console.log("starting game reset"); // (** DEV: confirmation of execution in the log )
	let send = document.getElementById("inputBtnTxt");
	sendInput.removeEventListener("click", gameReset);
	sendInput.addEventListener("click", getInput); // add new eventlistener to the input button (** DEV: not yet sure where to put this )
	send.innerHTML = "Send";
	buildBoard(); // in context: rebuilds the board
	wordToGuess(); // in context: picks a new word to guess
	setUserFeedback("clear");
	resetInput();
	turn = 0;
}



// ONLY FOR THE CONSOLE, displays the correct/almost/false letters in the console
function doResult(letter, toGuess, userGuess){   //(** building up the result string: solely for DEV console.log, )
	if (toGuess[letter] === userGuess[letter]){  // If the letter is correct and in the right location
		displayResult += (userGuess[letter] + " "); 
	} else if (toGuess.indexOf(userGuess[letter]) !== -1){ // If the letter is in the word (** DEV: NEEDS another check for doubles!)
		displayResult += " *" + userGuess[letter] + "* "; 
	} else {
		displayResult += " _ ";  
	}
}
// ONLY FOR THE CONSOLE, displays the build-up result string in the console
function doLog(){
	console.log(displayResult);	
}
