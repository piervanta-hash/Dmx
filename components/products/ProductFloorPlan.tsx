'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { ModelData } from '@/lib/products-data';
import type { PlanConfig } from '@/lib/plans/types';
import { formatArea, formatMm } from '@/lib/format';
import { FloorPlan } from './FloorPlan';

/** Risolve i dati geometrici del modello (locale-indipendenti) nelle etichette della
 *  lingua corrente, producendo il PlanConfig pronto per FloorPlan. */
export function ProductFloorPlan({ model, title }: { model: ModelData; title: string }) {
  const locale = useLocale();
  const t = useTranslations('products.rooms');
  const { dimensions } = model;

  const cfg: PlanConfig = {
    W: dimensions.w,
    D: dimensions.d,
    rooms: model.rooms.map((rm) => ({
      x: rm.x,
      y: rm.y,
      w: rm.w,
      h: rm.h,
      lx: rm.lx,
      ly: rm.ly,
      label: t(rm.key),
      area: rm.areaM2 !== undefined ? formatArea(rm.areaM2, locale) : undefined,
    })),
    windows: model.windows,
    doors: model.doors,
    fixtures: model.fixtures,
    extraDims: model.extraDims,
    dimW: formatMm(dimensions.w, locale),
    dimD: formatMm(dimensions.d, locale),
  };

  return <FloorPlan cfg={cfg} title={title} />;
}
