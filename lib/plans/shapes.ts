/** Forme disegnabili: l'output del motore, indipendente da come vengono renderizzate. */

export interface RectShape {
  kind: 'rect';
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface LineShape {
  kind: 'line';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeWidth: number;
}

export interface CircleShape {
  kind: 'circle';
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface EllipseShape {
  kind: 'ellipse';
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export interface TextShape {
  kind: 'text';
  x: number;
  y: number;
  text: string;
  fill: string;
  size: number;
  weight: number;
  anchor: 'start' | 'middle' | 'end';
  rotate?: number;
}

export interface PolylineShape {
  kind: 'polyline';
  points: string;
  stroke: string;
  strokeWidth: number;
  dashArray?: string;
}

export type Shape = RectShape | LineShape | CircleShape | EllipseShape | TextShape | PolylineShape;

/** Una quota completa: le linee (animate al disegno) più l'etichetta (dissolvenza dopo). */
export interface DimensionGroup {
  lines: LineShape[];
  label: TextShape;
}

export function round(n: number): number {
  return Math.round(n * 100) / 100;
}
