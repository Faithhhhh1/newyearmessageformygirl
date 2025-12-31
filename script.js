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

noBtn.onclick = () => {
  gateText.textContent = messages[noIndex % messages.length];
  noIndex++;
  yesBtn.style.fontSize = `${1.2 + noIndex * 0.15}em`;
};

yesBtn.onclick = () => {
  if(stage === 0){
    gateText.textContent = "Thank you for choosing me ❤️";
    noBtn.style.display = "none";
    stage = 1;
    setTimeout(() => {
      gateText.textContent = "Are you ready for a small surprise? ✨";
    }, 1500);
  } else {
    gate.style.opacity = 0;
    setTimeout(() => gate.remove(), 1200);
    main.classList.remove("blurred");
    document.body.style.overflow = "auto";
    startExperience();
  }
};

/* ---------- MAIN EXPERIENCE ---------- */
const gallery = document.getElementById("gallery");

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

/* MUSIC (YouTube) */
let player;
function onYouTubeIframeAPIReady(){
  player = new YT.Player("player",{
    videoId:"96YyRY8vkhY",
    playerVars:{ start:16, autoplay:1 },
    events:{ onReady:e=>e.target.playVideo() }
  });
}

function startExperience(){
  buildGallery();
  const tag = document.createElement("script");
  tag.src="https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}
