/* ---------- MEMORY ---------- */
if(localStorage.getItem("sheSaidYes")){
  document.getElementById("gate")?.remove();
  document.getElementById("main").classList.remove("blurred");
  document.body.style.overflow = "auto";
  startExperience();
}

/* ---------- ASKING ---------- */
const messages=[
  "Are you sure?",
  "Really sure??",
  "Pookie please…",
  "Think again 😭",
  "My heart is right here 💔",
  "Okay fine… just kidding ❤️"
];

let noIndex=0;
let stage=0;

const gate=document.getElementById("gate");
const gateText=document.getElementById("gateText");
const yesBtn=document.getElementById("yesBtn");
const noBtn=document.getElementById("noBtn");
const main=document.getElementById("main");

function vibrate(){ if(navigator.vibrate) navigator.vibrate(20); }

noBtn.onclick=()=>{
  vibrate();
  gateText.textContent=messages[noIndex%messages.length];
  noIndex++;
  yesBtn.style.fontSize=`${1.2+noIndex*0.15}em`;
};

yesBtn.onclick=()=>{
  vibrate();
  fireworkBurst();

  if(stage===0){
    noBtn.style.display="none";
    yesBtn.style.display="none";
    gateText.textContent="Thank you for choosing me ❤️";
    stage=1;

    setTimeout(()=>{
      gateText.textContent="Are you ready for a small surprise? ✨";
      yesBtn.style.display="inline-block";
    },1800);
  }else{
    const date=new Date().toLocaleDateString(undefined,{
      year:"numeric",month:"long",day:"numeric"
    });
    localStorage.setItem("sheSaidYes","true");
    localStorage.setItem("yesDate",date);

    gate.style.opacity=0;
    setTimeout(()=>gate.remove(),1000);
    main.classList.remove("blurred");
    document.body.style.overflow="auto";
    startExperience();
  }
};

/* ---------- FIREWORKS ---------- */
function fireworkBurst(){
  const colors=["#ff5fa2","#ffd166","#a0c4ff","#ffb4a2"];
  for(let i=0;i<30;i++){
    const f=document.createElement("div");
    f.className="firework";
    f.style.background=colors[Math.floor(Math.random()*colors.length)];
    f.style.left="50%";
    f.style.top="50%";
    f.style.setProperty("--x",`${Math.random()*400-200}px`);
    f.style.setProperty("--y",`${Math.random()*-350}px`);
    document.body.appendChild(f);
    setTimeout(()=>f.remove(),1600);
  }
}

/* ---------- MAIN EXPERIENCE ---------- */
const gallery=document.getElementById("gallery");
const ending=document.getElementById("ending");
const finalLove=document.getElementById("finalLove");
const dateEl=document.getElementById("yesDate");

function buildGallery(){
  for(let i=1;i<=11;i++){
    const p=document.createElement("div");
    p.className="photo";
    p.innerHTML=`<img src="image${i}.jpg">`;
    gallery.appendChild(p);

    new IntersectionObserver(e=>{
      if(e[0].isIntersecting) p.classList.add("show");
    },{threshold:.4}).observe(p);
  }
}

function startAmbientHearts(){
  setInterval(()=>{
    const h=document.createElement("div");
    h.className="ambient-heart";
    h.textContent="❤️";
    h.style.left=Math.random()*100+"vw";
    h.style.animationDuration=4+Math.random()*3+"s";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),7000);
  },900);
}

function startExperience(){
  buildGallery();
  startAmbientHearts();

  const savedDate=localStorage.getItem("yesDate");
  if(savedDate) dateEl.textContent=`She said yes on ${savedDate} ❤️`;

  const tag=document.createElement("script");
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
  player=new YT.Player("player",{
    videoId:"96YyRY8vkhY",
    playerVars:{start:16,autoplay:1},
    events:{onReady:e=>e.target.playVideo()}
  });
}

/* 🔁 SECRET REPLAY */
let timer=null;
document.body.addEventListener("touchstart",()=>timer=setTimeout(reset,5000));
document.body.addEventListener("touchend",()=>clearTimeout(timer));

let keys={};
document.addEventListener("keydown",e=>{
  keys[e.key.toLowerCase()]=true;
  if(keys.r&&keys.e&&keys.l) reset();
});
document.addEventListener("keyup",e=>keys[e.key.toLowerCase()]=false);

function reset(){
  localStorage.clear();
  location.reload();
}
