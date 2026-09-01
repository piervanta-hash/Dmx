/**
 * Tipi per il motore delle planimetrie. Tutte le misure in millimetri,
 * origine in alto a sinistra della pianta (asse Y verso il basso, come nel disegno tecnico).
 */

export interface PlanRoom {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  /** Superficie già formattata (es. "13,8 m²") — dato reale dalla tavola prodotto. */
  area?: string;
  /** Centro dell'etichetta, se diverso dal centro geometrico della stanza. */
  lx?: number;
  ly?: number;
}

export interface PlanWindow {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PlanDoor {
  x: number;
  y: number;
  w: number;
  orient: 'h' | 'v';
  /** Verso di apertura dell'anta. */
  into: 1 | -1;
  /** Lato della cerniera. */
  hinge: 0 | 1;
}

export type FixtureType =
  | 'bed'
  | 'desk'
  | 'wardrobe'
  | 'table'
  | 'sofa'
  | 'kitchen'
  | 'wc'
  | 'sink'
  | 'shower'
  | 'bench'
  | 'fridge';

export interface PlanFixture {
  t: FixtureType;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Solo per 'bed': lato della testiera. */
  head?: 'N' | 'S' | 'E' | 'W';
  /** Solo per 'desk': centro della sedia, se presente. */
  chair?: [number, number];
  /** Solo per 'bench': numero di postazioni. */
  n?: number;
}

/** Quota extra oltre a larghezza/profondità del modulo: [x1,y1,x2,y2,label,offset]. */
export type ExtraDim = [number, number, number, number, string, number];

export interface PlanConfig {
  /** Larghezza del modulo (asse X). */
  W: number;
  /** Profondità del modulo (asse Y). */
  D: number;
  rooms?: PlanRoom[];
  windows?: PlanWindow[];
  doors?: PlanDoor[];
  fixtures?: PlanFixture[];
  extraDims?: ExtraDim[];
  /** Etichetta quota larghezza, default "{W} mm". */
  dimW?: string;
  /** Etichetta quota profondità, default "{D} mm". */
  dimD?: string;
}
