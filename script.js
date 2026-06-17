// Cursor
const cd=document.getElementById('cd'),cr=document.getElementById('cr');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cd.style.left=mx+'px';cd.style.top=my+'px'});
(function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;cr.style.left=Math.round(rx)+'px';cr.style.top=Math.round(ry)+'px';requestAnimationFrame(loop)})();
document.querySelectorAll('a,button,.card,.skill,.sp,.exp-cat,.cert,.resume-preview').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cl'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cl'));
});

// Theme
const tb=document.getElementById('themeBtn'),html=document.documentElement;
const saved=localStorage.getItem('ar-theme')||'dark';
html.setAttribute('data-theme',saved);
tb.textContent=saved==='dark'?'🌙':'☀️';
tb.addEventListener('click',()=>{
  const d=html.getAttribute('data-theme')==='dark';
  const next=d?'light':'dark';
  html.setAttribute('data-theme',next);
  tb.textContent=d?'☀️':'🌙';
  localStorage.setItem('ar-theme',next);
});

// Reveal
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));

// Year
document.getElementById('year').textContent=new Date().getFullYear();
