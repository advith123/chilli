# Image replacement guide

The site references **49 images** at clean, predictable paths. Until you drop in real photos, every missing image automatically falls back to `images/placeholder.svg` (handled by `script.js`) so the site looks intentional, not broken.

To replace a placeholder: drop a real `.jpg` (or `.png` / `.webp` if you update the `src` extension in the HTML) into the path listed below. **Recommended size: 1600×1000 for landscape, 1200×1500 for portraits, 1200×1200 for square gallery tiles.** Compress to under 200 KB each — TinyPNG or Squoosh are fine.

---

## `images/hero/`
| File | Used on | Description |
|---|---|---|
| `founder-portrait.jpg` | About | Dinesh Rao Balguri at a Warangal yard, portrait orientation, 1200×1500 |

## `images/team/`
| File | Used on | Description |
|---|---|---|
| `founder-dinesh.jpg` | Team (lead card) | Hero portrait of Dinesh, landscape, 1600×1000 |
| `procurement-head.jpg` | Team | Procurement head at the mandi |
| `quality-head.jpg` | Team | QC head inspecting a sample |
| `export-desk.jpg` | Team | Export documentation team at desk |
| `logistics-head.jpg` | Team | Logistics coordinator at warehouse |
| `trade-desk.jpg` | Team | International trade desk on a call |

## `images/varieties/`
| File | Used on | Description |
|---|---|---|
| `guntur-sannam.jpg` | Varieties | Guntur Sannam S4 — long slender deep-red pods |
| `teja-s17.jpg` | Varieties | Teja S17 — bright red shorter hot pods |
| `byadgi-kaddi.jpg` | Varieties | Byadgi Kaddi — wrinkled deep crimson pods |
| `kashmiri-deghi.jpg` | Varieties | Kashmiri Deghi — vibrant aromatic pods |
| `334-wonder-hot.jpg` | Varieties | 334 — smooth glossy red Telangana hybrid |
| `341-indo5.jpg` | Varieties | 341 — long glossy hotter Telangana hybrid |

## `images/lifecycle/` (Process page — the 15-step centerpiece)
| File | Step | Description |
|---|---|---|
| `01-plowing.jpg` | 1 | Soil preparation, plowing |
| `02-sowing.jpg` | 2 | Seeds being placed in the soil |
| `03-germination.jpg` | 3 | Sprout pushing through soil |
| `04-young-plant.jpg` | 4 | Seedling with first true leaves |
| `05-growing-plant.jpg` | 5 | Bushy growing chilli plant |
| `06-flowering.jpg` | 6 | White flowers blooming |
| `07-fruit-set.jpg` | 7 | Tiny green chilli nubs |
| `08-green-chilli.jpg` | 8 | Mature green chillies on plant |
| `09-red-ripening.jpg` | 9 | Bright red ripe chillies on plant |
| `10-plucking.jpg` | 10 | Hand plucking ripe red chillies |
| `11-gathering.jpg` | 11 | Basket of harvested chillies |
| `12-sun-drying.jpg` | 12 | Chillies spread on drying yard |
| `13-segregating.jpg` | 13 | Sorted dried chillies in baskets |
| `14-packing.jpg` | 14 | Packing into export-ready bags |
| `15-storage.jpg` | 15 | Stacked bags ready for shipment |

> **Tip:** the lifecycle reference image you supplied (the 15-tile poster) can be cropped into the 15 individual squares above — or you can shoot one new photo per step at your facility.

## `images/gallery/`
| File | Category | Description |
|---|---|---|
| `farm-01.jpg` | Farm (wide tile) | Wide view of farm during harvest |
| `farm-02.jpg` | Farm | Close-up ripe chillies on the plant |
| `farm-03.jpg` | Farm | Farmer inspecting pods |
| `drying-01.jpg` | Drying (tall tile) | Vast circular drying patterns under sun |
| `drying-02.jpg` | Drying | Worker raking on drying yard |
| `drying-03.jpg` | Drying | Close-up dried wrinkled chillies |
| `sorting-01.jpg` | Sorting | Hand-sorting on table |
| `sorting-02.jpg` | Sorting (wide) | Workers at sorting line |
| `sorting-03.jpg` | Sorting | Bowls of graded chillies |
| `packaging-01.jpg` | Packaging | 50 kg jute bags being filled |
| `packaging-02.jpg` | Packaging | Vacuum-sealed retail packs |
| `packaging-03.jpg` | Packaging | Stencilling shipping marks |
| `warehouse-01.jpg` | Warehouse (wide) | Stacked bags ready for dispatch |
| `warehouse-02.jpg` | Warehouse | Container being loaded |
| `warehouse-03.jpg` | Warehouse | Sealed export container |
| `team-01.jpg` | Team | Founder reviewing a sample lot |
| `team-02.jpg` | Team | Procurement at mandi auction |
| `team-03.jpg` | Team | Quality lab — moisture/ASTA testing |

## `images/blog/`
| File | Used on | Description |
|---|---|---|
| `post-best-varieties.jpg` | Blog index + article 1 | A range of chilli varieties laid out for comparison |
| `post-guntur-vs-byadgi.jpg` | Blog index + article 2 | Guntur Sannam and Byadgi side-by-side |
| `post-processing.jpg` | Blog index + article 3 | Worker on a sun-drying yard |

## Root images (used by social previews)
| File | Used on | Description |
|---|---|---|
| `images/og-cover.jpg` | All pages — Open Graph share | 1200×630 social-share image. Brand colours, headline "Vijaya Enterprises — Indian Dry Red Chilli Exporters." |
| `images/logo.svg` | JSON-LD schema reference | Already provided as `images/favicon.svg` — duplicate or replace with your finalised logo at `images/logo.svg` |
| `images/placeholder.svg` | Auto-fallback | Already shipped — leave as-is |
| `images/favicon.svg` | Browser tab icon | Already shipped — replace with your own mark if you have one |

---

## Bulk replacement workflow

1. Gather your real photos.
2. Resize/compress (TinyPNG, Squoosh.app, or `cwebp -q 80`).
3. Rename them to match the file names above exactly — the HTML and `src=` attributes already point at these names.
4. Drop into the matching folder under `images/`.
5. Refresh the site. Done.

If you want to use a different filename, just update the `src="…"` attribute on the matching `<img>` tag in the HTML.
