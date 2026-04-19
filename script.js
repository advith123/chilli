/* ================================================================
   VIJAYA ENTERPRISES — main script
   Features: Infinite-loop image slider, variety cards + filters,
             hash router for detail pages, animated journey timeline,
             WhatsApp-integrated contact form, responsive nav.
   ================================================================ */

/* ---------- Small helpers ---------- */
const $  = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ================================================================
   1. SLIDER DATA
   ================================================================ */
const slides = [
  {
    kicker: 'Guntur · Andhra Pradesh',
    title: 'The heat of <em>Bharat,</em> shipped worldwide.',
    lede: 'From sun-baked plateaus to premium shelves in 42 countries — we grade, cure, and export India\'s most storied chillies.',
    decor: '01',
    stats: [
      { v: '2,400T', l: 'Annual volume' },
      { v: '42', l: 'Countries' },
      { v: '1,200+', l: 'Farmers' }
    ],
    visual: 'chilli-pair'
  },
  {
    kicker: 'Eleven Varieties',
    title: 'One colour. <em>Eleven souls.</em>',
    lede: 'Guntur Sannam, Byadgi, Kashmiri Deghi, Teja S17, Bhut Jolokia — each chilli carries the fingerprint of its soil.',
    decor: '02',
    cta: { href: '#varieties', label: 'Explore the collection' },
    visual: 'chilli-single'
  },
  {
    kicker: 'Soil to Port',
    title: 'A journey of <em>147 days.</em>',
    lede: 'Contract-farmed, hand-picked, sun-dried on bamboo platforms, lab-tested, then sealed into containers bound for the world.',
    decor: '03',
    cta: { href: '#journey', label: 'See the journey' },
    visual: 'sun-dry'
  },
  {
    kicker: 'Certified Quality',
    title: 'Lab reports. <em>Every lot.</em>',
    lede: 'NABL-accredited testing for aflatoxin, Sudan dye, moisture, ASTA colour, and Scoville — with every container.',
    decor: '04',
    stats: [
      { v: 'FSSAI', l: 'Certified' },
      { v: 'APEDA', l: 'Registered' },
      { v: 'ISO 22000', l: 'Audited' }
    ],
    visual: 'shield'
  },
  {
    kicker: 'Since 1987',
    title: 'Thirty-nine years. <em>Still family.</em>',
    lede: 'Three generations of the Vijaya family, still packing each container as if our name depended on it. Because it does.',
    decor: '05',
    cta: { href: '#contact', label: 'Start a conversation' },
    visual: 'chilli-pair'
  }
];

