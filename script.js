const music=document.getElementById("music");
const toggle=document.getElementById("musicToggle");
const label=document.getElementById("musicLabel");
const hearts=document.querySelector(".hearts");

toggle.addEventListener("click",async()=>{
  if(music.paused){
    try{await music.play();toggle.classList.add("playing");toggle.setAttribute("aria-pressed","true");label.textContent="Pause";}
    catch{label.textContent="Add music";}
  }else{
    music.pause();toggle.classList.remove("playing");toggle.setAttribute("aria-pressed","false");label.textContent="Music";
  }
});

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

function createHeart(){
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const h=document.createElement("span");
  h.className="floating-heart";
  h.textContent=Math.random()>.25?"♡":"·";
  h.style.left=(Math.random()*100)+"%";
  h.style.fontSize=(10+Math.random()*18)+"px";
  h.style.animationDuration=(8+Math.random()*9)+"s";
  h.style.animationDelay=(Math.random()*2)+"s";
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),18000);
}
setInterval(createHeart,1200);
for(let i=0;i<7;i++)setTimeout(createHeart,i*450);
const scratchCanvas=document.getElementById("scratchCanvas");
const scratchArea=document.getElementById("scratchArea");
if(scratchCanvas&&scratchArea){
  const ctx=scratchCanvas.getContext("2d");
  let scratching=false;
  const resizeScratch=()=>{
    const rect=scratchArea.getBoundingClientRect();
    const dpr=window.devicePixelRatio||1;
    scratchCanvas.width=rect.width*dpr;
    scratchCanvas.height=rect.height*dpr;
    scratchCanvas.style.width=rect.width+"px";
    scratchCanvas.style.height=rect.height+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.fillStyle="#6d4a5b";
    ctx.fillRect(0,0,rect.width,rect.height);
    ctx.font="600 12px Montserrat";
    ctx.fillStyle="rgba(255,255,255,.7)";
    ctx.textAlign="center";
    ctx.fillText("SCRATCH ♡",rect.width/2,rect.height/2+4);
  };
  const scratch=(e)=>{
    if(!scratching)return;
    const rect=scratchCanvas.getBoundingClientRect();
    const p=e.touches?e.touches[0]:e;
    const x=p.clientX-rect.left,y=p.clientY-rect.top;
    ctx.globalCompositeOperation="destination-out";
    ctx.beginPath();ctx.arc(x,y,24,0,Math.PI*2);ctx.fill();
  };
  scratchCanvas.addEventListener("pointerdown",e=>{scratching=true;scratch(e)});
  scratchCanvas.addEventListener("pointermove",scratch);
  window.addEventListener("pointerup",()=>scratching=false);
  resizeScratch();
  window.addEventListener("resize",resizeScratch);
}

const dontClick=document.getElementById("dontClick");
const dontClickMessage=document.getElementById("dontClickMessage");
if(dontClick&&dontClickMessage){
  const messages=[
    "I told you not to click it.",
    "You really clicked it.",
    "Okay... one more time, maybe?",
    "You have absolutely no respect for instructions.",
    "Fine. I love you too. ♡"
  ];
  let clicks=0;
  dontClick.addEventListener("click",()=>{
    dontClickMessage.textContent=messages[Math.min(clicks,messages.length-1)];
    clicks++;
    if(clicks===messages.length)dontClick.textContent="Okay, you win ♡";
  });
}