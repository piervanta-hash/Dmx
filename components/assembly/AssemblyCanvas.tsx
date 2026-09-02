'use client';

import { Canvas } from '@react-three/fiber';
import type { ProgressRef } from './AssemblyScene';
import { AssemblyScene } from './AssemblyScene';

interface AssemblyCanvasProps {
  progressRef: ProgressRef;
  /** Se falso, il render loop è fermo (sezione fuori viewport): niente calore, niente batteria sprecata. */
  active: boolean;
}

/**
 * Canvas trasparente: lo sfondo zinco arriva dalla sezione CSS sotto (bg-zinco in
 * AssemblySection), non da un colore WebGL. Impostare il colore via `<color attach>`
 * lo faceva rendere più scuro e desaturato dello stesso hex altrove — la gestione del
 * colore di three.js applica una conversione di spazio colore ai materiali che un
 * background scene non riceve allo stesso modo, quindi lo stesso #C3C7C1 non coincideva
 * più con lo zinco del resto del sito. Alpha true evita il problema alla radice.
 */
export function AssemblyCanvas({ progressRef, active }: AssemblyCanvasProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 18, near: 1, far: 200, position: [10, 6, 10] }}
    >
      <AssemblyScene progressRef={progressRef} />
    </Canvas>
  );
}
