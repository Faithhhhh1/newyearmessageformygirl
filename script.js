/* ---------------- ASKING FLOW ---------------- */

const gate = document.getElementById("gate");
const gateText = document.getElementById("gateText");
const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const main   = document.getElementById("main");

const noMessages = [
  "Are you sure?",
  "Please 🥺",
  "Think again 💔",
  "I’ll cry 😭",
  "Say yes ❤️"
];
let noIndex = 0;
let stage = 0;

noBtn.onclick = () => {
  navigator.vibrate?.(30);
  gateText.textContent = noMessages[noIndex++ % noMessages.length];
  yesBtn.style.transform = `scale(${1 + noIndex*0.08})`;
};

yesBtn.onclick = () => {
  navigator.vibrate?.(80);

  if(stage === 0){
    // FIRST YES
    noBtn.remove();
    yesBtn.remove();
    gateText.textContent = "Thank you for choosing me ❤️";
    stage = 1;

    setTimeout(()=>{
      gateText.textContent = "Are you ready for a small surprise? ✨";
      const btn = document.createElement("button");
      btn.textContent = "Yes ❤️";
      btn.style.marginTop = "15px";
      btn.onclick = finishGate;
      document.querySelector(".gate-box").appendChild(btn);
    },1800);
  }
};

function finishGate(){
  if(!localStorage.getItem("yesDate")){
    localStorage.setItem("yesDate", new Date().toDateString());
  }

  gate.remove();
  main.classList.remove("blurred");
  document.body.style.overflow = "auto";
  startExperience();
}

/* ---------------- MAIN EXPERIENCE ---------------- */

function startExperience(){
  startPetals();
  showDate();
  loadMusic();
}

/* 🌸 PETALS */
function startPetals(){
  setInterval(()=>{
    const p = document.createElement("div");
    p.className = "petal";
    p.style.left = Math.random()*100+"vw";
    p.style.top = "-10px";
    p.style.setProperty("--x", (Math.random()*80-40)+"px");
    p.style.setProperty("--r", (Math.random()*360)+"deg");
    p.style.animationDuration = 12 + Math.random()*6 + "s";
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),18000);
  },1200);
}

/* 📅 DATE */
function showDate(){
  const d = localStorage.getItem("yesDate");
  if(d){
    document.getElementById("yesDate").textContent =
      `She said yes on ${d} ❤️`;
  }
}

/* 🎵 MUSIC */
let player;
function loadMusic(){
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

function onYouTubeIframeAPIReady(){
  player = new YT.Player("player",{
    videoId:"96YyRY8vkhY",
    playerVars:{ start:16, autoplay:1, controls:0 },
    events:{ onReady:e=>e.target.playVideo() }
  });
}
