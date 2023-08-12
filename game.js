var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern =[];
started=false;

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randNum];
    gamePattern.push(randomChosenColour);
    makeSound(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}
function makeSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


$(".btn").click(function(){
    var userChosenColor =  $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    makeSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  $(document).on("keypress",function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
    
  })
  var level=0;
function checkAnswer(currentLevel){
    console.log(currentLevel);
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          } 
    // else { do nothing } 
    }else {
        makeSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
}