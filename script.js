/* ================== SAFE BOOT ================== */
document.addEventListener("DOMContentLoaded", () => {
  const gate = document.getElementById("gate");
  const main = document.getElementById("main");

  // Default state
  document.body.style.overflow = "hidden";
  main.classList.add("blurred");

  if (localStorage.getItem("sheSaidYes") === "true") {
    gate.remove();
    main.classList.remove("blurred");
    document.body.style.overflow = "auto";
    startExperience();
  } else {
    gate.style.display = "flex";
  }
});

/* ================== ASKING ================== */
const gateText = document.getElementById("gateText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const gate = document.getElementById("gate");
const main = document.getElementById("main");

const noMessages = [
  "Are you sure?",
  "Please 🥺",
  "Think again 💔",
  "I’ll cry 😭",
  "Say yes please ❤️"
];

let noIndex = 0;
let stage = 0;

function vibrate(ms = 30) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

noBtn.onclick = () => {
  vibrate();
  gateText.textContent = noMessages[noIndex % noMessages.length];
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
    const date = new Date().toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    localStorage.setItem("sheSaidYes", "true");
    localStorage.setItem("yesDate", date);

    gate.style.opacity = "0";
    setTimeout(() => gate.remove(), 1000);

    main.classList.remove("blurred");
    document.body.style.overflow = "auto";
    startExperience();
  }
};

/* ================== FIREWORKS ================== */
function fireworkBurst() {
  const colors = ["#ff5fa2", "#ffd166", "#a0c4ff", "#ffb4a2"];
  for (let i = 0; i < 30; i++) {
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

/* ================== MAIN EXPERIENCE ================== */
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

function startAmbientHearts() {
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

function startExperience() {
  buildGallery();
  startAmbientHearts();

  const savedDate = localStorage.getItem("yesDate");
  if (savedDate) {
    dateEl.textContent = `She said yes on ${savedDate} ❤️`;
  }

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  new IntersectionObserver(e => {
    if (e[0].isIntersecting) {
      ending.classList.add("show");
      setTimeout(() => finalLove.classList.add("show"), 2000);
    }
  }, { threshold: 0.6 }).observe(ending);
}

/* ================== MUSIC ================== */
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "96YyRY8vkhY",
    playerVars: { start: 16, autoplay: 1, playsinline: 1 },
    events: { onReady: e => e.target.playVideo() }
  });
}

/* ================== SECRET RESET ================== */
let holdTimer = null;
document.body.addEventListener("touchstart", () => {
  holdTimer = setTimeout(reset, 5000);
});
document.body.addEventListener("touchend", () => clearTimeout(holdTimer));

let keys = {};
document.addEventListener("keydown", e => {
  keys[e.key.toLowerCase()] = true;
  if (keys.r && keys.e && keys.l) reset();
});
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

function reset() {
  localStorage.clear();
  location.reload();
}