/* Inline SVG art for each slide visual */
const slideVisuals = {
  'chilli-pair': `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="cg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#dc2626"/><stop offset="1" stop-color="#991b1b"/>
        </linearGradient>
        <linearGradient id="cg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ef4444"/><stop offset="1" stop-color="#b91c1c"/>
        </linearGradient>
      </defs>
      <path d="M 80 180 Q 130 120 220 150 Q 310 180 340 230 Q 310 260 220 240 Q 130 220 80 180 Z" fill="url(#cg1)"/>
      <path d="M 75 175 Q 65 150 60 130 Q 55 115 70 120 Q 82 130 82 175 Z" fill="#1f2937"/>
      <path d="M 100 230 Q 170 180 260 200 Q 330 220 350 260 Q 320 300 240 290 Q 160 275 100 230 Z" fill="url(#cg2)" opacity=".92"/>
      <path d="M 350 258 Q 365 255 370 268 Q 368 278 355 275 Z" fill="#1f2937"/>
      <ellipse cx="170" cy="175" rx="30" ry="6" fill="#fff" opacity=".22"/>
      <ellipse cx="210" cy="225" rx="40" ry="7" fill="#fff" opacity=".2"/>
    </svg>`,
  'chilli-single': `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="sg1" x1="0" y1="0" x2="1" y2=".5">
          <stop offset="0" stop-color="#ef4444"/><stop offset=".6" stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/>
        </linearGradient>
      </defs>
      <path d="M 60 200 Q 140 130 260 160 Q 340 180 360 220 Q 330 250 240 240 Q 140 230 60 200 Z" fill="url(#sg1)"/>
      <path d="M 58 198 Q 45 170 38 145 Q 35 128 50 132 Q 62 145 62 198 Z" fill="#1f2937"/>
      <path d="M 100 190 Q 180 160 270 180" stroke="#fff" stroke-width="3" fill="none" opacity=".28" stroke-linecap="round"/>
      <path d="M 130 210 Q 200 195 280 210" stroke="#fff" stroke-width="2" fill="none" opacity=".18" stroke-linecap="round"/>
    </svg>`,
  'sun-dry': `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="320" cy="90" r="50" fill="#fbbf24" opacity=".85"/>
      <circle cx="320" cy="90" r="70" fill="#fbbf24" opacity=".25"/>
      <circle cx="320" cy="90" r="95" fill="#fbbf24" opacity=".1"/>
      <!-- drying rack -->
      <rect x="50" y="270" width="300" height="8" fill="#92400e"/>
      <rect x="60" y="278" width="6" height="60" fill="#92400e"/>
      <rect x="334" y="278" width="6" height="60" fill="#92400e"/>
      <!-- chillies scattered -->
      <g>
        <ellipse cx="90" cy="255" rx="22" ry="7" fill="#dc2626" transform="rotate(-15 90 255)"/>
        <ellipse cx="140" cy="260" rx="26" ry="7" fill="#b91c1c" transform="rotate(10 140 260)"/>
        <ellipse cx="195" cy="253" rx="24" ry="7" fill="#ef4444" transform="rotate(-5 195 253)"/>
        <ellipse cx="250" cy="261" rx="22" ry="6" fill="#dc2626" transform="rotate(18 250 261)"/>
        <ellipse cx="300" cy="256" rx="25" ry="7" fill="#991b1b" transform="rotate(-12 300 256)"/>
        <ellipse cx="115" cy="245" rx="20" ry="6" fill="#dc2626" transform="rotate(25 115 245)"/>
        <ellipse cx="175" cy="240" rx="23" ry="6" fill="#b91c1c" transform="rotate(-8 175 240)"/>
        <ellipse cx="230" cy="244" rx="21" ry="6" fill="#dc2626" transform="rotate(15 230 244)"/>
        <ellipse cx="285" cy="240" rx="24" ry="6" fill="#ef4444" transform="rotate(-20 285 240)"/>
      </g>
    </svg>`,
  'shield': `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="shg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#dc2626"/><stop offset="1" stop-color="#991b1b"/>
        </linearGradient>
      </defs>
      <path d="M 200 80 L 300 120 L 300 230 Q 300 300 200 340 Q 100 300 100 230 L 100 120 Z"
            fill="url(#shg)" opacity=".95"/>
      <path d="M 200 80 L 300 120 L 300 230 Q 300 300 200 340 Q 100 300 100 230 L 100 120 Z"
            fill="none" stroke="#fff" stroke-width="3" opacity=".35"/>
      <path d="M 155 205 L 188 238 L 250 168" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
};

/* ================================================================
   2. INFINITE-LOOP SLIDER
   ================================================================ */
class Slider {
  constructor(root) {
    this.root = root;
    this.track = $('#sliderTrack', root);
    this.prevBtn = $('#sliderPrev', root);
    this.nextBtn = $('#sliderNext', root);
    this.dotsWrap = $('#sliderDots', root);
    this.curEl = $('#sliderCur', root);
    this.totalEl = $('#sliderTotal', root);

    this.slides = slides;
    this.n = this.slides.length;
    this.idx = 0;              // logical index 0..n-1
    this.pos = 1;              // physical position in DOM (accounts for leading clone)
    this.autoplayMs = 6000;
    this.timer = null;
    this.animating = false;
    this.touch = { x: 0, y: 0, dx: 0, dy: 0, active: false };

    this.build();
    this.wire();
    this.start();
  }

  /* Build slide DOM including clones for infinite loop:
     [cloneLast, slide1, slide2, ..., slideN, cloneFirst] */
  build() {
    const makeSlide = (s, index, { clone = false, ariaIdx } = {}) => {
      const el = document.createElement('article');
      el.className = `slide slide--${index + 1}${clone ? ' slide--clone' : ''}`;
      el.setAttribute('role', 'group');
      el.setAttribute('aria-roledescription', 'slide');
      el.setAttribute('aria-label', `${ariaIdx} of ${this.n}`);
      if (clone) el.setAttribute('aria-hidden', 'true');

      const statsHTML = s.stats ? `
        <div class="slide__stats">
          ${s.stats.map(st => `<div><strong>${st.v}</strong><span>${st.l}</span></div>`).join('')}
        </div>` : '';

      const ctaHTML = s.cta ? `
        <div class="slide__actions">
          <a href="${s.cta.href}" class="btn-primary">${s.cta.label} →</a>
        </div>` : '';

      el.innerHTML = `
        <div class="slide__content">
          <div class="slide__kicker">${s.kicker}</div>
          <h2 class="slide__title">${s.title}</h2>
          <p class="slide__lede">${s.lede}</p>
          ${ctaHTML}
          ${statsHTML}
        </div>
        <div class="slide__visual" aria-hidden="true">
          <span class="slide__decor">${s.decor}</span>
          <div class="slide__visual-inner">${slideVisuals[s.visual] || ''}</div>
        </div>
      `;
      return el;
    };

    // Clone of last slide at the start
    const first = this.slides[0];
    const last = this.slides[this.n - 1];
    this.track.appendChild(makeSlide(last, this.n - 1, { clone: true, ariaIdx: this.n }));
    // Real slides
    this.slides.forEach((s, i) => this.track.appendChild(makeSlide(s, i, { ariaIdx: i + 1 })));
    // Clone of first slide at the end
    this.track.appendChild(makeSlide(first, 0, { clone: true, ariaIdx: 1 }));

    // Dots
    this.slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `Go to slide ${i + 1}`);
      b.addEventListener('click', () => this.goTo(i));
      this.dotsWrap.appendChild(b);
    });

    this.totalEl.textContent = String(this.n).padStart(2, '0');

    // Initial position — skip over leading clone
    this.setPosition(1, false);
    this.syncUI();
  }

  wire() {
    this.prevBtn.addEventListener('click', () => this.prev(true));
    this.nextBtn.addEventListener('click', () => this.next(true));

    // Keyboard arrows when slider has focus
    this.root.setAttribute('tabindex', '-1');
    this.root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(true); }
      if (e.key === 'ArrowRight') { e.preventDefault(); this.next(true); }
    });

    // Touch / swipe (mobile + trackpad)
    this.root.addEventListener('touchstart', (e) => {
      this.touch.active = true;
      this.touch.x = e.touches[0].clientX;
      this.touch.y = e.touches[0].clientY;
      this.touch.dx = 0;
    }, { passive: true });
    this.root.addEventListener('touchmove', (e) => {
      if (!this.touch.active) return;
      this.touch.dx = e.touches[0].clientX - this.touch.x;
      this.touch.dy = e.touches[0].clientY - this.touch.y;
    }, { passive: true });
    this.root.addEventListener('touchend', () => {
      if (!this.touch.active) return;
      const threshold = 50;
      // Only react to predominantly horizontal swipes
      if (Math.abs(this.touch.dx) > threshold && Math.abs(this.touch.dx) > Math.abs(this.touch.dy)) {
        if (this.touch.dx < 0) this.next(true);
        else this.prev(true);
      }
      this.touch.active = false;
    });

    // Pause on hover / focus-within, resume on leave
    this.root.addEventListener('mouseenter', () => this.stop());
    this.root.addEventListener('mouseleave', () => this.start());
    this.root.addEventListener('focusin', () => this.stop());
    this.root.addEventListener('focusout', () => this.start());

    // Pause when tab not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop();
      else this.start();
    });

    // Snap back after clone landing
    this.track.addEventListener('transitionend', () => {
      this.animating = false;
      // If we landed on the trailing clone (real idx 0), jump to real first
      if (this.pos === this.n + 1) this.setPosition(1, false);
      // If we landed on the leading clone (real idx n-1), jump to real last
      if (this.pos === 0) this.setPosition(this.n, false);
    });

    // Re-sync progress on window resize (track width might change)
    window.addEventListener('resize', () => this.setPosition(this.pos, false));
  }

  setPosition(p, animated = true) {
    this.pos = p;
    if (!animated) this.track.classList.add('no-transition');
    this.track.style.transform = `translate3d(${-p * 100}%, 0, 0)`;
    if (!animated) {
      // Force reflow so transition removal actually sticks before next tick
      void this.track.offsetWidth;
      this.track.classList.remove('no-transition');
    }
  }

  syncUI() {
    this.curEl.textContent = String(this.idx + 1).padStart(2, '0');
    $$('.slide', this.track).forEach(s => s.classList.remove('is-active'));
    // Activate the real slide (pos accounts for leading clone, but if pos==0 or pos==n+1 we're on a clone)
    const activePos = (this.pos === 0) ? this.n : (this.pos === this.n + 1) ? 1 : this.pos;
    const activeSlide = this.track.children[activePos];
    if (activeSlide) activeSlide.classList.add('is-active');

    [...this.dotsWrap.children].forEach((d, i) => {
      const isActive = i === this.idx;
      d.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  next(userInitiated = false) {
    if (this.animating) return;
    this.animating = true;
    this.idx = (this.idx + 1) % this.n;
    this.setPosition(this.pos + 1, true);
    this.syncUI();
    if (userInitiated) this.restart();
  }

  prev(userInitiated = false) {
    if (this.animating) return;
    this.animating = true;
    this.idx = (this.idx - 1 + this.n) % this.n;
    this.setPosition(this.pos - 1, true);
    this.syncUI();
    if (userInitiated) this.restart();
  }

  goTo(i) {
    if (this.animating || i === this.idx) return;
    this.animating = true;
    this.idx = i;
    this.setPosition(i + 1, true);
    this.syncUI();
    this.restart();
  }

  start() {
    if (prefersReducedMotion) return;
    this.stop();
    this.timer = setInterval(() => this.next(false), this.autoplayMs);
  }
  stop()  { if (this.timer) { clearInterval(this.timer); this.timer = null; } }
  restart() { this.stop(); this.start(); }
}

/* ================================================================
   3. VARIETIES — rendering + filters + click-to-detail
   ================================================================ */

/* Per-heat background gradients + chilli fill colour.
   Referenced by the existing CSS via --cardBg1, --cardBg2, --cardChilli. */
const heatTheme = {
  mild:    { bg1: '#fff5f5', bg2: '#ffe4e4', fill: '#ef4444', stem: '#1f2937' },
  medium:  { bg1: '#fff1f1', bg2: '#fecaca', fill: '#dc2626', stem: '#1f2937' },
  hot:     { bg1: '#fff1f1', bg2: '#fca5a5', fill: '#b91c1c', stem: '#111827' },
  extreme: { bg1: '#fef2f2', bg2: '#f87171', fill: '#7f1d1d', stem: '#0a0a0a' }
};

/* Distinct silhouette per variety — each SVG reflects the real chilli's
   shape: long+slender, round, wrinkled, tiny, thick, etc.
   All are drawn monochrome using `currentColor` so the CSS can tint them
   by heat level via `--cardChilli`. */
const varietyArt = {
  /* Guntur Sannam — long, slender, slightly curved */
  'guntur-sannam': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g transform="rotate(-18 100 100)">
      <path d="M 30 100 Q 70 88 120 95 Q 165 102 175 115 Q 155 125 110 120 Q 65 115 30 100 Z"/>
      <path d="M 28 98 Q 20 82 18 70 Q 20 62 28 66 Q 32 78 32 98 Z" fill="#1f2937"/>
    </g>
    <ellipse cx="85" cy="108" rx="22" ry="3" fill="#fff" opacity=".3"/>
  </svg>`,

  /* Byadgi Kaddi — wrinkled texture, darker crimson */
  'byadgi-kaddi': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g transform="rotate(-12 100 100)">
      <path d="M 35 108 Q 80 95 130 100 Q 170 105 178 118 Q 158 128 115 124 Q 70 120 35 108 Z"/>
      <path d="M 33 106 Q 24 90 22 78 Q 24 70 32 74 Q 36 86 36 106 Z" fill="#1f2937"/>
      <!-- wrinkle lines -->
      <path d="M 55 104 Q 75 98 105 100" stroke="#000" stroke-width="1.5" fill="none" opacity=".35"/>
      <path d="M 60 115 Q 85 108 120 112" stroke="#000" stroke-width="1.2" fill="none" opacity=".3"/>
      <path d="M 70 108 Q 90 104 130 106" stroke="#000" stroke-width="1" fill="none" opacity=".25"/>
    </g>
  </svg>`,

  /* Kashmiri Deghi — medium length, bright, with glossy highlight */
  'kashmiri-deghi': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g transform="rotate(-15 100 100)">
      <path d="M 40 102 Q 85 90 135 96 Q 170 102 176 114 Q 154 124 112 120 Q 70 115 40 102 Z"/>
      <path d="M 38 100 Q 28 84 26 72 Q 28 64 36 68 Q 40 80 40 100 Z" fill="#1f2937"/>
      <!-- highlight stripe -->
      <path d="M 65 96 Q 95 90 135 94" stroke="#fff" stroke-width="3" fill="none" opacity=".4" stroke-linecap="round"/>
    </g>
  </svg>`,

  /* Teja S17 — shorter, pointier, very saturated */
  'teja-s17': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g transform="rotate(-20 100 100)">
      <path d="M 50 108 Q 90 98 130 104 Q 165 112 172 124 L 168 128 Q 158 132 125 130 Q 80 126 50 108 Z"/>
      <path d="M 48 106 Q 38 90 34 78 Q 36 70 44 74 Q 50 86 50 106 Z" fill="#111827"/>
      <path d="M 75 108 L 120 118" stroke="#fff" stroke-width="1.5" fill="none" opacity=".35"/>
    </g>
  </svg>`,

  /* Bhut Jolokia — bumpy, textured, gnarly ghost pepper */
  'bhut-jolokia': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g transform="rotate(-10 100 100)">
      <!-- bumpy outline -->
      <path d="M 40 110 Q 55 98 70 102 Q 85 94 100 100 Q 118 92 135 100 Q 152 94 165 108 Q 172 120 165 124 Q 150 132 135 128 Q 118 132 100 128 Q 85 134 70 128 Q 55 132 42 120 Z"/>
      <path d="M 38 108 Q 28 92 26 80 Q 28 72 36 76 Q 40 88 40 108 Z" fill="#0a0a0a"/>
      <!-- texture dots -->
      <circle cx="75" cy="112" r="2" fill="#000" opacity=".4"/>
      <circle cx="98" cy="118" r="2.5" fill="#000" opacity=".4"/>
      <circle cx="125" cy="114" r="2" fill="#000" opacity=".4"/>
      <circle cx="148" cy="118" r="1.8" fill="#000" opacity=".4"/>
    </g>
  </svg>`,

  /* Reshampatti — thick, stocky, balanced */
  'reshampatti': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g transform="rotate(-14 100 100)">
      <path d="M 42 102 Q 85 85 140 93 Q 172 100 178 118 Q 155 130 115 128 Q 70 122 42 102 Z"/>
      <path d="M 40 100 Q 30 82 28 68 Q 30 60 38 64 Q 42 76 42 100 Z" fill="#1f2937"/>
      <ellipse cx="100" cy="110" rx="35" ry="4" fill="#fff" opacity=".28"/>
    </g>
  </svg>`,

  /* Ramnad Mundu — ROUND, stubby, cherry-shaped (most distinctive) */
  'ramnad-mundu': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g>
      <!-- cluster of round pods -->
      <ellipse cx="80" cy="120" rx="32" ry="28"/>
      <ellipse cx="128" cy="118" rx="30" ry="26"/>
      <ellipse cx="104" cy="90" rx="28" ry="24"/>
      <!-- stems -->
      <path d="M 80 94 Q 78 82 74 72 Q 80 74 82 94 Z" fill="#1f2937"/>
      <path d="M 128 94 Q 126 82 122 72 Q 128 74 130 94 Z" fill="#1f2937"/>
      <path d="M 104 68 Q 102 56 98 46 Q 104 48 106 68 Z" fill="#1f2937"/>
      <!-- highlights -->
      <ellipse cx="72" cy="112" rx="8" ry="4" fill="#fff" opacity=".35"/>
      <ellipse cx="120" cy="110" rx="7" ry="3" fill="#fff" opacity=".3"/>
      <ellipse cx="96" cy="82" rx="6" ry="3" fill="#fff" opacity=".3"/>
    </g>
  </svg>`,

  /* Sankeshwari — long, crinkled, Kolhapuri */
  'sankeshwari': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g transform="rotate(-16 100 100)">
      <path d="M 30 104 Q 60 92 90 100 Q 120 88 150 100 Q 172 108 178 120 Q 160 128 130 124 Q 100 132 70 122 Q 40 118 30 104 Z"/>
      <path d="M 28 102 Q 18 86 16 74 Q 18 66 26 70 Q 30 82 30 102 Z" fill="#1f2937"/>
      <!-- crinkle waves -->
      <path d="M 50 106 Q 70 100 90 106 Q 110 98 130 104 Q 150 110 170 108" stroke="#000" stroke-width="1" fill="none" opacity=".3"/>
    </g>
  </svg>`,

  /* Jwala — very thin, wavy */
  'jwala': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g transform="rotate(-22 100 100)">
      <path d="M 35 108 Q 65 90 95 104 Q 125 94 150 110 Q 170 118 176 125 Q 165 130 148 126 Q 125 116 95 122 Q 65 112 35 108 Z"/>
      <path d="M 33 106 Q 24 90 22 78 Q 24 70 32 74 Q 36 86 36 106 Z" fill="#1f2937"/>
    </g>
  </svg>`,

  /* Ellachipur Sannam — slightly sharper than Guntur */
  'ellachipur-sannam': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g transform="rotate(-20 100 100)">
      <path d="M 32 100 Q 75 88 125 94 Q 168 100 178 114 L 175 120 Q 155 128 110 124 Q 65 118 32 100 Z"/>
      <path d="M 30 98 Q 20 82 18 70 Q 20 62 28 66 Q 32 78 32 98 Z" fill="#111827"/>
    </g>
  </svg>`,

  /* Dhani (Bird's Eye) — tiny torpedoes, multiple */
  'dhani': `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <g>
      <!-- 5 tiny pointed pods radiating -->
      <g transform="rotate(-30 100 100)"><path d="M 60 100 Q 90 96 120 100 L 118 105 Q 90 107 60 104 Z"/><path d="M 60 100 L 54 92 L 58 90 Z" fill="#1f2937"/></g>
      <g transform="rotate(10 100 100)"><path d="M 65 100 Q 95 96 125 100 L 123 105 Q 95 107 65 104 Z"/><path d="M 65 100 L 59 92 L 63 90 Z" fill="#1f2937"/></g>
      <g transform="rotate(50 100 100)"><path d="M 70 100 Q 100 96 130 100 L 128 105 Q 100 107 70 104 Z"/><path d="M 70 100 L 64 92 L 68 90 Z" fill="#1f2937"/></g>
      <g transform="rotate(-70 100 100)"><path d="M 70 100 Q 100 96 130 100 L 128 105 Q 100 107 70 104 Z"/><path d="M 70 100 L 64 92 L 68 90 Z" fill="#1f2937"/></g>
      <g transform="rotate(130 100 100)"><path d="M 70 100 Q 100 96 130 100 L 128 105 Q 100 107 70 104 Z"/><path d="M 70 100 L 64 92 L 68 90 Z" fill="#1f2937"/></g>
      <circle cx="100" cy="100" r="6" fill="#1f2937"/>
    </g>
  </svg>`
};

function getVarietyArt(slug) {
  return varietyArt[slug] || slideVisuals['chilli-single'];
}

function applyHeatTheme(el, heat, prefix = 'card') {
  const t = heatTheme[heat] || heatTheme.medium;
  el.style.setProperty(`--${prefix}Bg1`, t.bg1);
  el.style.setProperty(`--${prefix}Bg2`, t.bg2);
  el.style.setProperty(`--${prefix}Chilli`, t.fill);
}

const varieties = [
  { slug: 'guntur-sannam',     name: 'Guntur Sannam S4',     origin: 'Guntur · Andhra Pradesh',       heat: 'hot',     heatLabel: 'Hot',     shu: '35,000–40,000',    asta: '32–38',   tagline: 'India\'s flagship export chilli.', desc: 'Pungent, deep red, long slender pods. The workhorse of curry powders and commercial sauces worldwide.', story: 'Grown on the red-soil plateaus of Guntur district, Sannam S4 is the cornerstone of Andhra Pradesh\'s chilli economy. Farmers transplant seedlings in August, harvest ripe red pods from December through March, and sun-dry them for 14–18 days on bamboo platforms. The result is a chilli with balanced heat (35,000–40,000 SHU), stable red colour, and long shelf life — qualities that make it the preferred choice for global spice manufacturers, from South Korean gochujang makers to British curry-powder blenders. Vijaya Enterprises exports roughly 900 tonnes of Sannam S4 annually, nearly 40% of our total volume.' },
  { slug: 'byadgi-kaddi',      name: 'Byadgi Kaddi',         origin: 'Haveri · Karnataka',             heat: 'mild',    heatLabel: 'Mild',    shu: '8,000–15,000',     asta: '82–160',  tagline: 'Colour over heat.', desc: 'Deep crimson, wrinkled, prized for ASTA colour. The secret behind authentic South Indian sambars.', story: 'Byadgi gets its name from the Karnataka town where this chilli has been cultivated for over 400 years. Its signature wrinkled skin is a side-effect of the unique drying process — farmers pile the chillies in heaps to ferment briefly before drying, which develops the distinctive dark red colour. With ASTA values regularly exceeding 100, Byadgi is the preferred raw material for oleoresin extraction, lipstick pigments, and premium paprika blends. It holds a GI (Geographical Indication) tag protecting its regional identity.' },
  { slug: 'kashmiri-deghi',    name: 'Kashmiri Deghi Mirch', origin: 'Kashmir Valley',                  heat: 'mild',    heatLabel: 'Mild',    shu: '1,000–2,000',      asta: '100–130', tagline: 'Vibrant. Gentle. Iconic.', desc: 'Gives tandoori dishes and biryanis their signature red without the burn. A star in premium retail packs.', story: 'Grown in the high-altitude valleys of Jammu & Kashmir, Kashmiri Deghi Mirch is arguably India\'s most photogenic chilli — its deep carmine red is what makes tandoori chicken, rogan josh, and biryani look the way they\'re supposed to. Despite its dramatic colour, it clocks in at just 1,000–2,000 SHU, making it milder than a jalapeño. This combination of intense pigment with gentle heat is why top Indian restaurants and premium spice brands pay a premium for authentic Kashmiri chilli.' },
  { slug: 'teja-s17',          name: 'Teja S17',             origin: 'Khammam · Telangana',             heat: 'extreme', heatLabel: 'Extreme', shu: '75,000–1,00,000',  asta: '68–82',   tagline: 'Fire, weaponised.', desc: 'Bright red, high capsaicin, preferred by Chinese and Korean sauce makers. 40% of our Asia-bound volume.', story: 'Teja S17 is the variety of choice for commercial hot-sauce manufacturers who want maximum heat without sacrificing colour. Grown primarily in Telangana\'s Khammam district, Teja chillies are smaller than Guntur Sannam but pack 2–3× the capsaicin content. Chinese Sichuan sauce makers, Korean gochugaru producers, and Thai curry-paste manufacturers are the biggest buyers. A single tonne of Teja S17 can heat-up roughly 500,000 servings of sauce.' },
  { slug: 'bhut-jolokia',      name: 'Bhut Jolokia',         origin: 'Assam · Nagaland',                heat: 'extreme', heatLabel: 'Extreme', shu: '8,55,000–10,41,427', asta: '—',      tagline: 'The Ghost Pepper.', desc: 'Once the world\'s hottest. GI-tagged, rare, and sold to artisanal hot-sauce brands and pharmaceutical research buyers.', story: 'Bhut Jolokia — the Ghost Pepper — held the Guinness World Record as the world\'s hottest chilli from 2007 to 2011. Native to Northeast India, it\'s genetically distinct from most Capsicum species (a rare natural hybrid of C. chinense and C. frutescens). Its heat is so extreme that defence research labs have used it in riot-control grenades and wildlife-deterrent sprays. We export it in small, carefully packaged quantities to artisanal hot-sauce labels, craft-condiment producers, and pharmaceutical companies extracting pure capsaicin for pain-relief creams.' },
  { slug: 'reshampatti',       name: 'Reshampatti',          origin: 'Saurashtra · Gujarat',             heat: 'medium',  heatLabel: 'Medium',  shu: '30,000–35,000',    asta: '40–50',   tagline: 'Balanced. Versatile.', desc: 'Thick-skinned, balanced in heat and colour. The backbone of North Indian masalas and pickle makers\' top pick.', story: 'Reshampatti is the diplomat of Indian chillies — never too hot, always colour-forward, and with a thick skin that makes it ideal for pickling. Gujarati and Rajasthani households rely on it for their annual stash of red-chilli pickle, mango pickle, and spice-blend masalas. Its balanced profile also makes it the preferred variety for Middle Eastern harissa producers and North African ras el hanout blends.' },
  { slug: 'ramnad-mundu',      name: 'Ramnad Mundu',         origin: 'Ramanathapuram · Tamil Nadu',     heat: 'medium',  heatLabel: 'Medium',  shu: '25,000–30,000',    asta: '45–55',   tagline: 'Round, stubby, storied.', desc: 'Chettinad heritage. Earthy flavour, moderate heat, highly valued in Sri Lankan and Malaysian kitchens.', story: 'Unlike most Indian chillies, Ramnad Mundu is short and round — almost cherry-shaped — rather than long and slender. This makes it easier to grind into the thick, aromatic pastes that define Chettinad cuisine (chicken Chettinad, kara kuzhambu). Exported primarily to Sri Lanka, Singapore, and Malaysia where Tamil diaspora communities demand authentic ingredients.' },
  { slug: 'sankeshwari',       name: 'Sankeshwari',          origin: 'Belgaum · Karnataka',              heat: 'medium',  heatLabel: 'Medium',  shu: '20,000–25,000',    asta: '50–60',   tagline: 'Kolhapuri fire.', desc: 'Long, crinkled, vibrantly red. A Maharashtrian staple — used for the fiery tambda rassa.', story: 'Named after the town of Sankeshwar on the Karnataka-Maharashtra border, this chilli is the soul of Kolhapuri cuisine. It\'s the reason a proper Kolhapuri mutton curry looks like molten lava — long, crinkled pods that deliver intense red colour and a sharp, clean heat that mellows into a sweet finish.' },
  { slug: 'jwala',             name: 'Jwala',                origin: 'Mehsana · Gujarat',                heat: 'hot',     heatLabel: 'Hot',     shu: '20,000–30,000',    asta: '30–42',   tagline: 'Thin, wavy, fiery.', desc: 'Commonly exported in pickling grades and increasingly popular with Middle Eastern harissa producers.', story: 'Jwala means "flame" in Sanskrit, and this thin, wavy Gujarati chilli lives up to the name. Small family pickle factories across western India buy Jwala by the tonne each spring for their annual pickling season. Lately it\'s found a second life with North African harissa producers who value its sharp heat-to-colour ratio.' },
  { slug: 'ellachipur-sannam', name: 'Ellachipur Sannam',    origin: 'Amravati · Maharashtra',           heat: 'hot',     heatLabel: 'Hot',     shu: '28,000–35,000',    asta: '35–45',   tagline: 'Sharper cousin.', desc: 'Closely related to Guntur Sannam with a sharper finish. Favoured in East African and Bangladeshi markets.', story: 'Often mistaken for its Guntur namesake, Ellachipur Sannam comes from the Vidarbha region of Maharashtra and has a noticeably sharper bite on the tongue\'s finish. East African importers buying for Kenyan and Tanzanian curry-blend manufacturers form the backbone of its export market, along with Bangladeshi traders.' },
  { slug: 'dhani',             name: 'Dhani (Bird\'s Eye)',   origin: 'Manipur · Mizoram',                heat: 'extreme', heatLabel: 'Extreme', shu: '1,00,000–2,25,000', asta: '—',      tagline: 'Small. Torpedo-hot.', desc: 'The Thai and Vietnamese hot-sauce scene runs on these. Hand-picked, small-volume, premium-priced.', story: 'Grown in the hilly terrain of Northeast India, Dhani chillies are tiny — barely 2 centimetres long — but carry the torpedo heat that Southeast Asian cuisines adore. Thai nam prik, Vietnamese nuoc cham, and Indonesian sambal all owe their character to bird\'s-eye chillies. Hand-picking is mandatory because the fruit is too small for mechanical harvesters, which pushes the price to roughly 3× that of Guntur Sannam.' }
];

function renderVarieties(filter = 'all') {
  const grid = $('#typesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const list = filter === 'all' ? varieties : varieties.filter(v => v.heat === filter);

  if (!list.length) {
    grid.innerHTML = `<p class="types-empty">No varieties in this heat range. <button class="btn-link" data-reset-filter>Show all</button></p>`;
    grid.querySelector('[data-reset-filter]')?.addEventListener('click', () => {
      $$('.chip').forEach(c => {
        c.classList.remove('chip--active');
        c.setAttribute('aria-selected', 'false');
      });
      const all = document.querySelector('.chip[data-filter="all"]');
      if (all) { all.classList.add('chip--active'); all.setAttribute('aria-selected', 'true'); }
      renderVarieties('all');
    });
    return;
  }

  list.forEach((v, i) => {
    const card = document.createElement('a');
    card.href = `#/variety/${v.slug}`;
    card.className = 'type-card';
    card.style.animationDelay = `${i * 50}ms`;
    card.setAttribute('aria-label', `${v.name}, ${v.heatLabel} heat, from ${v.origin}. ${v.tagline} Click to read the full story.`);
    applyHeatTheme(card, v.heat, 'card');

    const num = (varieties.indexOf(v) + 1).toString().padStart(2, '0');
    card.innerHTML = `
      <div class="type-card__visual" data-heat="${v.heat}">
        <span class="type-card__number">${num}</span>
        <span class="type-card__heat">${v.heatLabel}</span>
        <div class="type-card__chilli">${getVarietyArt(v.slug)}</div>
      </div>
      <div class="type-card__body">
        <div class="type-card__origin">${v.origin}</div>
        <h3 class="type-card__name">${v.name}</h3>
        <p class="type-card__desc">${v.desc}</p>
        <div class="type-card__foot">
          <span class="type-card__specs"><b>${v.shu}</b> SHU · <b>${v.asta}</b> ASTA</span>
          <span class="type-card__cta">Read story
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function wireFilters() {
  const filters = $('#filters');
  if (!filters) return;
  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    $$('.chip', filters).forEach(c => {
      c.classList.remove('chip--active');
      c.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('chip--active');
    btn.setAttribute('aria-selected', 'true');
    renderVarieties(btn.dataset.filter);
  });
}

/* ================================================================
   4. HASH ROUTER — for variety detail pages
   ================================================================ */
/* Suggested export markets per variety (used in detail aside) */
const marketsByVariety = {
  'guntur-sannam':     ['🇺🇸 USA', '🇬🇧 UK', '🇦🇪 UAE', '🇩🇪 Germany', '🇲🇾 Malaysia'],
  'byadgi-kaddi':      ['🇺🇸 USA', '🇯🇵 Japan', '🇩🇪 Germany', '🇫🇷 France'],
  'kashmiri-deghi':    ['🇬🇧 UK', '🇨🇦 Canada', '🇦🇺 Australia', '🇺🇸 USA'],
  'teja-s17':          ['🇨🇳 China', '🇰🇷 S. Korea', '🇹🇭 Thailand', '🇻🇳 Vietnam'],
  'bhut-jolokia':      ['🇺🇸 USA', '🇯🇵 Japan', '🇬🇧 UK', '🇨🇦 Canada'],
  'reshampatti':       ['🇦🇪 UAE', '🇹🇳 Tunisia', '🇲🇦 Morocco', '🇸🇦 Saudi Arabia'],
  'ramnad-mundu':      ['🇱🇰 Sri Lanka', '🇲🇾 Malaysia', '🇸🇬 Singapore'],
  'sankeshwari':       ['🇺🇸 USA', '🇬🇧 UK', '🇨🇦 Canada', '🇦🇪 UAE'],
  'jwala':             ['🇦🇪 UAE', '🇹🇳 Tunisia', '🇲🇦 Morocco'],
  'ellachipur-sannam': ['🇰🇪 Kenya', '🇹🇿 Tanzania', '🇧🇩 Bangladesh'],
  'dhani':             ['🇹🇭 Thailand', '🇻🇳 Vietnam', '🇮🇩 Indonesia', '🇲🇾 Malaysia']
};

function renderDetail(slug) {
  const v = varieties.find(x => x.slug === slug);
  const home = $('#home-view');
  const detail = $('#detail-view');
  if (!v) { location.hash = '#/'; return; }

  home.classList.remove('view--active');
  home.setAttribute('aria-hidden', 'true');
  detail.classList.add('view--active');
  detail.setAttribute('aria-hidden', 'false');

  const markets = marketsByVariety[v.slug] || ['🌍 Global'];
  // Split story into paragraphs (by sentence groups) for nicer typography
  const sentences = v.story.split(/(?<=\.)\s+/);
  const mid = Math.ceil(sentences.length / 2);
  const para1 = sentences.slice(0, mid).join(' ');
  const para2 = sentences.slice(mid).join(' ');

  // Encode a pre-filled WhatsApp message for this specific variety
  const waMsg = encodeURIComponent(
`Hello Vijaya Enterprises,

I'd like to request a quote for ${v.name} (${v.origin}).

Please share pricing, minimum order quantity, current availability, and a sample NABL lab report.`);
  const waUrl = `https://wa.me/919392314373?text=${waMsg}`;

  detail.innerHTML = `
    <article class="detail">
      <a href="#/" class="detail__back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to all varieties
      </a>

      <section class="detail__hero">
        <div class="detail__info">
          <div class="detail__badges">
            <span class="detail__badge">${v.heatLabel}</span>
            <span class="detail__badge detail__badge--outline">Export-grade</span>
          </div>
          <div class="detail__origin">${v.origin}</div>
          <h1 class="detail__name">${v.name}</h1>
          <p class="detail__tagline">${v.tagline}</p>
        </div>
        <div class="detail__visual" id="detailVisual" data-heat="${v.heat}">
          <span class="detail__decor">${(varieties.indexOf(v) + 1).toString().padStart(2, '0')}</span>
          ${getVarietyArt(v.slug)}
        </div>
      </section>

      <section class="detail__body">
        <div class="detail__story">
          <h3>The story</h3>
          <p>${para1}</p>
          ${para2 ? `<p>${para2}</p>` : ''}
          <h3>At a glance</h3>
          <p>${v.desc}</p>
        </div>

        <aside class="detail__aside">
          <h4>Specifications</h4>
          <ul class="detail__specs">
            <li><span>Scoville (SHU)</span><b>${v.shu}</b></li>
            <li><span>ASTA colour</span><b>${v.asta}</b></li>
            <li><span>Heat level</span><b>${v.heatLabel}</b></li>
            <li><span>Origin</span><b>${v.origin}</b></li>
          </ul>

          <h4>Key export markets</h4>
          <ul class="detail__markets">
            ${markets.map(m => `<li>${m}</li>`).join('')}
          </ul>

          <div class="detail__enquire">
            <a href="${waUrl}" class="btn-primary" target="_blank" rel="noopener noreferrer">
              Request quote on WhatsApp →
            </a>
            <a href="#contact" class="btn-primary" style="background:var(--white);color:var(--ink);border:1px solid var(--border)">
              Use enquiry form instead
            </a>
          </div>
        </aside>
      </section>

      <section class="detail__related">
        <h3>Other varieties you might like</h3>
        <div class="detail__related-grid" id="relatedGrid"></div>
      </section>
    </article>
  `;

  // Apply heat theme to the detail hero visual (uses --dBg1, --dBg2, --dChilli)
  const detailVisual = $('#detailVisual', detail);
  if (detailVisual) applyHeatTheme(detailVisual, v.heat, 'd');

  // Populate related cards (3 other varieties, starting from the next one)
  const related = $('#relatedGrid', detail);
  const startIdx = (varieties.indexOf(v) + 1) % varieties.length;
  const picks = [];
  for (let i = 0; i < 3; i++) picks.push(varieties[(startIdx + i) % varieties.length]);
  picks.forEach((r, i) => {
    const a = document.createElement('a');
    a.href = `#/variety/${r.slug}`;
    a.className = 'type-card';
    a.style.animationDelay = `${i * 60}ms`;
    applyHeatTheme(a, r.heat, 'card');
    a.innerHTML = `
      <div class="type-card__visual">
        <span class="type-card__number">${(varieties.indexOf(r) + 1).toString().padStart(2, '0')}</span>
        <span class="type-card__heat">${r.heatLabel}</span>
        <div class="type-card__chilli">${getVarietyArt(r.slug)}</div>
      </div>
      <div class="type-card__body">
        <div class="type-card__origin">${r.origin}</div>
        <h3 class="type-card__name">${r.name}</h3>
        <p class="type-card__desc">${r.desc}</p>
        <div class="type-card__foot">
          <span class="type-card__specs"><b>${r.shu}</b> SHU</span>
          <span class="type-card__cta">Read →</span>
        </div>
      </div>
    `;
    related.appendChild(a);
  });

  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });

  // Update document title & meta description so the detail "page" acts like a real route
  document.title = `${v.name} — ${v.heatLabel} chilli from ${v.origin.split('·')[0].trim()} | Vijaya Enterprises`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', `${v.name}: ${v.tagline} ${v.desc}`);
}

