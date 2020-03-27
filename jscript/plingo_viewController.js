console.log("from viewController.js");

// ********************************* //
// SEE SETUP FILE FOR VARIABLES INIT //
// ********************************* //

	let theScore;
	theScore = document.getElementsByClassName("playerScore");

// Shows the player's score
showScore();

function showScore(){
	console.log(score);
	for (i = 0; i < theScore.length; i++){
		theScore[i].innerHTML = score.toString();
	}
}

// MINOR Animations for the Send button
sendInput.addEventListener("mouseover", animBtnOver);
sendInput.addEventListener("mouseout", animBtnOut);
sendInput.addEventListener("mousedown", animBtnDown);
sendInput.addEventListener("mouseup", animBtnUp);

function animBtnOver(){
	sendInput.classList.add("overBorders");
}

function animBtnOut(){
	sendInput.classList.remove("overBorders");
}

function animBtnDown(){
	sendInput.classList.remove("overBorders");
	sendInput.classList.add("onClicking");
}

function animBtnUp(){
	sendInput.classList.remove("onClicking");
	sendInput.classList.add("overBorders");
}


// ********************************** //
// -- ALL THE FUNCTIONS ARE BELOW --  //
// ********************************** //

// resets the text input to empty
function resetInput(){
	input.value = "";
}

// sets the colors of the letter blocks
function setVisual(turn, index, theLetter, toType){
	let guess = document.getElementsByClassName("row"+turn);
	guess[index].textContent = theLetter.toUpperCase();	
	switch(toType){
		case "correct":
			guess[index].classList.add("correct");
			break;
		case "almost":
			guess[index].classList.add("almost");		
			break;
		case "wrong":
			guess[index].classList.add("wrong");
			break;
		default:
			guess[index].classList.add("error");
	}

}


	


// gives various feedback to the user based on the game state
function setUserFeedback(toType){
	let feedbackWindow = document.getElementById("user_feedback");
	let showFeedback = document.getElementById("feedback");
	switch(toType){
		case "noLetters":
			feedbackWindow.classList.add("warning");
			showFeedback.classList.add("warning");		
			showFeedback.innerHTML = "Atleast input a word"; 
			break;
		case "amountLetters":
			feedbackWindow.classList.add("warning");
			showFeedback.classList.add("warning");
			showFeedback.innerHTML = userGuess+ " is not a " + amountOfLetters + " letter word.";
			break;
		case "existingWord":
			feedbackWindow.classList.add("warning");
			showFeedback.classList.add("warning");			
			showFeedback.innerHTML = userGuess+ " is not an existing " + localisation + " word, starting with a " +startingLetter;
			break;
		case "processing":
			feedbackWindow.classList.remove("warning");
			showFeedback.classList.remove("warning");	
			showFeedback.innerHTML = "Processing your input...";
			break;
		case "winner":
			feedbackWindow.classList.remove("warning");
			showFeedback.classList.remove("warning");	
			feedbackWindow.classList.add("winner");
			showFeedback.innerHTML = "You WON !! Well done !!<br><br><b>Press 'Again' below to play again.</b>";
			break;
		case "clear":
			feedbackWindow.classList.remove("warning");
			showFeedback.classList.remove("warning");	
			feedbackWindow.classList.remove("winner");
			showFeedback.innerHTML = "Type your guess below";
			break;
		case "lost":
			feedbackWindow.classList.add("warning");
			showFeedback.classList.add("warning");
			showFeedback.innerHTML = "Ahww you Lost !! Don't give up !!<br> The word was " + toGuess + "<br><br><b>Press 'Again' below to play again.</b>";
			break;
		case "gameover":
			feedbackWindow.classList.add("warning");
			showFeedback.classList.add("warning");
			showFeedback.innerHTML = "This game is already over !! <br><br><b>Press 'Again' below to play again.</b>";
			break;
		default: //error
			feedbackWindow.classList.add("error");
			showFeedback.classList.add("warning");		
			showFeedback.innerHTML = "Something went wrong, start a bug report?";
	}
}





