"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/data/projectsData";
import { UI } from "@/lib/site";
import { FULL, EASE, cardGeometry, insetOf } from "@/lib/geometry";

/**
 * Full-stage project view. The card "unmasks": the overlay's clip-path grows
 * from the exact card rectangle to the whole stage, and shrinks back on close.
 */
export default function ProjectDetail({ index, isDesktop, onClose, onNext, duration }) {
  const scroller = useRef(null);
  const open = index !== null;
  const project = open ? projects[index] : null;
  const cardInset = insetOf(cardGeometry(open ? index : 0, isDesktop));

  useEffect(() => {
    if (open && scroller.current) scroller.current.scrollTo({ top: 0 });
  }, [index, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="detail"
          className="absolute inset-0 z-40 bg-paper"
          initial={{ clipPath: cardInset, opacity: 1 }}
          animate={{ clipPath: FULL, opacity: 1 }}
          exit={{ clipPath: cardInset, opacity: 0 }}
          transition={{
            duration,
            ease: EASE,
            opacity: { duration: 0.3, delay: duration * 0.8 },
          }}
        >
          <div ref={scroller} className="thin-scroll h-full overflow-y-auto overscroll-contain">
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Hero */}
              <div className="relative h-[calc(100dvh-3.5rem)] w-full overflow-hidden lg:h-[100dvh]">
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: duration * 1.6, ease: EASE }}
                >
                  <Image
                    src={project.images[0]}
                    alt={`${project.title}, ${project.year}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>

              {/* Details for small screens (desktop shows them in the sidebar) */}
              <section className="bg-white px-6 py-10 lg:hidden">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.08em]">
                  {project.title}
                </h2>
                <p className="mt-1 text-xs text-neutral-500">{project.year}</p>
                <p className="mt-6 text-sm leading-[1.75] text-neutral-700">
                  {project.description}
                </p>
                <dl className="mt-6 space-y-3 text-xs">
                  {project.details.map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-neutral-400">{k}</dt>
                      <dd className="mt-0.5">{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* Галерея: рендерит ВСЕ фото из массива images (кроме обложки) подряд, сверху вниз.
                  Количество фото не важно; высота каждого кадра берётся из самого файла. */}
              <div className="flex flex-col gap-1 bg-white">
                {project.images.slice(1).map((src, n) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`${project.title}, фото ${n + 2}`}
                    width={0}
                    height={0}
                    sizes="(min-width: 1024px) 75vw, 100vw"
                    className="block h-auto w-full"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between bg-white px-6 py-14 lg:px-10">
                <button
                  type="button"
                  onClick={onNext}
                  className="border border-black px-6 py-3 text-xs font-semibold tracking-wide transition-colors hover:bg-black hover:text-white"
                >
                  Следующий проект
                </button>
                <p className="text-xs text-neutral-500">
                  {project.title}, {project.year}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Fixed controls */}
          <button
            type="button"
            onClick={onClose}
            className="absolute left-0 top-0 z-10 flex items-center gap-6 bg-black px-6 py-1.5 text-[10px] tracking-[0.3em] text-white lg:ml-[8%] lg:min-w-[220px] lg:justify-between lg:px-8"
          >
            {UI.back}
            <svg width="9" height="9" viewBox="0 0 9 9" stroke="#fff" strokeWidth="1">
              <path d="M0 0l9 9M9 0L0 9" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute bottom-0 right-0 z-10 hidden bg-white px-8 py-3 text-[10px] tracking-[0.3em] transition-colors hover:bg-black hover:text-white lg:block"
          >
            {UI.nextProject}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
