"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ProjectDetail from "@/components/ProjectDetail";
import { projects } from "@/data/projectsData";
import { UI } from "@/lib/site";
import { useMedia } from "@/lib/useMedia";
import { EASE, DURATION, FULL, cardGeometry, insetOf } from "@/lib/geometry";

const LAST = projects.length - 1;

// How much of a card is masked while it waits outside the centre slot.
const MASK_BELOW = "inset(0% 0% 22% 0%)"; // wipes upward as it arrives
const MASK_ABOVE = "inset(22% 0% 0% 0%)"; // wipes downward as it arrives

export default function ProjectSlider({
  index,
  setIndex,
  openIndex,
  onOpen,
  onClose,
  onNext,
  showIntro,
  onIntroDone,
}) {
  const isDesktop = useMedia("(min-width: 1024px)", true);
  const reduce = useReducedMotion();
  const lockUntil = useRef(0);
  const touchY = useRef(null);
  const isOpen = openIndex !== null;
  const dur = reduce ? 0.01 : DURATION;

  const go = useCallback(
    (dir) => {
      const now = performance.now();
      if (now < lockUntil.current) return;
      const next = Math.min(LAST, Math.max(0, index + dir));
      if (next === index) return;
      lockUntil.current = now + 1100; // let the slide finish before accepting input
      setIndex(next);
    },
    [index, setIndex]
  );

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isOpen) return onClose();
      if (isOpen || showIntro) return;
      if (["ArrowDown", "PageDown", "ArrowRight"].includes(e.key)) go(1);
      if (["ArrowUp", "PageUp", "ArrowLeft"].includes(e.key)) go(-1);
      if (e.key === "Enter" && document.activeElement === document.body) onOpen(index);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, isOpen, onClose, onOpen, showIntro]);

  const onWheel = (e) => {
    if (isOpen || showIntro || Math.abs(e.deltaY) < 24) return;
    go(e.deltaY > 0 ? 1 : -1);
  };
  const onTouchStart = (e) => {
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (touchY.current == null || isOpen || showIntro) return;
    const dy = touchY.current - e.changedTouches[0].clientY;
    touchY.current = null;
    if (Math.abs(dy) > 50) go(dy > 0 ? 1 : -1);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-paper"
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {projects.map((p, i) => {
        const off = i - index;
        if (Math.abs(off) > 2) return null;
        const g = cardGeometry(i, isDesktop);
        const active = off === 0;
        const mask = active ? FULL : off > 0 ? MASK_BELOW : MASK_ABOVE;

        return (
          <motion.div
            key={p.id}
            className="pointer-events-none absolute inset-0"
            initial={false}
            animate={{ y: `${off * g.step}%` }}
            transition={{ duration: dur, ease: EASE }}
          >
            <motion.button
              type="button"
              aria-label={active ? `Открыть проект «${p.title}»` : `Показать проект «${p.title}»`}
              tabIndex={Math.abs(off) <= 1 ? 0 : -1}
              onClick={() => (active ? onOpen(i) : setIndex(i))}
              className="group pointer-events-auto absolute block cursor-pointer overflow-hidden bg-neutral-200"
              style={{
                left: `${g.left}%`,
                top: `${g.top}%`,
                width: `${g.width}%`,
                height: `${g.height}%`,
              }}
              initial={false}
              animate={{ scale: active ? 1 : 0.92, clipPath: mask }}
              transition={{ duration: dur, ease: EASE }}
            >
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ scale: active ? 1 : 1.2 }}
                transition={{ duration: dur * 1.15, ease: EASE }}
              >
                <Image
                  src={p.images[0]}
                  alt={`${p.title}, ${p.year}`}
                  fill
                  sizes="(min-width: 1024px) 34vw, 90vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </motion.div>

              {/* Hover state: dim + arrow, as in the reference */}
              {active && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <svg width="44" height="24" viewBox="0 0 44 24" fill="none" stroke="#fff" strokeWidth="1.2">
                    <path d="M0 12h42M31 1l11 11-11 11" />
                  </svg>
                </span>
              )}
            </motion.button>

            {/* Title + year, revealed after the card lands */}
            <motion.div
              className="pointer-events-none absolute"
              style={g.info}
              initial={false}
              animate={{ opacity: active ? 1 : 0, y: active ? 0 : 24 }}
              transition={{ duration: 0.6, ease: EASE, delay: active ? dur * 0.45 : 0 }}
              aria-hidden={!active}
            >
              <p className="text-[13px] font-bold uppercase tracking-[0.08em]">{p.title}</p>
              <p className="mt-1.5 text-xs text-neutral-500">{p.year}</p>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Stage chrome */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 bg-black px-6 py-1.5 text-[10px] tracking-[0.3em] text-white lg:ml-[8%] lg:px-8">
        {UI.tag}
      </div>
      <p className="pointer-events-none absolute right-5 top-1.5 z-20 text-[10px] tracking-[0.25em] text-neutral-500 lg:right-8">
        {isDesktop ? UI.hintDesktop : UI.hintMobile}
      </p>
      <p className="pointer-events-none absolute bottom-4 right-5 z-20 text-xs tabular-nums text-neutral-500 lg:bottom-6 lg:right-8">
        {index + 1} / {projects.length}
      </p>

      {/* Intro: full-bleed hero that unmasks down into the first card */}
      {showIntro && (
        <motion.div
          className="absolute inset-0 z-30 overflow-hidden bg-black"
          initial={{ clipPath: FULL, opacity: 1 }}
          animate={{ clipPath: insetOf(cardGeometry(0, isDesktop)), opacity: 0 }}
          transition={{
            clipPath: { delay: reduce ? 0 : 1.2, duration: reduce ? 0.01 : 1.25, ease: EASE },
            opacity: { delay: reduce ? 0.02 : 2.35, duration: 0.35 },
          }}
          onAnimationComplete={onIntroDone}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: EASE }}
          >
            <Image
              src={projects[0].images[0]}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Expanded project */}
      <ProjectDetail
        index={openIndex}
        isDesktop={isDesktop}
        onClose={onClose}
        onNext={onNext}
        duration={dur}
      />
    </div>
  );
}
