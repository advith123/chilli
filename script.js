/* =====================================================
   VIJAYA ENTERPRISES — SHARED SCRIPT
   Loaded on every page. Each feature is initialized
   only if its target element exists on the page.
   ===================================================== */

/* =================== MOBILE NAV TOGGLE =================== */
(function navToggle() {
  const btn = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (!btn || !links) return;
  btn.addEventListener("click", () => {
    const open = links.dataset.open === "true";
    links.dataset.open = open ? "false" : "true";
    btn.setAttribute("aria-expanded", open ? "false" : "true");
  });
  // Close on link click (mobile)
  links.addEventListener("click", e => {
    if (e.target.tagName === "A" && window.innerWidth <= 920) {
      links.dataset.open = "false";
      btn.setAttribute("aria-expanded", "false");
    }
  });
})();

/* =================== IMAGE FALLBACK =================== */
/* Any <img> that fails to load swaps to the placeholder.
   Lets the site render cleanly before client drops in real photos. */
document.addEventListener("error", e => {
  const t = e.target;
  if (t && t.tagName === "IMG" && !t.dataset.fallbackApplied) {
    t.dataset.fallbackApplied = "1";
    t.src = "images/placeholder.svg";
  }
}, true);

/* =================== VARIETIES (Home + Varieties pages) =================== */
const varieties = [
  {
    name: "Guntur Sannam S4",
    origin: "Guntur · Andhra Pradesh",
    icon: "🌶️",
    heat: "hot",
    heatLabel: "Hot",
    color: "#c7261c",
    shu: "35,000 – 40,000",
    asta: "32 – 38",
    desc: "India's flagship export chilli. Pungent, deep red, long slender pods. The workhorse of curry powders and commercial sauces worldwide.",
    image: "images/varieties/guntur-s4.jpeg"
  },
  {
    name: "Teja S17",
    origin: "Khammam · Telangana",
    icon: "🌶️",
    heat: "extreme",
    heatLabel: "Extreme",
    color: "#d83818",
    shu: "75,000 – 1,00,000",
    asta: "68 – 82",
    image: "images/varieties/S17-Teja.jpg",
    desc: "The fiery export workhorse. Bright red, high capsaicin, preferred by Chinese and Korean sauce makers. A volume favourite for Asia-bound containers."
  },
  {
    name: "341 (Indo-5)",
    origin: "Warangal · Telangana",
    icon: "🌶️",
    heat: "hot",
    heatLabel: "Hot",
    color: "#a81e18",
    shu: "40,000 – 55,000",
    asta: "45 – 60",
    desc: "Long, glossy pods with a sharper bite than 334. Trades briskly through Warangal and Khammam yards, favoured by South-East Asian sauce makers."
  }
];

(function renderVarieties() {
  const grid = document.getElementById("grid");
  const filters = document.getElementById("filters");
  if (!grid) return;

  function render(filter = "all") {
    grid.innerHTML = "";
    const filtered = filter === "all" ? varieties : varieties.filter(v => v.heat === filter);
    filtered.forEach((v, i) => {
      const card = document.createElement("article");
      card.className = "card";
      card.setAttribute("itemscope", "");
      card.setAttribute("itemtype", "https://schema.org/Product");
      card.style.setProperty("--heat", v.color);
      card.style.animationDelay = `${i * 60}ms`;
      card.innerHTML = `
      <meta itemprop="brand" content="Vijaya Enterprises" />
      <meta itemprop="category" content="Dry Red Chilli" />
      <div class="card__top">
        <span class="card__heat">${v.heatLabel}</span>
      </div>
      <h3 class="card__name" itemprop="name">${v.name}</h3>
      <div class="card__origin" itemprop="countryOfOrigin">${v.origin}</div>
      <p class="card__desc" itemprop="description">${v.desc}</p>
      <div class="card__meta">
        <div><span>Scoville</span><b>${v.shu}</b></div>
        <div><span>ASTA color</span><b>${v.asta}</b></div>
      </div>
    `;
      grid.appendChild(card);
    });
    const allChip = document.querySelector('[data-filter="all"] small');
    if (allChip) allChip.textContent = varieties.length;
  }

  if (filters) {
    filters.addEventListener("click", e => {
      if (!e.target.matches(".chip")) return;
      document.querySelectorAll(".chip").forEach(c => c.classList.remove("chip--active"));
      e.target.classList.add("chip--active");
      render(e.target.dataset.filter);
    });
  }
  render();
})();

/* =================== QUOTE FORM =================== */
function handleQuote(e) {
  e.preventDefault();
  const status = document.getElementById("formStatus");
  const data = new FormData(e.target);
  const company = data.get("company") || "buyer";
  const variety = data.get("variety") || "your selected variety";
  const volume = data.get("volume") || "—";
  const email = data.get("email") || "your inbox";
  if (status) {
    status.textContent = `✓ Thank you, ${company}. Enquiry logged for ${volume} MT of ${variety}. Our export desk will reply at ${email} within 24 working hours.`;
  }
  // Optional: also open WhatsApp pre-filled
  const phone = "918798793211";
  const message = encodeURIComponent(
    `Hello Vijaya Enterprises, I'm ${company} from ${data.get("country") || "—"}. I'd like to enquire about ${volume} MT of ${variety}. Please reach me at ${email}.`
  );
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener");
  e.target.reset();
  return false;
}

/* =================== GALLERY LIGHTBOX =================== */
(function lightbox() {
  const tiles = document.querySelectorAll(".gtile");
  if (!tiles.length) return;
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `<button class="lightbox__close" aria-label="Close">×</button><img alt="" />`;
  document.body.appendChild(lb);
  const lbImg = lb.querySelector("img");
  const close = () => lb.dataset.open = "false";
  tiles.forEach(t => {
    t.addEventListener("click", () => {
      const img = t.querySelector("img");
      if (!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt || "";
      lb.dataset.open = "true";
    });
  });
  lb.addEventListener("click", e => {
    if (e.target === lb || e.target.classList.contains("lightbox__close")) close();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") close();
  });
})();

/* =================== GALLERY FILTERS =================== */
(function galleryFilters() {
  const filters = document.querySelector(".gallery__filters");
  const tiles = document.querySelectorAll(".gtile[data-cat]");
  if (!filters || !tiles.length) return;
  filters.addEventListener("click", e => {
    if (!e.target.matches(".chip")) return;
    document.querySelectorAll(".gallery__filters .chip").forEach(c => c.classList.remove("chip--active"));
    e.target.classList.add("chip--active");
    const cat = e.target.dataset.filter;
    tiles.forEach(t => {
      t.style.display = (cat === "all" || t.dataset.cat === cat) ? "" : "none";
    });
  });
})();

/* =================== IN-VIEW REVEAL =================== */
(function reveal() {
  const targets = document.querySelectorAll(
    ".section-head, .timeline li, .country, .exports__left, .exports__right, .lifestep, .pillar, .member, .variety, .post"
  );
  if (!targets.length) return;
  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeUp .8s cubic-bezier(.2,.8,.2,1) forwards";
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    io.observe(el);
  });
})();
