// Genera rendering isometrici reali (non segnaposto) per hero, famiglie di prodotto
// e sequenza di produzione — nessuna fotografia esiste ancora, ma un disegno tecnico
// coerente con l'identità "studio di architettura" del brief è contenuto legittimo,
// non un placeholder. Stessa palette a 6 token, stessa proiezione isometrica già
// usata per l'assonometria esplosa in home.
import { writeFileSync, mkdirSync } from "node:fs";

const C = {
  grafite: "#24272A",
  zinco: "#C3C7C1",
  calce: "#EDEEEA",
  pav: "#E4E6E1",
  genziana: "#16558F",
  minio: "#9E4B32",
};

const K = Math.cos(Math.PI / 6);
const S = 0.5;
const iso = (x, y, z) => [(x - y) * K, (x + y) * S - z];
const r = (n) => Math.round(n * 100) / 100;

function shade(hex, factor) {
  const n = parseInt(hex.slice(1), 16);
  const rr = Math.max(0, Math.min(255, Math.round(((n >> 16) & 255) * factor)));
  const gg = Math.max(0, Math.min(255, Math.round(((n >> 8) & 255) * factor)));
  const bb = Math.max(0, Math.min(255, Math.round((n & 255) * factor)));
  return `#${((1 << 24) + (rr << 16) + (gg << 8) + bb).toString(16).slice(1)}`;
}

function poly(pts, fill, opts = {}) {
  const stroke = opts.stroke ?? C.grafite;
  const sw = opts.sw ?? 10;
  const so = opts.so ?? 0.35;
  return `<polygon points="${pts.map((p) => `${r(p[0])},${r(p[1])}`).join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-opacity="${so}"/>`;
}

class Scene {
  constructor() {
    this.s = "";
    this.bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  }
  track(pts) {
    for (const [px, py] of pts) {
      if (px < this.bounds.minX) this.bounds.minX = px;
      if (px > this.bounds.maxX) this.bounds.maxX = px;
      if (py < this.bounds.minY) this.bounds.minY = py;
      if (py > this.bounds.maxY) this.bounds.maxY = py;
    }
  }
  box(x, y, z, w, d, h, color, opts = {}) {
    const p = (a, b, c) => iso(a, b, c);
    const top = opts.topColor ?? color;
    const left = shade(color, 0.86);
    const right = shade(color, 0.7);
    const faceLeft = [p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)];
    const faceRight = [p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)];
    const faceTop = [p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)];
    this.track(faceLeft);
    this.track(faceRight);
    this.track(faceTop);
    this.s += poly(faceLeft, left) + poly(faceRight, right) + poly(faceTop, top);
  }
  // Finestra/porta come quad piatto appoggiato sulla faccia "right" (fianco lungo, y=D).
  panelOnRightFace(x, yFront, z, w, h, fill, opts = {}) {
    const eps = 4; // scostamento minimo per evitare z-fighting col muro
    const p = (a, b, c) => iso(a, b + eps, c);
    const pts = [p(x, yFront, z), p(x + w, yFront, z), p(x + w, yFront, z + h), p(x, yFront, z + h)];
    this.s += poly(pts, fill, { stroke: opts.stroke ?? C.grafite, sw: opts.sw ?? 8, so: 0.6 });
  }
  panelOnFrontFace(xRight, y, z, d, h, fill, opts = {}) {
    const eps = 4;
    const p = (a, b, c) => iso(a + eps, b, c);
    const pts = [p(xRight, y, z), p(xRight, y + d, z), p(xRight, y + d, z + h), p(xRight, y, z + h)];
    this.s += poly(pts, fill, { stroke: opts.stroke ?? C.grafite, sw: opts.sw ?? 8, so: 0.6 });
  }
  toSvg(bg, padRatio = 0.08, label) {
    const w = this.bounds.maxX - this.bounds.minX;
    const h = this.bounds.maxY - this.bounds.minY;
    const pad = Math.max(w, h) * padRatio;
    const vx = this.bounds.minX - pad;
    const vy = this.bounds.minY - pad;
    const vw = w + pad * 2;
    const vh = h + pad * 2;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r(vx)} ${r(vy)} ${r(vw)} ${r(vh)}" role="img"${label ? ` aria-label="${label}"` : ""}>
  <rect x="${r(vx)}" y="${r(vy)}" width="${r(vw)}" height="${r(vh)}" fill="${bg}"/>
  ${this.s}
