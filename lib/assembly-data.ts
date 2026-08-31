// Dati geometrici e di sequenza per il blocco "Il montaggio".
// Tutte le misure sono in millimetri. La scena viene scalata di 0.001 nel componente 3D.
// Ogni pezzo è definito con pivot alla base (y locale 0 = base del pezzo): la `baseY`
// sotto è quindi la quota di appoggio, non il centro geometrico.

export type Vec3 = [number, number, number];

export interface PieceDef {
  id: string;
  /** [larghezza X, altezza Y, profondità Z] in mm, pivot alla base. */
  size: Vec3;
  /** Posizione finale [X, baseY, Z] in mm. */
  position: Vec3;
  /** Rotazione finale in radianti [X, Y, Z]. */
  rotation?: Vec3;
  color: string;
}

export const PALETTE = {
  frame: '#9E4B32',
  floor: '#E4E6E1',
  wall: '#EDEEEA',
  roof: '#F2F3F0',
  window: '#C3C7C1',
  door: '#24272A',
  edge: '#24272A',
  background: '#C3C7C1',
  dimensionLine: '#16558F',
};

export const MODULE = {
  length: 6058, // X
  width: 2438, // Z
  height: 2591, // Y totale (per l'overlay quote)
};

const FRAME_H = 260;
const FRAME_BEAM_W = 140;
const FLOOR_H = 180;
const WALL_H = 2300;
const WALL_T = 60;
const ROOF_H = 150;

const FLOOR_BASE_Y = FRAME_H; // 260
const WALL_BASE_Y = FLOOR_BASE_Y + FLOOR_H; // 440
const ROOF_BASE_Y = WALL_BASE_Y + WALL_H; // 2740

const halfL = MODULE.length / 2;
const halfW = MODULE.width / 2;

// --- Telaio: 2 longheroni + 2 traverse + 1 traverso centrale ---
export const framePieces: PieceDef[] = [
  {
    id: 'longherone-1',
    size: [MODULE.length, FRAME_H, FRAME_BEAM_W],
    position: [0, 0, -(halfW - FRAME_BEAM_W / 2)],
    color: PALETTE.frame,
  },
  {
    id: 'longherone-2',
    size: [MODULE.length, FRAME_H, FRAME_BEAM_W],
    position: [0, 0, halfW - FRAME_BEAM_W / 2],
    color: PALETTE.frame,
  },
  {
    id: 'traversa-1',
    size: [FRAME_BEAM_W, FRAME_H, MODULE.width - FRAME_BEAM_W * 2],
    position: [-(halfL - FRAME_BEAM_W / 2), 0, 0],
    color: PALETTE.frame,
  },
  {
    id: 'traversa-2',
    size: [FRAME_BEAM_W, FRAME_H, MODULE.width - FRAME_BEAM_W * 2],
    position: [halfL - FRAME_BEAM_W / 2, 0, 0],
    color: PALETTE.frame,
  },
  {
    id: 'traverso-centrale',
    size: [FRAME_BEAM_W, FRAME_H, MODULE.width - FRAME_BEAM_W * 2],
    position: [0, 0, 0],
    color: PALETTE.frame,
  },
];

// --- Pavimento ---
export const floorPiece: PieceDef = {
  id: 'pavimento',
  size: [MODULE.length, FLOOR_H, MODULE.width],
  position: [0, FLOOR_BASE_Y, 0],
  color: PALETTE.floor,
};

// --- Pareti (pivot alla base, ruotano da orizzontale a verticale attorno all'asse X locale) ---
export interface WallDef extends PieceDef {
  /** Rotazione di partenza (orizzontale, "a terra"), radianti. */
  restRotation: Vec3;
  kind: 'long' | 'short';
}

