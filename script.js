/* Progressive enhancement: every section and destination works without JavaScript. */
document.body.classList.add('js');
// Only the first-screen images and core stylesheet gate the initial skeleton.
const criticalImages = [...document.querySelectorAll('.portrait img')];
const imageReady = image => image.complete ? Promise.resolve() : new Promise(resolve => {
  image.addEventListener('load', resolve, {once:true});
  image.addEventListener('error', resolve, {once:true});
});
const styleReady = window.portfolioStylesReady ? Promise.resolve() : new Promise(resolve => {
  window.addEventListener('portfolio:styles', resolve, {once:true});
});
Promise.all([styleReady, ...criticalImages.map(imageReady)]).then(() => window.portfolioBoot?.finish());
// The same portrait switch works with a pointer, keyboard focus, and touch.
const heroStage = document.querySelector('.hero-stage');
const roleSwitches = [...document.querySelectorAll('.role-switch')];
function selectPortrait(role) {
  heroStage.dataset.portrait = role;
  heroStage.style.setProperty('--portrait-reveal', role === 'split' ? '50%' : role === 'designer' ? '100%' : '0%');
  roleSwitches.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.role === role));
  });
}
roleSwitches.forEach(button => {
  button.addEventListener('focus', () => selectPortrait(button.dataset.role));
  button.addEventListener('click', () => selectPortrait(button.dataset.role));
});
// Include the portrait and all empty space in each half, not only the headings.
let portraitFrameRequest = 0;
let pointerRole = 'developer';
function updatePointerRole(event) {
  if (event.pointerType === 'touch') return;
  const bounds = heroStage.getBoundingClientRect();
  pointerRole = event.clientX < bounds.left + bounds.width / 2 ? 'designer' : 'developer';
  if (portraitFrameRequest) return;
  portraitFrameRequest = requestAnimationFrame(() => {
    selectPortrait(pointerRole);
    portraitFrameRequest = 0;
  });
}
heroStage.addEventListener('pointerenter', updatePointerRole);
heroStage.addEventListener('pointermove', updatePointerRole, {passive: true});
heroStage.addEventListener('pointerleave', event => {
  cancelAnimationFrame(portraitFrameRequest);
  portraitFrameRequest = 0;
  if (event.pointerType !== 'touch') {
    const focusedRole = roleSwitches.find(button => button === document.activeElement);
    selectPortrait(focusedRole?.dataset.role || 'split');
  }
});
heroStage.addEventListener('focusout', event => {
  if (!heroStage.contains(event.relatedTarget) && !heroStage.matches(':hover')) selectPortrait('split');
});
let touchOrigin = null;
heroStage.addEventListener('pointerdown', event => {
  if (event.pointerType === 'touch') touchOrigin = {x:event.clientX,y:event.clientY};
});
heroStage.addEventListener('pointerup', event => {
  if (event.pointerType !== 'touch' || !touchOrigin || event.target.closest('.role-switch')) return;
  const distance = Math.hypot(event.clientX-touchOrigin.x,event.clientY-touchOrigin.y);
  touchOrigin = null;
  if (distance > 12) return;
  const bounds = heroStage.getBoundingClientRect();
  selectPortrait(event.clientX < bounds.left+bounds.width/2 ? 'designer' : 'developer');
});
heroStage.addEventListener('pointercancel', () => { touchOrigin = null; });
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
const navLinks = [...menu.querySelectorAll('a[href^="#"]')];
menu.querySelector('.cta-mobile').addEventListener('click', () => closeMenu());
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu +';
  menu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close −' : 'Menu +';
  menu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
});
navLinks.forEach(link => link.addEventListener('click', () => {
  closeMenu();
  const section = document.querySelector(link.hash);
  section.focus({preventScroll: true});
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
const mobile = matchMedia('(max-width: 767px)');
mobile.addEventListener('change', () => closeMenu());
// Observe a narrow band below the header so tall sections remain active.
if ('IntersectionObserver' in window) {
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin: '-15% 0px -65% 0px', threshold: 0});
  document.querySelectorAll('main > section').forEach(section => activeObserver.observe(section));
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-enter');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {threshold: .08});
    document.querySelectorAll('.project, .skill-group, .about-grid').forEach(item => revealObserver.observe(item));
  }
}
