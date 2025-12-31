let unlocked=false;
let player;

/* UNLOCK */
function unlock(){
  if(unlocked) return;
  unlocked=true;
  document.getElementById("mobileUnlock").remove();
}
document.addEventListener("click",unlock,{once:true});
document.addEventListener("touchstart",unlock,{once:true});

/* YOUTUBE */
function onYouTubeIframeAPIReady(){
  player=new YT.Player("player",{
    videoId:"96YyRY8vkhY",
    playerVars:{start:16,controls:0,playsinline:1}
  });
}

/* ASKING */
const noMessages=[
  "Are you sure?",
  "Please 🥺",
  "Think again 💔",
  "I’ll cry 😭",
  "Say yes please ❤️"
];
let noIndex=0;

document.getElementById("noBtn").onclick=()=>{
  navigator.vibrate?.(30);
  document.getElementById("noBtn").innerText=noMessages[noIndex++%noMessages.length];
};

document.getElementById("yesBtn").onclick=()=>{
  navigator.vibrate?.(80);
  localStorage.setItem("sheSaidYes","true");
  localStorage.setItem("yesDate",new Date().toString());
  document.getElementById("askScreen").classList.add("hidden");
  document.getElementById("thankYou").classList.remove("hidden");
  fireworks();
  setTimeout(startMain,2000);
};

/* MAIN */
function startMain(){
  document.getElementById("thankYou").classList.add("hidden");
  document.getElementById("mainContent").classList.remove("hidden");
  buildGallery();
  typeText();
  showDate();
  player?.playVideo();
}

/* GALLERY */
function buildGallery(){
  const g=document.getElementById("gallery");
  for(let i=1;i<=11;i++){
    const d=document.createElement("div");
    d.className="photo";
    d.innerHTML=`<img src="image${i}.jpg">`;
    g.appendChild(d);
  }
}

/* TYPE */
const lines=["Another year.","Still us.","Always you ❤️"];
let li=0,ci=0;
function typeText(){
  if(li>=lines.length) return;
  document.getElementById("typedText").innerHTML+=lines[li][ci++]||"";
  if(ci>lines[li].length){
    document.getElementById("typedText").innerHTML+="\n";
    li++;ci=0;
    setTimeout(typeText,500);
  }else setTimeout(typeText,70);
}

/* DATE */
function showDate(){
  const d=new Date(localStorage.getItem("yesDate"));
  document.getElementById("dateText").innerText=
    `She said yes on ${d.toDateString()} ❤️`;
}

/* JAPANESE-STYLE FIREWORKS */
function fireworks(){
  for(let k=0;k<6;k++){
    setTimeout(()=>{
      const fw=document.createElement("div");
      fw.className="firework";
      document.body.appendChild(fw);

      const colors=["#ff5fa2","#ffd166","#f72585","#ffb703","#ff9bd5"];
      const particles=30;
      for(let i=0;i<particles;i++){
        const p=document.createElement("div");
        p.style.position="absolute";
        p.style.width="4px";
        p.style.height="4px";
        p.style.borderRadius="50%";
        p.style.background=colors[Math.floor(Math.random()*colors.length)];
        fw.appendChild(p);

        const a=Math.random()*Math.PI*2;
        const d=60+Math.random()*80;
        p.animate([
          {transform:"translate(0,0)",opacity:1},
          {transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px)`,opacity:0}
        ],{duration:1800,easing:"ease-out"});
      }
      setTimeout(()=>fw.remove(),2000);
    },k*300);
  }
}

/* AUTO SKIP IF ALREADY SAID YES */
if(localStorage.getItem("sheSaidYes")){
  document.getElementById("askScreen").classList.add("hidden");
  startMain();
}
