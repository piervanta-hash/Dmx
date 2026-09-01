/** Tipi condivisi tra il form di richiesta preventivo e la route API che lo riceve. */
export interface QuoteRequestPayload {
  projectType: string;
  quantity: number;
  destinationCountry: string;
  desiredDeliveryDate: string;
  notes: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  /** Campo honeypot: deve restare vuoto. Se compilato, la richiesta è di un bot. */
  honeypot: string;
}

export const EMPTY_QUOTE_REQUEST: QuoteRequestPayload = {
  projectType: '',
  quantity: 1,
  destinationCountry: '',
  desiredDeliveryDate: '',
  notes: '',
  name: '',
  company: '',
  email: '',
  phone: '',
  honeypot: '',
};

export type QuoteRequestErrorCode = 'required' | 'invalidEmail';
export type QuoteRequestErrors = Partial<Record<keyof QuoteRequestPayload, QuoteRequestErrorCode>>;

const REQUIRED_FIELDS: (keyof QuoteRequestPayload)[] = ['projectType', 'destinationCountry', 'name', 'email'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validazione pura, usata sia lato client (feedback immediato) sia lato server (mai fidarsi solo del client). */
export function validateQuoteRequest(payload: QuoteRequestPayload): QuoteRequestErrors {
  const errors: QuoteRequestErrors = {};

  for (const field of REQUIRED_FIELDS) {
    if (typeof payload[field] === 'string' && payload[field].trim() === '') {
      errors[field] = 'required';
    }
  }
  if (!Number.isFinite(payload.quantity) || payload.quantity < 1) {
    errors.quantity = 'required';
  }
  if (payload.email.trim() !== '' && !EMAIL_PATTERN.test(payload.email)) {
    errors.email = 'invalidEmail';
  }

  return errors;
}
