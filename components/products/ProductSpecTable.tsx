'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { ModelData } from '@/lib/products-data';
import { formatArea } from '@/lib/format';
import { DataPlaceholder } from '@/components/media/DataPlaceholder';

/**
 * Tabella dati tecnici, leggibile e non dentro un accordion chiuso — come richiesto
 * dal brief. Ogni riga è un dato reale o un DataPlaceholder visibile, mai un numero
 * inventato.
 */
export function ProductSpecTable({ model }: { model: ModelData }) {
  const t = useTranslations('products.specs');
  const locale = useLocale();
  const { dimensions } = model;
  const isClassA = model.class === 'A';

  const fmt = (n: number) => n.toLocaleString(locale, { useGrouping: true });

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: t('externalDimensions'), value: `${fmt(dimensions.w)} × ${fmt(dimensions.d)} × ${fmt(dimensions.h)} mm` },
    { label: t('netArea'), value: formatArea(model.areaNet, locale) },
    { label: t('grossArea'), value: formatArea(model.areaGross, locale) },
    { label: t('weight'), value: <DataPlaceholder label={t('toConfirm')} /> },
    { label: t('frame'), value: t('frameValue') },
    { label: t('panels'), value: t('panelsValue') },
    { label: t('uValue'), value: <DataPlaceholder label={t('toConfirm')} /> },
    { label: t('fireRating'), value: <DataPlaceholder label={t('toConfirm')} /> },
    { label: t('windowsAndDoors'), value: t('windowsAndDoorsValue') },
    { label: t('electrical'), value: <DataPlaceholder label={t('toConfirm')} /> },
    { label: t('snowWindLoads'), value: <DataPlaceholder label={t('toConfirm')} /> },
    { label: t('stackable'), value: isClassA ? t('stackableYesA') : t('stackableNoB') },
    {
      label: t('combinable'),
      value: isClassA ? t('combinableYes') : <DataPlaceholder label={t('toConfirm')} />,
    },
    { label: t('unitsMonoblock'), value: <DataPlaceholder label={t('toConfirm')} /> },
    {
      label: t('unitsFlatpack'),
      value: model.code === 'B21-L' ? '12' : <DataPlaceholder label={t('toConfirm')} />,
    },
    { label: t('leadTime'), value: <DataPlaceholder label={t('toConfirm')} /> },
  ];

  return (
    <table className="type-data w-full">
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-b border-grafite/15">
            <th className="w-1/2 py-3 pr-6 text-left font-normal text-grafite/75 md:w-2/5">{row.label}</th>
            <td className="py-3 text-grafite">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
