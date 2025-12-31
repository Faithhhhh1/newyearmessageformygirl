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

function vibrate(ms){ navigator.vibrate?.(ms); }

noBtn.onclick=()=>{
  vibrate(30);
  gateText.textContent=messages[noIndex%messages.length];
  noIndex++;
  yesBtn.style.fontSize=`${1.2+noIndex*0.15}em`;
};

yesBtn.onclick=()=>{
  vibrate(80);
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
    if(!localStorage.getItem("yesDate")){
      const d=new Date().toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"});
      localStorage.setItem("yesDate",d);
    }
    localStorage.setItem("sheSaidYes","true");

    gate.style.opacity=0;
    setTimeout(()=>gate.remove(),1200);
    main.classList.remove("blurred");
    document.body.style.overflow="auto";
    startExperience();
  }
};

/* ---------- FIREWORKS (JAPANESE STYLE) ---------- */
function fireworkBurst(){
  const colors=["#ffd166","#ff9bd5","#ffc6ff","#fff1a8"];
  for(let i=0;i<40;i++){
    const f=document.createElement("div");
    f.className="firework";
    f.style.background=colors[Math.floor(Math.random()*colors.length)];
    f.style.left="50%";
    f.style.top="50%";
    f.style.setProperty("--x",`${Math.cos(i)* (80+Math.random()*120)}px`);
    f.style.setProperty("--y",`${Math.sin(i)* (80+Math.random()*120)}px`);
    document.body.appendChild(f);
    setTimeout(()=>f.remove(),2200);
  }
}

/* ---------- LANTERNS ---------- */
function lanterns(){
  setInterval(()=>{
    const l=document.createElement("div");
    l.className="lantern";
    l.style.left=Math.random()*100+"vw";
    l.style.animationDuration=10+Math.random()*6+"s";
    document.body.appendChild(l);
    setTimeout(()=>l.remove(),18000);
  },2200);
}

/* ---------- MAIN ---------- */
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

function startExperience(){
  buildGallery();
  lanterns();

  const savedDate=localStorage.getItem("yesDate");
  if(savedDate) dateEl.textContent=`She said yes on ${savedDate} ❤️`;

  const tag=document.createElement("script");
  tag.src="https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  new IntersectionObserver(e=>{
    if(e[0].isIntersecting){
      ending.classList.add("show");
      setTimeout(()=>{
        finalLove.classList.add("show");
        cinematicEnd();
      },2000);
    }
  },{threshold:.6}).observe(ending);
}

/* 🎵 MUSIC */
let player;
function onYouTubeIframeAPIReady(){
  player=new YT.Player("player",{
    videoId:"96YyRY8vkhY",
    playerVars:{start:16,autoplay:1},
    events:{onReady:e=>e.target.playVideo()}
  });
}

/* 🎬 FADE TO BLACK */
function cinematicEnd(){
  const f=document.createElement("div");
  f.id="fadeBlack";
  document.body.appendChild(f);
  setTimeout(()=>f.classList.add("show"),8000);
}

/* ALWAYS ASK, KEEP DATE */
window.onload=()=>{
  main.classList.add("blurred");
  document.body.style.overflow="hidden";
};
