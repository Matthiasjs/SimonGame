var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startGame = false;
var levelGame = 0;

$(document).on("keypress", function(event){
    if(!startGame){
        switch (event.key) {
            case "a":
                $("h1").text("Level " + levelGame);
                newSequence();
                startGame = true;
                break;
        
            default:
                break;
        }
    }
})

function newSequence(){

    userClickedPattern = [];
    levelGame++;
    $("h1").text("Level " + levelGame);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColour);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                newSequence();
            }, 1000);
        
        }
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        playAudio("wrong");
        setTimeout(function (){
            $("body").removeClass("game-over");
            $("#title").text("Game Over, Press Any Key to Restart");
            startOver();
        }, 200)
    }
}

$(document).click(function(event){
    if (startGame){
        var idEvent = event.target.id;
        switch (idEvent) {
            case "green":
                $("#green").fadeOut(100).fadeIn(100);
                handler(idEvent);
                playAudio(idEvent);
                animatePress(idEvent);
                checkAnswer(userClickedPattern.length-1);
                break;
            case "red":
                $("#red").fadeOut(100).fadeIn(100);
                handler(idEvent);
                playAudio(idEvent);
                checkAnswer(userClickedPattern.length-1);
                break;
            case "blue":
                $("#blue").fadeOut(100).fadeIn(100);
                handler(idEvent);
                playAudio(idEvent);
                checkAnswer(userClickedPattern.length-1);
                break;
            case "yellow":
                $("#yellow").fadeOut(100).fadeIn(100);
                handler(idEvent);
                playAudio(idEvent);
                checkAnswer(userClickedPattern.length-1);
                break;
            default:
                break;
        }
    }
   
})

function handler(colourClick){

    var userChosenColour = colourClick;
    userClickedPattern.push(userChosenColour);
}

function playAudio(name){
    var colorAudio = new Audio("sounds/" + name + ".mp3");
    colorAudio.play();
}

function animatePress(curretColour){
    $("#" + curretColour).addClass("pressed");
    setTimeout(function(){
        $("#" + curretColour).removeClass("pressed");
    }, 100)
}

function startOver(){
    gamePattern = [];
    startGame = false;
    levelGame = 0;
}