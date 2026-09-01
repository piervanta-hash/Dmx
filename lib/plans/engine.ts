/**
 * Motore delle planimetrie — porting pulito e tipizzato del motore SVG di
 * domeinox-tavole-tecniche.html. Riceve un PlanConfig (dati geometrici) e produce
 * Shape[] (forme da disegnare): la logica di disegno non sa nulla di React, i dati
 * dei modelli non sanno nulla di come vengono disegnati.
 */

import { PALETTE } from '@/lib/design-tokens';
import type { PlanConfig, PlanDoor, PlanFixture, PlanWindow } from './types';
import type { DimensionGroup, LineShape, Shape, TextShape } from './shapes';
import { round as r } from './shapes';

const WALL_T = 60;

function rect(x: number, y: number, w: number, h: number, fill: string, stroke?: string, strokeWidth?: number): Shape {
  return { kind: 'rect', x: r(x), y: r(y), w: r(w), h: r(h), fill, stroke, strokeWidth };
}

function line(x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number): LineShape {
  return { kind: 'line', x1: r(x1), y1: r(y1), x2: r(x2), y2: r(y2), stroke, strokeWidth };
}

function circ(cx: number, cy: number, radius: number, fill: string | undefined, stroke: string, strokeWidth: number): Shape {
  return { kind: 'circle', cx: r(cx), cy: r(cy), r: r(radius), fill, stroke, strokeWidth };
}

function ell(cx: number, cy: number, rx: number, ry: number, fill: string | undefined, stroke: string, strokeWidth: number): Shape {
  return { kind: 'ellipse', cx: r(cx), cy: r(cy), rx: r(rx), ry: r(ry), fill, stroke, strokeWidth };
}

function txt(
  x: number,
  y: number,
  text: string,
  opts: { fill?: string; size?: number; weight?: number; anchor?: 'start' | 'middle' | 'end'; rotate?: number } = {},
): TextShape {
  return {
    kind: 'text',
    x: r(x),
    y: r(y),
    text,
    fill: opts.fill ?? PALETTE.grafite,
    size: opts.size ?? 135,
    weight: opts.weight ?? 400,
    anchor: opts.anchor ?? 'middle',
    rotate: opts.rotate,
  };
}

/** Quota: due tratti di richiamo, la linea di quota, due trattini terminali, l'etichetta. */
function dim(x1: number, y1: number, x2: number, y2: number, label: string, offset: number): DimensionGroup {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  const nx = -dy / length;
  const ny = dx / length;
  const ax = x1 + nx * offset;
  const ay = y1 + ny * offset;
  const bx = x2 + nx * offset;
  const by = y2 + ny * offset;

  const lines: DimensionGroup['lines'] = [
    line(x1, y1, ax + nx * 90, ay + ny * 90, PALETTE.genziana, 9),
    line(x2, y2, bx + nx * 90, by + ny * 90, PALETTE.genziana, 9),
    line(ax, ay, bx, by, PALETTE.genziana, 11),
  ];

  const tick = 70;
  const ux = dx / length;
  const uy = dy / length;
  lines.push(
    line(ax - ux * tick - nx * tick, ay - uy * tick - ny * tick, ax + ux * tick + nx * tick, ay + uy * tick + ny * tick, PALETTE.genziana, 11),
  );
  lines.push(
    line(bx - ux * tick - nx * tick, by - uy * tick - ny * tick, bx + ux * tick + nx * tick, by + uy * tick + ny * tick, PALETTE.genziana, 11),
  );

  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const vertical = Math.abs(dy) > Math.abs(dx);
  const label_ = txt(mx + (vertical ? -95 : 0), my + (vertical ? 0 : -75), label, {
    size: 132,
    fill: PALETTE.genziana,
    weight: 600,
    rotate: vertical ? -90 : undefined,
  });

  return { lines, label: label_ };
}

