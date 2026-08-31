'use client';

import { STAGES } from '@/lib/assembly-data';

interface CaptionColumnProps {
  stageIndex: number;
}

/** Didascalia singola, cambia a ogni stato: solo dissolvenza in opacità, 200ms, niente slide. */
export function CaptionColumn({ stageIndex }: CaptionColumnProps) {
  return (
    <div className="relative z-10 flex h-full max-w-sm flex-col justify-center px-6 py-12 md:px-10">
      {STAGES.map((stage, i) => (
        <p
          key={stage.caption}
          className="absolute text-lg font-medium text-[#24272A] md:text-xl"
          style={{
            opacity: i === stageIndex ? 1 : 0,
            transition: 'opacity 200ms linear',
          }}
        >
          {stage.caption}
        </p>
      ))}
    </div>
  );
}

/** Variante statica: tutte le didascalie impilate (reduced-motion, fallback). */
export function CaptionColumnStatic() {
  return (
    <div className="flex flex-col gap-4 px-6 py-12 md:px-10">
      {STAGES.map((stage) => (
        <p key={stage.caption} className="text-lg font-medium text-[#24272A] md:text-xl">
          {stage.caption}
        </p>
      ))}
    </div>
  );
}
