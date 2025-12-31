/* ---------- STARS ---------- */
for(let i=0;i<80;i++){
  const s=document.createElement("div");
  s.className="star";
  s.style.left=Math.random()*100+"vw";
  s.style.top=Math.random()*100+"vh";
  s.style.animationDelay=Math.random()*6+"s";
  document.body.appendChild(s);
}

/* ---------- MOON ---------- */
const moon=document.createElement("div");
moon.className="moon";
document.body.appendChild(moon);

/* ---------- SAKURA PETALS ---------- */
function spawnPetal(){
  const p=document.createElement("div");
  p.className="sakura";
  p.style.left=Math.random()*100+"vw";
  p.style.setProperty("--x",`${Math.random()*120-60}px`);
  p.style.setProperty("--r",`${Math.random()*360}deg`);
  p.style.animationDuration=12+Math.random()*8+"s";
  document.body.appendChild(p);
  setTimeout(()=>p.remove(),22000);
}
setInterval(spawnPetal,900);

/* ---------- ASKING LOGIC ---------- */
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

noBtn.onclick=()=>{
  gateText.textContent=noTexts[noIndex++%noTexts.length];
  navigator.vibrate?.(30);
};

yesBtn.onclick=()=>{
  navigator.vibrate?.(80);

  /* save first YES only */
  if(!localStorage.getItem("yesDate")){
    const d=new Date().toDateString();
    localStorage.setItem("yesDate",d);
  }

  /* ring sparkle */
  const r=document.createElement("div");
  r.className="ring";
  r.style.left="50%";
  r.style.top="50%";
  document.body.appendChild(r);
  setTimeout(()=>r.remove(),1600);

  gate.style.opacity=0;
  setTimeout(()=>gate.remove(),900);
  main.classList.remove("blurred");
  document.body.style.overflow="auto";
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
  if(d) document.getElementById("yesDate").textContent=`She said yes on ${d} ❤️`;
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
