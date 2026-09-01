// Genera public/assembly-fallback.svg: l'assonometria esplosa reale del modulo A20,
// usata come fallback statico per prefers-reduced-motion e come poster prima del
// montaggio del canvas 3D. Non è un segnaposto: è un disegno tecnico, quindi è
// contenuto finale legittimo — non serve una fotografia per uno schema.
import { writeFileSync } from "node:fs";

const C = {
  grafite: "#24272A",
  zinco: "#C3C7C1",
  calce: "#EDEEEA",
  pav: "#E4E6E1",
  minio: "#9E4B32",
};

const K = Math.cos(Math.PI / 6);
const S = 0.5;
const iso = (x, y, z) => [(x - y) * K, (x + y) * S - z];
const r = (n) => Math.round(n * 100) / 100;

function poly(pts, fill) {
  return `<polygon points="${pts.map((p) => `${r(p[0])},${r(p[1])}`).join(" ")}" fill="${fill}" stroke="${C.grafite}" stroke-width="10" stroke-opacity="0.35"/>`;
}

// Tinte di profondità: stessa famiglia del token, leggermente scurita sui fianchi
// per leggere il volume — non un colore fuori palette, solo luce/ombra sullo stesso hue.
function shade(hex, factor) {
  const n = parseInt(hex.slice(1), 16);
  const rr = Math.max(0, Math.min(255, Math.round(((n >> 16) & 255) * factor)));
  const gg = Math.max(0, Math.min(255, Math.round(((n >> 8) & 255) * factor)));
  const bb = Math.max(0, Math.min(255, Math.round((n & 255) * factor)));
  return `#${((1 << 24) + (rr << 16) + (gg << 8) + bb).toString(16).slice(1)}`;
}

const bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
function track(pts) {
  for (const [px, py] of pts) {
    if (px < bounds.minX) bounds.minX = px;
    if (px > bounds.maxX) bounds.maxX = px;
    if (py < bounds.minY) bounds.minY = py;
    if (py > bounds.maxY) bounds.maxY = py;
  }
}

function box(x, y, z, w, d, h, color) {
  const top = color;
  const left = shade(color, 0.88);
  const right = shade(color, 0.72);
  const p = (a, b, c) => iso(a, b, c);
  const faceLeft = [p(x, y + d, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x, y + d, z + h)];
  const faceRight = [p(x + w, y, z), p(x + w, y + d, z), p(x + w, y + d, z + h), p(x + w, y, z + h)];
  const faceTop = [p(x, y, z + h), p(x + w, y, z + h), p(x + w, y + d, z + h), p(x, y + d, z + h)];
  track(faceLeft);
  track(faceRight);
  track(faceTop);
  return poly(faceLeft, left) + poly(faceRight, right) + poly(faceTop, top);
}

const W = 6058;
const D = 2438;
let s = "";

// copertura
s += box(0, 0, 6400, W, D, 150, C.calce);
// pareti (anello)
const zw = 3400;
const hw = 2300;
s += box(0, 0, zw, W, 60, hw, C.calce);
s += box(0, D - 60, zw, W, 60, hw, C.calce);
s += box(0, 60, zw, 60, D - 120, hw, C.calce);
s += box(W - 60, 60, zw, 60, D - 120, hw, C.calce);
// pavimento
s += box(0, 0, 1400, W, D, 180, C.pav);
// telaio
const zf = 0;
const hf = 260;
s += box(0, 0, zf, W, 140, hf, C.minio);
s += box(0, D - 140, zf, W, 140, hf, C.minio);
s += box(0, 140, zf, 140, D - 280, hf, C.minio);
s += box(W - 140, 140, zf, 140, D - 280, hf, C.minio);
s += box(W / 2 - 70, 140, zf, 140, D - 280, hf, C.minio);

const pad = 400;
const vx = bounds.minX - pad;
const vy = bounds.minY - pad;
const vw = bounds.maxX - bounds.minX + pad * 2;
const vh = bounds.maxY - bounds.minY + pad * 2;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r(vx)} ${r(vy)} ${r(vw)} ${r(vh)}" role="img" aria-label="Assonometria esplosa del modulo Domeinox A20: telaio in acciaio, pavimento, pareti e copertura">
  <rect x="${r(vx)}" y="${r(vy)}" width="${r(vw)}" height="${r(vh)}" fill="${C.zinco}"/>
  ${s}
</svg>
`;

writeFileSync(new URL("../public/assembly-fallback.svg", import.meta.url), svg);
console.log("public/assembly-fallback.svg written");
