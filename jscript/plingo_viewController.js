console.log("from viewController.js");

// ********************************* //
// SEE SETUP FILE FOR VARIABLES INIT //
// ********************************* //

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
			showFeedback.innerHTML = userGuess+ " is not an existing word, starting with a " +beginLetter;
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
			showFeedback.innerHTML = "You WON !! Well done !!<br><br><b>Refresh the page to play again.</b>";
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
			showFeedback.innerHTML = "Ahww you Lost !! Don't give up !!<br><br><b>Refresh the page to play again.</b>";
			break;
		default: //error
			feedbackWindow.classList.add("error");
			showFeedback.classList.add("warning");		
			showFeedback.innerHTML = "Something went wrong, start a bug report?";
	}
}

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

function resetInput(){
	input.value = "";
}

function playSound(){
	return;
	}


//**** This bit should probably move to another script for siteView control ****//
let getInfo = document.getElementById("about_btn"); // get the send button
getInfo.addEventListener("click", showInfo);
let theInfo = document.getElementById("instructions");

function showInfo (){
	theInfo.classList.toggle("hide");
}
//**** end of this bit ****//


/* during development setVisuals grew to 3 'the same' functions, so they got turned into a switch
function setVisualCorrect(turn, index, theLetter){
	let guess = document.getElementsByClassName("row"+turn);	
	guess[index].classList.add("correct");
	guess[index].textContent = theLetter.toUpperCase();
}

function setVisualAlmost(turn, index, theLetter){
	let guess = document.getElementsByClassName("row"+turn);		
	guess[index].classList.add("almost");
	guess[index].textContent = theLetter.toUpperCase();
}

function setVisualWrong(turn, index, theLetter){
	let guess = document.getElementsByClassName("row"+turn);		
	guess[index].classList.add("wrong");
	guess[index].textContent = theLetter.toUpperCase();
}
*/





