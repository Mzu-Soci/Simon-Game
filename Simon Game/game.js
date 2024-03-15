var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function(event) {
  if (gamePattern.length === 0) {
    nextSequence();
    $("h1").text("Level " + level);
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  var chosenButton = $("#" + randomChosenColor);
  chosenButton.fadeOut(150).fadeIn(150);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level " + level);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress("." + userChosenColour);
  var userInput = userClickedPattern.length-1;
  checkAnswer(userInput);
});

function playSound(event) {
  var audio = new Audio("sounds/" + event + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function() {
    $(currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },100);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