</svg>
`;
  }
}

const MODULE = { w: 6058, d: 2438, h: 2591 };

// --- Un modulo chiuso, con finestre/porta sulla faccia lunga (fianco) ---
function moduleScene({ windows = [], door = null, frameAccent = true } = {}) {
  const sc = new Scene();
  const { w, d, h } = MODULE;
  sc.box(0, 0, 0, w, d, h, C.calce);
  if (frameAccent) {
    // zoccolo telaio a vista: fascia piatta sulla faccia, non un box 3D (eviterebbe
    // l'occlusione corretta e la sua "faccia superiore" dipingerebbe sopra le pareti).
    sc.panelOnRightFace(0, d, 0, w, 180, C.minio, { stroke: C.grafite });
  }
  for (const win of windows) {
    sc.panelOnRightFace(win.x, d, 900, win.w, 1100, C.zinco, { stroke: C.grafite });
  }
  if (door) {
    sc.panelOnRightFace(door.x, d, 180, door.w ?? 900, h - 180 - 260, shade(C.calce, 0.92), { stroke: C.grafite });
  }
  return sc;
}

// --- Testata corta del modulo (fronte) — con una finestra e la porta se richiesto ---
function endScene({ door = false, window = false } = {}) {
  const sc = new Scene();
  const { d, h } = MODULE;
  sc.box(0, 0, 0, 260, d, h, C.calce);
  sc.panelOnFrontFace(260, 0, 0, d, 180, C.minio, { stroke: C.grafite });
  if (door) sc.panelOnFrontFace(260, d * 0.28, 180, d * 0.44, h - 180 - 260, shade(C.calce, 0.92), { stroke: C.grafite });
  if (window) sc.panelOnFrontFace(260, d * 0.62, 900, d * 0.28, 1100, C.zinco, { stroke: C.grafite });
  return sc;
}

mkdirSync(new URL("../public/renders/", import.meta.url), { recursive: true });

function write(name, svg) {
  writeFileSync(new URL(`../public/renders/${name}.svg`, import.meta.url), svg);
  console.log("public/renders/" + name + ".svg");
}

// Hero — fianco, modulo su un piano/suolo semplice, nessuna finzione fotografica.
{
  const sc = moduleScene({
    windows: [{ x: 2200, w: 1400 }, { x: 4000, w: 1400 }],
    door: { x: 500, w: 900 },
  });
  // piano d'appoggio
  const groundPts = [iso(-1200, -800, 0), iso(MODULE.w + 1200, -800, 0), iso(MODULE.w + 1200, MODULE.d + 1200, 0), iso(-1200, MODULE.d + 1200, 0)];
  sc.track(groundPts);
  sc.s = poly(groundPts, C.pav, { stroke: "none" }) + sc.s;
  write("hero-fianco", sc.toSvg(C.zinco, 0.05, "Domeinox A20 module, isometric rendering"));
}

const FAMILIES = {
  offices: { windows: [{ x: 2400, w: 1400 }, { x: 4200, w: 1400 }], door: { x: 500, w: 900 }, endWindow: true, endDoor: false },
  housing: { windows: [{ x: 2000, w: 1600 }], door: { x: 4400, w: 900 }, endWindow: true, endDoor: false },
  sanitary: { windows: [{ x: 700, w: 700 }, { x: 2100, w: 700 }, { x: 3500, w: 700 }, { x: 4900, w: 700 }], door: null, endWindow: false, endDoor: true },
  special: { windows: [{ x: 400, w: 1400 }, { x: 4200, w: 1400 }], door: { x: 2400, w: 900 }, endWindow: true, endDoor: false },
  hospitality: { windows: [{ x: 1600, w: 2400 }], door: { x: 4600, w: 900 }, endWindow: true, endDoor: false },
};

for (const [family, cfg] of Object.entries(FAMILIES)) {
  const fianco = moduleScene({ windows: cfg.windows, door: cfg.door });
  write(`${family}-fianco`, fianco.toSvg(C.zinco, 0.1, `Domeinox ${family} module, side elevation`));

  const fronte = endScene({ door: cfg.endDoor, window: cfg.endWindow });
  write(`${family}-fronte`, fronte.toSvg(C.zinco, 0.12, `Domeinox ${family} module, end elevation`));
}

// --- Sequenza di produzione: icone tecniche piatte (linea), non finte fotografie ---
function stepIcon(draw, label) {
  const vb = 1000;
  const body = draw();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vb} ${r(vb / (6058 / 2591))}" role="img" aria-label="${label}">
  <rect x="0" y="0" width="${vb}" height="${r(vb / (6058 / 2591))}" fill="${C.calce}"/>
  ${body}
</svg>
`;
}

