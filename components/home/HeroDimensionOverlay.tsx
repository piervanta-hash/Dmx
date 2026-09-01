"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Le quote del render in apertura si disegnano una volta sola, all'ingresso in viewport.
 * Uno dei due soli momenti di movimento orchestrato ammessi in tutto il sito.
 */
export function HeroDimensionOverlay({ width, height }: { width: string; height: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [drawn, setDrawn] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const lineStyle = {
    stroke: "var(--color-genziana)",
    strokeWidth: 1.5,
    fill: "none",
    strokeDasharray: 400,
    strokeDashoffset: drawn ? 0 : 400,
    transition: "stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)",
  } as const;

  const textStyle = {
    fill: "var(--color-genziana)",
    opacity: drawn ? 1 : 0,
    transition: "opacity 300ms 500ms",
  } as const;

  return (
    <svg
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1000 500"
      aria-hidden="true"
    >
      <line x1={60} y1={460} x2={860} y2={460} style={lineStyle} />
      <line x1={60} y1={452} x2={60} y2={468} stroke="var(--color-genziana)" strokeWidth={1.5} />
      <line x1={860} y1={452} x2={860} y2={468} stroke="var(--color-genziana)" strokeWidth={1.5} />
      <text x={460} y={484} fontSize={14} textAnchor="middle" style={textStyle}>
        {width}
      </text>

      <line x1={920} y1={80} x2={920} y2={460} style={lineStyle} />
      <line x1={912} y1={80} x2={928} y2={80} stroke="var(--color-genziana)" strokeWidth={1.5} />
      <line x1={912} y1={460} x2={928} y2={460} stroke="var(--color-genziana)" strokeWidth={1.5} />
      <text x={936} y={274} fontSize={14} textAnchor="start" style={textStyle}>
        {height}
      </text>
    </svg>
  );
}
