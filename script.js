/* ================= ASKING ================= */
const messages=[
  "Are you sure?",
  "Really sure??",
  "Pookie please…",
  "Think again 😭",
  "My heart is right here 💔",
  "Okay fine… just kidding ❤️"
];

let noIndex=0, stage=0;

const gate=document.getElementById("gate");
const gateText=document.getElementById("gateText");
const yesBtn=document.getElementById("yesBtn");
const noBtn=document.getElementById("noBtn");
const main=document.getElementById("main");

function vibrate(ms){ navigator.vibrate?.(ms); }

noBtn.onclick=()=>{
  vibrate(30);
  gateText.textContent=messages[noIndex++%messages.length];
  yesBtn.style.fontSize=`${1.2+noIndex*.15}em`;
};

yesBtn.onclick=()=>{
  vibrate(80);

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
      localStorage.setItem("yesDate",
        new Date().toLocaleDateString(undefined,{
          year:"numeric",month:"long",day:"numeric"
        })
      );
    }
    gate.style.opacity=0;
    setTimeout(()=>gate.remove(),1200);
    main.classList.remove("blurred");
    main.classList.add("zoom");
    document.body.style.overflow="auto";
    startExperience();
  }
};

/* ================= ULTRA-REAL SAKURA (PHYSICS) ================= */
let wind=0.3;
let lastScroll=0;

function startSakura(){
  setInterval(()=>{
    const p=document.createElement("div");
    p.className="sakura-petal";

    const size=10+Math.random()*10;
    p.style.width=size+"px";
    p.style.height=size*0.7+"px";
    p.style.left=Math.random()*innerWidth+"px";

    let x=parseFloat(p.style.left);
    let y=-40;
    let vx=(Math.random()-.5)*0.6;
    let vy=0.6+Math.random()*0.8;
    let rot=Math.random()*360;
    let vr=(Math.random()-.5)*2;

    document.body.appendChild(p);

    function animate(){
      const scrollDir = window.scrollY>lastScroll?1:-1;
      lastScroll=window.scrollY;
      wind+=scrollDir*0.002;

      vx+=wind*0.01;
      vy+=0.002; // gravity

      x+=vx;
      y+=vy;
      rot+=vr;

      p.style.transform=`translate(${x}px,${y}px) rotate(${rot}deg)`;

      if(y<innerHeight+40){
        requestAnimationFrame(animate);
      }else{
        p.remove();
      }
    }
    animate();
  },380);
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

function startExperience(){
  startSakura();
  buildGallery();

  const d=localStorage.getItem("yesDate");
  if(d) dateEl.textContent=`She said yes on ${d} ❤️`;

  new IntersectionObserver(e=>{
    if(e[0].isIntersecting){
      ending.classList.add("show");
      setTimeout(()=>{
        finalLove.classList.add("show");
        cinematicEnd();
      },2500);
    }
  },{threshold:.6}).observe(ending);

  loadMusic();
}

/* ================= MUSIC ================= */
function loadMusic(){
  const tag=document.createElement("script");
  tag.src="https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}
let player;
function onYouTubeIframeAPIReady(){
  player=new YT.Player("player",{
    videoId:"96YyRY8vkhY",
    playerVars:{start:16,autoplay:1},
    events:{onReady:e=>e.target.playVideo()}
  });
}

/* ================= CINEMATIC END ================= */
function cinematicEnd(){
  const f=document.createElement("div");
  f.id="fadeBlack";
  document.body.appendChild(f);
  setTimeout(()=>f.classList.add("show"),9000);
}

/* ================= INIT ================= */
window.onload=()=>{
  main.classList.add("blurred");
  document.body.style.overflow="hidden";
};
