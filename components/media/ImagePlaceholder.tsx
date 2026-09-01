interface ImagePlaceholderProps {
  /** Nome file previsto, per il brief fotografico finale — non un'etichetta decorativa. */
  slot: string;
  ratio: "fronte" | "fianco";
  caption: string;
  className?: string;
  /** Rendering tecnico reale (SVG generato) da mostrare al posto del segnaposto grigio. */
  src?: string;
  alt?: string;
}

/**
 * Immagine (o, finché non esiste una fotografia, un rendering tecnico reale) con la
 * proporzione già applicata — fronte 0,94:1 o fianco 2,34:1 — così il layout non si
 * muove quando arriva il file definitivo.
 */
export function ImagePlaceholder({ slot, ratio, caption, className = "", src, alt }: ImagePlaceholderProps) {
  const aspectClass = ratio === "fronte" ? "aspect-fronte" : "aspect-fianco";
  return (
    <div className={`flex flex-col ${className}`}>
      {src ? (
        <div className={`${aspectClass} w-full overflow-hidden bg-pav outline outline-1 -outline-offset-1 outline-grafite/20`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG statico locale, next/image non aggiunge nulla qui. */}
          <img src={src} alt={alt ?? ""} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div
          className={`${aspectClass} flex w-full items-end justify-start bg-pav p-4 outline outline-1 -outline-offset-1 outline-grafite/20`}
        >
          <span className="type-data text-grafite/75">{slot}</span>
        </div>
      )}
      {caption && <p className="type-data mt-2 text-grafite/75">{caption}</p>}
    </div>
  );
}
