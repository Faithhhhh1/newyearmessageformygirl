/* ===============================
   ELEMENTS
================================ */
const gate = document.getElementById("gate");
const gateText = document.getElementById("gateText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const main = document.getElementById("main");
const gallery = document.getElementById("gallery");
const ending = document.getElementById("ending");
const finalLove = document.getElementById("finalLove");
const dateEl = document.getElementById("yesDate");

let stage = 0;
let noIndex = 0;
let player;

/* ===============================
   UTIL
================================ */
function vibrate(ms = 30) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

/* ===============================
   FORCE INITIAL STATE
================================ */
window.addEventListener("load", () => {
  // Always show gate first
  gate.style.display = "flex";
  main.classList.add("blurred");
  document.body.style.overflow = "hidden";

  // Only auto-skip if user already accepted BEFORE
  if (localStorage.getItem("sheSaidYes") === "true") {
    gate.remove();
    main.classList.remove("blurred");
    document.body.style.overflow = "auto";
    startExperience(true);
  }
});

/* ===============================
   ASKING LOGIC
================================ */
const messages = [
  "Are you sure?",
  "Really sure??",
  "Pookie please…",
  "Think again 😭",
  "My heart is right here 💔",
  "Okay fine… just kidding ❤️"
];

noBtn.onclick = () => {
  vibrate(25);
  gateText.textContent = messages[noIndex % messages.length];
  noIndex++;
  yesBtn.style.fontSize = `${1.2 + noIndex * 0.15}em`;
};

yesBtn.onclick = () => {
  vibrate(80);
  fireworkBurst();

  if (stage === 0) {
    stage = 1;
    noBtn.style.display = "none";
    yesBtn.style.display = "none";
    gateText.textContent = "Thank you for choosing me ❤️";

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
    setTimeout(() => gate.remove(), 900);

    main.classList.remove("blurred");
    document.body.style.overflow = "auto";

    startExperience(false);
  }
};

/* ===============================
   MAIN EXPERIENCE
================================ */
function startExperience(fromMemory) {
  buildGallery();
  startAmbientHearts();

  // Mobile visibility fix
  setTimeout(() => {
    document.querySelectorAll(".photo").forEach(p => {
      p.classList.add("show");
    });
  }, 300);

  const savedDate = localStorage.getItem("yesDate");
  if (savedDate) {
    dateEl.textContent = `She said yes on ${savedDate} ❤️`;
  }

  loadYouTube();

  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      ending.classList.add("show");
      setTimeout(() => finalLove.classList.add("show"), 2000);
    }
  }, { threshold: 0.5 }).observe(ending);
}

/* ===============================
   GALLERY
================================ */
function buildGallery() {
  gallery.innerHTML = "";
  for (let i = 1; i <= 11; i++) {
    const p = document.createElement("div");
    p.className = "photo";
    p.innerHTML = `<img src="image${i}.jpg">`;
    gallery.appendChild(p);
  }
}

/* ===============================
   FLOATING HEARTS
================================ */
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

/* ===============================
   JAPANESE-STYLE FIREWORKS
================================ */
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

/* ===============================
   YOUTUBE (MOBILE SAFE)
================================ */
function loadYouTube() {
  if (window.YT && player) {
    player.playVideo();
    return;
  }

  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

window.onYouTubeIframeAPIReady = () => {
  player = new YT.Player("player", {
    videoId: "96YyRY8vkhY",
    playerVars: {
      start: 16,
      autoplay: 1,
      controls: 0,
      playsinline: 1
    },
    events: {
      onReady: e => e.target.playVideo()
    }
  });
};

/* ===============================
   SECRET RESET (REPLAY MODE)
================================ */
let resetTimer = null;

document.body.addEventListener("touchstart", () => {
  resetTimer = setTimeout(resetAll, 5000);
});
document.body.addEventListener("touchend", () => {
  clearTimeout(resetTimer);
});

let keys = {};
document.addEventListener("keydown", e => {
  keys[e.key.toLowerCase()] = true;
  if (keys.r && keys.e && keys.l) resetAll();
});
document.addEventListener("keyup", e => {
  keys[e.key.toLowerCase()] = false;
});

function resetAll() {
  localStorage.clear();
  location.reload();
}