/** Porta: il varco nel pavimento, l'anta e l'arco di apertura campionato a tratti. */
function door(d: PlanDoor): Shape[] {
  const shapes: Shape[] = [];
  const w = d.w;
  if (d.orient === 'h') shapes.push(rect(d.x, d.y, w, WALL_T, PALETTE.pav));
  else shapes.push(rect(d.x, d.y, WALL_T, w, PALETTE.pav));

  let px: number, py: number, lx: number, ly: number, fx: number, fy: number;
  if (d.orient === 'h') {
    px = d.hinge ? d.x + w : d.x;
    py = d.y + WALL_T / 2;
    fx = d.hinge ? d.x : d.x + w;
    fy = py;
    lx = px;
    ly = py + d.into * w;
  } else {
    px = d.x + WALL_T / 2;
    py = d.hinge ? d.y + w : d.y;
    fx = px;
    fy = d.hinge ? d.y : d.y + w;
    lx = px + d.into * w;
    ly = py;
  }

  const v1x = lx - px;
  const v1y = ly - py;
  const v2x = fx - px;
  const v2y = fy - py;
  const cross = v1x * v2y - v1y * v2x;
  const dir = cross > 0 ? 1 : -1;
  const points: string[] = [];
  for (let i = 0; i <= 14; i++) {
    const a = dir * (Math.PI / 2) * (i / 14);
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    points.push(`${r(px + v1x * ca - v1y * sa)},${r(py + v1x * sa + v1y * ca)}`);
  }

  shapes.push({
    kind: 'polyline',
    points: points.join(' '),
    stroke: PALETTE.grafite,
    strokeWidth: 9,
    dashArray: '40 34',
  });
  shapes.push(line(px, py, lx, ly, PALETTE.grafite, 20));
  return shapes;
}

function win(w: PlanWindow): Shape[] {
  const shapes: Shape[] = [rect(w.x, w.y, w.w, w.h, PALETTE.zinco, PALETTE.grafite, 10)];
  if (w.w > w.h) shapes.push(line(w.x, w.y + w.h / 2, w.x + w.w, w.y + w.h / 2, PALETTE.grafite, 10));
  else shapes.push(line(w.x + w.w / 2, w.y, w.x + w.w / 2, w.y + w.h, PALETTE.grafite, 10));
  return shapes;
}

