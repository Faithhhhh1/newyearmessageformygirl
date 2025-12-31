/* ---------- ASKING LOGIC ---------- */

const messages = [
  "Are you sure?",
  "Really sure??",
  "Pookie please 🥺",
  "Think again 💔",
  "I’ll cry 😭",
  "Okay fine… just kidding ❤️"
];

let noIndex = 0;
let stage = 0;

const gate = document.getElementById("gate");
const gateText = document.getElementById("gateText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const main = document.getElementById("main");

function vibrate(ms = 30) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

noBtn.onclick = () => {
  vibrate();
  gateText.textContent = messages[noIndex % messages.length];
  noIndex++;
  yesBtn.style.fontSize = `${1.2 + noIndex * 0.15}em`;
};

yesBtn.onclick = () => {
  vibrate(80);
  fireworkBurst();

  if (stage === 0) {
    noBtn.style.display = "none";
    yesBtn.style.display = "none";
    gateText.textContent = "Thank you for choosing me ❤️";
    stage = 1;

    setTimeout(() => {
      gateText.textContent = "Are you ready for a small surprise? ✨";
      yesBtn.style.display = "inline-block";
    }, 1800);

  } else {
    // SAVE DATE ONLY ON FIRST EVER YES
    if (!localStorage.getItem("yesDate")) {
      const date = new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      localStorage.setItem("yesDate", date);
    }

    gate.style.opacity = 0;
    setTimeout(() => gate.remove(), 1000);

    main.classList.remove("blurred");
    document.body.style.overflow = "auto";
    startExperience();
  }
};

/* ---------- FIREWORKS (JAPANESE STYLE) ---------- */
function fireworkBurst() {
  const colors = ["#ff5fa2", "#ffd166", "#a0c4ff", "#ffb4a2"];
  for (let i = 0; i < 36; i++) {
    const f = document.createElement("div");
    f.className = "firework";
    f.style.background = colors[Math.floor(Math.random() * colors.length)];
    f.style.left = "50%";
    f.style.top = "50%";
    f.style.setProperty("--x", `${Math.random() * 400 - 200}px`);
    f.style.setProperty("--y", `${Math.random() * -350}px`);
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 1600);
  }
}

/* ---------- MAIN EXPERIENCE ---------- */

const gallery = document.getElementById("gallery");
const ending = document.getElementById("ending");
const finalLove = document.getElementById("finalLove");
const dateEl = document.getElementById("yesDate");

function buildGallery() {
  for (let i = 1; i <= 11; i++) {
    const p = document.createElement("div");
    p.className = "photo";
    p.innerHTML = `<img src="image${i}.jpg">`;
    gallery.appendChild(p);

    new IntersectionObserver(e => {
      if (e[0].isIntersecting) p.classList.add("show");
    }, { threshold: 0.4 }).observe(p);
  }
}

function startHearts() {
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "ambient-heart";
    h.textContent = "❤️";
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = 4 + Math.random() * 3 + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 7000);
  }, 900);
}

function typeText() {
  const lines = ["Another year.", "Still us.", "Always you ❤️"];
  let li = 0, ci = 0;
  const t = document.getElementById("typedText");

  function next() {
    if (li >= lines.length) return;
    t.innerHTML += lines[li][ci++] || "";
    if (ci > lines[li].length) {
      t.innerHTML += "<br>";
      li++; ci = 0;
      setTimeout(next, 500);
    } else setTimeout(next, 70);
  }
  next();
}

function startExperience() {
  buildGallery();
  startHearts();
  typeText();

  const savedDate = localStorage.getItem("yesDate");
  if (savedDate) {
    dateEl.textContent = `She said yes on ${savedDate} ❤️`;
  }

  new IntersectionObserver(e => {
    if (e[0].isIntersecting) {
      ending.classList.add("show");
      setTimeout(() => finalLove.classList.add("show"), 2000);
    }
  }, { threshold: 0.6 }).observe(ending);

  loadMusic();
}

/* ---------- MUSIC ---------- */
let player;
function loadMusic() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "96YyRY8vkhY",
    playerVars: { start: 16, autoplay: 1 },
    events: { onReady: e => e.target.playVideo() }
  });
}

/* ---------- INITIAL STATE ---------- */
window.onload = () => {
  document.body.style.overflow = "hidden";
  main.classList.add("blurred");
};