export const wallPieces: WallDef[] = [
  {
    id: 'parete-lunga-1',
    size: [MODULE.length, WALL_H, WALL_T],
    position: [0, WALL_BASE_Y, -(halfW - WALL_T / 2)],
    rotation: [0, 0, 0],
    restRotation: [-Math.PI / 2, 0, 0],
    color: PALETTE.wall,
    kind: 'long',
  },
  {
    id: 'parete-lunga-2',
    size: [MODULE.length, WALL_H, WALL_T],
    position: [0, WALL_BASE_Y, halfW - WALL_T / 2],
    rotation: [0, 0, 0],
    restRotation: [Math.PI / 2, 0, 0],
    color: PALETTE.wall,
    kind: 'long',
  },
  {
    id: 'parete-corta-1',
    size: [WALL_T, WALL_H, MODULE.width - WALL_T * 2 + 20],
    position: [-(halfL - WALL_T / 2), WALL_BASE_Y, 0],
    rotation: [0, 0, 0],
    restRotation: [0, 0, Math.PI / 2],
    color: PALETTE.wall,
    kind: 'short',
  },
  {
    id: 'parete-corta-2',
    size: [WALL_T, WALL_H, MODULE.width - WALL_T * 2 + 20],
    position: [halfL - WALL_T / 2, WALL_BASE_Y, 0],
    rotation: [0, 0, 0],
    restRotation: [0, 0, -Math.PI / 2],
    color: PALETTE.wall,
    kind: 'short',
  },
];

// --- Serramenti e porta: si inseriscono nelle aperture della parete-lunga-1 traslando verso l'interno ---
export interface OpeningPiece extends PieceDef {
  /** Direzione di provenienza (offset in Z, mm) da cui il pezzo trasla in sede. */
  travelZ: number;
}

const OPENING_BASE_Y = WALL_BASE_Y; // porta a terra
const WINDOW_SILL_Y = 1200;
const WALL1_Z = -(halfW - WALL_T / 2);

export const openingPieces: OpeningPiece[] = [
  {
    id: 'serramento-1',
    size: [1400, 1100, WALL_T],
    position: [-1900, WINDOW_SILL_Y, WALL1_Z],
    color: PALETTE.window,
    travelZ: -400,
  },
  {
    id: 'serramento-2',
    size: [1400, 1100, WALL_T],
    position: [400, WINDOW_SILL_Y, WALL1_Z],
    color: PALETTE.window,
    travelZ: -400,
  },
  {
    id: 'serramento-3',
    size: [1400, 1100, WALL_T],
    position: [2200, WINDOW_SILL_Y, WALL1_Z],
    color: PALETTE.window,
    travelZ: -400,
  },
  {
    id: 'porta',
    size: [900, 2100, WALL_T],
    position: [-3400 + 450 + 300, OPENING_BASE_Y, WALL1_Z],
    color: PALETTE.door,
    travelZ: -400,
  },
];

// --- Copertura ---
export const roofPiece: PieceDef = {
  id: 'copertura',
  size: [MODULE.length, ROOF_H, MODULE.width],
  position: [0, ROOF_BASE_Y, 0],
  color: PALETTE.roof,
};

// --- Aperture sulla parete-lunga-1 (per la generazione a box adiacenti) ---
// Ogni apertura: offsetX (dal centro parete), larghezza, altezza, baseY (quota della soglia).
export interface WallOpening {
  offsetX: number;
  width: number;
  height: number;
  baseY: number;
}

export const wall1Openings: WallOpening[] = [
  { offsetX: -3400 + 450 + 300, width: 900, height: 2100, baseY: 0 }, // porta, soglia a terra
  { offsetX: -1900, width: 1400, height: 1100, baseY: WINDOW_SILL_Y - WALL_BASE_Y },
  { offsetX: 400, width: 1400, height: 1100, baseY: WINDOW_SILL_Y - WALL_BASE_Y },
  { offsetX: 2200, width: 1400, height: 1100, baseY: WINDOW_SILL_Y - WALL_BASE_Y },
];

// --- Sequenza / storyboard ---
export interface Stage {
  from: number;
  to: number;
  caption: string;
}

export const STAGES: Stage[] = [
  { from: 0.0, to: 0.08, caption: 'Si parte dal terreno livellato.' },
  { from: 0.08, to: 0.26, caption: 'Telaio in acciaio S235, zincato. Prodotto in casa.' },
  { from: 0.26, to: 0.42, caption: 'Cementolegno e PVC, 180 mm.' },
  { from: 0.42, to: 0.64, caption: 'Pannello sandwich 60 mm.' },
  { from: 0.64, to: 0.8, caption: 'Serramenti in alluminio, porta 900 mm.' },
  { from: 0.8, to: 0.92, caption: 'Copertura 100 mm, pendenza per lo scarico.' },
  { from: 0.92, to: 1.0, caption: `${MODULE.length} × ${MODULE.width} × ${MODULE.height} mm. Pronto per il bilico.` },
];

export const SCALE = 0.001;
export const PIN_DURATION_VH = 320;
export const MOBILE_AUTOPLAY_MS = 6000;
