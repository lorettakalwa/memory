//Number of 'clicks'
let i = 0;
let game = document.getElementById("game");

//Flipping the card
function showHide(div){
  div.classList.toggle("flipped");
}

//Checking if there is a match
function check(div){

}

//

game.addEventListener("click",function(event) {showHide(event.target);});
