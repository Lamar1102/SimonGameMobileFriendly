var userClickedPattern = [];
var buttonColors = ["red", "yellow", "blue", "green"];
var gamePattern = [];

var started = false;

var level = -1;


$("h1").on("click", function(){
  if (!started){

  $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}});
$(document).on("keydown", function(){
if (!started){

$("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}});




//Allows us to play sound and animate when button is clicked
$(".btn").click(function(){
  var userChosenColor = this.id;

  userClickedPattern.push(userChosenColor);

  //console.log(userClickedPattern);

playSound(userChosenColor);
animatePress(userChosenColor);

checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {console.log("success");

  if (userClickedPattern.length === gamePattern.length)
  {
setTimeout(function(){
  nextSequence();}, 1000);
}

}

else {var wrongAudio = new Audio ("wrong.mp3");
wrongAudio.play();
$("body").addClass("game-over");
setTimeout(function(){$("body").removeClass("game-over")},200);
$("#level-title").text("Game Over, Press Any Key to Restart");
startOver();
}
}



//Sets random pattern
function nextSequence() {
userClickedPattern = [];

level++;
$("#level-title").text("Level " + level);

  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);


$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColor);


}

function startOver(){
  level = -1
  gamePattern = [];
  started = false;
}


//playSound(name) allows us to use it in other functions to play selected buttons sound
function playSound(name){
  var audio = new Audio (name + ".mp3");
  audio.play();
}


//Animation for when we click a button
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
//setTimeout allows a 100 ms delay before removing the class
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}
