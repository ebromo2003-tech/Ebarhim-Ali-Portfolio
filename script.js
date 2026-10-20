/* Progressive enhancement: every section and destination works without JavaScript. */
document.body.classList.add('js');
// Desktop readers preview the PDF; smaller screens and touch devices download it.
const desktopCvPreview = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
const cvLinks = [...document.querySelectorAll('[data-cv-link]')];
function updateCvLinks() {
  cvLinks.forEach(link => {
    if (desktopCvPreview.matches) {
      link.removeAttribute('download');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.title = 'Preview PDF in a new tab; download using the PDF viewer controls';
      link.setAttribute('aria-description', 'Opens a PDF in a new tab with a download option.');
    } else {
      link.download = 'Ebrahim_Resume__UX_.pdf';
      link.removeAttribute('target');
      link.removeAttribute('rel');
      link.title = 'Download Ebrahim Ali’s CV as a PDF';
      link.setAttribute('aria-description', 'Downloads the CV as a PDF.');
    }
  });
}
updateCvLinks();
desktopCvPreview.addEventListener('change', updateCvLinks);
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
const portraitMotion = matchMedia('(prefers-reduced-motion: reduce)');
let portraitReveal = 50;
let portraitTarget = 50;
let portraitVelocity = 0;
let portraitAnimation = 0;
let portraitTime = 0;
function paintPortrait() {
  heroStage.style.setProperty('--portrait-reveal', portraitReveal.toFixed(4) + '%');
  // The blend narrows to zero at either endpoint, keeping both full portraits crisp.
  const feather = Math.min(1.7, portraitReveal * .35, (100 - portraitReveal) * .35);
  heroStage.style.setProperty('--portrait-feather', feather.toFixed(4) + '%');
}
function animatePortrait(time) {
  const dt = Math.min((time - portraitTime) / 1000, .05);
  portraitTime = time;
  // An analytic critically damped spring preserves velocity during rapid reversals.
  const frequency = 13;
  const offset = portraitReveal - portraitTarget;
  const helper = portraitVelocity + frequency * offset;
  const decay = Math.exp(-frequency * dt);
  portraitReveal = Math.max(0, Math.min(100, portraitTarget + (offset + helper * dt) * decay));
  portraitVelocity = (portraitVelocity - frequency * helper * dt) * decay;
  if (Math.abs(portraitReveal - portraitTarget) < .025 && Math.abs(portraitVelocity) < .15) {
    portraitReveal = portraitTarget;
    portraitVelocity = 0;
    portraitAnimation = 0;
    paintPortrait();
    return;
  }
  paintPortrait();
  portraitAnimation = requestAnimationFrame(animatePortrait);
}
function selectPortrait(role) {
  const target = role === 'split' ? 50 : role === 'designer' ? 100 : 0;
  if (heroStage.dataset.portrait === role && portraitTarget === target) return;
  heroStage.dataset.portrait = role;
  portraitTarget = target;
  roleSwitches.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.role === role));
  });
  if (portraitMotion.matches) {
    cancelAnimationFrame(portraitAnimation);
    portraitAnimation = 0;
    portraitReveal = portraitTarget;
    portraitVelocity = 0;
    paintPortrait();
  } else if (!portraitAnimation) {
    portraitTime = performance.now();
    portraitAnimation = requestAnimationFrame(animatePortrait);
  }
}
portraitMotion.addEventListener('change', () => {
  if (!portraitMotion.matches) return;
  cancelAnimationFrame(portraitAnimation);
  portraitAnimation = 0;
  portraitReveal = portraitTarget;
  portraitVelocity = 0;
  paintPortrait();
});
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
  const center = bounds.left + bounds.width / 2;
  const tolerance = Math.min(18, bounds.width * .035);
  // A small central dead band prevents flicker from tiny pointer movements.
  pointerRole = event.clientX < center - tolerance ? 'designer'
    : event.clientX > center + tolerance ? 'developer' : heroStage.dataset.portrait;
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
    const focusedRole = roleSwitches.find(button => button === document.activeElement && button.matches(':focus-visible'));
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
