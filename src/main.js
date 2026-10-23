const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scrollSection = document.getElementById('scroll-section');

const TOTAL_FRAMES = 240;
const images = [];
let lastDrawnFrame = -1;

// Match source image resolution for 1:1 crisp rendering
canvas.width = 1920;
canvas.height = 1080;

function getFrameSrc(index) {
  const num = String(index + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${num}.jpg`;
}

function renderFrame(index) {
  const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(index)));
  const img = images[clampedIndex];

  if (img && img.complete && img.naturalWidth > 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    lastDrawnFrame = clampedIndex;
  } else {
    // If exact frame isn't loaded yet, draw closest loaded frame to avoid flickers
    for (let offset = 1; offset <= 30; offset++) {
      const prev = images[clampedIndex - offset];
      if (prev && prev.complete && prev.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(prev, 0, 0, canvas.width, canvas.height);
        lastDrawnFrame = clampedIndex - offset;
        break;
      }
      const next = images[clampedIndex + offset];
      if (next && next.complete && next.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(next, 0, 0, canvas.width, canvas.height);
        lastDrawnFrame = clampedIndex + offset;
        break;
      }
    }
  }
}

const heroText = document.getElementById('scroll-hero-text');
const scrollHint = document.getElementById('scroll-hint');

let currentProgress = 0;

function getCurrentScrollProgress() {
  if (!scrollSection) return 0;
  const rect = scrollSection.getBoundingClientRect();
  const maxScroll = scrollSection.offsetHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;
  const scrollTop = -rect.top;
  return Math.max(0, Math.min(1, scrollTop / maxScroll));
}

function updateHeroText(progress) {
  if (heroText) {
    // Fade away completely when scrolled to 30% of scroll animation section
    if (progress <= 0.3) {
      const opacity = 1 - (progress / 0.3);
      heroText.style.opacity = opacity.toFixed(3);
      heroText.style.transform = `translateY(-${progress * 60}px)`;
      heroText.style.visibility = opacity <= 0.005 ? 'hidden' : 'visible';
    } else {
      heroText.style.opacity = '0';
      heroText.style.visibility = 'hidden';
    }
  }

  if (scrollHint) {
    // Fade out immediately upon scrolling (> 6% of scroll-section)
    if (progress <= 0.06) {
      const hintOpacity = 1 - (progress / 0.06);
      scrollHint.style.opacity = hintOpacity.toFixed(3);
      scrollHint.style.visibility = hintOpacity <= 0.01 ? 'hidden' : 'visible';
    } else {
      scrollHint.style.opacity = '0';
      scrollHint.style.visibility = 'hidden';
    }
  }
}

function getCurrentScrollFrame() {
  currentProgress = getCurrentScrollProgress();
  updateHeroText(currentProgress);
  return currentProgress * (TOTAL_FRAMES - 1);
}

let targetFrame = 0;
let currentFrame = 0;

function onScroll() {
  targetFrame = getCurrentScrollFrame();
}

function update() {
  const diff = targetFrame - currentFrame;
  if (Math.abs(diff) > 0.005) {
    currentFrame += diff * 0.2;
    renderFrame(currentFrame);
  } else if (Math.round(currentFrame) !== lastDrawnFrame) {
    renderFrame(currentFrame);
  }

  requestAnimationFrame(update);
}

function preloadFrames() {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFrameSrc(i);
    img.onload = () => {
      const currentScrollFrame = Math.floor(getCurrentScrollFrame());
      if (lastDrawnFrame === -1 && i === 0) {
        renderFrame(0);
      } else if (i === currentScrollFrame) {
        renderFrame(i);
      }
    };
    images.push(img);
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });

// Mobile Navigation Toggle & Smooth Auto-Close
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mainNav = document.getElementById('main-nav');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Dynamic transparent navbar scroll effect: subtle frosted glass blur on scroll
window.addEventListener('scroll', () => {
  if (!mainNav) return;
  if (window.scrollY > 40) {
    mainNav.classList.add('backdrop-blur-md', 'bg-black/25', 'border-white/10');
    mainNav.classList.remove('bg-transparent', 'border-transparent');
  } else {
    mainNav.classList.remove('backdrop-blur-md', 'bg-black/25', 'border-white/10');
    mainNav.classList.add('bg-transparent', 'border-transparent');
  }
}, { passive: true });

preloadFrames();
onScroll();
requestAnimationFrame(update);

