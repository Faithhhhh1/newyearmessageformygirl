/* ================= STARS + MOON ================= */
document.body.insertAdjacentHTML("afterbegin",`
  <div class="stars"></div>
  <div class="stars near"></div>
  <div class="moon"></div>
`);

/* ================= SAKURA PETALS ================= */
let wind = 0;

window.addEventListener("scroll", () => {
  wind = Math.max(-0.6, Math.min(0.6, window.scrollY / 2000));
});

function spawnPetal(){
  const p = document.createElement("div");
  p.className = "sakura-petal";
  p.style.left = Math.random() * 100 + "vw";

  const fall = 40 + Math.random() * 40;
  const drift = (Math.random() * 40 - 20) + wind * 60;
  const rotate = Math.random() * 360;

  document.body.appendChild(p);

  p.animate([
    { transform:`translate(0,0) rotate(0deg)`, opacity:.9 },
    { transform:`translate(${drift}px, ${window.innerHeight + fall}px) rotate(${rotate}deg)`, opacity:0 }
  ],{
    duration:12000 + Math.random() * 5000,
    easing:"linear"
  });

  setTimeout(()=>p.remove(),18000);
}

setInterval(spawnPetal,900);

/* ================= CINEMATIC ZOOM ================= */
setTimeout(()=>{
  document.getElementById("main")?.classList.add("zoom");
},2000);
