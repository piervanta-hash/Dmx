import type { WallOpening } from './assembly-data';

export interface WallSegment {
  id: string;
  /** [larghezza X, altezza Y, spessore Z] in mm, locali alla parete (pivot base). */
  size: [number, number, number];
  /** Posizione locale [X, baseY, 0] rispetto al centro/base della parete. */
  position: [number, number, number];
}

/**
 * Compone una parete piena in montanti e architravi attorno alle aperture,
 * invece di sottrarre geometria a runtime (troppo costoso per il frame rate).
 */
export function buildWallSegments(
  wallLength: number,
  wallHeight: number,
  thickness: number,
  openings: WallOpening[],
): WallSegment[] {
  const segments: WallSegment[] = [];
  const halfL = wallLength / 2;
  const sorted = [...openings].sort((a, b) => a.offsetX - b.offsetX);

  // Montanti: colonne a piena altezza nei tratti liberi da aperture.
  let cursor = -halfL;
  sorted.forEach((opening, i) => {
    const left = opening.offsetX - opening.width / 2;
    if (left > cursor) {
      const width = left - cursor;
      segments.push({
        id: `montante-${i}`,
        size: [width, wallHeight, thickness],
        position: [cursor + width / 2, 0, 0],
      });
    }
    cursor = opening.offsetX + opening.width / 2;
  });
  if (cursor < halfL) {
    const width = halfL - cursor;
    segments.push({
      id: 'montante-fine',
      size: [width, wallHeight, thickness],
      position: [cursor + width / 2, 0, 0],
    });
  }

  // Architravi sopra ogni apertura, e davanzali sotto le finestre (non sotto la porta).
  sorted.forEach((opening, i) => {
    const top = opening.baseY + opening.height;
    if (top < wallHeight) {
      segments.push({
        id: `architrave-${i}`,
        size: [opening.width, wallHeight - top, thickness],
        position: [opening.offsetX, top, 0],
      });
    }
    if (opening.baseY > 0) {
      segments.push({
        id: `davanzale-${i}`,
        size: [opening.width, opening.baseY, thickness],
        position: [opening.offsetX, 0, 0],
      });
    }
  });

  return segments;
}
