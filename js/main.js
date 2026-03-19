/* ============================================
   MAIN JS — Syed Muhammad Ali Gillani Portfolio
   ============================================ */

// ---- THEME TOGGLE ----
const html = document.documentElement;
const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
// attach to all toggle buttons (each page has one)
document.querySelectorAll('.theme-toggle').forEach(btn =>
  btn.addEventListener('click', toggleTheme)
);

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- HAMBURGER ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a =>
  a.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
  })
);

// ---- FADE IN ----
const fiObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('vis'), i * 70);
      fiObs.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -32px 0px' });
document.querySelectorAll('.fi').forEach(el => fiObs.observe(el));

// ---- COUNTER ANIMATION ----
function animCount(el, target, dur = 1600) {
  let cur = 0;
  const step = target / (dur / 16);
  const t = setInterval(() => {
    cur += step;
    if (cur >= target) { el.textContent = target; clearInterval(t); }
    else el.textContent = Math.floor(cur);
  }, 16);
}
const statEls = document.querySelectorAll('[data-target]');
if (statEls.length) {
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animCount(e.target, parseInt(e.target.dataset.target));
        cObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  statEls.forEach(el => cObs.observe(el));
}

// ---- SKILL BARS ----
const bars = document.querySelectorAll('.sk-fill[data-w]');
if (bars.length) {
  const bObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        bObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  bars.forEach(b => bObs.observe(b));
}

// ---- CURSOR GLOW (desktop only) ----
if (window.innerWidth > 768) {
  const cg = document.createElement('div');
  cg.style.cssText = 'position:fixed;pointer-events:none;z-index:0;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,160,0.04) 0%,transparent 70%);transform:translate(-50%,-50%);opacity:0;transition:opacity 0.4s;';
  document.body.appendChild(cg);
  document.addEventListener('mousemove', e => {
    cg.style.opacity = '1';
    cg.style.left = e.clientX + 'px';
    cg.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mouseleave', () => { cg.style.opacity = '0'; });
}

// ---- PAGE ENTER ----
document.body.style.cssText += 'opacity:0;transition:opacity 0.35s ease;';
requestAnimationFrame(() => { document.body.style.opacity = '1'; });
