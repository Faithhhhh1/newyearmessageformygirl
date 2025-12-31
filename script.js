/* ================= ASKING ================= */
const messages=[
  "Are you sure?",
  "Really sure??",
  "Pookie please 🥺",
  "Think again 💔",
  "I’ll cry 😭",
  "Okay fine… just kidding ❤️"
];

let noIndex=0, stage=0;

const gate=document.getElementById("gate");
const gateText=document.getElementById("gateText");
const yesBtn=document.getElementById("yesBtn");
const noBtn=document.getElementById("noBtn");
const main=document.getElementById("main");

function vibrate(ms=30){ navigator.vibrate?.(ms); }

noBtn.onclick=()=>{
  vibrate();
  gateText.textContent=messages[noIndex++%messages.length];
  yesBtn.style.fontSize=`${1.2+noIndex*.15}em`;
};

yesBtn.onclick=(e)=>{
  vibrate(80);
  fireworkBurst(e.clientX,e.clientY);

  if(stage===0){
    stage=1;
    noBtn.style.display="none";
    yesBtn.style.display="none";
    gateText.textContent="Thank you for choosing me ❤️";

    setTimeout(()=>{
      gateText.textContent="Are you ready for a small surprise? ✨";
      yesBtn.style.display="inline-block";
    },1800);
  }else{
    if(!localStorage.getItem("yesDate")){
      ringSparkle();
      localStorage.setItem("yesDate",
        new Date().toLocaleDateString(undefined,{
          year:"numeric",month:"long",day:"numeric"
        })
      );
    }
    gate.style.opacity=0;
    setTimeout(()=>gate.remove(),900);
    main.classList.remove("blurred");
    document.body.style.overflow="auto";
    startExperience();
  }
};

/* ================= FIREWORKS ================= */
function fireworkBurst(x=innerWidth/2,y=innerHeight/2){
  const colors=["#ff6fae","#ffd166","#a0c4ff","#ffb703","#ff9bd5"];
  for(let i=0;i<48;i++){
    const p=document.createElement("div");
    p.className="firework";
    p.style.background=colors[Math.random()*colors.length|0];
    p.style.left=x+"px";
    p.style.top=y+"px";
    document.body.appendChild(p);

    const a=(Math.PI*2*i)/48;
    const d=120+Math.random()*80;
    p.animate([
      {transform:"translate(0,0)",opacity:1},
      {transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px)`,opacity:.8},
      {transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d+40}px)`,opacity:0}
    ],{duration:2200,easing:"cubic-bezier(.22,.61,.36,1)"});

    setTimeout(()=>p.remove(),2300);
  }
}

/* ================= RING ================= */
function ringSparkle(){
  const r=document.createElement("div");
  r.textContent="💍";
  r.style.cssText="position:fixed;left:50%;top:50%;font-size:64px;transform:translate(-50%,-50%);filter:drop-shadow(0 0 40px gold);z-index:30";
  document.body.appendChild(r);
  setTimeout(()=>r.remove(),2200);
}

/* ================= MAIN ================= */
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

/* Sakura petals follow scroll direction */
let lastScroll=0;
function startSakura(){
  setInterval(()=>{
    const p=document.createElement("div");
    p.className="sakura";
    p.textContent="🌸";
    p.style.left=Math.random()*100+"vw";
    p.style.animationDuration=6+Math.random()*4+"s";
    const dir=(window.scrollY>lastScroll?1:-1);
    p.style.setProperty("--drift",(dir*(40+Math.random()*80))+"px");
    lastScroll=window.scrollY;
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),10000);
  },700);
}

function startExperience(){
  buildGallery();
  startSakura();

  const d=localStorage.getItem("yesDate");
  if(d) dateEl.textContent=`She said yes on ${d} ❤️`;

  new IntersectionObserver(e=>{
    if(e[0].isIntersecting){
      ending.classList.add("show");
      setTimeout(()=>finalLove.classList.add("show"),2000);
    }
  },{threshold:.6}).observe(ending);

  loadMusic();
}

/* ================= MUSIC ================= */
let player;
function loadMusic(){
  const tag=document.createElement("script");
  tag.src="https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}
function onYouTubeIframeAPIReady(){
  player=new YT.Player("player",{
    videoId:"96YyRY8vkhY",
    playerVars:{start:16,autoplay:1},
    events:{onReady:e=>e.target.playVideo()}
  });
}

/* ================= INIT ================= */
window.onload=()=>{
  document.body.style.overflow="hidden";
  main.classList.add("blurred");
};
