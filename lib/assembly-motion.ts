// Easing e finestre di animazione per i singoli pezzi del montaggio.
// Approssima cubic-bezier(0.16, 1, 0.3, 1) (easeOutExpo): pezzi che si posano, senza rimbalzo.

export function clamp01(t: number): number {
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

export function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/** Progresso locale (0-1, con easing) di un pezzo dentro una finestra [start, end] del progresso globale. */
export function localEasedProgress(progress: number, start: number, end: number): number {
  const t = clamp01((progress - start) / (end - start));
  return easeOutExpo(t);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export const FRAME_WINDOW: [number, number] = [0.08, 0.26];
export const FRAME_STAGGER = 0.03;
export const FRAME_DROP_MM = 3000;

export const FLOOR_WINDOW: [number, number] = [0.26, 0.42];
export const FLOOR_DROP_MM = 2000;

export const WALL_WINDOW: [number, number] = [0.42, 0.64];
export const WALL_STAGGER = 0.05;
export const WALL_DURATION = 0.07;

export const OPENING_WINDOW: [number, number] = [0.64, 0.8];
export const OPENING_STAGGER = 0.03;
export const OPENING_DURATION = 0.07;

export const ROOF_WINDOW: [number, number] = [0.8, 0.92];
export const ROOF_DROP_MM = 2500;

export const OVERLAY_THRESHOLD = 0.92;

export const CAMERA_AZIMUTH_START = 32;
export const CAMERA_AZIMUTH_END = 46;
export const CAMERA_ELEVATION_START = 24;
export const CAMERA_ELEVATION_END = 18;
