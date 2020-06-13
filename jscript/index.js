var st = "Press 's' to start";
var pl = "Game started";
var go = "Game over";
var comp;
var player;
var wrong;
var level_count;
var colors = ["red", "green", "yellow", "blue"];
$(".start").click(function (event) {
    $("h1").html(pl);
    comp = "";
    player = "";
    wrong = false;
    level_count=1;
    nextSequence();
    $(".start").css("visibility","hidden");
    $("h2").css("visibility","visible");
    // $(".start").hide();
    // $("h2").show();
});
$(".btn").click(function () {
  if (wrong == false) {
    var cl = $(this).attr("class");
    var color_btn = cl.slice(0, cl.indexOf(" "));
    clicked(color_btn);
    switch (color_btn) {
      case "red":
        player += 0;
        break;
      case "green":
        player += 1;
        break;
      case "yellow":
        player += 2;
        break;
      case "blue":
        player += 3;
        break;
    }
    check_ans();
  }
});
function check_ans() {
  var len = player.length - 1;
  if (player[len] === comp[len]) {
    if (player.length === comp.length) {
      setTimeout(function () {
        player="";
        nextSequence();
      }, 1000);
    }
  } else {
    $("h1").html(go);
    $("h2").css("visibility","hidden");
    $(".start").css("visibility","visible");
    // $("h2").hide();
    // $(".start").show();
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    wrong=true;
  }
}
function nextSequence() {
    $("h2").html("Level "+level_count);
    level_count++;
  comp += Math.floor(Math.random() * 4);
  console.log(comp);
  var end = comp.length * 1000;
  var i = 0;
  var si = setInterval(function () {
    clicked(colors[comp[i]]);
    i++;
  }, 1000);
  setTimeout(function () {
    clearInterval(si);
  }, end);
}
function clicked(str) {
  var audio = new Audio("sounds/" + str + ".mp3");
  audio.play();
  $("." + str).addClass("pressed");
  setTimeout(function () {
    $("." + str).removeClass("pressed");
  }, 400);
}
