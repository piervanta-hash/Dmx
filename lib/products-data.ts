/**
 * Dati dei 9 modelli — geometria e numeri, senza testo. Le etichette (nome stanza,
 * nome modello, descrizione) vivono nei messaggi di lingua e si risolvono a runtime
 * con resolveModelPlan(); qui restano solo fatti: quote in millimetri, superfici in
 * metri quadri, posizioni di porte/finestre/arredi.
 */

import type { ExtraDim, PlanDoor, PlanFixture, PlanWindow } from './plans/types';

export type FamilyKey = 'offices' | 'housing' | 'sanitary' | 'special' | 'hospitality';
export type ModuleClass = 'A' | 'B';

export interface ModelRoom {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Chiave di traduzione per il nome stanza (messages: products.rooms.<key>). */
  key: string;
  /** Superficie in m², se la stanza ne mostra una (non tutte le stanze la mostrano). */
  areaM2?: number;
  lx?: number;
  ly?: number;
}

export interface ModelData {
  code: string;
  family: FamilyKey;
  class: ModuleClass;
  /** Ingombro esterno in mm. */
  dimensions: { w: number; d: number; h: number };
  /** Superficie lorda e netta totale, m². */
  areaGross: number;
  areaNet: number;
  rooms: ModelRoom[];
  windows: PlanWindow[];
  doors: PlanDoor[];
  fixtures: PlanFixture[];
  extraDims: ExtraDim[];
}

