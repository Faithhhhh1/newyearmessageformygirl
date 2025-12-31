:root{
  --glow-r:255;
  --glow-g:140;
  --glow-b:180;
}

body{
  margin:0;
  font-family:Arial,sans-serif;
  background:#000;
  overflow:hidden;
  color:#fff;
}

/* BACKGROUND */
body::before{
  content:"";
  position:fixed;
  inset:0;
  background:url("bg.jpg") center/cover no-repeat;
  filter:blur(18px);
  transform:scale(1.1);
  z-index:-2;
}
body::after{
  content:"";
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.35);
  z-index:-1;
}

/* ASKING OVERLAY */
#gate{
  position:fixed;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  background:rgba(0,0,0,.55);
  z-index:10;
  transition:opacity 1s ease;
}

.gate-box{
  background:rgba(255,255,255,.15);
  backdrop-filter:blur(10px);
  padding:30px;
  border-radius:18px;
  text-align:center;
}

.gate-buttons{
  margin-top:20px;
}

.gate-buttons button{
  font-size:1.2em;
  padding:10px 18px;
  margin:6px;
  border:none;
  border-radius:10px;
  cursor:pointer;
  transition:transform .2s ease, box-shadow .2s ease;
}

.gate-buttons button:active{
  transform:scale(.95);
  box-shadow:0 0 20px rgba(255,120,160,.8);
}

#yesBtn{ background:#ff5fa2; color:#fff; }
#noBtn{ background:#555; color:#fff; }

/* MAIN CONTENT */
#main{
  transition:filter 1.2s ease;
}
.blurred{
  filter:blur(14px);
  pointer-events:none;
}

.container{
  max-width:520px;
  margin:auto;
  padding:25px;
  text-align:center;
  overflow:visible;
}

/* GALLERY */
.photo{
  margin-bottom:26px;
}

.photo img{
  width:100%;
  border-radius:14px;
  opacity:0;
  transform:translateY(40px);
  transition:all 1.2s ease;

  outline:2px solid rgba(var(--glow-r),var(--glow-g),var(--glow-b),.35);
  box-shadow:
    0 0 20px rgba(var(--glow-r),var(--glow-g),var(--glow-b),.5),
    0 0 60px rgba(var(--glow-r),var(--glow-g),var(--glow-b),.3);
}

.photo.show img{
  opacity:1;
  transform:translateY(0);
}

/* 🎆 FIREWORKS */
.firework{
  position:fixed;
  width:6px;
  height:6px;
  border-radius:50%;
  pointer-events:none;
  animation:explode 1.6s ease-out forwards;
}

@keyframes explode{
  from{ opacity:1; transform:translate(0,0) scale(1); }
  to{ opacity:0; transform:translate(var(--x),var(--y)) scale(1.4); }
}

/* 💕 FLOATING HEARTS */
.ambient-heart{
  position:fixed;
  bottom:-30px;
  font-size:16px;
  pointer-events:none;
  z-index:3;
  opacity:.8;
  filter:drop-shadow(0 0 8px rgba(255,90,140,.9));
  animation:floatUp linear forwards;
}

@keyframes floatUp{
  from{ transform:translateY(0) scale(.8); opacity:.9; }
  to{ transform:translateY(-120vh) scale(1.3); opacity:0; }
}

/* ENDING */
.ending{
  margin-top:120px;
  opacity:0;
  transition:opacity 2s ease;
}
.ending.show{ opacity:1; }

#finalLove{
  margin-top:30px;
  font-size:22px;
  opacity:0;
  transition:opacity 3s ease;
}
#finalLove.show{ opacity:1; }

#yesDate{
  margin-top:14px;
  font-size:14px;
  opacity:.85;
  color:#ffdbe8;
}

/* HIDE PLAYER */
#player{
  position:fixed;
  width:1px;
  height:1px;
  opacity:0;
  left:-9999px;
}
