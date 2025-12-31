/* ================= MEMORY ================= */
const FIRST_YES_KEY = "firstYesDate";

window.addEventListener("load", () => {
  startSakura();
});

/* ================= ASKING ================= */
const gate = document.getElementById("gate");
const gateText = document.getElementById("gateText");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const main = document.getElementById("main");

const messages = [
  "Are you sure?",
  "Really sure??",
  "Please think again 🥺",
  "My heart is right here 💔",
  "Okay… just kidding ❤️"
];

let noIndex = 0;
let stage = 0;

function vibrate(ms = 30) {
  navigator.vibrate?.(ms);
}

noBtn.onclick = () => {
  vibrate(20);
  gateText.textContent = messages[noIndex % messages.length];
  noIndex++;
  yesBtn.style.fontSize = `${1.2 + noIndex * 0.15}em`;
};

yesBtn.onclick = () => {
  vibrate(80);

  if (stage === 0) {
    ringSparkle();
    fireworkBurst(innerWidth / 2, innerHeight / 2);

    noBtn.style.display = "none";
    yesBtn.style.display = "none";
    gateText.textContent = "Thank you for choosing me ❤️";
    stage = 1;

    setTimeout(() => {
      gateText.textContent = "Are you ready for a small surprise? ✨";
      yesBtn.style.display = "inline-block";
    }, 1800);
  } else {
    if (!localStorage.getItem(FIRST_YES_KEY)) {
      localStorage.setItem(
        FIRST_YES_KEY,
        new Date().toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      );
    }

    gate.style.opacity = 0;
    setTimeout(() => gate.remove(), 1000);
    main.classList.remove("blurred");
    document.body.style.overflow = "auto";

    startExperience();
  }
};

/* ================= MAIN EXPERIENCE ================= */
const gallery = document.getElementById("gallery");
const ending = document.getElementById("ending");
const finalLove = document.getElementById("finalLove");
const dateEl = document.getElementById("yesDate");

function startExperience() {
  buildGallery();
  startYouTube();
  showDate();
}

function buildGallery() {
  for (let i = 1; i <= 11; i++) {
    const p = document.createElement("div");
    p.className = "photo";
    p.innerHTML = `<img src="image${i}.jpg">`;
    gallery.appendChild(p);

    new IntersectionObserver(
      e => e[0].isIntersecting && p.classList.add("show"),
      { threshold: 0.4 }
    ).observe(p);
  }

  new IntersectionObserver(
    e => {
      if (e[0].isIntersecting) {
        ending.classList.add("show");
        setTimeout(() => finalLove.classList.add("show"), 2000);
      }
    },
    { threshold: 0.6 }
  ).observe(ending);
}

function showDate() {
  const d = localStorage.getItem(FIRST_YES_KEY);
  if (d) dateEl.textContent = `She said yes on ${d} ❤️`;
}

/* ================= MUSIC ================= */
let player;
function startYouTube() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "96YyRY8vkhY",
    playerVars: { start: 16, autoplay: 1, controls: 0 },
    events: {
      onReady: e => e.target.playVideo()
    }
  });
}

/* ================= REALISTIC SAKURA ================= */
let lastScrollY = 0;

function startSakura() {
  setInterval(() => {
    const p = document.createElement("div");
    p.className = "sakura-petal";

    const size = 10 + Math.random() * 10;
    p.style.width = size + "px";
    p.style.height = size * 0.7 + "px";
    p.style.left = Math.random() * 100 + "vw";

    const dir = window.scrollY > lastScrollY ? 1 : -1;
    lastScrollY = window.scrollY;

    p.style.setProperty("--drift", `${dir * (30 + Math.random() * 80)}px`);
    p.style.animationDuration = 7 + Math.random() * 5 + "s";

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 13000);
  }, 450);
}

/* ================= JAPANESE FIREWORKS ================= */
function fireworkBurst(x, y) {
  const colors = [
    "#ffb7c5",
    "#ffd166",
    "#ff9bd5",
    "#ffc6ff",
    "#ffe5ec"
  ];

  for (let i = 0; i < 70; i++) {
    const f = document.createElement("div");
    f.className = "firework";
    f.style.left = x + "px";
    f.style.top = y + "px";
    f.style.color = colors[Math.random() * colors.length | 0];
    f.style.background = "currentColor";
    document.body.appendChild(f);

    const a = Math.random() * Math.PI * 2;
    const r = 120 + Math.random() * 140;
    const dx = Math.cos(a) * r;
    const dy = Math.sin(a) * r + 80;

    f.animate(
      [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${dx}px,${dy}px)`, opacity: .8 },
        { transform: `translate(${dx}px,${dy + 60}px)`, opacity: 0 }
      ],
      { duration: 2600, easing: "cubic-bezier(.21,.61,.35,1)" }
    );

    setTimeout(() => f.remove(), 2700);
  }
}

/* ================= RING SPARKLE ================= */
function ringSparkle() {
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      fireworkBurst(
        innerWidth / 2 + Math.random() * 120 - 60,
        innerHeight / 2 + Math.random() * 120 - 60
      );
    }, i * 120);
  }
}
