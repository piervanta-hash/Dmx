'use client';

interface CaptionColumnProps {
  stageIndex: number;
  captions: string[];
}

/** Didascalia singola, cambia a ogni stato: solo dissolvenza in opacità, 200ms, niente slide. */
export function CaptionColumn({ stageIndex, captions }: CaptionColumnProps) {
  return (
    <div className="relative z-10 flex h-full max-w-sm flex-col justify-center px-6 py-12 md:px-10">
      {captions.map((caption, i) => (
        <p
          key={caption}
          className="type-body absolute text-lg text-grafite md:text-xl"
          style={{
            opacity: i === stageIndex ? 1 : 0,
            transition: 'opacity 200ms linear',
          }}
        >
          {caption}
        </p>
      ))}
    </div>
  );
}

/** Variante statica: tutte le didascalie impilate (reduced-motion, fallback). */
export function CaptionColumnStatic({ captions }: { captions: string[] }) {
  return (
    <div className="flex flex-col gap-4 px-6 py-12 md:px-10">
      {captions.map((caption) => (
        <p key={caption} className="type-body text-lg text-grafite md:text-xl">
          {caption}
        </p>
      ))}
    </div>
  );
}