function renderHome() {
  const home = $('#home-view');
  const detail = $('#detail-view');
  home.classList.add('view--active');
  home.setAttribute('aria-hidden', 'false');
  detail.classList.remove('view--active');
  detail.setAttribute('aria-hidden', 'true');
  detail.innerHTML = '';

  // Restore home-page title + description
  document.title = 'Vijaya Enterprises | Premium Indian Dry Red Chilli Exporter — Guntur, Byadgi, Kashmiri';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', 'Vijaya Enterprises is a Guntur-based exporter of premium Indian dry red chilli varieties — Guntur Sannam, Byadgi Kaddi, Kashmiri Deghi, Teja S17, Bhut Jolokia, and more. FSSAI, APEDA & ISO 22000 certified. Shipping to 42 countries.');
}

/* ---------- ABOUT US ---------- */
function renderAbout() {
  const home = $('#home-view');
  const detail = $('#detail-view');
  home.classList.remove('view--active');
  home.setAttribute('aria-hidden', 'true');
  detail.classList.add('view--active');
  detail.setAttribute('aria-hidden', 'false');

  detail.innerHTML = `
    <article class="page">
      <a href="#/" class="detail__back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to home
      </a>

      <header class="page__hero">
        <div class="page__kicker">About us</div>
        <h1 class="page__title">Three generations. <em>One obsession.</em></h1>
        <p class="page__lede">Vijaya Enterprises is a family-run dry red chilli exporter based in Guntur, India — the global capital of chilli trade. Since 1987, we've shipped to 42 countries, worked with 1,200+ contract farmers, and stayed small enough to know every container by name.</p>
      </header>

      <section class="page__story">
        <div class="page__story-col">
          <h2>Our story</h2>
          <p class="page__drop">V. Sanjeeva Reddy started Vijaya Enterprises in 1987 with a single truck and forty acres of contract land in a village outside Guntur. He had watched for years as middlemen bought chillies from farmers at throwaway prices, resold them to exporters at 3× markup, and kept the farmers hungry. He decided to cut the middle out.</p>
          <p>His model was simple: pay farmers a guaranteed price fixed at sowing time, supply them with certified seed and fertiliser on credit, and buy everything they grew back at harvest. No auctions, no rejections for cosmetic defects, no midnight renegotiations. The first year he broke even. The second year he started getting calls from other villages.</p>
          <p>Thirty-nine years later, the model hasn't changed. Sanjeeva's son Krishna runs operations; his granddaughter Priya leads exports and lab quality. We still work without commission agents, we still pay farmers at sowing time, and we still sleep in the warehouse during peak drying season because nobody else is going to.</p>
        </div>

        <aside class="page__story-side">
          <div class="page__stat">
            <strong>1987</strong>
            <span>Founded in Guntur</span>
          </div>
          <div class="page__stat">
            <strong>2,400 T</strong>
            <span>Annual export volume</span>
          </div>
          <div class="page__stat">
            <strong>1,200+</strong>
            <span>Contract farmers</span>
          </div>
          <div class="page__stat">
            <strong>42</strong>
            <span>Countries served</span>
          </div>
          <div class="page__stat">
            <strong>11</strong>
            <span>Signature varieties</span>
          </div>
          <div class="page__stat">
            <strong>0</strong>
            <span>Middlemen between farm and ship</span>
          </div>
        </aside>
      </section>

      <section class="page__values">
        <h2>What we believe</h2>
        <div class="page__values-grid">
          <div class="page__value">
            <div class="page__value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h3>Rooted in place</h3>
            <p>Every chilli we ship comes from named farms with logged provenance. We don't blend origins to hit volume targets. If the label says Guntur Sannam, it's Guntur Sannam.</p>
          </div>
          <div class="page__value">
            <div class="page__value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7L9 18l-5-5"/></svg>
            </div>
            <h3>Farmers first</h3>
            <p>Our contracts fix price at sowing, not at harvest. That transfers the market risk from the farmer to us. When prices rise, the farmer still wins because we honour the contract and top up on delivery.</p>
          </div>
          <div class="page__value">
            <div class="page__value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v6.5L4.5 17A2 2 0 0 0 6.2 20h11.6a2 2 0 0 0 1.7-3L15 9.5V3"/><path d="M8 3h8"/></svg>
            </div>
            <h3>Lab every lot</h3>
            <p>Aflatoxin, Sudan dye, moisture, ASTA colour, Scoville — NABL-accredited test reports accompany every container. No "typical" values, no "batch averages". The actual lot, measured.</p>
          </div>
          <div class="page__value">
            <div class="page__value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/></svg>
            </div>
            <h3>Small, on purpose</h3>
            <p>We could triple volume tomorrow by cutting corners on drying, blending origins, or adding colour. We don't. Staying small is what makes staying honest possible.</p>
          </div>
        </div>
      </section>

      <section class="page__team">
        <h2>The people behind the name</h2>
        <div class="page__team-grid">
          <div class="page__member">
            <div class="page__member-avatar">VS</div>
            <h3>V. Sanjeeva Reddy</h3>
            <div class="page__member-role">Founder · Chairman</div>
            <p>Started the company in 1987. Still walks the warehouse every morning at 5:30. Known on the farm circuit as "Anna" (elder brother).</p>
          </div>
          <div class="page__member">
            <div class="page__member-avatar">KR</div>
            <h3>Krishna Reddy</h3>
            <div class="page__member-role">Managing Director</div>
            <p>Runs farm contracts, procurement, and logistics. Knows every one of the 1,200 contracted farmers by their village and harvest history.</p>
          </div>
          <div class="page__member">
            <div class="page__member-avatar">PR</div>
            <h3>Priya Reddy</h3>
            <div class="page__member-role">Head of Exports & Quality</div>
            <p>Oversees the lab, export documentation, and international accounts. Spent two years at an importer in Rotterdam before joining the family business.</p>
          </div>
        </div>
      </section>

      <section class="page__cta">
        <h2>Come visit us.</h2>
        <p>We welcome buyers, food-safety auditors, and the curious. Our warehouse is ten minutes from Guntur railway station — tea, a tour of the drying yards, and the best biryani in the district.</p>
        <div class="page__cta-actions">
          <a href="#contact" class="btn-primary">Plan a visit →</a>
          <a href="#/why-us" class="btn-secondary">Why work with us →</a>
        </div>
      </section>
    </article>
  `;

  document.title = 'About Vijaya Enterprises — Three generations of Indian chilli exporters';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', 'Vijaya Enterprises is a family-run dry red chilli exporter in Guntur, India. Founded 1987, three generations, 1,200+ contract farmers, 42 countries served.');
  window.scrollTo({ top: 0, behavior: 'auto' });
}

