/* ---------- STARS ---------- */
for(let i=0;i<90;i++){
  const s=document.createElement("div");
  s.className="star";
  s.style.left=Math.random()*100+"vw";
  s.style.top=Math.random()*100+"vh";
  s.style.animationDelay=Math.random()*6+"s";
  document.body.appendChild(s);
}

/* ---------- SAKURA PETALS ---------- */
function spawnPetal(){
  const p=document.createElement("div");
  p.className="sakura";
  p.style.left=Math.random()*100+"vw";
  p.style.setProperty("--x",`${Math.random()*120-60}px`);
  p.style.setProperty("--r",`${Math.random()*360}deg`);
  p.style.animationDuration=14+Math.random()*10+"s";
  document.body.appendChild(p);
  setTimeout(()=>p.remove(),24000);
}
setInterval(spawnPetal,900);

/* ---------- MUSIC (YouTube API) ---------- */
let player;
function loadMusic(){
  if(player) return;
  const tag=document.createElement("script");
  tag.src="https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}
function onYouTubeIframeAPIReady(){
  player=new YT.Player("player",{
    videoId:"96YyRY8vkhY",
    playerVars:{start:16,autoplay:1},
    events:{
      onReady:e=>e.target.playVideo()
    }
  });
}

/* ---------- ASKING FLOW ---------- */
const gate=document.getElementById("gate");
const yesBtn=document.getElementById("yesBtn");
const noBtn=document.getElementById("noBtn");
const gateText=document.getElementById("gateText");
const main=document.getElementById("main");

const noTexts=[
  "Are you sure?",
  "Please think again…",
  "My heart is here 💔",
  "Don’t say no 🥺",
  "Say yes ❤️"
];
let noIndex=0;
let stage=0;

noBtn.onclick=()=>{
  gateText.textContent=noTexts[noIndex++%noTexts.length];
  navigator.vibrate?.(30);
};

yesBtn.onclick=()=>{
  navigator.vibrate?.(80);

  /* FIRST YES MESSAGE */
 if(stage===0){
  if(!localStorage.getItem("yesDate")){
    localStorage.setItem("yesDate",new Date().toDateString());
  }

  // Step 1: Thank you screen (NO buttons)
  gateText.textContent = "Thank you for choosing me ❤️";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";
  stage = 1;

  // Step 2: Surprise question (YES button returns)
  setTimeout(()=>{
    gateText.textContent = "Are you ready for a small surprise?";
    yesBtn.style.display = "inline-block";
  }, 1600);

  return;
}

  /* SECOND YES → ENTER */
  gate.style.opacity=0;
  setTimeout(()=>gate.remove(),900);
  main.classList.remove("blurred");
  document.body.style.overflow="auto";
  loadMusic();
  startExperience();
};

/* ---------- MAIN EXPERIENCE ---------- */
function startExperience(){
  buildGallery();
  showDate();

  const observer=new IntersectionObserver(e=>{
    if(e[0].isIntersecting){
      document.querySelector(".ending").classList.add("show");
      setTimeout(()=>{
        document.getElementById("finalLove").classList.add("show");
        endCinematic();
      },2500);
    }
  },{threshold:.6});
  observer.observe(document.querySelector(".ending"));
}

function buildGallery(){
  const g=document.getElementById("gallery");
  for(let i=1;i<=11;i++){
    const d=document.createElement("div");
    d.className="photo";
    d.innerHTML=`<img src="image${i}.jpg">`;
    g.appendChild(d);
    new IntersectionObserver(e=>{
      if(e[0].isIntersecting) d.classList.add("show");
    }).observe(d);
  }
}

function showDate(){
  const d=localStorage.getItem("yesDate");
  if(d){
    document.getElementById("yesDate").textContent=
      `She said yes on ${d} ❤️`;
  }
}

/* ---------- CINEMATIC END ---------- */
function endCinematic(){
  setTimeout(()=>{
    const f=document.createElement("div");
    f.className="fade-black";
    document.body.appendChild(f);
  },7000);
}

/* ---------- ALWAYS ASK ON OPEN ---------- */
window.onload=()=>{
  main.classList.add("blurred");
  document.body.style.overflow="hidden";
};
