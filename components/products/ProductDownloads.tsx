import { useTranslations } from 'next-intl';

/** Area download: i file non esistono ancora — link disattivi con nota esplicita, mai un link morto silenzioso. */
export function ProductDownloads() {
  const t = useTranslations('products.specs');
  const items = [t('downloadPdf'), t('downloadDwg'), t('downloadIfc')];

  return (
    <div>
      <h2 className="type-display text-display-3 text-grafite">{t('downloads')}</h2>
      <ul className="type-body mt-4 flex flex-col gap-2">
        {items.map((label) => (
          <li key={label} className="flex items-baseline justify-between gap-4 border-b border-grafite/15 py-2">
            <span className="text-grafite/75">{label}</span>
            <span className="type-data text-grafite/75">{t('notAvailable')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
