//Declaring variables
let clicks = 0;
let card = -1;
let card1 = -1;
let card2 = -1;
let n = 0;
const game = document.getElementById("game");
const success = document.getElementById("success");
const button = document.getElementById("button");
const symbols = ["a","a","b","b","c","c","d","d","e","e","f","f","g","g","h","h"];
const cardsN = symbols.length;
let cardsGuessed = Array(cardsN).fill(0);
let symbolsShuffled = symbols;

//Sum
function sum(a,b) {
  return a+b;
}

//Random order - Fisher-Yates shuffle algorithm
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

//Initializing game
function initialize(){
  symbolsShuffled = randomOrder(symbols);
  for (i = 0; i < cardsN; i++){
    game.children[i].innerHTML = "<img src=\"svg\\" + symbolsShuffled[i] + ".png\">";
  };
  //preparing the deck if this is not the first game
  if (n !== 0) {
    for (i = 0; i < cardsN; i++){
      game.children[i].classList.add("flipped");
      game.children[i].classList.remove("guessed");
    };
    toggleClass(game,"success");
    toggleClass(success,"success");
    cardsGuessed = Array(cardsN).fill(0);
  };
  n += 1;
};

//Flipping the card
function toggleClass(div,className){
  div.classList.toggle(className);
};

//Card index
function childIndex(div){
  return Array.prototype.indexOf.call(div.parentNode.children, div);
}

//Checking if there is a match
function check(clicked){
  //Exit function if something else than a card was clicked
  if ( clicked.id === "game") {
    return;
  }
  //Exit function if a guessed card or already flipped card was clicked
  card = childIndex(clicked);
  if ( cardsGuessed[card] == 1 || card1 == card ) {
    return;
  }
  clicks += 1;
  toggleClass(clicked,"flipped");
  if ( clicks % 2 === 1){
    card1 = card;
    return;
  } else {
    card2 = card;
    if (symbolsShuffled[card1] == symbolsShuffled[card2]) {
      toggleClass(game.children[card1],"guessed");
      toggleClass(clicked,"guessed");
      cardsGuessed[card1] = 1;
      cardsGuessed[card2] = 1;
      if ( cardsGuessed.reduce(sum,0) === cardsN ) {
        toggleClass(game,"success");
        toggleClass(success,"success");
      };
    } else {
      setTimeout(function() {toggleClass(clicked,"flipped");}, 1000);
      let firstCard = game.children[card1];
      //Error: setTimeout(function() {toggleClass(game.children[card1],"flipped");},1000);
      setTimeout(function() {toggleClass(firstCard,"flipped");},1000);
    };
    card1 = -1;
    card2 = -1;
  };
};

//Event listener on click
game.addEventListener("click",function(event) {check(event.target);});
button.addEventListener("click",function() {initialize();});

//initializing the game
initialize();
