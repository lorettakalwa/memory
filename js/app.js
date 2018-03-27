//Declaring variables
let clicks = 0;
let card = -1;
let card1 = -1;
let card2 = -1;
let n = 0;
const game = document.getElementById("game");
const success = document.getElementById("success");
const button = document.getElementById("button");
const timeGame = document.getElementById("timeGame");
const rating = document.getElementById("rating");
const moves = document.getElementById("moves");
const timeSuccess = document.getElementById("timeSuccess");
const ratingSuccess = document.getElementById("ratingSuccess");
const movesSuccess = document.getElementById("movesSuccess");
const bestScore = document.getElementById("bestScore");
const reset = document.getElementById("reset");
const symbols = ["a","a","b","b","c","c","d","d","e","e","f","f","g","g","h","h"];
const cardsN = symbols.length;
let cardsGuessed = Array(cardsN).fill(0);
let symbolsShuffled = symbols;
let timer = "";

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
  timeGame.innerHTML = "0:0";
  moves.innerHTML = 0;
  rating.innerHTML = "★★★";
  for (i = 0; i < cardsN; i++){
    game.children[i].innerHTML = "<img src=\"svg\\" + symbolsShuffled[i] + ".png\">";
  };
  //preparing the deck if this is not the first game
  if (n !== 0) {
    for (i = 0; i < cardsN; i++){
      game.children[i].classList.add("flipped");
      game.children[i].classList.remove("guessed");
    };
    clearInterval(timer);
    success.classList.add("noSuccess");
    cardsGuessed = Array(cardsN).fill(0);
    clicks = 0;
    card = -1;
    card1 = -1;
    card2 = -1;
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
};

//Checking if there is a match
function check(clicked){
  //Exit function if something else than a card was clicked
  if ( clicked.id === "game") {
    return;
  };
  //Exit function if a guessed card or already flipped card was clicked
  card = childIndex(clicked);
  if ( cardsGuessed[card] == 1 || card1 == card ) {
    return;
  };
  //Set timer, rating and attemps counter on
  if ( clicks == 0 ){
    let start = new Date().getTime();
    timer = setInterval(function() {
    let now = new Date().getTime();
    let timePassed = now - start;
    let minutes = Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timePassed % (1000 * 60)) / 1000);
    timeGame.innerHTML = minutes + ":" + seconds;
    moves.innerHTML = Math.floor(clicks / 2);
    if ( clicks > 30 ) {
      rating.innerHTML = "★★☆";
    } else if ( clicks > 50 ){
      rating.innerHTML = "★☆☆";
    } else if ( clicks < 31 ) {
      rating.innerHTML = "★★★";
    };
  }, 1000);
};
  //Show the icon
  clicks += 1;
  toggleClass(clicked,"flipped");
  //Keep the icon shown if this is the only one visible
  if ( clicks % 2 === 1){
    card1 = card;
    return;
  }
  //If two icons are visible either mark the cards as guessed or flip them
  else {
    card2 = card;
    //Check if it's a guessed pair
    if (symbolsShuffled[card1] == symbolsShuffled[card2]) {
      toggleClass(game.children[card1],"guessed");
      toggleClass(clicked,"guessed");
      cardsGuessed[card1] = 1;
      cardsGuessed[card2] = 1;
      //Check if all cards are guessed
      if ( cardsGuessed.reduce(sum,0) === cardsN ) {
        clearInterval(timer);
        timeSuccess.innerHTML = "Time: " + timeGame.innerHTML;
        ratingSuccess.innerHTML = "Rating: " + rating.innerHTML;
        movesSuccess.innerHTML = "Moves: " + Math.floor(clicks / 2);
        toggleClass(success,"noSuccess");
        //Using local storage to save and get the best result
        let first = localStorage.getItem("first");
        if ( Math.floor(clicks / 2) < first ) {
          localStorage.setItem("first", Math.floor(clicks / 2));
        };
        bestScore.innerHTML = "Best score: " + localStorage.getItem("first");
      };
    }
    //Flipping cards in case of not guessing the pair
    else {
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
reset.addEventListener("click",function() {n += 1; initialize();});

//initializing the game
initialize();