/** Arredo: la sagoma in pianta, simbolica ma proporzionata, per ogni tipo di fixture. */
function fx(f: PlanFixture): Shape[] {
  const S = PALETTE.grafite;
  const sw = 12;
  const { x, y, w, h } = f;
  const shapes: Shape[] = [];

  switch (f.t) {
    case 'bed': {
      shapes.push(rect(x, y, w, h, PALETTE.calce, S, sw));
      if (f.head === 'W') shapes.push(rect(x + 70, y + 70, 240, h - 140, PALETTE.zinco, S, sw));
      else if (f.head === 'E') shapes.push(rect(x + w - 310, y + 70, 240, h - 140, PALETTE.zinco, S, sw));
      else if (f.head === 'N') shapes.push(rect(x + 70, y + 70, w - 140, 240, PALETTE.zinco, S, sw));
      else shapes.push(rect(x + 70, y + h - 310, w - 140, 240, PALETTE.zinco, S, sw));
      break;
    }
    case 'desk': {
      shapes.push(rect(x, y, w, h, PALETTE.calce, S, sw));
      if (f.chair) shapes.push(circ(f.chair[0], f.chair[1], 230, undefined, S, sw));
      break;
    }
    case 'wardrobe': {
      shapes.push(rect(x, y, w, h, PALETTE.zinco, S, sw));
      shapes.push(line(x, y, x + w, y + h, S, 9));
      shapes.push(line(x + w, y, x, y + h, S, 9));
      break;
    }
    case 'table': {
      shapes.push(rect(x, y, w, h, PALETTE.calce, S, sw));
      break;
    }
    case 'sofa': {
      shapes.push(rect(x, y, w, h, PALETTE.zinco, S, sw));
      shapes.push(rect(x, y, w, 220, PALETTE.calce, S, sw));
      break;
    }
    case 'kitchen': {
      shapes.push(rect(x, y, w, h, PALETTE.zinco, S, sw));
      shapes.push(circ(x + w - 330, y + h / 2 - 150, 150, undefined, S, sw));
      shapes.push(circ(x + w - 330, y + h / 2 + 150, 150, undefined, S, sw));
      shapes.push(rect(x + 180, y + 110, 520, h - 220, PALETTE.calce, S, sw));
      break;
    }
    case 'wc': {
      shapes.push(rect(x, y, w, 220, PALETTE.zinco, S, sw));
      shapes.push(ell(x + w / 2, y + 220 + (h - 220) / 2, w / 2 - 40, (h - 220) / 2 - 30, PALETTE.calce, S, sw));
      break;
    }
    case 'sink': {
      shapes.push(rect(x, y, w, h, PALETTE.calce, S, sw));
      shapes.push(ell(x + w / 2, y + h / 2, w / 2 - 90, h / 2 - 70, undefined, S, sw));
      break;
    }
    case 'shower': {
      shapes.push(rect(x, y, w, h, PALETTE.calce, S, sw));
      shapes.push(line(x, y, x + w, y + h, S, 9));
      shapes.push(line(x + w, y, x, y + h, S, 9));
      shapes.push(circ(x + w / 2, y + h / 2, 90, undefined, S, sw));
      break;
    }
    case 'bench': {
      shapes.push(rect(x, y, w, h, PALETTE.zinco, S, sw));
      const n = f.n ?? 1;
      for (let i = 0; i < n; i++) {
        const cx = x + w / (n * 2) + i * (w / n);
        shapes.push(ell(cx, y + h / 2, w / (n * 2) - 110, h / 2 - 70, PALETTE.calce, S, sw));
      }
      break;
    }
    case 'fridge': {
      shapes.push(rect(x, y, w, h, PALETTE.zinco, S, sw));
      shapes.push(line(x + w - 90, y + h / 2 - 160, x + w - 90, y + h / 2 + 160, S, 20));
      break;
    }
  }
  return shapes;
}

export interface PlanOutput {
  /** Muri, stanze, arredi, porte, finestre, etichette — tutto tranne le quote. */
  base: Shape[];
  /** Le quote, separate per poter animare solo queste allo stroke-dashoffset. */
  dimensions: DimensionGroup[];
  /** Margini del foglio (per il viewBox) attorno all'ingombro W×D. */
  margins: { left: number; right: number; top: number; bottom: number };
}

const MARGINS = { left: 1150, right: 520, top: 520, bottom: 1150 };

/** Da un PlanConfig produce le forme da disegnare — nessun DOM, nessun SVG qui dentro. */
export function buildPlan(cfg: PlanConfig): PlanOutput {
  const { W, D } = cfg;
  const base: Shape[] = [];

  base.push(rect(0, 0, W, D, PALETTE.grafite));
  (cfg.rooms ?? []).forEach((rm) => base.push(rect(rm.x, rm.y, rm.w, rm.h, PALETTE.pav)));
  (cfg.windows ?? []).forEach((w) => base.push(...win(w)));
  (cfg.fixtures ?? []).forEach((f) => base.push(...fx(f)));
  (cfg.doors ?? []).forEach((d) => base.push(...door(d)));
  (cfg.rooms ?? []).forEach((rm) => {
    if (!rm.label) return;
    const cx = rm.lx ?? rm.x + rm.w / 2;
    const cy = rm.ly ?? rm.y + rm.h / 2;
    base.push(txt(cx, cy, rm.label, { size: 150, weight: 650 }));
    if (rm.area) base.push(txt(cx, cy + 195, rm.area, { size: 130, fill: PALETTE.grafite }));
  });

  const dimensions: DimensionGroup[] = [
    dim(0, D, W, D, cfg.dimW ?? `${W} mm`, 620),
    dim(0, 0, 0, D, cfg.dimD ?? `${D} mm`, 620),
    ...(cfg.extraDims ?? []).map(([x1, y1, x2, y2, label, offset]) => dim(x1, y1, x2, y2, label, offset)),
  ];

  return { base, dimensions, margins: MARGINS };
}
