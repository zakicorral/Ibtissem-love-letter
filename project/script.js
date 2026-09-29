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