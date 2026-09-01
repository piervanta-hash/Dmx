import { NextResponse, type NextRequest } from 'next/server';
import { validateQuoteRequest, type QuoteRequestPayload } from '@/lib/quote-request';
import { isRateLimited, recordHit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'rateLimited' }, { status: 429 });
  }

  let payload: QuoteRequestPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'generic' }, { status: 400 });
  }

  // Honeypot compilato: quasi certamente un bot. Rispondiamo "ok" senza elaborare
  // la richiesta, per non rivelare al bot che è stato riconosciuto.
  if (payload.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateQuoteRequest(payload);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  recordHit(ip);

  // TODO: nessun servizio di invio email/CRM è configurato in questo ambiente —
  // la richiesta viene solo registrata nei log del server. Prima della messa in
  // produzione va collegato un provider reale (es. Resend, SMTP, webhook CRM) con
  // le sue credenziali, che non esistono ancora in questo progetto.
  console.log('[quote-request]', JSON.stringify({ ...payload, honeypot: undefined }));

  return NextResponse.json({ ok: true });
}
