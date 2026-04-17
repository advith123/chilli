/* =================== MIRCHI VARIETIES =================== */
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
    desc: "India's flagship export chilli. Pungent, deep red, long slender pods. The workhorse of curry powders and commercial sauces worldwide."
  },
  {
    name: "Byadgi Kaddi",
    origin: "Haveri · Karnataka",
    icon: "🔴",
    heat: "mild",
    heatLabel: "Mild",
    color: "#8a1410",
    shu: "8,000 – 15,000",
    asta: "82 – 160",
    desc: "Deep crimson and wrinkled, prized for color over heat. The secret behind authentic South Indian sambars and used by oleoresin manufacturers globally."
  },
  {
    name: "Kashmiri Deghi Mirch",
    origin: "Kashmir Valley",
    icon: "🟥",
    heat: "mild",
    heatLabel: "Mild",
    color: "#b83328",
    shu: "1,000 – 2,000",
    asta: "100 – 130",
    desc: "Gentle, vibrant, and aromatic. Gives tandoori dishes and biryanis their signature red without the burn. A star in premium retail packs."
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
    desc: "The fiery export workhorse. Bright red, high capsaicin, preferred by Chinese and Korean sauce makers. 40% of our Asia-bound volume."
  },
  {
    name: "Bhut Jolokia",
    origin: "Assam · Nagaland",
    icon: "👻",
    heat: "extreme",
    heatLabel: "Extreme",
    color: "#6a0d0a",
    shu: "8,55,000 – 10,41,427",
    asta: "— ",
    desc: "The Ghost Pepper. Once the world's hottest. GI-tagged, rare, and sold to artisanal hot-sauce brands and pharmaceutical research buyers."
  },
  {
    name: "Reshampatti",
    origin: "Saurashtra · Gujarat",
    icon: "🌶️",
    heat: "medium",
    heatLabel: "Medium",
    color: "#c7261c",
    shu: "30,000 – 35,000",
    asta: "40 – 50",
    desc: "Thick-skinned, balanced in heat and color. The backbone of North Indian and Gujarati home-style masalas, pickle makers' top pick."
  },
  {
    name: "Ramnad Mundu",
    origin: "Ramanathapuram · Tamil Nadu",
    icon: "🔴",
    heat: "medium",
    heatLabel: "Medium",
    color: "#a81e18",
    shu: "25,000 – 30,000",
    asta: "45 – 55",
    desc: "Round, stubby pods with a Chettinad heritage. Earthy flavor, moderate heat, highly valued in Sri Lankan and Malaysian kitchens."
  },
  {
    name: "Sankeshwari",
    origin: "Belgaum · Karnataka",
    icon: "🟥",
    heat: "medium",
    heatLabel: "Medium",
    color: "#c23322",
    shu: "20,000 – 25,000",
    asta: "50 – 60",
    desc: "Long, crinkled, and vibrantly red. A Maharashtrian Kolhapuri staple — used for the fiery tambda rassa and kanda lasoon masala."
  },
  {
    name: "Jwala",
    origin: "Mehsana · Gujarat",
    icon: "🔥",
    heat: "hot",
    heatLabel: "Hot",
    color: "#d83818",
    shu: "20,000 – 30,000",
    asta: "30 – 42",
    desc: "Thin, wavy, and fiery. Commonly exported in pickling grades and increasingly popular with Middle Eastern harissa producers."
  },
  {
    name: "Ellachipur Sannam",
    origin: "Amravati · Maharashtra",
    icon: "🌶️",
    heat: "hot",
    heatLabel: "Hot",
    color: "#c7261c",
    shu: "28,000 – 35,000",
    asta: "35 – 45",
    desc: "Closely related to Guntur Sannam with a sharper finish. Favored in East African and Bangladeshi markets for curry blends."
  },
  {
    name: "Dhani (Bird's Eye)",
    origin: "Manipur · Mizoram",
    icon: "🌶️",
    heat: "extreme",
    heatLabel: "Extreme",
    color: "#8a1410",
    shu: "1,00,000 – 2,25,000",
    asta: "— ",
    desc: "Tiny, torpedo-shaped, and explosive. The Thai and Vietnamese hot-sauce scene runs on these. Hand-picked, small-volume, premium-priced."
  }
];

/* =================== RENDER =================== */
const grid = document.getElementById("grid");
const filters = document.getElementById("filters");

function render(filter = "all") {
  grid.innerHTML = "";
  const filtered = filter === "all" ? varieties : varieties.filter(v => v.heat === filter);

  filtered.forEach((v, i) => {
    const card = document.createElement("article");
    card.className = "card";
    card.style.setProperty("--heat", v.color);
    card.style.animationDelay = `${i * 60}ms`;
    card.innerHTML = `
      <div class="card__top">
        <div class="card__icon">${v.icon}</div>
        <span class="card__heat">${v.heatLabel}</span>
      </div>
      <h3 class="card__name">${v.name}</h3>
      <div class="card__origin">${v.origin}</div>
      <p class="card__desc">${v.desc}</p>
      <div class="card__meta">
        <div><span>Scoville</span><b>${v.shu}</b></div>
        <div><span>ASTA color</span><b>${v.asta}</b></div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Update "All" chip count
  const allChip = document.querySelector('[data-filter="all"] small');
  if (allChip) allChip.textContent = varieties.length;
}

/* =================== FILTERS =================== */
filters.addEventListener("click", e => {
  if (!e.target.matches(".chip")) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("chip--active"));
  e.target.classList.add("chip--active");
  render(e.target.dataset.filter);
});

/* =================== QUOTE FORM =================== */
function handleQuote(e) {
  e.preventDefault();
  const status = document.getElementById("formStatus");
  const data = new FormData(e.target);
  status.textContent = `✓ Thanks, ${data.get("company")}. We've logged your enquiry for ${data.get("volume") || "—"} MT of ${data.get("variety")}. Expect a reply at ${data.get("email")} within 24 hours.`;
  e.target.reset();
  return false;
}

/* =================== INIT =================== */
render();

/* =================== IN-VIEW REVEAL =================== */
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeUp .8s cubic-bezier(.2,.8,.2,1) forwards";
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".section-head, .timeline li, .country, .exports__left, .exports__right")
  .forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    io.observe(el);
  });
