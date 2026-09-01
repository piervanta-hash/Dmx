/**
 * Sistema di design Domeinox — fonte di verità unica per palette e proporzioni.
 * Specchia i token CSS in app/globals.css: usare qui per Canvas/SVG/R3F dove
 * serve un valore hex in JS, non per markup React (lì: classi Tailwind).
 */

export const PALETTE = {
  zinco: '#C3C7C1', // superficie dominante — non il bianco
  grafite: '#24272A', // testo, sezioni scure a piena pagina
  calce: '#EDEEEA', // fondo chiaro, freddo
  pav: '#E4E6E1', // riempimento interno nelle planimetrie
  genziana: '#16558F', // accento unico: link, stati attivi, quote
  minio: '#9E4B32', // solo il telaio in acciaio
  /** Stessa tinta di genziana, schiarita per restare leggibile (AA) su fondo grafite.
   *  Non è un settimo colore: è genziana adattata al fondo scuro, non un accento nuovo. */
  genzianaSuScuro: '#82A2BC',
} as const;

export type PaletteToken = keyof typeof PALETTE;

/** Le uniche due proporzioni ammesse per immagini e blocchi di contenuto. */
export const RATIOS = {
  /** Fronte del modulo — 2438 × 2591 mm */
  fronte: 2438 / 2591,
  /** Fianco del modulo — 6058 × 2591 mm */
  fianco: 6058 / 2591,
} as const;

/** Il greco non è coperto dal subset Archivo disponibile: serve un fallback dedicato
 *  (es. Noto Sans) attivo solo per la build/locale `el`, non un secondo font generale. */
export const GREEK_FALLBACK_NEEDED = true;
