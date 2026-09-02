'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  MODULE,
  SCALE,
  framePieces,
  floorPiece,
  wallPieces,
  openingPieces,
  roofPiece,
  wall1Openings,
} from '@/lib/assembly-data';
import { buildWallSegments } from '@/lib/wall-segments';
import {
  FRAME_WINDOW,
  FRAME_STAGGER,
  FRAME_DROP_MM,
  FLOOR_WINDOW,
  FLOOR_DROP_MM,
  WALL_WINDOW,
  WALL_STAGGER,
  WALL_DURATION,
  OPENING_WINDOW,
  OPENING_STAGGER,
  OPENING_DURATION,
  ROOF_WINDOW,
  ROOF_DROP_MM,
  CAMERA_AZIMUTH_START,
  CAMERA_AZIMUTH_END,
  CAMERA_ELEVATION_START,
  CAMERA_ELEVATION_END,
  localEasedProgress,
  lerp,
} from '@/lib/assembly-motion';
import { PieceMesh } from './Piece';

export interface ProgressRef {
  current: number;
}

const WALL1_LENGTH = MODULE.length;
const WALL1_HEIGHT = 2300;
const WALL1_THICKNESS = 60;

/** Camera che orbita di pochi gradi in azimut/elevazione, quasi ferma: tavola tecnica, non un giro. */
function CameraRig({ progressRef }: { progressRef: ProgressRef }) {
  const radius = MODULE.length * SCALE * 6.5;
  const target = useRef(
    new THREE.Vector3(0, MODULE.height * SCALE * 0.5, 0),
  ).current;

  useFrame(({ camera }) => {
    const p = progressRef.current;
    const azimuthDeg = lerp(CAMERA_AZIMUTH_START, CAMERA_AZIMUTH_END, p);
    const elevationDeg = lerp(CAMERA_ELEVATION_START, CAMERA_ELEVATION_END, p);
    const azimuth = THREE.MathUtils.degToRad(azimuthDeg);
    const elevation = THREE.MathUtils.degToRad(elevationDeg);

    camera.position.set(
      target.x + radius * Math.cos(elevation) * Math.sin(azimuth),
      target.y + radius * Math.sin(elevation),
      target.z + radius * Math.cos(elevation) * Math.cos(azimuth),
    );
    camera.lookAt(target);
  });

  return null;
}

function FramePieces({ progressRef }: { progressRef: ProgressRef }) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  const [start] = FRAME_WINDOW;

  useFrame(() => {
    const p = progressRef.current;
    framePieces.forEach((piece, i) => {
      const pieceStart = start + i * FRAME_STAGGER;
      const pieceEnd = pieceStart + (FRAME_WINDOW[1] - start - 4 * FRAME_STAGGER);
      const t = localEasedProgress(p, pieceStart, pieceEnd);
      const g = groups.current[i];
      if (!g) return;
      g.position.set(
        piece.position[0] * SCALE,
        (piece.position[1] + lerp(FRAME_DROP_MM, 0, t)) * SCALE,
        piece.position[2] * SCALE,
      );
    });
  });

  return (
    <>
      {framePieces.map((piece, i) => (
        <group key={piece.id} ref={(el) => { groups.current[i] = el; }}>
          <PieceMesh size={piece.size.map((v) => v * SCALE) as [number, number, number]} color={piece.color} />
        </group>
      ))}
    </>
  );
}

function FloorPiece({ progressRef }: { progressRef: ProgressRef }) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = progressRef.current;
    const t = localEasedProgress(p, FLOOR_WINDOW[0], FLOOR_WINDOW[1]);
    if (!group.current) return;
    group.current.position.set(
      floorPiece.position[0] * SCALE,
      (floorPiece.position[1] + lerp(FLOOR_DROP_MM, 0, t)) * SCALE,
      floorPiece.position[2] * SCALE,
    );
  });

  return (
    <group ref={group}>
      <PieceMesh size={floorPiece.size.map((v) => v * SCALE) as [number, number, number]} color={floorPiece.color} />
    </group>
  );
}

