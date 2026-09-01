'use client';

import { useTranslations } from 'next-intl';
import { AssemblySection } from '@/components/assembly/AssemblySection';

/** Ponte fra i contenuti localizzati e il blocco 3D, che non sa nulla di next-intl. */
export function AssemblyMontageSection() {
  const t = useTranslations('home.assembly');
  const captions = t.raw('stages') as string[];

  return <AssemblySection heading={t('heading')} fallbackAlt={t('fallbackAlt')} captions={captions} />;
}
