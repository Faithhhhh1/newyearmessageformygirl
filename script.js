/* ---------- LOCAL MEMORY ---------- */
if(localStorage.getItem("sheSaidYes")){
  document.getElementById("gate")?.remove();
  document.getElementById("main").classList.remove("blurred");
  document.body.style.overflow = "auto";
  startExperience();
}

/* ---------- ASKING LOGIC ---------- */
const messages = [
  "Are you sure?",
  "Really sure??",
  "Pookie please…",
  "Think again 😭",
  "My heart is right here 💔",
  "Okay fine… just kidding ❤️"
];

let noIndex = 0;
let stage = 0;

const gate = document.getElementById("gate");
const gateText = document.getElementById("gateText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const main = document.getElementById("main");

function vibrate(){
  if(navigator.vibrate) navigator.vibrate(20);
}

noBtn.onclick = () => {
  vibrate();
  gateText.textContent = messages[noIndex % messages.length];
  noIndex++;
  yesBtn.style.fontSize = `${1.2 + noIndex * 0.15}em`;
};

yesBtn.onclick = () => {
  vibrate();
  heartBurst();

  if(stage === 0){
    gateText.textContent = "Thank you for choosing me ❤️";
    noBtn.style.display = "none";
    stage = 1;

    setTimeout(() => {
      gateText.textContent = "Are you ready for a small surprise? ✨";
    }, 1500);
  } else {
    localStorage.setItem("sheSaidYes","true");

    gate.style.opacity = 0;
    setTimeout(() => gate.remove(), 1000);
    main.classList.remove("blurred");
    document.body.style.overflow = "auto";
    startExperience();
  }
};

/* ---------- HEART BURST ---------- */
function heartBurst(){
  for(let i=0;i<20;i++){
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = "❤️";
    h.style.left = "50%";
    h.style.top = "50%";
    h.style.setProperty("--x", `${Math.random()*300-150}px`);
    h.style.setProperty("--y", `${Math.random()*-300}px`);
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1800);
  }
}

/* ---------- MAIN EXPERIENCE ---------- */
const gallery = document.getElementById("gallery");
const ending = document.getElementById("ending");
const finalLove = document.getElementById("finalLove");

function buildGallery(){
  for(let i=1;i<=11;i++){
    const p = document.createElement("div");
    p.className = "photo";
    p.innerHTML = `<img src="image${i}.jpg">`;
    gallery.appendChild(p);

    new IntersectionObserver(e=>{
      if(e[0].isIntersecting) p.classList.add("show");
    },{threshold:.4}).observe(p);
  }
}

function startExperience(){
  buildGallery();

  const tag = document.createElement("script");
  tag.src="https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  new IntersectionObserver(e=>{
    if(e[0].isIntersecting){
      ending.classList.add("show");
      setTimeout(()=>finalLove.classList.add("show"),2000);
    }
  },{threshold:.6}).observe(ending);
}

/* MUSIC */
let player;
function onYouTubeIframeAPIReady(){
  player = new YT.Player("player",{
    videoId:"96YyRY8vkhY",
    playerVars:{ start:16, autoplay:1 },
    events:{ onReady:e=>e.target.playVideo() }
  });
}
