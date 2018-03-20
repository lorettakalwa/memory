//Declaring variables
let clicks = 0;
const game = document.getElementById("game");
let symbols = ["a","a","b","b","c","c","d","d","e","e","g","g","h","h"];

//Random order - F-L algorithm
function randomOrder(array) {
  let randomArray = [];
  let arrayCopy = array.slice(0);
  while (arrayCopy.length !== 0) {
  	let i = Math.floor(arrayCopy.length * Math.random());
    randomArray.push(arrayCopy[i]);
    arrayCopy.splice(i, 1);
  }
  return randomArray;
};

//Flipping the card
function showHide(div){
  div.classList.toggle("flipped");
};

//Checking if there is a match
function check(div){

};

//
game.addEventListener("click",function(event) {showHide(event.target);});
