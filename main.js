let i = 0;
let speed = 50; 
let intervalId;
let typing;
let typing2;
let txt1 = 'In Dutch! I have no clue. But to me ...';
let txt2 = 'What do you think he will do next?'
let pulseSnd;
let introSnd;
//defining start, reset and question button
let question = document.getElementById("question");
let start = document.querySelector(".start");
let reset = document.querySelector(".reset");

reset.addEventListener("click", loadPage);
loadPage();

function loadPage() {
  document.getElementById("container-content").setAttribute("hidden", "true");
  document.getElementById("container-cards").setAttribute("hidden", "true");
  //Listening on button click to trigger page and audio for UX
  start.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("#container-content").removeAttribute("hidden");
    e.target.style.display = "none";
    pulse();
    setTimeout(startPage, 4000);
    setTimeout(stopPulse, 3000);
    introSnd = new Audio("./intro.wav");
    introSnd.preload = "auto";
    setTimeout(function () {
      introSnd.play();
      document.getElementById("container-cards").removeAttribute("hidden");
    }, 7000);
  });
}

function startPage() {

  typing = document.getElementById("typing");
  startTyping(txt1, typing);

  introSnd.addEventListener("ended", function (){
    i = 0;
    typing.innerHTML = "";    
    startTyping(txt2, typing);
    pulse.play()

    question.style.visibility = "visible";
  });
  question.addEventListener("click", (e)=> {
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
  pulseSnd = new Audio("./file.mp3"); // buffers automatically when created
  pulseSnd.preload = "auto";
  pulseSnd.play();
  setTimeout(stopPulse, 6000);
}

function stopPulse() {
  document.querySelector(".pulse").style.animation = "none";
  pulseSnd.pause();
  pulseSnd.currentTime = 0;
}