export const MODELS: ModelData[] = [
  {
    code: 'A20-U1',
    family: 'offices',
    class: 'A',
    dimensions: { w: 6058, d: 2438, h: 2591 },
    areaGross: 14.8,
    areaNet: 13.8,
    rooms: [{ x: 60, y: 60, w: 5938, h: 2318, key: 'office', areaM2: 13.8, ly: 1500 }],
    windows: [
      { x: 2500, y: 2378, w: 1400, h: 60 },
      { x: 4300, y: 2378, w: 1400, h: 60 },
      { x: 5998, y: 750, w: 60, h: 1000 },
    ],
    doors: [{ x: 600, y: 2378, w: 900, orient: 'h', into: -1, hinge: 0 }],
    fixtures: [
      { t: 'desk', x: 2500, y: 60, w: 1600, h: 800, chair: [3300, 1200] },
      { t: 'desk', x: 4300, y: 60, w: 1600, h: 800, chair: [5100, 1200] },
      { t: 'wardrobe', x: 60, y: 60, w: 1100, h: 600 },
      { t: 'table', x: 1900, y: 1500, w: 900, h: 800 },
    ],
    extraDims: [[60, 60, 60, 2378, '2318', -360]],
  },
  {
    code: 'A20-U2',
    family: 'offices',
    class: 'A',
    dimensions: { w: 6058, d: 2438, h: 2591 },
    areaGross: 14.8,
    areaNet: 13.6,
    rooms: [
      { x: 60, y: 60, w: 4280, h: 2318, key: 'office', areaM2: 9.9, ly: 1500 },
      { x: 4400, y: 60, w: 1598, h: 2318, key: 'serviceRoom', areaM2: 3.7, ly: 1350 },
    ],
    windows: [
      { x: 1900, y: 2378, w: 1400, h: 60 },
      { x: 900, y: 0, w: 1400, h: 60 },
      { x: 4600, y: 0, w: 700, h: 60 },
    ],
    doors: [
      { x: 400, y: 2378, w: 900, orient: 'h', into: -1, hinge: 0 },
      { x: 4340, y: 1400, w: 800, orient: 'v', into: -1, hinge: 0 },
    ],
    fixtures: [
      { t: 'desk', x: 1900, y: 60, w: 1600, h: 800, chair: [2700, 1200] },
      { t: 'wardrobe', x: 60, y: 60, w: 1000, h: 600 },
      { t: 'table', x: 1200, y: 1500, w: 900, h: 800 },
      { t: 'shower', x: 4460, y: 1350, w: 900, h: 900 },
      { t: 'wc', x: 4460, y: 60, w: 450, h: 750 },
      { t: 'sink', x: 5400, y: 60, w: 550, h: 450 },
    ],
    extraDims: [
      [60, 2438, 4340, 2438, '4280', 960],
      [4400, 2438, 5998, 2438, '1598', 960],
    ],
  },
  {
    code: 'A20-L2',
    family: 'housing',
    class: 'A',
    dimensions: { w: 6058, d: 2438, h: 2591 },
    areaGross: 14.8,
    areaNet: 13.6,
    rooms: [
      { x: 60, y: 60, w: 4140, h: 2318, key: 'bedroom', areaM2: 9.6, ly: 1750 },
      { x: 4260, y: 60, w: 1738, h: 2318, key: 'bathroom', areaM2: 4.0, ly: 800 },
    ],
    windows: [
      { x: 2000, y: 2378, w: 1400, h: 60 },
      { x: 600, y: 0, w: 1200, h: 60 },
      { x: 4500, y: 0, w: 700, h: 60 },
    ],
    doors: [
      { x: 400, y: 2378, w: 900, orient: 'h', into: -1, hinge: 0 },
      { x: 4200, y: 1450, w: 800, orient: 'v', into: -1, hinge: 1 },
    ],
    fixtures: [
      { t: 'bed', x: 200, y: 60, w: 2000, h: 900, head: 'W' },
      { t: 'bed', x: 2200, y: 60, w: 2000, h: 900, head: 'E' },
      { t: 'wardrobe', x: 60, y: 1700, w: 1100, h: 600 },
      { t: 'table', x: 2600, y: 1550, w: 1000, h: 700 },
      { t: 'shower', x: 4320, y: 1350, w: 900, h: 900 },
      { t: 'wc', x: 4320, y: 60, w: 450, h: 750 },
      { t: 'sink', x: 5350, y: 60, w: 550, h: 450 },
    ],
    extraDims: [
      [60, 2438, 4200, 2438, '4140', 960],
      [4260, 2438, 5998, 2438, '1738', 960],
    ],
  },
  {
    code: 'A20-S1',
    family: 'sanitary',
    class: 'A',
    dimensions: { w: 6058, d: 2438, h: 2591 },
    areaGross: 14.8,
    areaNet: 11.7,
    rooms: (() => {
      const cab = 1439.5;
      const ys = 60;
      const yh = 1250;
      const rooms: ModelRoom[] = [];
      for (let i = 0; i < 4; i++) {
        const x = 60 + i * (cab + 60);
        rooms.push({ x, y: ys, w: cab, h: yh, key: 'wc', ly: ys + 560 });
      }
      rooms.push({ x: 60, y: ys + yh + 60, w: 5938, h: 2378 - (ys + yh + 60), key: 'lobby', areaM2: 5.7, ly: 2200 });
      return rooms;
    })(),
    windows: [
      { x: 600, y: 0, w: 600, h: 60 },
      { x: 2100, y: 0, w: 600, h: 60 },
      { x: 3600, y: 0, w: 600, h: 60 },
      { x: 5100, y: 0, w: 600, h: 60 },
    ],
    doors: (() => {
      const cab = 1439.5;
      const ys = 60;
      const yh = 1250;
      const doors: PlanDoor[] = [];
      for (let i = 0; i < 4; i++) {
        const x = 60 + i * (cab + 60);
        doors.push({ x: x + cab / 2 - 350, y: ys + yh, w: 700, orient: 'h', into: 1, hinge: 0 });
      }
      doors.push({ x: 400, y: 2378, w: 900, orient: 'h', into: -1, hinge: 0 });
      doors.push({ x: 4700, y: 2378, w: 900, orient: 'h', into: -1, hinge: 1 });
      return doors;
    })(),
    fixtures: (() => {
      const cab = 1439.5;
      const ys = 60;
      const fixtures: PlanFixture[] = [];
      for (let i = 0; i < 4; i++) {
        const x = 60 + i * (cab + 60);
        fixtures.push({ t: 'wc', x: x + cab / 2 - 225, y: ys + 80, w: 450, h: 750 });
      }
      fixtures.push({ t: 'bench', x: 1900, y: 2078, w: 2200, h: 300, n: 3 });
      return fixtures;
    })(),
    extraDims: [[60, 0, 60, 1310, '1250', -360]],
  },
  {
    code: 'A10-G',
    family: 'special',
    class: 'A',
    dimensions: { w: 3000, d: 2438, h: 2591 },
    areaGross: 7.3,
    areaNet: 6.5,
    rooms: [
      { x: 60, y: 60, w: 1720, h: 2318, key: 'post', areaM2: 4.0, ly: 1600 },
      { x: 1840, y: 60, w: 1098, h: 2318, key: 'wc', areaM2: 2.5, ly: 1600 },
    ],
    windows: [
      { x: 250, y: 0, w: 1300, h: 60 },
      { x: 250, y: 2378, w: 1300, h: 60 },
      { x: 0, y: 1450, w: 60, h: 800 },
    ],
    doors: [
      { x: 0, y: 400, w: 900, orient: 'v', into: 1, hinge: 0 },
      { x: 1780, y: 1450, w: 750, orient: 'v', into: -1, hinge: 0 },
    ],
    fixtures: [
      { t: 'desk', x: 200, y: 60, w: 1400, h: 700, chair: [900, 1150] },
      { t: 'wc', x: 2100, y: 60, w: 450, h: 750 },
      { t: 'sink', x: 1900, y: 1750, w: 550, h: 450 },
    ],
    extraDims: [],
  },
  {
    code: 'A30-L4',
    family: 'housing',
    class: 'A',
    dimensions: { w: 9125, d: 2438, h: 2591 },
    areaGross: 22.2,
    areaNet: 20.6,
    rooms: [
      { x: 60, y: 60, w: 3450, h: 2318, key: 'bedroomA', areaM2: 8.0, ly: 1250 },
      { x: 3570, y: 60, w: 1985, h: 2318, key: 'bathroom', areaM2: 4.6, ly: 1000 },
      { x: 5615, y: 60, w: 3450, h: 2318, key: 'bedroomB', areaM2: 8.0, ly: 1250 },
    ],
    windows: [
      { x: 700, y: 0, w: 1500, h: 60 },
      { x: 6900, y: 0, w: 1500, h: 60 },
      { x: 4000, y: 0, w: 700, h: 60 },
      { x: 2400, y: 2378, w: 900, h: 60 },
      { x: 5800, y: 2378, w: 900, h: 60 },
    ],
    doors: [
      { x: 400, y: 2378, w: 900, orient: 'h', into: -1, hinge: 0 },
      { x: 7700, y: 2378, w: 900, orient: 'h', into: -1, hinge: 1 },
      { x: 3510, y: 1400, w: 750, orient: 'v', into: -1, hinge: 0 },
      { x: 5555, y: 1400, w: 750, orient: 'v', into: 1, hinge: 0 },
    ],
    fixtures: [
      { t: 'bed', x: 250, y: 60, w: 2000, h: 900, head: 'W' },
      { t: 'bed', x: 250, y: 1478, w: 2000, h: 900, head: 'W' },
      { t: 'wardrobe', x: 2750, y: 60, w: 700, h: 600 },
      { t: 'bed', x: 6800, y: 60, w: 2000, h: 900, head: 'E' },
      { t: 'bed', x: 6800, y: 1478, w: 2000, h: 900, head: 'E' },
      { t: 'wardrobe', x: 5680, y: 60, w: 700, h: 600 },
      { t: 'shower', x: 3650, y: 1400, w: 900, h: 900 },
      { t: 'wc', x: 3650, y: 60, w: 450, h: 750 },
      { t: 'sink', x: 4900, y: 60, w: 550, h: 450 },
    ],
    extraDims: [
      [60, 2438, 3510, 2438, '3450', 960],
      [3570, 2438, 5555, 2438, '1985', 960],
      [5615, 2438, 9065, 2438, '3450', 960],
    ],
  },
  {
    code: 'A40-D',
    family: 'housing',
    class: 'A',
    dimensions: { w: 12192, d: 2438, h: 2591 },
    areaGross: 29.7,
    areaNet: 28.0,
    rooms: (() => {
      const rooms: ModelRoom[] = [];
      for (let i = 0; i < 3; i++) {
        const x = 60 + i * (3500 + 60);
        rooms.push({ x, y: 60, w: 3500, h: 2318, key: `bedroomN${i + 1}`, areaM2: 8.1, ly: 1250 });
      }
      const bx = 60 + 3 * (3500 + 60);
      rooms.push({ x: bx, y: 60, w: 1392, h: 2318, key: 'bathroom', areaM2: 3.2, ly: 1050 });
      return rooms;
    })(),
    windows: (() => {
      const windows: PlanWindow[] = [];
      for (let i = 0; i < 3; i++) {
        const x = 60 + i * (3500 + 60);
        windows.push({ x: x + 700, y: 0, w: 1600, h: 60 });
      }
      const bx = 60 + 3 * (3500 + 60);
      windows.push({ x: bx + 400, y: 0, w: 600, h: 60 });
      return windows;
    })(),
    doors: (() => {
      const doors: PlanDoor[] = [];
      for (let i = 0; i < 3; i++) {
        const x = 60 + i * (3500 + 60);
        doors.push({ x: x + 400, y: 2378, w: 900, orient: 'h', into: -1, hinge: 0 });
      }
      const bx = 60 + 3 * (3500 + 60);
      doors.push({ x: bx + 300, y: 2378, w: 800, orient: 'h', into: -1, hinge: 0 });
      return doors;
    })(),
    fixtures: (() => {
      const fixtures: PlanFixture[] = [];
      for (let i = 0; i < 3; i++) {
        const x = 60 + i * (3500 + 60);
        fixtures.push({ t: 'bed', x: x + 200, y: 60, w: 2000, h: 900, head: 'W' });
        fixtures.push({ t: 'bed', x: x + 200, y: 1478, w: 2000, h: 900, head: 'W' });
        fixtures.push({ t: 'wardrobe', x: x + 2750, y: 60, w: 700, h: 600 });
      }
      const bx = 60 + 3 * (3500 + 60);
      fixtures.push({ t: 'shower', x: bx + 80, y: 1350, w: 900, h: 900 });
      fixtures.push({ t: 'wc', x: bx + 80, y: 60, w: 450, h: 750 });
      fixtures.push({ t: 'sink', x: bx + 780, y: 60, w: 550, h: 450 });
      return fixtures;
    })(),
    extraDims: [],
  },
  {
    code: 'F29',
    family: 'housing',
    class: 'A',
    dimensions: { w: 6058, d: 4876, h: 2591 },
    areaGross: 29.5,
    areaNet: 28.2,
    rooms: [
      { x: 60, y: 60, w: 5938, h: 2318, key: 'living', areaM2: 13.8, ly: 1500 },
      { x: 60, y: 2438, w: 2540, h: 2378, key: 'bedroomMain', areaM2: 6.0, ly: 3900 },
      { x: 2660, y: 2438, w: 2040, h: 2378, key: 'bedroomDouble', areaM2: 4.9, ly: 3900 },
      { x: 4760, y: 2438, w: 1238, h: 2378, key: 'bathroom', areaM2: 2.9, ly: 3300 },
    ],
    windows: [
      { x: 2200, y: 0, w: 1800, h: 60 },
      { x: 600, y: 0, w: 1000, h: 60 },
      { x: 700, y: 4816, w: 1200, h: 60 },
      { x: 3000, y: 4816, w: 1200, h: 60 },
      { x: 5100, y: 4816, w: 550, h: 60 },
      { x: 5998, y: 800, w: 60, h: 1000 },
    ],
    doors: [
      { x: 600, y: 0, w: 900, orient: 'h', into: 1, hinge: 0 },
      { x: 1000, y: 2378, w: 800, orient: 'h', into: 1, hinge: 0 },
      { x: 3200, y: 2378, w: 800, orient: 'h', into: 1, hinge: 0 },
      { x: 5000, y: 2378, w: 700, orient: 'h', into: 1, hinge: 1 },
    ],
    fixtures: [
      { t: 'kitchen', x: 3700, y: 60, w: 2298, h: 650 },
      { t: 'fridge', x: 3050, y: 60, w: 600, h: 650 },
      { t: 'sofa', x: 400, y: 60, w: 2100, h: 800 },
      { t: 'table', x: 1100, y: 1350, w: 1300, h: 800 },
      { t: 'bed', x: 400, y: 2600, w: 1500, h: 2000, head: 'N' },
      { t: 'wardrobe', x: 2000, y: 2600, w: 550, h: 900 },
      { t: 'bed', x: 2760, y: 2600, w: 900, h: 2000, head: 'N' },
      { t: 'bed', x: 3760, y: 2600, w: 900, h: 2000, head: 'N' },
      { t: 'shower', x: 4830, y: 3800, w: 900, h: 900 },
      { t: 'wc', x: 4830, y: 2500, w: 450, h: 750 },
      { t: 'sink', x: 5400, y: 2500, w: 520, h: 450 },
    ],
    extraDims: [
      [60, 4876, 2600, 4876, '2540', 960],
      [2660, 4876, 4700, 4876, '2040', 960],
      [4760, 4876, 5998, 4876, '1238', 960],
    ],
  },
  {
    code: 'B21-L',
    family: 'hospitality',
    class: 'B',
    dimensions: { w: 7000, d: 3000, h: 2700 },
    areaGross: 21.0,
    areaNet: 19.6,
    rooms: [
      { x: 60, y: 60, w: 5040, h: 2880, key: 'bedroom', areaM2: 14.5, ly: 1900 },
      { x: 5160, y: 60, w: 1780, h: 2880, key: 'bathroom', areaM2: 5.1, ly: 1050 },
    ],
    windows: [
      { x: 1400, y: 2940, w: 2600, h: 60 },
      { x: 0, y: 900, w: 60, h: 1200 },
      { x: 5600, y: 0, w: 800, h: 60 },
    ],
    doors: [
      { x: 400, y: 2940, w: 900, orient: 'h', into: -1, hinge: 0 },
      { x: 5100, y: 1700, w: 800, orient: 'v', into: -1, hinge: 0 },
    ],
    fixtures: [
      { t: 'bed', x: 1500, y: 60, w: 1800, h: 2100, head: 'N' },
      { t: 'wardrobe', x: 3600, y: 60, w: 1400, h: 650 },
      { t: 'desk', x: 3600, y: 1400, w: 1400, h: 650, chair: [4300, 2350] },
      { t: 'table', x: 200, y: 2000, w: 900, h: 800 },
      { t: 'shower', x: 5240, y: 1850, w: 1000, h: 1000 },
      { t: 'wc', x: 5240, y: 60, w: 450, h: 750 },
      { t: 'sink', x: 6200, y: 60, w: 600, h: 500 },
    ],
    extraDims: [
      [60, 3000, 5100, 3000, '5040', 960],
      [5160, 3000, 6940, 3000, '1780', 960],
    ],
  },
];

export function getModel(code: string): ModelData | undefined {
  return MODELS.find((m) => m.code === code);
}

export function modelsByFamily(family: FamilyKey): ModelData[] {
  return MODELS.filter((m) => m.family === family);
}
