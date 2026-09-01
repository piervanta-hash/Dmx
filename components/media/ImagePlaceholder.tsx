interface ImagePlaceholderProps {
  /** Nome file previsto, per il brief fotografico finale — non un'etichetta decorativa. */
  slot: string;
  ratio: "fronte" | "fianco";
  caption: string;
  className?: string;
}

/**
 * Segnaposto tipizzato per un'immagine non ancora esistente. Proporzione già applicata
 * (fronte 0,94:1 o fianco 2,34:1) così il layout non si muove quando arriva il file vero.
 */
export function ImagePlaceholder({ slot, ratio, caption, className = "" }: ImagePlaceholderProps) {
  const aspectClass = ratio === "fronte" ? "aspect-fronte" : "aspect-fianco";
  return (
    <div className={`flex flex-col ${className}`}>
      <div
        className={`${aspectClass} flex w-full items-end justify-start bg-pav p-4 outline outline-1 -outline-offset-1 outline-grafite/20`}
      >
        <span className="type-data text-grafite/75">{slot}</span>
      </div>
      {caption && <p className="type-data mt-2 text-grafite/75">{caption}</p>}
    </div>
  );
}
