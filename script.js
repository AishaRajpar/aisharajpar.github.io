const root = document.documentElement;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* theme toggle (remembers choice) */
const themeBtn = $('#themeBtn');
const setTheme = t => {
  root.dataset.theme = t;
  themeBtn.textContent = t === 'dark' ? '🌙' : '☀️';
  try { localStorage.setItem('theme', t); } catch (e) {}
};
let saved = 'dark';
try { saved = localStorage.getItem('theme') || 'dark'; } catch (e) {}
setTheme(saved);
themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

/* custom cursor (mouse devices only) */
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  root.classList.add('cur');
  const dot = $('#cd'), ring = $('#cr');
  let x = 0, y = 0, rx = 0, ry = 0;
  addEventListener('mousemove', e => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate(${x}px,${y}px)`;
  });
  (function loop() {
    rx += (x - rx) * .18; ry += (y - ry) * .18;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', e => ring.classList.toggle('hov', !!e.target.closest('a,button')));
}

/* scroll reveal */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
}), { threshold: .12 });
$$('.rv').forEach(el => {
  if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('hid'); io.observe(el); }
});

/* active nav link */
const links = $$('.nav-links a');
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('section[id]').forEach(s => spy.observe(s));

/* hire button + footer year */
$('.hire-btn')?.addEventListener('click', () => { location.href = 'mailto:aisharajparsgr18@gmail.com'; });
$('#year').textContent = new Date().getFullYear();
