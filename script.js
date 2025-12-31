let player;

// Load YouTube IFrame API
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player');
}

// Start music on user interaction
document.getElementById("overlay").addEventListener("click", () => {
  document.getElementById("overlay").style.display = "none";
  if (player) {
    player.playVideo();
  }
});
