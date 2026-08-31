'use client';

import { PALETTE, MODULE } from '@/lib/assembly-data';

interface DimensionOverlayProps {
  visible: boolean;
}

/**
 * Quote dimensionali disegnate via stroke-dashoffset (900ms) quando il modulo si chiude.
 * Linee sottili con trattini terminali, in stile tavola tecnica.
 */
export function DimensionOverlay({ visible }: DimensionOverlayProps) {
  const lineStyle: React.CSSProperties = {
    stroke: PALETTE.dimensionLine,
    strokeWidth: 1.5,
    fill: 'none',
    strokeDasharray: 600,
    strokeDashoffset: visible ? 0 : 600,
    transition: 'stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const tick = (x1: number, y1: number, x2: number, y2: number) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={PALETTE.dimensionLine} strokeWidth={1.5} />
  );

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 500"
      aria-hidden={!visible}
    >
      {/* Quota lunghezza: 6058 */}
      <line x1={120} y1={430} x2={620} y2={430} style={lineStyle} />
      {tick(120, 422, 120, 438)}
      {tick(620, 422, 620, 438)}
      <text x={370} y={455} fill={PALETTE.dimensionLine} fontSize={14} textAnchor="middle" opacity={visible ? 1 : 0} style={{ transition: 'opacity 300ms 600ms' }}>
        {MODULE.length} mm
      </text>

      {/* Quota profondità: 2438 */}
      <line x1={660} y1={200} x2={660} y2={420} style={lineStyle} />
      {tick(652, 200, 668, 200)}
      {tick(652, 420, 668, 420)}
      <text x={676} y={315} fill={PALETTE.dimensionLine} fontSize={14} textAnchor="start" opacity={visible ? 1 : 0} style={{ transition: 'opacity 300ms 600ms' }}>
        {MODULE.width} mm
      </text>

      {/* Quota altezza: 2591 */}
      <line x1={80} y1={100} x2={80} y2={420} style={lineStyle} />
      {tick(72, 100, 88, 100)}
      {tick(72, 420, 88, 420)}
      <text x={64} y={260} fill={PALETTE.dimensionLine} fontSize={14} textAnchor="end" opacity={visible ? 1 : 0} style={{ transition: 'opacity 300ms 600ms' }}>
        {MODULE.height} mm
      </text>
    </svg>
  );
}