const stroke = (extra = "") => `stroke="${C.grafite}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}`;

write(
  "produzione-cutting",
  stepIcon(
    () => `
    <line x1="120" y1="330" x2="520" y2="60" ${stroke()}/>
    <line x1="60" y1="120" x2="460" y2="330" ${stroke()}/>
    <circle cx="330" cy="200" r="14" fill="${C.minio}"/>
    <rect x="560" y="90" width="340" height="230" fill="${C.pav}" stroke="${C.grafite}" stroke-width="10"/>
    <line x1="600" y1="140" x2="860" y2="140" ${stroke()}/>
    <line x1="600" y1="200" x2="860" y2="200" ${stroke()}/>
    <line x1="600" y1="260" x2="860" y2="260" ${stroke()}/>
  `,
    "Cutting and shaping — steel profiles",
  ),
);

write(
  "produzione-welding",
  stepIcon(
    () => `
    <rect x="150" y="230" width="600" height="90" fill="${C.pav}" stroke="${C.grafite}" stroke-width="10"/>
    <line x1="620" y1="230" x2="800" y2="70" ${stroke()}/>
    <line x1="800" y1="70" x2="860" y2="40" ${stroke()}/>
    <circle cx="640" cy="220" r="22" fill="${C.minio}"/>
    <path d="M600 150 L620 190" stroke="${C.genziana}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M650 140 L655 185" stroke="${C.genziana}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M695 160 L670 195" stroke="${C.genziana}" stroke-width="6" fill="none" stroke-linecap="round"/>
  `,
    "Welding and treatment",
  ),
);

write(
  "produzione-insulation",
  stepIcon(
    () => `
    <rect x="140" y="90" width="260" height="260" fill="${C.calce}" stroke="${C.grafite}" stroke-width="10"/>
    <rect x="430" y="90" width="260" height="260" fill="${C.zinco}" stroke="${C.grafite}" stroke-width="10"/>
    <rect x="720" y="90" width="150" height="260" fill="${C.pav}" stroke="${C.grafite}" stroke-width="10"/>
    <line x1="140" y1="150" x2="400" y2="150" ${stroke("stroke-dasharray=\"14 14\"")}/>
    <line x1="140" y1="220" x2="400" y2="220" ${stroke("stroke-dasharray=\"14 14\"")}/>
    <line x1="140" y1="290" x2="400" y2="290" ${stroke("stroke-dasharray=\"14 14\"")}/>
  `,
    "Insulation and cladding — sandwich panels",
  ),
);

write(
  "produzione-systems",
  stepIcon(
    () => `
    <rect x="150" y="70" width="700" height="280" fill="none" stroke="${C.grafite}" stroke-width="8" stroke-opacity="0.3"/>
    <path d="M200 350 V220 H420 V120" ${stroke()}/>
    <path d="M500 350 V180 H700 V90" ${stroke()}/>
    <circle cx="420" cy="120" r="16" fill="${C.genziana}"/>
    <circle cx="700" cy="90" r="16" fill="${C.genziana}"/>
    <circle cx="200" cy="350" r="10" fill="${C.minio}"/>
    <circle cx="500" cy="350" r="10" fill="${C.minio}"/>
  `,
    "Electrical and plumbing systems",
  ),
);

write(
  "produzione-finishing",
  stepIcon(
    () => `
    <rect x="180" y="70" width="640" height="280" fill="${C.calce}" stroke="${C.grafite}" stroke-width="10"/>
    <rect x="230" y="120" width="220" height="180" fill="none" stroke="${C.genziana}" stroke-width="10"/>
    <line x1="230" y1="210" x2="450" y2="210" stroke="${C.genziana}" stroke-width="8"/>
    <path d="M540 260 L610 320 L780 130" stroke="${C.minio}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  `,
    "Finishing and functional testing",
  ),
);

write(
  "produzione-loading",
  stepIcon(
    () => `
    <rect x="120" y="150" width="500" height="150" fill="${C.calce}" stroke="${C.grafite}" stroke-width="10"/>
    <rect x="620" y="230" width="160" height="70" fill="${C.zinco}" stroke="${C.grafite}" stroke-width="10"/>
    <circle cx="260" cy="330" r="30" fill="${C.grafite}"/>
    <circle cx="480" cy="330" r="30" fill="${C.grafite}"/>
    <circle cx="700" cy="330" r="26" fill="${C.grafite}"/>
    <line x1="120" y1="360" x2="860" y2="360" ${stroke()}/>
  `,
    "Loading onto the trailer",
  ),
);

console.log("done");
