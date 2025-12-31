let started = false;
const TOTAL = 11;
const BPM = 72;
const BEAT = 60000 / BPM;

const gallery = document.getElementById("gallery");
const ending = document.getElementById("ending");
const typedText = document.getElementById("typedText");
const secret = document.getElementById("secret");

/* BUILD IMAGE GALLERY */
function build(){
  for(let i=1;i<=TOTAL;i++){
    const p = document.createElement("div");
    p.className = "photo";
    p.innerHTML = `<img src="image${i}.jpg">`;
    gallery.appendChild(p);

    new IntersectionObserver(e=>{
      if(e[0].isIntersecting) p.classList.add("show");
    },{threshold:0.4}).observe(p);
  }
}

/* AMBIENT FLOATING HEARTS */
function startAmbient(){
  setInterval(()=>{
    if(!started) return;

    const h = document.createElement("div");
    h.className = "ambient-heart";
    h.textContent = "❤️";
    h.style.left = Math.random() * innerWidth + "px";
    document.body.appendChild(h);

    h.animate(
      [
        { transform: "translateY(0)" },
        { transform: `translateY(${innerHeight + 120}px)` }
      ],
      {
        duration: 5000,
        easing: "linear"
      }
    );

    setTimeout(()=>h.remove(),5200);
  }, BEAT);
}

/* TYPE EFFECT */
const lines = ["Two years.", "Still us.", "Always you."];
let li = 0, ci = 0;

function typeNext(){
  if(li >= lines.length) return;

  typedText.innerHTML += lines[li][ci] || "";
  ci++;

  if(ci > lines[li].length){
    typedText.innerHTML += "\n";
    li++;
    ci = 0;
    setTimeout(typeNext,600);
  }else{
    setTimeout(typeNext,70);
  }
}

/* 🔥 YOUTUBE — HIDDEN BUT PLAYING */
let player;
let tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

function onYouTubeIframeAPIReady(){
  player = new YT.Player("player",{
    videoId: "96YyRY8vkhY",
    playerVars: {
      start: 16,
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      fs: 0,
      iv_load_policy: 3
    }
  });
}

/* START EVERYTHING ON TAP */
function start(){
  if(started) return;
  started = true;

  if(player) player.playVideo();
  startAmbient();
}

document.body.addEventListener("click", start, { once:true });

/* ENDING OBSERVER */
new IntersectionObserver(e=>{
  if(e[0].isIntersecting){
    ending.classList.add("show");
    typeNext();
  }
},{threshold:0.6}).observe(ending);

/* SECRET MESSAGE */
let pressTimer = null;
document.body.addEventListener("touchstart",()=>{
  pressTimer = setTimeout(()=>{
    secret.style.display = "block";
  },3000);
});
document.body.addEventListener("touchend",()=>{
  clearTimeout(pressTimer);
});

/* INIT */
build();
