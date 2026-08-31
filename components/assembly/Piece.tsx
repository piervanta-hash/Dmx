'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { PALETTE } from '@/lib/assembly-data';

interface PieceMeshProps {
  size: [number, number, number];
  color: string;
}

/**
 * Box con pivot alla base (non al centro) e bordi in overlay (EdgesGeometry),
 * per leggibilità da disegno tecnico anche su fondo chiaro.
 */
export function PieceMesh({ size, color }: PieceMeshProps) {
  const [w, h, d] = size;

  const geometry = useMemo(() => {
    const box = new THREE.BoxGeometry(w, h, d);
    box.translate(0, h / 2, 0);
    return box;
  }, [w, h, d]);

  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <group>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.75} metalness={0.1} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={PALETTE.edge} transparent opacity={0.35} />
      </lineSegments>
    </group>
  );
}
