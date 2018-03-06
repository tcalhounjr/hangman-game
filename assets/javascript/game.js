function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var randomInt = Math.floor(Math.random() * (max - min)) + min;
    return randomInt;
}//The maximum is exclusive and the minimum is inclusive

function documentHistory(newGuess, array) {
    array.push(newGuess);
    writeToScreen(guessHistory,array);
    return array;
}//Store all of the user's guesses in an array and print them to the screen

function writeToScreen(htmlSelector, newValue) {
    if (typeof(newValue) === 'object') {
        $(htmlSelector).text(newValue.join(' '));
    }
    else {
        $(htmlSelector).text(newValue);
    }
}//One f(x) to handle all of the screen printing capabilities

function guessesRemaining(limit) {
    limit--;
    console.log("Your new limit is ", limit);
    writeToScreen(guessesLeft,limit);
    return limit;
}

function getHighScore(gameScoresArray) {
    highScore = Math.max(gameScoresArray);
    return highScore;
}

function getCPUGuess (min, max, array) {
    var index = getRandomInt(min, max);
    var guessStr = array[index];
    var guessArray = [];
    for (i = 0; i < guessStr.length; i++) {
        if (guessStr.charAt(i) === " ") {
            guessArray.push(" ");
        }
        else {
            guessArray.push(guessStr.charAt(i));
        }
    }
    return guessArray;
}

function createBoard (randomPhrase) {
    for (var i = 0; i < randomPhrase.length; i++) { 
        if (randomPhrase[i] === " ") {
            $(blanks).append("&nbsp;&nbsp;&nbsp;");
            numSpaces++
        }
        else {
            $(blanks).append("- &nbsp;");
        }
    }
}

function updateBoard (occurrenceArray, correctLetter) {
    
    for (var i = 0; i < occurrenceArray.length; i++) {
            boardArray[occurrenceArray[i]] = correctLetter;
        }
        $(blanks).html(boardArray.join(" "));
    }

function goodGuess(newGuess, randomWord) {   
    var letterOccurrences = [];
    for (var i = 0; i < randomWord.length; i++){
        if (newGuess === randomWord[i]){
            letterOccurrences.push(i); //push the indices of all the correctly-guessed letter occurences
        }
    }
    if (letterOccurrences.length > 0) {
        updateBoard(letterOccurrences, newGuess);
    }
    return letterOccurrences;
 }//Take in user input; compare it to the computer's guess; return true if it's correct; return false if not.
    

//Constants for HTML elements to pass around during game play using jQuery
const guessesLeft = "#guesses-left";
const userWins = "#user-wins";
const userLosses = "#user-losses";
const userGuess = "#user-guess";
const guessHistory = "#guess-history";
const cpuWord = "#cpu-word";
const blanks = "#blanks";


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
var boardArray = [];
var correctGuess = [];
var numSpaces = 0;

//Setup game objects
var nintendo = {
    name: "Throwback Video Games",
    desc: "This game features original NES games only and is medium difficulty. Medium Difficulty games offer 2x the point value of easy games.",
    gameArray: ["RING KING", "TECMO BOWL", "TECMO SUPER BOWL", "EXCITEBIKE", "BASES LOADED", "ARCH RIVALS", "DOUBLE DRIBBLE", "BLADES OF STEEL",
                "RBI BASEBALL", "PUNCH OUT", "SUPER MARIO", "TETRIS", "DONKEY KONG", "LEGEND OF ZELDA", "CONTRA", "KID ICARUS", "STREET FIGHTER", 
                "NINJA GAIDEN", "KUNG FU", "BATMAN", "DOUBLE DRAGON", "RC PRO AM", "MEGA MAN"],
    maxGuesses: 10,
    numWins: 0,
    numLosses: 0,
    guesses: [],
    cpuGuess: [],
    selectedGame: "nintendo",
    lettersAvail: 0,
    setScore: function() {
        numWins *=2;
        scores.push(numWins);
        return numWins;
    },

    initializeGame: function() {
        
        $(userGuess).text("NEW GAME");
        $(userWins).text(0);
        $(userLosses).text(0);
        $(guessHistory).text("none");
        $(blanks).text("");
        guesses = [];
        maxGuesses = 10;
        boardArray = [];
        $(guessesLeft).text(this.maxGuesses);
        this.cpuGuess = getCPUGuess(0,this.gameArray.length,this.gameArray);
        console.log("there are " + this.cpuGuess.length + " letters in the random word");
        createBoard(this.cpuGuess);
        this.lettersAvail = this.cpuGuess.length - numSpaces;
        console.log("you have " + this.lettersAvail + " letters remaining at the beginning");
        this.initializeBoardArray();
    },

    playAgain: function() {
        $(userGuess).text("NEW GAME");
        $(guessHistory).text("none");
        $(blanks).text("");
        boardArray = [];
        numSpaces = 0;
        this.guesses = [];
        this.maxGuesses = 10;
        $(guessesLeft).text(this.maxGuesses);
        this.cpuGuess = getCPUGuess(0,this.gameArray.length,this.gameArray);
        createBoard(this.cpuGuess);
        this.lettersAvail = this.cpuGuess.length - numSpaces;
        this.initializeBoardArray();
    },

    puzzleSolved: function() {
            if (this.lettersAvail === 0) {
                this.numWins++;
                writeToScreen(userWins,this.numWins);
                writeToScreen(cpuWord,this.cpuGuess);
                
                let gameOn = confirm("Congratulations; You solved the puzzel! Play again?");
                if (gameOn) {
                    this.playAgain(); 
                }
                else {
                    this.initializeGame();
                }
            }
            else { 
                return false;
            }
    },

    initializeBoardArray: function() {
        //Build the boardArray so it can updated it during the game
        for (i = 0; i < this.cpuGuess.length; i++) {
            if (this.cpuGuess[i] === " ") {
                boardArray.push("&nbsp;&nbsp;&nbsp;");
            }
            else {
                boardArray.push("- &nbsp;")
            }
        }
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

            if (keyPressed === "ENTER"){
                $(userGuess).text("I'D LIKE TO SOLVE THE PUZZLE");
                nintendo.puzzleSolved();
            }

            if (nintendo.maxGuesses === 0) {
                nintendo.numLosses++;
                writeToScreen(userLosses,nintendo.numLosses);
                writeToScreen(cpuWord,nintendo.cpuGuess);
                let gameOn = confirm("Sorry you took an L this round. Would you like to play again?");
                if (gameOn) {
                    nintendo.playAgain(); 
                }
                else {
                    $(".game-selection").show();
                }
                
            }
            else {
            
                if ((keyPressed.charCodeAt(0) < 65) || (keyPressed.charCodeAt(0) > 122)) {
                    alert("Please guess an alphabet");
                }
                else {
                    keyPressed = keyPressed.toUpperCase();

                    //Get on with the business of managing the game
                    writeToScreen(userGuess, keyPressed);
                    guesses = documentHistory(keyPressed,guesses);

                    //Determine if the user guessed correctly
                    correctGuess = goodGuess(keyPressed, nintendo.cpuGuess);
                    let bool = nintendo.puzzleSolved();
                    if (!bool){
                        if (correctGuess.length > 0) {
                            alert("There are " + correctGuess.length + " " + keyPressed + "s");
                            nintendo.lettersAvail -= correctGuess.length;
                            console.log("you have " + nintendo.lettersAvail + " letters remaining");
                            nintendo.maxGuesses = guessesRemaining(nintendo.maxGuesses);
                        }
                    }
                }
            }
        };
    });
});