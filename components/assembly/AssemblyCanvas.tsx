'use client';

import { Canvas } from '@react-three/fiber';
import type { ProgressRef } from './AssemblyScene';
import { AssemblyScene } from './AssemblyScene';

interface AssemblyCanvasProps {
  progressRef: ProgressRef;
  /** Se falso, il render loop è fermo (sezione fuori viewport): niente calore, niente batteria sprecata. */
  active: boolean;
}

export function AssemblyCanvas({ progressRef, active }: AssemblyCanvasProps) {
  return (
    <Canvas
      className="!absolute inset-0"
      shadows
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: false }}
      camera={{ fov: 18, near: 1, far: 200, position: [10, 6, 10] }}
    >
      <color attach="background" args={['#C3C7C1']} />
      <AssemblyScene progressRef={progressRef} />
    </Canvas>
  );
}
