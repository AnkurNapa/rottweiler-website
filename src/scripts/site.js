import { pickBeer } from './finder.js';
import { checkEntry } from './gate.js';

const root = document.documentElement;

// Age gate. A pass is remembered for 30 days; storage can be blocked, so every access is guarded.
const gate = document.getElementById('gate');
if (gate) {
  const form = document.getElementById('gate-form');
  const msg = document.getElementById('gate-msg');
  const focusable = () => [...gate.querySelectorAll('input, select, button')];
  const close = () => {
    root.classList.add('gate-ok');
    root.classList.remove('gate-open');
    gate.hidden = true;
  };
  if (root.classList.contains('gate-ok')) close();
  else {
    root.classList.add('gate-open');
    focusable()[0]?.focus();
    // Keep keyboard focus inside the gate while it is open.
    gate.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const els = focusable();
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const error = checkEntry(form.dob.value, form.state.value, new Date());
    msg.textContent = error;
    msg.hidden = !error;
    if (error) return;
    try { localStorage.setItem('rw-age-ok', String(Date.now())); } catch {}
    close();
  });
}

// Copy buttons: the clipboard can be refused, so fall back to selecting the text.
document.querySelectorAll('[data-copy]').forEach((btn) => btn.addEventListener('click', () => {
  const select = () => {
    const range = document.createRange();
    range.selectNodeContents(btn.previousElementSibling.querySelector('.v'));
    getSelection().removeAllRanges();
    getSelection().addRange(range);
    btn.textContent = 'Selected';
  };
  const done = () => {
    btn.textContent = 'Copied';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
  };
  try { navigator.clipboard.writeText(btn.dataset.copy).then(done, select); } catch { select(); }
}));

// Portraits settle as they scroll in.
const seen = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (e.isIntersecting) e.target.classList.add('seen');
}), { threshold: 0.25 });
document.querySelectorAll('.beer, .p-taste').forEach((el) => seen.observe(el));

// The nav marks the section in view.
const links = [...document.querySelectorAll('nav.top ul a[href^="#"]')];
const spy = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (e.isIntersecting) links.forEach((a) => a.setAttribute('aria-current', a.hash === `#${e.target.id}`));
}), { rootMargin: '-45% 0px -50% 0px' });
links.forEach((a) => { const s = document.querySelector(a.hash); if (s) spy.observe(s); });

// The phone menu closes after a pick, on Escape or on a tap outside it.
const menu = document.getElementById('menu');
if (menu) {
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => { menu.open = false; }));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); } });
  document.addEventListener('click', (e) => { if (menu.open && !menu.contains(e.target)) menu.open = false; });
}

// Pick your dog: score the answers, show one match card, offer to share it.
const quiz = document.getElementById('quiz');
const match = document.getElementById('match');
if (quiz && match) {
  const cards = [...match.querySelectorAll('.match-card')];
  quiz.addEventListener('submit', (e) => {
    e.preventDefault();
    const answers = [...quiz.querySelectorAll('input:checked')].map((i) => i.value);
    const id = pickBeer(answers, cards.map((c) => c.dataset.beer));
    cards.forEach((c) => { c.hidden = c.dataset.beer !== id; });
    document.dispatchEvent(new CustomEvent('rw:quiz', { detail: id }));
    quiz.hidden = true;
    match.hidden = false;
    match.scrollIntoView({ behavior: 'smooth', block: 'start' });
    match.querySelector('.match-card:not([hidden]) h3').focus({ preventScroll: true });
  });
  match.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    if (btn.classList.contains('again')) {
      quiz.reset();
      match.hidden = true;
      quiz.hidden = false;
      quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
      quiz.querySelector('input').focus({ preventScroll: true });
      return;
    }
    const url = `${location.origin}${location.pathname}#finder`;
    const text = `${btn.dataset.share} ${url}`;
    const label = btn.textContent;
    try {
      if (navigator.share) await navigator.share({ text });
      else window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    } catch { /* the visitor closed the share sheet */ }
    btn.textContent = label;
  });
}

// Phone beer carousel: light the dot for the card in view.
const track = document.getElementById('swipe-track');
if (track) {
  const dots = [...document.querySelectorAll('.swipe-dots i')];
  track.addEventListener('scroll', () => {
    const i = Math.round(track.scrollLeft / track.firstElementChild.offsetWidth);
    dots.forEach((d, k) => d.classList.toggle('on', k === i));
  }, { passive: true });
}
