'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaptionColumn, CaptionColumnStatic } from './CaptionColumn';
import { DimensionOverlay } from './DimensionOverlay';
import { STAGES, PIN_DURATION_VH, MOBILE_AUTOPLAY_MS } from '@/lib/assembly-data';
import { OVERLAY_THRESHOLD } from '@/lib/assembly-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MOBILE_BREAKPOINT = 768;
const MOUNT_ROOT_MARGIN = '400px';

// Three.js/R3F/GSAP pesano ben oltre il budget del blocco da soli: caricati in un chunk
// separato, scaricato solo quando la sezione si avvicina al viewport (vedi shouldMount).
const AssemblyCanvas = dynamic(() => import('./AssemblyCanvas').then((m) => m.AssemblyCanvas), {
  ssr: false,
});

interface AssemblySectionProps {
  /** Immagine statica dell'assonometria esplosa: fallback pre-caricamento, no-JS, reduced-motion. */
  fallbackSrc?: string;
  /** Titolo accessibile della sezione (sr-only / aria-label), localizzato dal chiamante. */
  heading: string;
  /** Testo alternativo dell'immagine statica, localizzato dal chiamante. */
  fallbackAlt: string;
  /** Una didascalia per ciascuna delle sette fasi dello storyboard, localizzate dal chiamante. */
  captions: string[];
}

function stageIndexFromProgress(progress: number): number {
  const idx = STAGES.findIndex((s) => progress >= s.from && progress < s.to);
  if (idx !== -1) return idx;
  return progress >= 1 ? STAGES.length - 1 : 0;
}

export function AssemblySection({
  fallbackSrc = '/assembly-fallback.svg',
  heading,
  fallbackAlt,
  captions,
}: AssemblySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  // Contenitore mutabile per il progresso: aggiornato ad ogni tick di scroll/autoplay senza
  // passare da React state, per non ridisegnare il DOM 60 volte al secondo.
  const progressRef = useRef<number>(0);

  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);

  // Preferenze utente e viewport: solo lato client.
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => {
      setReducedMotion(motionQuery.matches);
      setIsMobile(widthQuery.matches);
    };
    update();
    motionQuery.addEventListener('change', update);
    widthQuery.addEventListener('change', update);
    return () => {
      motionQuery.removeEventListener('change', update);
      widthQuery.removeEventListener('change', update);
    };
  }, []);

  // Monta il canvas 3D solo quando la sezione si avvicina al viewport: il canvas non è mai l'LCP.
  useEffect(() => {
    if (reducedMotion !== false || !sectionRef.current) return;
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: MOUNT_ROOT_MARGIN },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // Ferma il render loop quando la sezione esce dal viewport, per non scaldare la batteria.
  useEffect(() => {
    if (!shouldMount || !sectionRef.current) return;
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => setIsActive(!!entries[0]?.isIntersecting),
      { threshold: 0.01 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount]);

  const applyProgress = useCallback((progress: number) => {
    progressRef.current = progress;
    const idx = stageIndexFromProgress(progress);
    setStageIndex((prev) => (prev === idx ? prev : idx));
    const shouldShowOverlay = progress >= OVERLAY_THRESHOLD;
    setOverlayVisible((prev) => (prev === shouldShowOverlay ? prev : shouldShowOverlay));
  }, []);

  // Desktop: scroll-driven, sezione in pin per 320vh.
  useEffect(() => {
    if (!shouldMount || reducedMotion || isMobile !== false || !sectionRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * (PIN_DURATION_VH / 100)}`,
      pin: true,
      scrub: 0.3,
      invalidateOnRefresh: true,
      onUpdate: (self) => applyProgress(self.progress),
    });
    ScrollTrigger.refresh();
    return () => trigger.kill();
  }, [shouldMount, reducedMotion, isMobile, applyProgress]);

  // Mobile: nessun pin, autoplay una sola volta all'ingresso in viewport.
  useEffect(() => {
    if (!shouldMount || reducedMotion || isMobile !== true) return;
    const state = { value: 0 };
    const tween = gsap.to(state, {
      value: 1,
      duration: MOBILE_AUTOPLAY_MS / 1000,
      ease: 'none',
      onUpdate: () => applyProgress(state.value),
    });
    return () => {
      tween.kill();
    };
  }, [shouldMount, reducedMotion, isMobile, applyProgress]);

  // --- Reduced motion: niente canvas, niente pin. Assonometria statica + didascalie in colonna. ---
  if (reducedMotion) {
    return (
      <section className="relative flex flex-col items-center gap-8 bg-zinco py-16">
        <h2 className="sr-only">{heading}</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fallbackSrc} alt={fallbackAlt} className="w-full max-w-3xl px-6" />
        <CaptionColumnStatic captions={captions} />
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-zinco"
      aria-label={heading}
    >
      <div ref={stageRef} className="relative h-full w-full">
        {/* Fallback statico: visibile finché il canvas non è montato. */}
        {!shouldMount && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={fallbackSrc}
            alt={fallbackAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {shouldMount && !reducedMotion && (
          <AssemblyCanvas progressRef={progressRef} active={isActive} />
        )}

        <DimensionOverlay visible={overlayVisible} />

        <div className="pointer-events-none absolute inset-0 flex items-center">
          <CaptionColumn stageIndex={stageIndex} captions={captions} />
        </div>
      </div>
    </section>
  );
}
