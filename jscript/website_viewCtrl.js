console.log("from viewCtrl.js");

let getInfo = document.getElementById("about_btn"); // get the send button
getInfo.addEventListener("click", showInfo);
let theInfo = document.getElementById("instructions");

function showInfo (){
	theInfo.classList.toggle("hide");
}