function WallPieces({ progressRef }: { progressRef: ProgressRef }) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  const [start] = WALL_WINDOW;

  const wall1Segments = buildWallSegments(WALL1_LENGTH, WALL1_HEIGHT, WALL1_THICKNESS, wall1Openings);

  useFrame(() => {
    const p = progressRef.current;
    wallPieces.forEach((wall, i) => {
      const pieceStart = start + i * WALL_STAGGER;
      const pieceEnd = pieceStart + WALL_DURATION;
      const t = localEasedProgress(p, pieceStart, pieceEnd);
      const g = groups.current[i];
      if (!g) return;
      g.position.set(wall.position[0] * SCALE, wall.position[1] * SCALE, wall.position[2] * SCALE);
      g.rotation.set(
        lerp(wall.restRotation[0], 0, t),
        lerp(wall.restRotation[1], 0, t),
        lerp(wall.restRotation[2], 0, t),
      );
    });
  });

  return (
    <>
      {wallPieces.map((wall, i) => (
        <group key={wall.id} ref={(el) => { groups.current[i] = el; }}>
          {wall.id === 'parete-lunga-2' ? (
            wall1Segments.map((seg) => (
              <group key={seg.id} position={seg.position.map((v) => v * SCALE) as [number, number, number]}>
                <PieceMesh size={seg.size.map((v) => v * SCALE) as [number, number, number]} color={wall.color} />
              </group>
            ))
          ) : (
            <PieceMesh size={wall.size.map((v) => v * SCALE) as [number, number, number]} color={wall.color} />
          )}
        </group>
      ))}
    </>
  );
}

function OpeningPieces({ progressRef }: { progressRef: ProgressRef }) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  const [start] = OPENING_WINDOW;

  useFrame(() => {
    const p = progressRef.current;
    openingPieces.forEach((piece, i) => {
      const pieceStart = start + i * OPENING_STAGGER;
      const pieceEnd = pieceStart + OPENING_DURATION;
      const t = localEasedProgress(p, pieceStart, pieceEnd);
      const g = groups.current[i];
      if (!g) return;
      // Restano nascosti finché le pareti non sono su: prima non hanno una sede in cui stare.
      g.visible = p >= WALL_WINDOW[1];
      // Sede fissa, sempre alla posizione finale (mai in traslazione lungo Z): un serramento
      // che slitta attraverso il foro della parete finiva a tratti fuori dal volume o dietro
      // la parete stessa, invisibile da fuori. Una piccola crescita di scala è già leggibile
      // come "si installa" senza rischiare quel bug geometrico.
      g.position.set(piece.position[0] * SCALE, piece.position[1] * SCALE, piece.position[2] * SCALE);
      const scale = Math.max(0.001, lerp(0.6, 1, t));
      g.scale.setScalar(scale);
    });
  });

  return (
    <>
      {openingPieces.map((piece, i) => (
        <group key={piece.id} ref={(el) => { groups.current[i] = el; }}>
          <PieceMesh size={piece.size.map((v) => v * SCALE) as [number, number, number]} color={piece.color} />
        </group>
      ))}
    </>
  );
}

function RoofPiece({ progressRef }: { progressRef: ProgressRef }) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = progressRef.current;
    const t = localEasedProgress(p, ROOF_WINDOW[0], ROOF_WINDOW[1]);
    if (!group.current) return;
    group.current.position.set(
      roofPiece.position[0] * SCALE,
      (roofPiece.position[1] + lerp(ROOF_DROP_MM, 0, t)) * SCALE,
      roofPiece.position[2] * SCALE,
    );
  });

  return (
    <group ref={group}>
      <PieceMesh size={roofPiece.size.map((v) => v * SCALE) as [number, number, number]} color={roofPiece.color} />
    </group>
  );
}

export function AssemblyScene({ progressRef }: { progressRef: ProgressRef }) {
  return (
    <>
      <CameraRig progressRef={progressRef} />
      {/* Nessuna ombra, come nel resto del sito ("nessuna card, nessuna ombra"): niente
          piano di terra a raccogliere ombre, niente castShadow/receiveShadow — solo lo
          sfondo zinco della sezione CSS sotto il canvas. */}
      <ambientLight intensity={0.85} color="#F5F5F2" />
      <directionalLight position={[6, 8, 4]} intensity={0.9} />
      <FramePieces progressRef={progressRef} />
      <FloorPiece progressRef={progressRef} />
      <WallPieces progressRef={progressRef} />
      <OpeningPieces progressRef={progressRef} />
      <RoofPiece progressRef={progressRef} />
    </>
  );
}
