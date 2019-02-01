let i = 0;
let speed = 50; 
let intervalId;
let typing = document.getElementById("typing");
let txt1 = 'In Dutch! I have no clue. But to me ...';
let txt2 = 'What do you think he will do next?'
let pulseSnd = new Audio("./file.mp3");
let introSnd = new Audio("./intro.wav");

//preloads so it can start on page;
pulseSnd.preload = "auto";
introSnd.preload = "auto";

//defining start, reset and question button
let question = document.getElementById("question");
let start = document.querySelector(".start");
let reset = document.querySelector(".reset");

reset.addEventListener("click", loadPage);
loadPage();

function loadPage() {
  i = 0;
  typing.innerHTML = "";  
  question.removeAttribute("style");
  start.style.display = "block";
  document.getElementById("container-content").setAttribute("hidden", "true");
  document.getElementById("container-cards").setAttribute("hidden", "true");
  //Listening on button click to trigger page and audio
  start.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("#container-content").removeAttribute("hidden");
    e.target.style.display = "none";
    pulse();
    setTimeout(startPage, 4000);
    setTimeout(stopPulse, 3000);
    introSnd.preload = "auto";
    setTimeout(function () {
      introSnd.play();
      document.getElementById("container-cards").removeAttribute("hidden");
    }, 7000);
  });
}

function startPage() {
  startTyping(txt1, typing);
  
  introSnd.addEventListener("ended", function (){
    i = 0;
    typing.innerHTML = "";    
    startTyping(txt2, typing);
    pulseSnd.play()
    setTimeout(stopPulse, 6000);
    question.style.visibility = "visible";
  });
  question.addEventListener("click", (e)=> {
    stopPulse();
    e.preventDefault();
    document.getElementById("result").classList.add("show");
    document.getElementById("result").addEventListener("click", ()=>{
      document.getElementById("result").classList.remove("show");
    });
  });

}

function startTyping(text, elem) {
  if (i < text.length) {
    elem.innerHTML += text.charAt(i);
    i++;
    intervalId = setTimeout(startTyping, speed, text, elem);
  }
}

function pulse() {
  document.querySelector(".pulse").style.animation = "pulse linear 1s infinite";
  pulseSnd.play();
}

function stopPulse() {
  document.querySelector(".pulse").style.animation = "none";
  pulseSnd.pause();
  pulseSnd.currentTime = 0;
}