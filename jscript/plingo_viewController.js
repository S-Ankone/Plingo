console.log("from viewController.js");

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

function resetInput(){
	input.value = "";
}




