 var gamePattern=[];
 var userClickedPattern=[];
 var i=0;
 var started=false;
 var level=0;
 var buttonColors=["red","blue","green","yellow"];
 function nextSequence(){
  var num=Math.random()*4;
  num=Math.floor(num);
  level++;
  $("h1").text("Level "+level);


  var randomChosenColor=buttonColors[num];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
 }
 function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
 }
 function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);

 }
 function startOver(){
    gamePattern=[];
    userClickedPattern=[];
    level=0;
    i=0;
    started=false;
 }
 function check(){
    if(userClickedPattern[i]!==gamePattern[i]){
        var audio=new Audio("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }else{
        if(i===gamePattern.length-1){
            userClickedPattern=[];
            i=0;
            setTimeout(function(){
                nextSequence();
            },1000);
        }else{
            i++;
        }
    }
 }
 $(".btn").click(function(event){
      var choosenColor=event.target.id;
      userClickedPattern.push(choosenColor);
      playSound(choosenColor);
      animatePress(choosenColor);
      check();
 });

 $(document).on("keydown",function(){
    if(started===false){
        started=true;
        nextSequence();
    }
 });