/* ---------- WHY US ---------- */
function renderWhyUs() {
  const home = $('#home-view');
  const detail = $('#detail-view');
  home.classList.remove('view--active');
  home.setAttribute('aria-hidden', 'true');
  detail.classList.add('view--active');
  detail.setAttribute('aria-hidden', 'false');

  const differentiators = [
    {
      number: '01',
      title: 'Zero middlemen',
      body: 'We buy directly from 1,200+ contracted farms in Andhra Pradesh, Karnataka, Kashmir, and the North-East. No commission agents, no auction-yard reselling, no four-tier supply chain. Your container was grown on farms we can name.',
      proof: 'Contract list with farm GPS coordinates available under NDA.'
    },
    {
      number: '02',
      title: 'NABL lab reports per lot',
      body: 'Every outbound container carries a fresh, lot-specific lab report covering aflatoxin, Sudan dye, moisture, ASTA colour, and Scoville (capsaicin content). Not a batch average. Not "typical values". The actual lot you\'re buying.',
      proof: 'Sample report provided with every quote.'
    },
    {
      number: '03',
      title: 'Certified from field to port',
      body: 'FSSAI (Food Safety and Standards Authority of India), APEDA (Agricultural and Processed Food Products Export Development Authority), ISO 22000, USFDA FCE registered, Spices Board of India member. One of the very few Guntur exporters with the complete stack.',
      proof: 'All certificates verifiable on the issuing authority websites.'
    },
    {
      number: '04',
      title: 'No colour enhancers. Ever.',
      body: 'Many Indian exporters treat faded chillies with Sudan dye, synthetic red colourants, or sulphur fumigation. These are banned in the EU and US — and we don\'t use them. Your chillies are the colour they dried to, under the sun, in Guntur.',
      proof: 'Sudan dye test results routinely show "not detected" on our reports.'
    },
    {
      number: '05',
      title: 'Custom packaging & private label',
      body: 'We pack to your spec: jute sacks, vacuum cartons, poly bags, consumer-ready retail packs with your branding. Minimum order for private label is 5 tonnes. Artwork turnaround is 10 business days.',
      proof: 'See our private-label portfolio on request.'
    },
    {
      number: '06',
      title: 'Flexible incoterms',
      body: 'FOB Chennai / Mundra / Nhava Sheva. CIF to any major port. DDP available to the US, UK, UAE, Singapore, and EU member states. We handle documentation, customs, and insurance so you handle none of it.',
      proof: 'Current vessel availability shared within 24 hours of enquiry.'
    },
    {
      number: '07',
      title: 'Farmers paid at sowing',
      body: 'Market price risk sits with us, not the farmer. We lock in a purchase price at the time of sowing and honour it at harvest — even if the spot market has crashed. When prices rise above contract, we share the upside.',
      proof: 'Farmer testimonials and payment records available on visit.'
    },
    {
      number: '08',
      title: 'Three generations of trust',
      body: 'Founded 1987. Same family, same village, same warehouse, same core values. We have buyers who have worked with us for 25+ years — and new buyers who come through their recommendation.',
      proof: 'References from long-term clients provided on request.'
    }
  ];

  detail.innerHTML = `
    <article class="page">
      <a href="#/" class="detail__back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to home
      </a>

      <header class="page__hero">
        <div class="page__kicker">Why us</div>
        <h1 class="page__title">Eight reasons buyers <em>come back.</em></h1>
        <p class="page__lede">We're not the cheapest exporter in India. We're not the biggest. But we've kept buyers on our books for 25+ years, and here's why.</p>
      </header>

      <section class="page__reasons">
        ${differentiators.map(d => `
          <article class="reason">
            <div class="reason__number">${d.number}</div>
            <div class="reason__body">
              <h3 class="reason__title">${d.title}</h3>
              <p class="reason__text">${d.body}</p>
              <div class="reason__proof">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                ${d.proof}
              </div>
            </div>
          </article>
        `).join('')}
      </section>

      <section class="page__compare">
        <h2>How we compare</h2>
        <div class="page__compare-table">
          <div class="page__compare-header">
            <div></div>
            <div><strong>Vijaya Enterprises</strong></div>
            <div>Typical Indian exporter</div>
          </div>
          <div class="page__compare-row">
            <div>Farm-to-port chain</div>
            <div class="page__compare-yes">Direct contract with farmer</div>
            <div class="page__compare-no">2–4 middlemen (commission agents, auction yard, consolidator)</div>
          </div>
          <div class="page__compare-row">
            <div>Lab reports</div>
            <div class="page__compare-yes">Per lot, NABL-accredited</div>
            <div class="page__compare-no">"Typical values" or batch averages</div>
          </div>
          <div class="page__compare-row">
            <div>Colour enhancement</div>
            <div class="page__compare-yes">Never. Sun-dried only</div>
            <div class="page__compare-no">Sulphur / Sudan dye common</div>
          </div>
          <div class="page__compare-row">
            <div>Farmer pricing</div>
            <div class="page__compare-yes">Fixed at sowing + harvest top-up</div>
            <div class="page__compare-no">Spot price at delivery</div>
          </div>
          <div class="page__compare-row">
            <div>Private label</div>
            <div class="page__compare-yes">From 5 MT · 10-day artwork</div>
            <div class="page__compare-no">Rarely offered</div>
          </div>
          <div class="page__compare-row">
            <div>Incoterms</div>
            <div class="page__compare-yes">FOB, CIF, DDP</div>
            <div class="page__compare-no">Typically FOB only</div>
          </div>
        </div>
      </section>

      <section class="page__cta">
        <h2>Ready to start?</h2>
        <p>Send us a note — variety, destination port, target volume, target month. We come back within a business day with a quote, a sample lab report, and vessel availability.</p>
        <div class="page__cta-actions">
          <a href="#contact" class="btn-primary">Request a quote →</a>
          <a href="https://wa.me/919392314373" class="btn-secondary" target="_blank" rel="noopener">Chat on WhatsApp</a>
        </div>
      </section>
    </article>
  `;

  document.title = 'Why choose Vijaya Enterprises — Direct-from-farm chilli exports';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', 'Eight reasons global buyers choose Vijaya Enterprises: zero middlemen, NABL lab reports per lot, FSSAI/APEDA/ISO 22000 certified, farmers paid at sowing, no colour enhancers.');
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function handleRoute() {
  const hash = location.hash;
  const variety = hash.match(/^#\/variety\/(.+)$/);
  if (variety) {
    renderDetail(variety[1]);
  } else if (hash === '#/about') {
    renderAbout();
  } else if (hash === '#/why-us') {
    renderWhyUs();
  } else {
    renderHome();
    // Scroll to anchor if it matches a section id (#varieties, #journey, #contact)
    const anchor = hash.replace(/^#\/?/, '');
    if (anchor && document.getElementById(anchor)) {
      setTimeout(() => {
        document.getElementById(anchor).scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }, 10);
    }
  }
}

/* ================================================================
   5. JOURNEY CINEMA — scroll-driven 9-scene animation
   ================================================================ */

const cinemaPhases = [
  {
    day: 1, title: 'Plowing the field',
    narrative: 'Before dawn, bullocks drag wooden plows through sun-cracked earth. The red soil of Guntur, rich in iron and potassium, is turned over to breathe. Farmers who have worked these fields for three generations read the land by touch — crumbling a fistful to judge moisture, smelling it to judge fertility.',
    scene: 'plow'
  },
  {
    day: 5, title: 'Seeding the furrows',
    narrative: 'Hand-selected seeds from last season\'s best pods are placed into shallow furrows, two centimetres deep and thirty apart. We pay farmers a 15% premium to use our certified seed stock — it\'s the only way we can guarantee variety purity right through to export.',
    scene: 'seed'
  },
  {
    day: 14, title: 'Germination',
    narrative: 'Beneath the surface, the seed splits. A tap-root pushes down, two pale cotyledons reach up. Within three days of emergence, true leaves form. We measure germination rate as one of our quality KPIs — a strong stand means a strong harvest.',
    scene: 'germinate'
  },
  {
    day: 28, title: 'Transplanting',
    narrative: 'Four-week-old seedlings are moved from nursery beds to the main field. Drip irrigation lines follow each row, delivering water and nutrients directly to the root zone. We use half the water of flood irrigation, and the plants thank us with deeper root systems.',
    scene: 'grow'
  },
  {
    day: 55, title: 'Flowering',
    narrative: 'Small, star-shaped white flowers appear at every leaf axil. Each flower self-pollinates within forty-eight hours; those not pollinated simply drop. Native bees help the process along — which is why we require that contracted farms leave pollinator strips at field edges.',
    scene: 'flower'
  },
  {
    day: 80, title: 'Green fruit forms',
    narrative: 'Chillies emerge — bright, waxy green, still building their capsaicin. They hang like tiny emerald lanterns from every branch. We walk the rows weekly now, removing pods damaged by thrips or sun-scald so the plant\'s energy goes into the survivors.',
    scene: 'green'
  },
  {
    day: 110, title: 'The red harvest',
    narrative: 'Green turns to crimson and the harvest begins. Ripe pods are hand-picked — never machine-harvested — because only a human eye can judge the precise shade that signals peak capsaicin and colour. Immature pods stay on the plant; we come back a week later.',
    scene: 'harvest'
  },
  {
    day: 125, title: 'Sun drying',
    narrative: 'For fourteen to twenty-one days, chillies rest on raised bamboo platforms under the Andhra sun. Moisture drops from 78% to a stable 10%. No artificial heat, no colour enhancers, no sulphur — just sunlight, air, and patience. This is where cheap exporters cut corners. We don\'t.',
    scene: 'dry'
  },
  {
    day: 147, title: 'Sealed for the world',
    narrative: 'Graded, stemmed, lab-tested, and packed into jute sacks or vacuum-sealed cartons per the buyer\'s spec. From our warehouses in Guntur, 20-foot containers travel to Chennai, Mundra, or Nhava Sheva. From seed to sea in 147 days. From our soil to your shelf.',
    scene: 'ship'
  }
];

/* 9 scene SVGs — shared viewBox "0 0 800 500", consistent horizon at y=340.
   Each scene has a distinct palette + internal animation that plays when active. */
const cinemaScenes = {
  /* ── 1. PLOW ───────────────────────────────────────────────── */
  plow: `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyDawn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff5eb"/><stop offset=".6" stop-color="#fed7aa"/><stop offset="1" stop-color="#fecaca"/>
      </linearGradient>
      <linearGradient id="soilPlow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7c2d12"/><stop offset="1" stop-color="#431407"/>
      </linearGradient>
    </defs>
    <rect width="800" height="340" fill="url(#skyDawn)"/>
    <circle cx="190" cy="280" r="48" fill="#f97316" opacity=".9" class="cinema-sun"/>
    <circle cx="190" cy="280" r="68" fill="#f97316" opacity=".25"/>
    <!-- distant hills -->
    <path d="M 0 340 Q 150 300 300 330 Q 500 310 700 335 L 800 340 L 800 340 L 0 340 Z" fill="#fecaca" opacity=".7"/>
    <!-- plowed field with diagonal furrows -->
    <rect x="0" y="340" width="800" height="160" fill="url(#soilPlow)"/>
    <g stroke="#1c0a05" stroke-width="2" opacity=".4">
      <path d="M 0 360 L 800 380"/><path d="M 0 380 L 800 405"/>
      <path d="M 0 405 L 800 435"/><path d="M 0 435 L 800 470"/>
      <path d="M 0 465 L 800 500"/>
    </g>
    <!-- farmer + bullock silhouette -->
    <g class="cinema-plow-group" fill="#0a0a0a">
      <!-- bullock 1 -->
      <ellipse cx="420" cy="395" rx="38" ry="18"/>
      <path d="M 388 395 L 378 408 L 388 408 Z M 448 395 L 458 408 L 448 408 Z M 380 388 L 380 378 Q 380 372 385 374 L 388 380 Z"/>
      <!-- bullock 2 -->
      <ellipse cx="490" cy="395" rx="38" ry="18"/>
      <path d="M 458 395 L 448 408 L 458 408 Z M 518 395 L 528 408 L 518 408 Z M 450 388 L 450 378 Q 450 372 455 374 L 458 380 Z"/>
      <!-- plow -->
      <path d="M 540 400 L 585 435 L 580 445 L 535 410 Z"/>
      <!-- farmer -->
      <circle cx="595" cy="380" r="10"/>
      <path d="M 588 388 L 580 430 L 588 432 L 595 395 L 602 432 L 610 430 L 602 388 Z"/>
      <line x1="595" y1="398" x2="560" y2="420" stroke="#0a0a0a" stroke-width="3"/>
    </g>
    <!-- birds -->
    <g stroke="#000" fill="none" stroke-width="2" stroke-linecap="round" class="cinema-birds">
      <path d="M 120 120 q 6 -6 12 0 q 6 -6 12 0"/>
      <path d="M 180 90 q 5 -5 10 0 q 5 -5 10 0"/>
      <path d="M 250 140 q 5 -5 10 0 q 5 -5 10 0"/>
    </g>
  </svg>`,

  /* ── 2. SEED ───────────────────────────────────────────────── */
  seed: `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyMorn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#eff6ff"/><stop offset="1" stop-color="#fef9c3"/>
      </linearGradient>
      <linearGradient id="soilSeed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#92400e"/><stop offset="1" stop-color="#451a03"/>
      </linearGradient>
    </defs>
    <rect width="800" height="340" fill="url(#skyMorn)"/>
    <circle cx="640" cy="110" r="38" fill="#fbbf24" opacity=".95"/>
    <circle cx="640" cy="110" r="55" fill="#fbbf24" opacity=".2"/>
    <!-- close-up furrowed ground -->
    <rect x="0" y="340" width="800" height="160" fill="url(#soilSeed)"/>
    <!-- furrows (v-shaped trenches) -->
    <g fill="#1c0a05" opacity=".55">
      <path d="M 0 360 Q 200 372 400 360 Q 600 350 800 362 L 800 372 Q 600 362 400 370 Q 200 380 0 370 Z"/>
      <path d="M 0 395 Q 200 408 400 397 Q 600 385 800 398 L 800 408 Q 600 398 400 408 Q 200 418 0 407 Z"/>
      <path d="M 0 435 Q 200 448 400 438 Q 600 425 800 440 L 800 452 Q 600 440 400 450 Q 200 462 0 450 Z"/>
    </g>
    <!-- hand dropping seeds -->
    <g class="cinema-hand">
      <path d="M 340 180 L 345 250 Q 350 280 380 285 L 440 285 Q 470 280 470 260 L 465 220 L 445 195 L 410 180 Z" fill="#d4a373" opacity=".95"/>
      <path d="M 340 180 L 345 250 Q 350 280 380 285 L 440 285 Q 470 280 470 260 L 465 220 L 445 195 L 410 180 Z" fill="none" stroke="#78350f" stroke-width="1.5" opacity=".4"/>
    </g>
    <!-- falling seeds -->
    <g class="cinema-seeds" fill="#78350f">
      <ellipse cx="395" cy="310" rx="4" ry="3"/>
      <ellipse cx="420" cy="330" rx="4" ry="3"/>
      <ellipse cx="380" cy="355" rx="4" ry="3"/>
    </g>
    <!-- seeds already landed in furrows -->
    <g fill="#fbbf24">
      <ellipse cx="140" cy="400" rx="4" ry="3"/>
      <ellipse cx="210" cy="405" rx="4" ry="3"/>
      <ellipse cx="290" cy="398" rx="4" ry="3"/>
      <ellipse cx="550" cy="445" rx="4" ry="3"/>
      <ellipse cx="640" cy="440" rx="4" ry="3"/>
      <ellipse cx="720" cy="450" rx="4" ry="3"/>
    </g>
  </svg>`,

  /* ── 3. GERMINATE (cross-section view) ─────────────────────── */
  germinate: `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyCool" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#dbeafe"/><stop offset="1" stop-color="#fef3c7"/>
      </linearGradient>
      <linearGradient id="earthCross" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7c2d12"/><stop offset=".5" stop-color="#451a03"/><stop offset="1" stop-color="#1c0a05"/>
      </linearGradient>
    </defs>
    <rect width="800" height="220" fill="url(#skyCool)"/>
    <circle cx="680" cy="90" r="32" fill="#fde047" opacity=".9"/>
    <!-- soil cross-section (much taller to show roots) -->
    <rect x="0" y="220" width="800" height="280" fill="url(#earthCross)"/>
    <!-- horizon line at y=220 -->
    <line x1="0" y1="220" x2="800" y2="220" stroke="#92400e" stroke-width="2" opacity=".5"/>
    <!-- soil texture dots -->
    <g fill="#000" opacity=".25">
      <circle cx="100" cy="260" r="2"/><circle cx="200" cy="300" r="2"/><circle cx="320" cy="280" r="2"/>
      <circle cx="500" cy="320" r="2"/><circle cx="620" cy="290" r="2"/><circle cx="720" cy="340" r="2"/>
      <circle cx="150" cy="380" r="2"/><circle cx="380" cy="410" r="2"/><circle cx="600" cy="430" r="2"/>
    </g>
    <!-- Sprout 1 -->
    <g class="cinema-sprout-a">
      <!-- underground root -->
      <path d="M 250 220 Q 248 270 255 320 Q 260 370 250 420" stroke="#f5f5f4" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
      <path d="M 253 290 L 235 310" stroke="#f5f5f4" stroke-width="1.5" fill="none" opacity=".6"/>
      <path d="M 256 340 L 278 365" stroke="#f5f5f4" stroke-width="1.5" fill="none" opacity=".6"/>
      <!-- above-ground sprout -->
      <line x1="250" y1="220" x2="250" y2="170" stroke="#65a30d" stroke-width="3" stroke-linecap="round"/>
      <path d="M 250 180 Q 232 175 228 168 Q 245 165 252 178 Z" fill="#84cc16"/>
      <path d="M 250 180 Q 268 175 272 168 Q 255 165 248 178 Z" fill="#84cc16"/>
    </g>
    <!-- Sprout 2 - slightly behind -->
    <g class="cinema-sprout-b" opacity=".85">
      <path d="M 480 220 Q 478 265 485 310 Q 490 355 482 400" stroke="#f5f5f4" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
      <path d="M 484 285 L 505 305" stroke="#f5f5f4" stroke-width="1.5" fill="none" opacity=".5"/>
      <line x1="480" y1="220" x2="480" y2="185" stroke="#65a30d" stroke-width="3" stroke-linecap="round"/>
      <path d="M 480 192 Q 465 188 462 182 Q 478 180 482 190 Z" fill="#84cc16"/>
      <path d="M 480 192 Q 495 188 498 182 Q 482 180 478 190 Z" fill="#84cc16"/>
    </g>
    <!-- Tiny sprout 3 just emerging -->
    <g class="cinema-sprout-c" opacity=".8">
      <path d="M 620 220 Q 618 255 625 295" stroke="#f5f5f4" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>
      <line x1="620" y1="220" x2="620" y2="205" stroke="#65a30d" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="620" cy="207" r="3" fill="#84cc16"/>
    </g>
  </svg>`,

  /* ── 4. GROW ───────────────────────────────────────────────── */
  grow: `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#bae6fd"/><stop offset="1" stop-color="#fef9c3"/>
      </linearGradient>
      <linearGradient id="soilGrow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#92400e"/><stop offset="1" stop-color="#451a03"/>
      </linearGradient>
    </defs>
    <rect width="800" height="340" fill="url(#skyDay)"/>
    <circle cx="680" cy="85" r="42" fill="#fde047" opacity=".95"/>
    <!-- far hills -->
    <path d="M 0 340 Q 200 305 400 325 Q 600 310 800 330 L 800 340 L 0 340 Z" fill="#86efac" opacity=".5"/>
    <rect x="0" y="340" width="800" height="160" fill="url(#soilGrow)"/>
    <!-- drip irrigation line -->
    <line x1="0" y1="345" x2="800" y2="345" stroke="#1f2937" stroke-width="2" opacity=".6"/>
    <g fill="#1f2937" opacity=".6">
      <circle cx="150" cy="345" r="2"/><circle cx="300" cy="345" r="2"/>
      <circle cx="450" cy="345" r="2"/><circle cx="600" cy="345" r="2"/>
    </g>
    <!-- row of young plants - plant template -->
    ${[120, 260, 400, 540, 680].map((x, i) => {
      const scale = 0.85 + (i % 2) * 0.15;
      return `<g transform="translate(${x} 340) scale(${scale})" class="cinema-plant cinema-plant--${i}">
        <line x1="0" y1="0" x2="0" y2="-90" stroke="#15803d" stroke-width="4" stroke-linecap="round"/>
        <!-- leaves -->
        <ellipse cx="-18" cy="-30" rx="14" ry="8" fill="#22c55e" transform="rotate(-30 -18 -30)"/>
        <ellipse cx="18" cy="-45" rx="14" ry="8" fill="#16a34a" transform="rotate(30 18 -45)"/>
        <ellipse cx="-20" cy="-60" rx="16" ry="9" fill="#22c55e" transform="rotate(-40 -20 -60)"/>
        <ellipse cx="20" cy="-75" rx="16" ry="9" fill="#16a34a" transform="rotate(40 20 -75)"/>
        <ellipse cx="0" cy="-92" rx="12" ry="7" fill="#4ade80"/>
      </g>`;
    }).join('')}
    <!-- butterfly -->
    <g transform="translate(500 180)" class="cinema-butterfly">
      <ellipse cx="-6" cy="-3" rx="8" ry="5" fill="#dc2626" opacity=".85" transform="rotate(-20)"/>
      <ellipse cx="6" cy="-3" rx="8" ry="5" fill="#dc2626" opacity=".85" transform="rotate(20)"/>
      <line x1="0" y1="-4" x2="0" y2="4" stroke="#0a0a0a" stroke-width="1.5"/>
    </g>
  </svg>`,

  /* ── 5. FLOWER ─────────────────────────────────────────────── */
  flower: `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyFlower" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#e0f2fe"/><stop offset="1" stop-color="#fef9c3"/>
      </linearGradient>
    </defs>
    <rect width="800" height="340" fill="url(#skyFlower)"/>
    <circle cx="700" cy="90" r="45" fill="#fde047" opacity=".95"/>
    <!-- rays around sun -->
    <g stroke="#fde047" stroke-width="2" opacity=".6" class="cinema-rays">
      <line x1="700" y1="30" x2="700" y2="45"/>
      <line x1="755" y1="90" x2="770" y2="90"/>
      <line x1="745" y1="55" x2="756" y2="44"/>
      <line x1="745" y1="125" x2="756" y2="136"/>
    </g>
    <rect x="0" y="340" width="800" height="160" fill="#451a03"/>
    <!-- mature plant -->
    <g transform="translate(400 340)" class="cinema-bush">
      <!-- main stem -->
      <path d="M 0 0 L 0 -180" stroke="#14532d" stroke-width="6" stroke-linecap="round"/>
      <!-- branches -->
      <path d="M 0 -60 L -40 -80 L -60 -70" stroke="#14532d" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 0 -100 L 45 -120 L 70 -115" stroke="#14532d" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 0 -140 L -40 -160 L -65 -165" stroke="#14532d" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- leaves -->
      <ellipse cx="-50" cy="-72" rx="18" ry="10" fill="#16a34a" transform="rotate(-25 -50 -72)"/>
      <ellipse cx="55" cy="-118" rx="20" ry="11" fill="#16a34a" transform="rotate(20 55 -118)"/>
      <ellipse cx="-55" cy="-160" rx="18" ry="10" fill="#16a34a" transform="rotate(-30 -55 -160)"/>
      <ellipse cx="-25" cy="-130" rx="16" ry="9" fill="#22c55e" transform="rotate(-15 -25 -130)"/>
      <ellipse cx="30" cy="-80" rx="16" ry="9" fill="#22c55e" transform="rotate(10 30 -80)"/>
      <ellipse cx="0" cy="-180" rx="14" ry="8" fill="#4ade80"/>
      <!-- white flowers with yellow centres -->
      <g class="cinema-flower cinema-flower--1" transform="translate(-58 -68)">
        <g class="cinema-petal-spin">
          <circle cx="0" cy="-5" r="5" fill="#fff"/>
          <circle cx="5" cy="0" r="5" fill="#fff"/>
          <circle cx="0" cy="5" r="5" fill="#fff"/>
          <circle cx="-5" cy="0" r="5" fill="#fff"/>
          <circle cx="3.5" cy="-3.5" r="5" fill="#fff"/>
          <circle cx="-3.5" cy="3.5" r="5" fill="#fff"/>
        </g>
        <circle cx="0" cy="0" r="3" fill="#fde047"/>
      </g>
      <g class="cinema-flower cinema-flower--2" transform="translate(62 -112)">
        <g class="cinema-petal-spin">
          <circle cx="0" cy="-5" r="5" fill="#fff"/>
          <circle cx="5" cy="0" r="5" fill="#fff"/>
          <circle cx="0" cy="5" r="5" fill="#fff"/>
          <circle cx="-5" cy="0" r="5" fill="#fff"/>
          <circle cx="3.5" cy="-3.5" r="5" fill="#fff"/>
          <circle cx="-3.5" cy="3.5" r="5" fill="#fff"/>
        </g>
        <circle cx="0" cy="0" r="3" fill="#fde047"/>
      </g>
      <g class="cinema-flower cinema-flower--3" transform="translate(-62 -155)">
        <g class="cinema-petal-spin">
          <circle cx="0" cy="-5" r="5" fill="#fff"/>
          <circle cx="5" cy="0" r="5" fill="#fff"/>
          <circle cx="0" cy="5" r="5" fill="#fff"/>
          <circle cx="-5" cy="0" r="5" fill="#fff"/>
          <circle cx="3.5" cy="-3.5" r="5" fill="#fff"/>
          <circle cx="-3.5" cy="3.5" r="5" fill="#fff"/>
        </g>
        <circle cx="0" cy="0" r="3" fill="#fde047"/>
      </g>
    </g>
    <!-- bee -->
    <g transform="translate(320 170)" class="cinema-bee">
      <ellipse cx="0" cy="0" rx="6" ry="4" fill="#fbbf24"/>
      <path d="M -3 -3 L -3 3 M 0 -4 L 0 4 M 3 -3 L 3 3" stroke="#0a0a0a" stroke-width="1.2"/>
      <ellipse cx="-4" cy="-3" rx="5" ry="2" fill="#fff" opacity=".7"/>
      <ellipse cx="4" cy="-3" rx="5" ry="2" fill="#fff" opacity=".7"/>
    </g>
  </svg>`,

  /* ── 6. GREEN ──────────────────────────────────────────────── */
  green: `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#bae6fd"/><stop offset="1" stop-color="#ecfccb"/>
      </linearGradient>
    </defs>
    <rect width="800" height="340" fill="url(#skyGreen)"/>
    <circle cx="680" cy="95" r="42" fill="#fde047" opacity=".9"/>
    <rect x="0" y="340" width="800" height="160" fill="#451a03"/>
    <!-- plant full of green chillies -->
    <g transform="translate(400 340)">
      <path d="M 0 0 L 0 -200" stroke="#14532d" stroke-width="7" stroke-linecap="round"/>
      <path d="M 0 -60 L -55 -85 L -80 -80" stroke="#14532d" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 0 -110 L 60 -130 L 85 -128" stroke="#14532d" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 0 -155 L -55 -175 L -80 -180" stroke="#14532d" stroke-width="5" fill="none" stroke-linecap="round"/>
      <!-- leaves -->
      <ellipse cx="-70" cy="-78" rx="20" ry="11" fill="#16a34a" transform="rotate(-25 -70 -78)"/>
      <ellipse cx="75" cy="-128" rx="22" ry="12" fill="#16a34a" transform="rotate(20 75 -128)"/>
      <ellipse cx="-70" cy="-178" rx="20" ry="11" fill="#16a34a" transform="rotate(-30 -70 -178)"/>
      <ellipse cx="-30" cy="-140" rx="18" ry="10" fill="#22c55e" transform="rotate(-15 -30 -140)"/>
      <ellipse cx="35" cy="-90" rx="18" ry="10" fill="#22c55e" transform="rotate(10 35 -90)"/>
      <ellipse cx="0" cy="-200" rx="15" ry="9" fill="#4ade80"/>
      <!-- green chillies hanging -->
      <g class="cinema-chilli-sway" transform="translate(-78 -72)"><ellipse cx="0" cy="15" rx="4" ry="16" fill="#22c55e"/><circle cx="0" cy="0" r="2" fill="#14532d"/></g>
      <g class="cinema-chilli-sway" transform="translate(-50 -88)"><ellipse cx="0" cy="18" rx="4" ry="18" fill="#16a34a"/><circle cx="0" cy="0" r="2" fill="#14532d"/></g>
      <g class="cinema-chilli-sway" transform="translate(85 -122)"><ellipse cx="0" cy="16" rx="4" ry="17" fill="#22c55e"/><circle cx="0" cy="0" r="2" fill="#14532d"/></g>
      <g class="cinema-chilli-sway" transform="translate(60 -140)"><ellipse cx="0" cy="15" rx="4" ry="16" fill="#4ade80"/><circle cx="0" cy="0" r="2" fill="#14532d"/></g>
      <g class="cinema-chilli-sway" transform="translate(-80 -172)"><ellipse cx="0" cy="17" rx="4" ry="17" fill="#22c55e"/><circle cx="0" cy="0" r="2" fill="#14532d"/></g>
      <g class="cinema-chilli-sway" transform="translate(-45 -165)"><ellipse cx="0" cy="14" rx="4" ry="15" fill="#16a34a"/><circle cx="0" cy="0" r="2" fill="#14532d"/></g>
    </g>
  </svg>`,

  /* ── 7. HARVEST ────────────────────────────────────────────── */
  harvest: `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyHarvest" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fef3c7"/><stop offset="1" stop-color="#fed7aa"/>
      </linearGradient>
    </defs>
    <rect width="800" height="340" fill="url(#skyHarvest)"/>
    <circle cx="680" cy="120" r="40" fill="#f97316" opacity=".95"/>
    <rect x="0" y="340" width="800" height="160" fill="#451a03"/>
    <!-- plant with RED chillies -->
    <g transform="translate(380 340)">
      <path d="M 0 0 L 0 -200" stroke="#14532d" stroke-width="7" stroke-linecap="round"/>
      <path d="M 0 -60 L -55 -85 L -80 -80" stroke="#14532d" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 0 -110 L 60 -130 L 85 -128" stroke="#14532d" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 0 -155 L -55 -175 L -80 -180" stroke="#14532d" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="-70" cy="-78" rx="20" ry="11" fill="#16a34a" transform="rotate(-25 -70 -78)"/>
      <ellipse cx="75" cy="-128" rx="22" ry="12" fill="#16a34a" transform="rotate(20 75 -128)"/>
      <ellipse cx="-70" cy="-178" rx="20" ry="11" fill="#16a34a" transform="rotate(-30 -70 -178)"/>
      <ellipse cx="-30" cy="-140" rx="18" ry="10" fill="#22c55e" transform="rotate(-15 -30 -140)"/>
      <ellipse cx="35" cy="-90" rx="18" ry="10" fill="#22c55e" transform="rotate(10 35 -90)"/>
      <!-- RED chillies -->
      <g transform="translate(-78 -72)"><ellipse cx="0" cy="15" rx="4" ry="16" fill="#dc2626"/><circle cx="0" cy="0" r="2" fill="#14532d"/></g>
      <g transform="translate(-50 -88)"><ellipse cx="0" cy="18" rx="4" ry="18" fill="#b91c1c"/><circle cx="0" cy="0" r="2" fill="#14532d"/></g>
      <g transform="translate(85 -122)"><ellipse cx="0" cy="16" rx="4" ry="17" fill="#dc2626"/><circle cx="0" cy="0" r="2" fill="#14532d"/></g>
      <g transform="translate(60 -140)"><ellipse cx="0" cy="15" rx="4" ry="16" fill="#991b1b"/><circle cx="0" cy="0" r="2" fill="#14532d"/></g>
      <g transform="translate(-80 -172)"><ellipse cx="0" cy="17" rx="4" ry="17" fill="#dc2626"/><circle cx="0" cy="0" r="2" fill="#14532d"/></g>
    </g>
    <!-- hand reaching in -->
    <g class="cinema-picker" transform="translate(530 200)">
      <!-- wrist + forearm coming from right -->
      <path d="M 300 100 L 120 80 Q 80 75 70 95 Q 65 115 90 120 L 280 140 Z" fill="#d4a373"/>
      <!-- hand -->
      <path d="M 70 95 Q 45 85 35 100 Q 30 115 50 120 Q 35 125 38 140 Q 50 150 70 140 Q 80 150 95 140 Q 105 130 95 115 Q 85 100 70 95 Z" fill="#c69167"/>
      <!-- fingers gripping a chilli -->
      <ellipse cx="45" cy="128" rx="3" ry="11" fill="#dc2626"/>
    </g>
    <!-- basket at base -->
    <g transform="translate(590 355)" class="cinema-basket">
      <path d="M -35 0 L 35 0 L 28 35 L -28 35 Z" fill="#92400e"/>
      <line x1="-30" y1="10" x2="30" y2="10" stroke="#451a03" stroke-width="1.5" opacity=".6"/>
      <line x1="-32" y1="20" x2="32" y2="20" stroke="#451a03" stroke-width="1.5" opacity=".6"/>
      <!-- chillies inside -->
      <ellipse cx="-12" cy="-4" rx="12" ry="4" fill="#dc2626"/>
      <ellipse cx="12" cy="-6" rx="11" ry="4" fill="#b91c1c"/>
      <ellipse cx="0" cy="-10" rx="13" ry="4" fill="#dc2626"/>
      <ellipse cx="-15" cy="-12" rx="9" ry="3" fill="#991b1b"/>
    </g>
  </svg>`,

  /* ── 8. DRY ────────────────────────────────────────────────── */
  dry: `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyDry" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fef3c7"/><stop offset="1" stop-color="#fed7aa"/>
      </linearGradient>
      <radialGradient id="sunGlow" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fbbf24"/><stop offset="1" stop-color="#fbbf24" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="800" height="340" fill="url(#skyDry)"/>
    <!-- intense overhead sun -->
    <circle cx="400" cy="100" r="95" fill="url(#sunGlow)" opacity=".6" class="cinema-sun-pulse"/>
    <circle cx="400" cy="100" r="50" fill="#fbbf24"/>
    <g stroke="#fbbf24" stroke-width="3" stroke-linecap="round" opacity=".7" class="cinema-rays-strong">
      <line x1="400" y1="20" x2="400" y2="40"/>
      <line x1="400" y1="160" x2="400" y2="180"/>
      <line x1="320" y1="100" x2="340" y2="100"/>
      <line x1="460" y1="100" x2="480" y2="100"/>
      <line x1="345" y1="45" x2="358" y2="58"/>
      <line x1="455" y1="45" x2="442" y2="58"/>
      <line x1="345" y1="155" x2="358" y2="142"/>
      <line x1="455" y1="155" x2="442" y2="142"/>
    </g>
    <!-- heat shimmer lines (animated in CSS) -->
    <g class="cinema-shimmer" stroke="#f97316" stroke-width="1.5" fill="none" opacity=".4">
      <path d="M 100 220 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0"/>
      <path d="M 300 235 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0"/>
      <path d="M 520 225 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0"/>
      <path d="M 650 230 q 10 -6 20 0 q 10 6 20 0 q 10 -6 20 0"/>
    </g>
    <rect x="0" y="340" width="800" height="160" fill="#78350f"/>
    <!-- bamboo drying platforms with chillies spread -->
    <g transform="translate(80 360)">
      <rect x="0" y="20" width="280" height="8" fill="#92400e"/>
      <rect x="0" y="28" width="6" height="60" fill="#92400e"/>
      <rect x="274" y="28" width="6" height="60" fill="#92400e"/>
      <!-- chillies scattered -->
      ${[10, 45, 80, 115, 150, 185, 220, 250].map((x, i) =>
        `<ellipse cx="${x + (i%2?4:-3)}" cy="${14 + (i%3?-2:3)}" rx="18" ry="5" fill="${['#dc2626','#b91c1c','#dc2626','#991b1b','#dc2626','#b91c1c','#dc2626','#991b1b'][i]}" transform="rotate(${(i%2?-10:12) - i*2} ${x} 14)"/>`
      ).join('')}
      ${[25, 60, 95, 130, 165, 200, 235].map((x, i) =>
        `<ellipse cx="${x}" cy="${6 + (i%2?-1:2)}" rx="17" ry="5" fill="${['#b91c1c','#dc2626','#991b1b','#dc2626','#b91c1c','#dc2626','#991b1b'][i]}" transform="rotate(${(i%2?15:-8) - i*3} ${x} 6)"/>`
      ).join('')}
    </g>
    <g transform="translate(440 360)">
      <rect x="0" y="20" width="280" height="8" fill="#92400e"/>
      <rect x="0" y="28" width="6" height="60" fill="#92400e"/>
      <rect x="274" y="28" width="6" height="60" fill="#92400e"/>
      ${[10, 45, 80, 115, 150, 185, 220, 250].map((x, i) =>
        `<ellipse cx="${x}" cy="${14 + (i%2?2:-2)}" rx="18" ry="5" fill="${['#dc2626','#b91c1c','#dc2626','#991b1b','#dc2626','#b91c1c','#dc2626','#991b1b'][i]}" transform="rotate(${(i%2?8:-14) + i*2} ${x} 14)"/>`
      ).join('')}
      ${[25, 60, 95, 130, 165, 200, 235].map((x, i) =>
        `<ellipse cx="${x}" cy="${6 + (i%2?2:-1)}" rx="17" ry="5" fill="${['#991b1b','#dc2626','#b91c1c','#dc2626','#991b1b','#dc2626','#b91c1c'][i]}" transform="rotate(${(i%2?-12:6) - i*3} ${x} 6)"/>`
      ).join('')}
    </g>
  </svg>`,

  /* ── 9. SHIP ───────────────────────────────────────────────── */
  ship: `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skySunset" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fef3c7"/><stop offset=".5" stop-color="#fecaca"/><stop offset="1" stop-color="#fca5a5"/>
      </linearGradient>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7dd3fc"/><stop offset="1" stop-color="#0369a1"/>
      </linearGradient>
    </defs>
    <rect width="800" height="320" fill="url(#skySunset)"/>
    <circle cx="170" cy="180" r="55" fill="#f97316" opacity=".85"/>
    <circle cx="170" cy="180" r="85" fill="#f97316" opacity=".2"/>
    <!-- sea -->
    <rect x="0" y="320" width="800" height="180" fill="url(#sea)"/>
    <!-- wave lines -->
    <g stroke="#fff" stroke-width="1.5" fill="none" opacity=".5" class="cinema-waves">
      <path d="M 0 360 q 20 -4 40 0 q 20 4 40 0 q 20 -4 40 0 q 20 4 40 0 q 20 -4 40 0 q 20 4 40 0 q 20 -4 40 0 q 20 4 40 0 q 20 -4 40 0 q 20 4 40 0"/>
      <path d="M 0 400 q 25 -4 50 0 q 25 4 50 0 q 25 -4 50 0 q 25 4 50 0 q 25 -4 50 0 q 25 4 50 0 q 25 -4 50 0 q 25 4 50 0"/>
      <path d="M 0 445 q 30 -4 60 0 q 30 4 60 0 q 30 -4 60 0 q 30 4 60 0 q 30 -4 60 0 q 30 4 60 0 q 30 -4 60 0"/>
    </g>
    <!-- cargo ship -->
    <g transform="translate(450 280)" class="cinema-ship">
      <!-- hull -->
      <path d="M -170 60 L -140 100 L 140 100 L 170 60 L 150 40 L -150 40 Z" fill="#dc2626"/>
      <path d="M -170 60 L 170 60" stroke="#fff" stroke-width="2" opacity=".5"/>
      <!-- deck / superstructure -->
      <rect x="80" y="-10" width="60" height="50" fill="#fff"/>
      <rect x="90" y="-30" width="40" height="20" fill="#fff"/>
      <rect x="100" y="-55" width="20" height="25" fill="#fff"/>
      <rect x="105" y="-75" width="10" height="20" fill="#dc2626"/>
      <!-- windows -->
      <g fill="#1e40af">
        <rect x="85" y="-5" width="8" height="6"/>
        <rect x="95" y="-5" width="8" height="6"/>
        <rect x="105" y="-5" width="8" height="6"/>
        <rect x="115" y="-5" width="8" height="6"/>
        <rect x="125" y="-5" width="8" height="6"/>
        <rect x="95" y="-25" width="8" height="6"/>
        <rect x="115" y="-25" width="8" height="6"/>
      </g>
      <!-- shipping containers stacked -->
      ${[0,1,2,3,4,5,6].map(i => `<rect x="${-155 + i*35}" y="0" width="32" height="35" fill="${['#1e40af','#dc2626','#0f172a','#dc2626','#1e40af','#ca8a04','#dc2626'][i]}" stroke="#fff" stroke-width="1"/>`).join('')}
      ${[0,1,2,3,4,5,6].map(i => `<rect x="${-155 + i*35}" y="-35" width="32" height="35" fill="${['#dc2626','#0f172a','#dc2626','#1e40af','#ca8a04','#dc2626','#0f172a'][i]}" stroke="#fff" stroke-width="1"/>`).join('')}
    </g>
    <!-- flock of birds -->
    <g stroke="#0a0a0a" fill="none" stroke-width="2" stroke-linecap="round" opacity=".7" class="cinema-birds">
      <path d="M 300 100 q 6 -6 12 0 q 6 -6 12 0" transform="translate(0 0)"/>
      <path d="M 350 130 q 5 -5 10 0 q 5 -5 10 0"/>
      <path d="M 280 140 q 5 -5 10 0 q 5 -5 10 0"/>
    </g>
  </svg>`
};

function renderCinema() {
  const stage = $('#cinemaStage');
  const phases = $('#cinemaPhases');
  const chapters = $('#cinemaChapters');
  if (!stage || !phases || !chapters) return;

  stage.innerHTML = cinemaPhases.map((p, i) => `
    <div class="cinema__scene ${i === 0 ? 'is-active' : ''}" data-index="${i}" aria-hidden="true">
      ${cinemaScenes[p.scene]}
    </div>
  `).join('');

  phases.innerHTML = cinemaPhases.map((p, i) => `
    <article class="cinema__phase ${i === 0 ? 'is-active' : ''}" data-index="${i}">
      <div class="cinema__phase-day">Day ${p.day}</div>
      <h3 class="cinema__phase-title">${p.title}</h3>
      <p class="cinema__phase-body">${p.narrative}</p>
    </article>
  `).join('');

  chapters.innerHTML = cinemaPhases.map((p, i) => `
    <button class="cinema__chapter" type="button" data-index="${i}" aria-label="Jump to Day ${p.day}: ${p.title}">
      <span class="cinema__chapter-dot"></span>
      <span class="cinema__chapter-label">${p.title.split(' ')[0]}</span>
    </button>
  `).join('');
}

function wireCinemaScroll() {
  const cinema = $('#cinema');
  if (!cinema) return;

  const scenes = $$('.cinema__scene', cinema);
  const phases = $$('.cinema__phase', cinema);
  const chapters = $$('.cinema__chapter', cinema);
  const progressBar = $('#cinemaProgressBar');
  const dayEl = $('#cinemaDayValue');
  const n = scenes.length;
  if (!n) return;

  let currentIdx = -1;
  let rafPending = false;

  const setActiveIdx = (idx) => {
    if (idx === currentIdx) return;
    currentIdx = idx;
    scenes.forEach((s, i) => s.classList.toggle('is-active', i === idx));
    phases.forEach((p, i) => p.classList.toggle('is-active', i === idx));
    chapters.forEach((c, i) => c.classList.toggle('is-active', i === idx));
  };

  const update = () => {
    rafPending = false;
    const rect = cinema.getBoundingClientRect();
    const vh = window.innerHeight;

    // Scrollable distance inside the pinned container.
    // Progress 0 → when pin first sticks (top of cinema hits top of viewport)
    // Progress 1 → when pin releases (bottom of cinema hits bottom of viewport)
    const scrollable = rect.height - vh;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / Math.max(1, scrollable)));

    const phaseFloat = progress * (n - 1);
    const idx = Math.round(phaseFloat);
    setActiveIdx(idx);

    // Smooth Day counter that interpolates between adjacent phases
    const lower = Math.floor(phaseFloat);
    const upper = Math.min(n - 1, lower + 1);
    const t = phaseFloat - lower;
    const interpDay = Math.round(cinemaPhases[lower].day + (cinemaPhases[upper].day - cinemaPhases[lower].day) * t);
    if (dayEl) dayEl.textContent = String(interpDay).padStart(3, '0');

    if (progressBar) progressBar.style.width = (progress * 100) + '%';
  };

  const onScroll = () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  // Clicking a chapter jumps the page to the corresponding scroll position
  chapters.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      const rect = cinema.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = rect.height - vh;
      const targetProgress = i / (n - 1);
      const currentTop = window.scrollY + rect.top;
      const targetY = currentTop + targetProgress * scrollable;
      window.scrollTo({ top: targetY, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });
}

/* Legacy fallback — static timeline for reduced-motion users.
   Kept in the DOM (hidden by default) so users with prefers-reduced-motion
   see readable content without the scroll choreography. */
const journeySteps = [
  { day: 1,   title: 'Plowing',       desc: 'Red soil of Guntur, rich in iron and potassium, is turned over to breathe. Farmers read the land by touch — crumbling a fistful to judge moisture.' },
  { day: 5,   title: 'Seeding',       desc: 'Certified seeds from last season\'s best pods are placed into shallow furrows. We pay farmers a 15% premium for using our seed stock.' },
  { day: 14,  title: 'Germination',   desc: 'A tap-root pushes down, two cotyledons reach up. Germination rate is one of our tracked quality KPIs — a strong stand means a strong harvest.' },
  { day: 28,  title: 'Transplanting', desc: 'Drip irrigation lines follow each row. We use half the water of flood irrigation, and the plants reward us with deeper root systems.' },
  { day: 55,  title: 'Flowering',     desc: 'Small white flowers self-pollinate within 48 hours. We require pollinator strips at field edges to help native bees.' },
  { day: 80,  title: 'Green fruit',   desc: 'Chillies emerge, bright and waxy green. We walk the rows weekly to remove damaged pods so plant energy goes into the survivors.' },
  { day: 110, title: 'Red harvest',   desc: 'Hand-picked at peak ripeness — only a human eye can judge the precise shade that signals peak capsaicin and colour.' },
  { day: 125, title: 'Sun drying',    desc: '14–21 days on bamboo platforms under the Andhra sun. Moisture drops from 78% to 10%. No artificial heat, no colour enhancers, no sulphur.' },
  { day: 147, title: 'Port',          desc: 'Graded, stemmed, lab-tested, and packed. From our warehouses, containers travel to Chennai, Mundra, or Nhava Sheva — bound for 42 countries.' }
];

const journeyIcons = {
  seed: `<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="14" rx="5" ry="7"/></svg>`
};

function renderJourney() {
  const wrap = $('#timelineSteps');
  if (!wrap) return;
  wrap.innerHTML = '';
  journeySteps.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-step';
    el.innerHTML = `
      <div class="timeline-step__content">
        <div class="timeline-step__day"><b>Day ${s.day}</b></div>
        <h3 class="timeline-step__title">${s.title}</h3>
        <p class="timeline-step__body">${s.desc}</p>
      </div>
      <div class="timeline-step__dot" aria-hidden="true"></div>
      <div class="timeline-step__visual" aria-hidden="true">${journeyIcons.seed}</div>
    `;
    wrap.appendChild(el);
  });
}

