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

  list.forEach((v, i) => {
    const card = document.createElement('a');
    card.href = `#/variety/${v.slug}`;
    card.className = 'type-card';
    card.style.animationDelay = `${i * 50}ms`;
    card.setAttribute('aria-label', `${v.name} — ${v.tagline}`);
    const num = (varieties.indexOf(v) + 1).toString().padStart(2, '0');
    card.innerHTML = `
      <div class="type-card__visual" data-heat="${v.heat}">
        <span class="type-card__number">${num}</span>
        <span class="type-card__heat">${v.heatLabel}</span>
        <div class="type-card__chilli">${slideVisuals['chilli-single']}</div>
      </div>
      <div class="type-card__body">
        <div class="type-card__origin">${v.origin}</div>
        <h3 class="type-card__name">${v.name}</h3>
        <p class="type-card__desc">${v.desc}</p>
        <div class="type-card__foot">
          <span class="type-card__specs"><b>${v.shu}</b> SHU · <b>${v.asta}</b> ASTA</span>
          <span class="type-card__cta">Read →</span>
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
        <div class="detail__visual" data-heat="${v.heat}">
          <span class="detail__decor">${(varieties.indexOf(v) + 1).toString().padStart(2, '0')}</span>
          ${slideVisuals['chilli-single']}
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
    a.innerHTML = `
      <div class="type-card__visual">
        <span class="type-card__number">${(varieties.indexOf(r) + 1).toString().padStart(2, '0')}</span>
        <span class="type-card__heat">${r.heatLabel}</span>
        <div class="type-card__chilli">${slideVisuals['chilli-single']}</div>
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
}

function renderHome() {
  const home = $('#home-view');
  const detail = $('#detail-view');
  home.classList.add('view--active');
  home.setAttribute('aria-hidden', 'false');
  detail.classList.remove('view--active');
  detail.setAttribute('aria-hidden', 'true');
  detail.innerHTML = '';
}

function handleRoute() {
  const hash = location.hash;
  const m = hash.match(/^#\/variety\/(.+)$/);
  if (m) {
    renderDetail(m[1]);
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
   5. JOURNEY TIMELINE — scroll-driven, Day 1 → Day 147
   ================================================================ */
const journeySteps = [
  { day: 1,   title: 'The seed',       desc: 'A single seed from last season\'s best pods is sown in raised nursery beds. 1,200+ contract farmers across AP, Karnataka, and Kashmir begin the cycle together.', icon: 'seed' },
  { day: 28,  title: 'Transplanting',  desc: 'Four-week-old seedlings are transplanted into prepared fields. Drip irrigation keeps water use to half of flood-irrigated alternatives.', icon: 'sprout' },
  { day: 55,  title: 'First flower',   desc: 'White flowers bloom, self-pollinating within 48 hours. Weather-monitoring stations track temperature, humidity, and rainfall to predict yield.', icon: 'flower' },
  { day: 80,  title: 'Green fruit',    desc: 'Chillies emerge — bright green, tender, still building heat. Farmers walk the rows daily, removing damaged pods by hand.', icon: 'chilli-green' },
  { day: 110, title: 'Red harvest',    desc: 'Pods turn crimson and are hand-picked at peak ripeness. Only ripe fruit is accepted — immature pods are rejected in the field.', icon: 'chilli-red' },
  { day: 125, title: 'Sun drying',     desc: '14–21 days on raised bamboo platforms. Moisture drops from 78% to a stable 10%. No artificial dehydration, no colour enhancers.', icon: 'sun' },
  { day: 135, title: 'Grading',        desc: 'Manual and machine sorting into Grade A/B/C by size, colour, and defect count. Stems removed for EU and US-bound shipments.', icon: 'grade' },
  { day: 142, title: 'Lab testing',    desc: 'NABL-accredited lab tests every lot for aflatoxin, Sudan dye, moisture, ASTA colour, and Scoville. Reports accompany every container.', icon: 'lab' },
  { day: 147, title: 'Port',           desc: 'FCL and LCL shipments leave Chennai, Mundra, or Nhava Sheva. FOB, CIF, and DDP incoterms available. From seed to sea in 147 days.', icon: 'ship' }
];

const journeyIcons = {
  seed:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="14" rx="5" ry="7"/><path d="M12 7V3M9 5l3-2 3 2"/></svg>`,
  sprout:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-8"/><path d="M12 12c-4 0-6-2-6-6 4 0 6 2 6 6z"/><path d="M12 12c4 0 6-2 6-6-4 0-6 2-6 6z"/><path d="M4 20h16"/></svg>`,
  flower:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><path d="M12 9.5V5M12 14.5V19M9.5 12H5M14.5 12H19M10.2 10.2L7 7M13.8 13.8l3.2 3.2M13.8 10.2L17 7M10.2 13.8L7 17"/></svg>`,
  'chilli-green': `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 13 Q 9 9 15 11 Q 20 12 21 15 Q 18 17 12 16 Q 7 15 4 13 Z" opacity=".9"/><path d="M4 13 Q 2.5 11 2 9.5 Q 1.8 8.5 3 8.8 Q 4 9.8 4 13 Z" opacity=".95"/></svg>`,
  'chilli-red':   `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 13 Q 9 9 15 11 Q 20 12 21 15 Q 18 17 12 16 Q 7 15 4 13 Z"/><path d="M4 13 Q 2.5 11 2 9.5 Q 1.8 8.5 3 8.8 Q 4 9.8 4 13 Z"/></svg>`,
  sun:         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" fill="currentColor" opacity=".3"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>`,
  grade:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="12" height="6" rx="1"/><path d="M7 7h.01M7 17h.01"/></svg>`,
  lab:         `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3v6.5L4.5 17A2 2 0 0 0 6.2 20h11.6a2 2 0 0 0 1.7-3L15 9.5V3"/><path d="M8 3h8"/><path d="M7 14h10" stroke-dasharray="1 2"/></svg>`,
  ship:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l2 4h14l2-4"/><path d="M4 17l1-6h14l1 6"/><path d="M8 11V7h8v4"/><path d="M12 3v4"/></svg>`
};

function renderJourney() {
  const wrap = $('#timelineSteps');
  if (!wrap) return;
  wrap.innerHTML = '';
  journeySteps.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-step';
    el.dataset.index = i;
    el.innerHTML = `
      <div class="timeline-step__content">
        <div class="timeline-step__day"><b>Day ${s.day}</b></div>
        <h3 class="timeline-step__title">${s.title}</h3>
        <p class="timeline-step__body">${s.desc}</p>
      </div>
      <div class="timeline-step__dot" aria-hidden="true"></div>
      <div class="timeline-step__visual" aria-hidden="true">
        ${journeyIcons[s.icon] || journeyIcons.seed}
      </div>
    `;
    wrap.appendChild(el);
  });
}

function wireJourneyScroll() {
  const progress = $('#timelineProgress');
  const timeline = $('#timeline');
  const steps = $$('.timeline-step');
  if (!timeline || !progress || !steps.length) return;

  // Reveal each step as it enters view (staggered by the CSS transitions)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -15% 0px' });
  steps.forEach(s => io.observe(s));

  // Fill the vertical progress rail based on scroll position through the timeline
  const rail = $('.timeline__rail');
  const updateProgress = () => {
    if (!rail) return;
    const railRect = rail.getBoundingClientRect();
    const vh = window.innerHeight;
    // Progress = how far through the rail the viewport midpoint has travelled
    const viewportMid = vh * 0.5;
    const travelled = viewportMid - railRect.top;
    const pct = Math.max(0, Math.min(1, travelled / railRect.height));
    progress.style.height = `${pct * 100}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
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
  renderJourney();
  wireJourneyScroll();
  wireContactForm();
  wireNav();

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
});
