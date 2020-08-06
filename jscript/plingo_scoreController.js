console.log("from scoreController.js");

// ********************************* //
// SEE INIT FILE FOR VARIABLES INIT //
// ********************************* //



showScore(); // Shows the player's score see viewController.js



// KEEPS the SCORE within a playsession
function keepScore (scoreType, letter){
	if (gameMode === "hard" || gameMode === "extraHard"){
		switchScores(scoreType);		
	} else {
		if(letter === 0){
			return;
		} else {
			switchScores(scoreType);		
		}
	}

logRemainScore(); // (** DEV :: Tool)

	showScore();  // is visual, see viewController.js
}


function switchScores(scoreType){
	switch(scoreType){
		case "correctLetter":
			score = score + correctPoints;
			wordScore = wordScore - correctPoints;
			break;
		case "almostLetter":
			score = score + almostPoints;
			wordScore = wordScore - almostPoints;
			break;
		case "onCorrectLocation":
			score = score + almostPoints;
			wordScore = wordScore - almostPoints;
			break;
		case "winner":
			score = score + wordScore;	
			break;
		default:
			console.log("something going wrong in the keepScore switch Statement");
			setUserFeedback("error");
	}
}

function resetWordScore(){
	wordScore = amountOfLetters * scoreBase;
}

// (** DEV: Logging the value of wordScore)
function logRemainScore(){
	console.log("Remaining Word Score:");
	console.log(wordScore);
}