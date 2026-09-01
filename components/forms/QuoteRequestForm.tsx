'use client';

import { useId, useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import {
  EMPTY_QUOTE_REQUEST,
  validateQuoteRequest,
  type QuoteRequestErrors,
  type QuoteRequestPayload,
} from '@/lib/quote-request';

const fieldClass =
  'type-body w-full border-b border-grafite/40 bg-transparent py-3 text-grafite placeholder:text-grafite/50 focus:border-genziana focus:outline-none';
const labelClass = 'type-data text-grafite/75';

interface QuoteRequestFormProps {
  /** In arrivo dal configuratore, tipo di progetto e quantità sono già noti (mostrati nel riepilogo a monte). */
  hideProjectFields?: boolean;
  prefill?: Partial<QuoteRequestPayload>;
}

/** Form di richiesta preventivo — riusato sia standalone (/contatti) sia in coda al configuratore. */
export function QuoteRequestForm({ hideProjectFields = false, prefill }: QuoteRequestFormProps) {
  const t = useTranslations('quoteRequest');
  const formId = useId();
  const [payload, setPayload] = useState<QuoteRequestPayload>({ ...EMPTY_QUOTE_REQUEST, ...prefill });
  const [errors, setErrors] = useState<QuoteRequestErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  function update<K extends keyof QuoteRequestPayload>(key: K, value: QuoteRequestPayload[K]) {
    setPayload((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const fieldErrors = validateQuoteRequest(payload);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setStatus('submitting');
    setSubmitError(null);
    try {
      const res = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
      } else if (data.error === 'rateLimited') {
        setStatus('error');
        setSubmitError(t('errors.rateLimited'));
      } else if (data.errors) {
        setErrors(data.errors);
        setStatus('idle');
      } else {
        setStatus('error');
        setSubmitError(t('errors.generic'));
      }
    } catch {
      setStatus('error');
      setSubmitError(t('errors.generic'));
    }
  }

  if (status === 'success') {
    return (
      <div className="border-t border-grafite/15 pt-8">
        <p className="type-display text-display-3 text-grafite">{t('success.title')}</p>
        <p className="type-body mt-3 text-grafite/75">{t('success.body')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
      {!hideProjectFields && (
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-projectType`} className={labelClass}>
              {t('fields.projectType.label')}
            </label>
            <input
              id={`${formId}-projectType`}
              className={fieldClass}
              placeholder={t('fields.projectType.placeholder')}
              value={payload.projectType}
              onChange={(e) => update('projectType', e.target.value)}
              aria-invalid={errors.projectType ? true : undefined}
            />
            {errors.projectType && <p className="type-data mt-2 text-minio">{t(`errors.${errors.projectType}`)}</p>}
          </div>
          <div>
            <label htmlFor={`${formId}-quantity`} className={labelClass}>
              {t('fields.quantity.label')}
            </label>
            <input
              id={`${formId}-quantity`}
              type="number"
              min={1}
              className={fieldClass}
              value={payload.quantity}
              onChange={(e) => update('quantity', Number(e.target.value))}
              aria-invalid={errors.quantity ? true : undefined}
            />
            {errors.quantity && <p className="type-data mt-2 text-minio">{t(`errors.${errors.quantity}`)}</p>}
          </div>
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-destinationCountry`} className={labelClass}>
            {t('fields.destinationCountry.label')}
          </label>
          <input
            id={`${formId}-destinationCountry`}
            className={fieldClass}
            value={payload.destinationCountry}
            onChange={(e) => update('destinationCountry', e.target.value)}
            aria-invalid={errors.destinationCountry ? true : undefined}
          />
          {errors.destinationCountry && (
            <p className="type-data mt-2 text-minio">{t(`errors.${errors.destinationCountry}`)}</p>
          )}
        </div>
        <div>
          <label htmlFor={`${formId}-desiredDeliveryDate`} className={labelClass}>
            {t('fields.desiredDeliveryDate.label')}
          </label>
          <input
            id={`${formId}-desiredDeliveryDate`}
            type="date"
            className={fieldClass}
            value={payload.desiredDeliveryDate}
            onChange={(e) => update('desiredDeliveryDate', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-notes`} className={labelClass}>
          {t('fields.notes.label')}
        </label>
        <textarea
          id={`${formId}-notes`}
          rows={4}
          className={fieldClass}
          value={payload.notes}
          onChange={(e) => update('notes', e.target.value)}
        />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClass}>
            {t('fields.name.label')}
          </label>
          <input
            id={`${formId}-name`}
            className={fieldClass}
            value={payload.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={errors.name ? true : undefined}
          />
          {errors.name && <p className="type-data mt-2 text-minio">{t(`errors.${errors.name}`)}</p>}
        </div>
        <div>
          <label htmlFor={`${formId}-company`} className={labelClass}>
            {t('fields.company.label')}
          </label>
          <input
            id={`${formId}-company`}
            className={fieldClass}
            value={payload.company}
            onChange={(e) => update('company', e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-email`} className={labelClass}>
            {t('fields.email.label')}
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            className={fieldClass}
            value={payload.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && <p className="type-data mt-2 text-minio">{t(`errors.${errors.email}`)}</p>}
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className={labelClass}>
            {t('fields.phone.label')}
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            className={fieldClass}
            value={payload.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </div>
      </div>

      {/* Honeypot: invisibile e non raggiungibile da tastiera per un utente reale, ma i bot che compilano
          ogni campo del form ci cascano. Nessun captcha, come richiesto dal brief. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={payload.honeypot}
          onChange={(e) => update('honeypot', e.target.value)}
        />
      </div>

      {submitError && <p className="type-data text-minio">{submitError}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="type-body self-start border border-grafite px-8 py-4 text-grafite transition-colors hover:bg-grafite hover:text-calce disabled:opacity-50"
      >
        {status === 'submitting' ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
