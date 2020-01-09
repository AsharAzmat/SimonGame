var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var start = false;
var level = 0;

$("body").keypress(function(event) {

  if (start == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }

});

$(".btn").on("click", function(a) {

  var userChosenColour = a.target.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

// another way:
// $(".btn").click(function() {
//   var userChosenColour = $(this).attr("id");
//   userClickedPattern.push(userChosenColour);


function nextSequence() {

  userClickedPattern = [];
  level ++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) {
  // Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
  console.log("success");
  if (userClickedPattern.length == gamePattern.length)
  {
  setTimeout(function () {
    nextSequence();
  }, 1000);
  }
}
  else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart")
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver () {
  level = 0;
  start = false;
  gamePattern = [];
}
