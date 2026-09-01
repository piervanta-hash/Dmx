'use client';

import { useEffect, useRef, useState } from 'react';
import { buildPlan } from '@/lib/plans/engine';
import type { PlanConfig } from '@/lib/plans/types';
import type { Shape } from '@/lib/plans/shapes';

function ShapeNode({ shape }: { shape: Shape }) {
  switch (shape.kind) {
    case 'rect':
      return <rect x={shape.x} y={shape.y} width={shape.w} height={shape.h} fill={shape.fill} stroke={shape.stroke} strokeWidth={shape.strokeWidth} />;
    case 'line':
      return <line x1={shape.x1} y1={shape.y1} x2={shape.x2} y2={shape.y2} stroke={shape.stroke} strokeWidth={shape.strokeWidth} />;
    case 'circle':
      return <circle cx={shape.cx} cy={shape.cy} r={shape.r} fill={shape.fill ?? 'none'} stroke={shape.stroke} strokeWidth={shape.strokeWidth} />;
    case 'ellipse':
      return <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} fill={shape.fill ?? 'none'} stroke={shape.stroke} strokeWidth={shape.strokeWidth} />;
    case 'text':
      return (
        <text
          x={shape.x}
          y={shape.y}
          fill={shape.fill}
          fontSize={shape.size}
          fontFamily="var(--font-sans)"
          fontWeight={shape.weight}
          textAnchor={shape.anchor}
          transform={shape.rotate ? `rotate(${shape.rotate} ${shape.x} ${shape.y})` : undefined}
        >
          {shape.text}
        </text>
      );
    case 'polyline':
      return (
        <polyline
          points={shape.points}
          fill="none"
          stroke={shape.stroke}
          strokeWidth={shape.strokeWidth}
          strokeDasharray={shape.dashArray}
        />
      );
  }
}

/**
 * Pianta quotata di un modello. Responsive per costruzione (viewBox + width:100%),
 * leggibile anche a 360px perché il motore lavora in millimetri reali, non in pixel
 * fissi. Le quote si disegnano una volta sola all'ingresso in viewport — lo stesso
 * pattern usato per il render in apertura, non un terzo tipo di movimento.
 */
export function FloorPlan({ cfg, title }: { cfg: PlanConfig; title: string }) {
  const { W, D } = cfg;
  const { base, dimensions, margins } = buildPlan(cfg);
  const svgRef = useRef<SVGSVGElement>(null);
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [drawn, setDrawn] = useState(reducedMotion);

  useEffect(() => {
    if (drawn || reducedMotion) return;
    const el = svgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [drawn, reducedMotion]);

  const viewBox = `${-margins.left} ${-margins.top} ${W + margins.left + margins.right} ${D + margins.top + margins.bottom}`;

  return (
    <svg ref={svgRef} viewBox={viewBox} className="w-full" role="img" aria-label={title}>
      {base.map((shape, i) => (
        <ShapeNode key={i} shape={shape} />
      ))}
      {dimensions.map((group, i) => (
        <g key={i}>
          {group.lines.map((line, j) => (
            <line
              key={j}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: drawn ? 0 : 1,
                transition: 'stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          ))}
          <g style={{ opacity: drawn ? 1 : 0, transition: 'opacity 300ms 600ms' }}>
            <ShapeNode shape={group.label} />
          </g>
        </g>
      ))}
    </svg>
  );
}
