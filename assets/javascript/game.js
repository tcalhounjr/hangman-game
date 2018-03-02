function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
}//The maximum is exclusive and the minimum is inclusive

function documentHistory(newGuess, array) {
    array.push(newGuess);
    writeToScreen(guessHistory,array);
    console.log("Your guess history is ", array);
    return array;
}//Store all of the user's guesses in an array and print them to the screen

function writeToScreen(htmlElement, newValue) {
    htmlElement.innerHTML = newValue;
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

//HTML Elements
var userGuess = document.getElementById("user-guess");
var wins = document.getElementById("user-wins");
var losses = document.getElementById("user-losses");
var remaining = document.getElementById("guesses-left");
var guessHistory = document.getElementById("guess-history");
var cpuLetter = document.getElementById("cpu-letter");

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
    randomNum: 0,
    setScore: function() {
        numWins *=2;
        scores.push(numWins);
        return numWins;
    },

    initializeGame: function() {
    userGuess.innerHTML = "NEW GAME";
    wins.innerHTML = 0;
    losses.innerHTML = 0;
    guessHistory.innerHTML = "none";
    guesses = [];
    maxGuesses = 5;
    randomNum = getRandomInt(0,psychicGame.length);
    cpuGuess = getCPUGuess(randomNum);
    //writeToScreen(cpuLetter,cpuGuess);
    console.log("the cpu guessed ",cpuGuess);
    }
};

var geography = {
    name: "Wakanda Forever",
    desc: "This category features countries from the African continent. How well do you know your world geography. Each win is worth 3x",
    gameArray: [],
    maxGuesses: 10,
    numWins: 0,
    numLosses: 0,
    guesses: [],
    cpuGuess: "",
    randomNum: 0,
    setScore: function() {
        numWins *=2;
        scores.push(numWins);
        return numWins;
    },

    initializeGame: function() {
    userGuess.innerHTML = "NEW GAME";
    wins.innerHTML = 0;
    losses.innerHTML = 0;
    guessHistory.innerHTML = "none";
    guesses = [];
    maxGuesses = 5;
    randomNum = getRandomInt(0,psychicGame.length);
    cpuGuess = getCPUGuess(randomNum);
    //writeToScreen(cpuLetter,cpuGuess);
    console.log("the cpu guessed ",cpuGuess);
    }
};

nintendo.initializeGame();
alert("Press any key to continue");

document.onkeyup = function (event) {
    var keyPressed = event.key;


    if ((keyPressed.charCodeAt(0) < 65) || (keyPressed.charCodeAt(0) > 122)) {
        alert("Please guess an alphabet");
    }
    else {
       keyPressed = keyPressed.toLowerCase();
       alert("lower is better");
    }

    //writeToScreen(userGuess, keyPressed);
    //guesses = documentHistory(keyPressed,guesses);
}