function wireJourneyScroll() {
  // Simple reveal-on-view for the reduced-motion fallback timeline
  const steps = $$('.timeline-step');
  if (!steps.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
  }, { threshold: 0.2 });
  steps.forEach(s => io.observe(s));
}

/* ================================================================
   6. CONTACT FORM → WHATSAPP
   ================================================================ */
function wireContactForm() {
  const form = $('#enquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name    = (data.get('name') || '').toString().trim();
    const phone   = (data.get('phone') || '').toString().trim();
    const company = (data.get('company') || '').toString().trim();
    const variety = (data.get('variety') || '').toString().trim();
    const volume  = (data.get('volume') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    if (!name || !phone) {
      form.querySelector('#f_name').focus();
      return;
    }

    const lines = [
      'Hello Vijaya Enterprises,',
      '',
      'I would like to request a quote.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
    ];
    if (company) lines.push(`Company: ${company}`);
    if (variety) lines.push(`Variety: ${variety}`);
    if (volume)  lines.push(`Volume / destination: ${volume}`);
    if (message) lines.push('', `Notes: ${message}`);
    lines.push('', 'Please share the quote, a sample lab report, and vessel availability.');

    const text = encodeURIComponent(lines.join('\n'));
    const waUrl = `https://wa.me/919392314373?text=${text}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

/* ================================================================
   7. NAV — mobile burger
   ================================================================ */
function wireNav() {
  const burger = $('.nav__burger');
  const links = $('.nav__links');
  if (!burger || !links) return;
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const sliderRoot = $('#slider');
  if (sliderRoot) new Slider(sliderRoot);

  renderVarieties();
  wireFilters();
  renderCinema();
  wireCinemaScroll();
  renderJourney();       // reduced-motion fallback
  wireJourneyScroll();   // reduced-motion fallback
  wireContactForm();
  wireNav();

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
});
