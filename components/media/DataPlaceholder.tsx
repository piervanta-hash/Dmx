/**
 * Segnaposto per un dato tecnico non ancora disponibile (mai un numero inventato).
 * Visibile in sviluppo, distinguibile a colpo d'occhio da un valore reale.
 */
export function DataPlaceholder({ label, size = "sm" }: { label: string; size?: "sm" | "lg" }) {
  const sizeClass = size === "lg" ? "type-display text-display-3 px-4 py-2" : "type-data px-2 py-0.5";
  return (
    <span className={`inline-block border border-dashed border-grafite/40 text-grafite/75 ${sizeClass}`}>
      {label}
    </span>
  );
}
