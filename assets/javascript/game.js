function getRandomInt(min, max, array) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomInt = Math.floor(Math.random() * (max - min)) + min;
    var guessedWord = getCPUGuess(array,randomInt);
    return guessedWord;
}//The maximum is exclusive and the minimum is inclusive

function documentHistory(newGuess, array) {
    array.push(newGuess);
    writeToScreen(guessHistory,array);
    console.log("Your guess history is ", array);
    return array;
}//Store all of the user's guesses in an array and print them to the screen

function writeToScreen(htmlSelector, newValue) {
    //htmlElement.innerHTML = newValue;
    $(htmlSelector).text(newValue);
    console.log("You just printed ", newValue, " to the screen");
}//One f(x) to handle all of the screen printing capabilities

function guessesRemaining(limit) {
    limit--;
    console.log("Your new limit is ", limit);
    writeToScreen(remaining,limit);
    return limit;
}

function getHighScore(gameScoresArray) {
    highScore = Math.max(gameScoresArray);
    return highScore;
}

function getCPUGuess (array, index) {
    return array[index];
}

//Constants for HTML elements to pass around during game play using jQuery
const guessesLeft = "#guesses-left";
const userWins = "#user-wins";
const userLosses = "#user-losses";
const userGuess = "#user-guess";
const guessHistory = "#guess-history";
const cpuWord = "#cpu-word";


//Variables for the inner text of HTML elements will be deprecated in future releases :) 

/*var guess = $(userGuess).text(); //document.getElementById("user-guess");
console.log(guess);
var wins = $(userWins).text(); //document.getElementById("user-wins");
console.log(wins)
var losses = $(userLosses).text(); //document.getElementById("user-losses");
var remaining = $(guessesLeft).text(); //document.getElementById("guesses-left");
console.log("print guesses remaining", remaining);
var history = $(guess).text(); //document.getElementById("guess-history");
var word = $(cpuWord).text(); //document.getElementById("cpu-letter");*/




//Gameplay variables
var scores = [];
var highScore = 0;

//Setup game objects
var nintendo = {
    name: "Throwback Video Games",
    desc: "This game features original NES games only and is medium difficulty. Medium Difficulty games offer 2x the point value of easy games.",
    gameArray: ["RING KING", "TECMO BOWL", "TECMO SUPER BOWL", "EXCITEBIKE", "BASES LOADED", "ARCH RIVALS", "DOUBLE DRIBBLE", "BLADES OF STEEL",
                "RBI BASEBALL", "PUNCH OUT", "SUPER MARIO", "TETRIS", "DONKEY KONG", "LEGEND OF ZELDA", "CONTRA", "KID ICARUS", "STREET FIGHTER", 
                "NINJA GAIDEN", "KUNG FU", "BATMAN", "DOUBLE DRAGON", "RC PRO AM", "MEGA MAN"],
    maxGuesses: 7,
    numWins: 0,
    numLosses: 0,
    guesses: [],
    cpuGuess: "",
    setScore: function() {
        numWins *=2;
        scores.push(numWins);
        return numWins;
    },

    initializeGame: function() {
    //selectedGame = "nintendo";
    console.log(this.gameArray);
    $(userGuess).text("NEW GAME");
    $(userWins).text(0);
    $(userLosses).text(0);
    $(guessHistory).text("none");
    guesses = [];
    maxGuesses = 7;
    $(guessesLeft).text(this.maxGuesses);
    console.log("you are here");
    this.cpuGuess = getRandomInt(0,this.gameArray.length,this.gameArray);
    alert(this.gameArray.length);
    writeToScreen(cpuWord,this.cpuGuess);
    console.log("the cpu guessed ",this.cpuGuess);
    }
};

var geography = {
    name: "Wakanda Forever",
    desc: "This category features countries from the African continent. How well do you know your world geography. Each win is worth 3x",
    gameArray: ["SENEGAL", "GUINEA", "SIERRA LEONE", "IVORY COAST", "GHANA", "MAURITANIA", "BURKINA", "NIGER", "NIGERIA", "CHAD", "MALI", "WESTERN SAHARA", 
               "MOROCCO", "ALGERIA", "TUNISIA", "LIBYA", "EGYPT", "SUDAN", "ETHIOPIA", "SOMALIA", "KENYA", "UGANDA", "DEMOCRATIC REPUBLIC OF THE CONGO",
               "CENTRAL AFRICAN REPUBLIC", "CAMEROON", "CONGO", "GABON", "TANZANIA", "MALAWI", "ZAMBIA", "ANGOLA", "NAMIBIA", "BOTSWANA", "ZIMBABWE", 
               "MOZAMBIQUE","MADAGASCAR", "SOUTH AFRICA"],
    maxGuesses: 9,
    numWins: 0,
    numLosses: 0,
    guesses: [],
    cpuGuess: "",
    setScore: function() {
        numWins *=3;
        scores.push(numWins);
        return numWins;
    },

    initializeGame: function() {
    selectedGame = "geography";
    userGuess.innerHTML = "NEW GAME";
    wins.innerHTML = 0;
    losses.innerHTML = 0;
    guessHistory.innerHTML = "none";
    guesses = [];
    maxGuesses = 9;
    cpuGuess = getRandomInt(0,this.gameArray.length,); //get the word the computer randomly picks using the random number generator
    writeToScreen(cpuWord,cpuGuess);
    console.log("the cpu guessed ",cpuGuess);
    }
};

$(document).ready(function(){
    $("#nintendo").click(function(){

        $(".game-selection").hide();

        nintendo.initializeGame();

        document.onkeyup = function (event) {
    
            var keyPressed = event.key;
            
            if ((keyPressed.charCodeAt(0) < 65) || (keyPressed.charCodeAt(0) > 122)) {
                alert("Please guess an alphabet");
            }
            else {
            keyPressed = keyPressed.toLowerCase();
            alert("lower is better");
            }
            writeToScreen(userGuess, keyPressed);
        };
    });

    //
    //guesses = documentHistory(keyPressed,guesses);
});