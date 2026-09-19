"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { NAV, SITE, UI } from "@/lib/site";
import { EASE } from "@/lib/geometry";

function Socials({ className = "" }) {
  const link =
    "text-xs text-neutral-500 transition-colors hover:text-black";
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <a href={SITE.telegram} target="_blank" rel="noreferrer" className={link}>
        Telegram
      </a>
      <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className={link}>
        WhatsApp
      </a>
    </div>
  );
}

function GetInTouch({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border border-black px-6 py-3 text-xs font-semibold tracking-wide transition-colors hover:bg-black hover:text-white ${className}`}
    >
      {UI.cta}
    </button>
  );
}

function ProjectInfo({ project }) {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <h2 className="text-[13px] font-bold uppercase tracking-[0.08em]">
        {project.title}
      </h2>
      <p className="mt-1 text-xs text-neutral-500">{project.year}</p>
      <dl className="mt-8 space-y-3 text-xs">
        {project.details.map(([k, v]) => (
          <div key={k}>
            <dt className="text-neutral-400">{k}</dt>
            <dd className="mt-0.5 leading-relaxed">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 max-w-[34ch] text-xs leading-[1.75] text-neutral-600">
        {project.description}
      </p>
    </motion.div>
  );
}

function NavList({ view, onNavigate, layoutId, large = false }) {
  return (
    <ul className={large ? "space-y-6" : "space-y-3"}>
      {NAV.map((item) => {
        const active = view === item.id;
        return (
          <li key={item.id} className="relative">
            {active && !large && (
              <motion.span
                layoutId={layoutId}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute -left-10 top-[2px] h-4 w-2 bg-black"
              />
            )}
            <button
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={active ? "page" : undefined}
              className={`${
                large ? "text-2xl" : "text-[13px]"
              } leading-5 transition-colors ${
                active ? "font-semibold text-black" : "text-neutral-500 hover:text-black"
              }`}
            >
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function Sidebar({
  view,
  project,
  onNavigate,
  drawerOpen,
  setDrawerOpen,
}) {
  const showInfo = view === "works" && project;

  return (
    <>
      {/* Desktop: sticky left column */}
      <aside className="relative z-30 hidden h-full w-[27%] min-w-[280px] max-w-[440px] shrink-0 flex-col justify-between bg-white px-10 py-9 lg:flex">
        <div>
          <button
            type="button"
            onClick={() => onNavigate("works")}
            className="text-left"
          >
            <span className="block text-[15px] font-bold tracking-[0.02em]">
              {SITE.name}
            </span>
            <span className="mt-1 block text-xs text-neutral-500">
              {SITE.role}
            </span>
          </button>
        </div>

        <div className="thin-scroll -mx-10 my-8 min-h-0 flex-1 overflow-y-auto px-10 pt-16">
          <AnimatePresence mode="wait" initial={false}>
            {showInfo ? (
              <ProjectInfo key={project.id} project={project} />
            ) : (
              <motion.nav
                key="nav"
                aria-label="Основное меню"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <NavList view={view} onNavigate={onNavigate} layoutId="nav-marker" />
                <div className="mt-3">
                  <Link
                    href="/reviews"
                    className="text-[13px] leading-5 text-neutral-500 hover:text-black transition-colors block"
                  >
                    Отзывы
                  </Link>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <GetInTouch onClick={() => onNavigate("contacts")} />
          <Socials />
        </div>
      </aside>

      {/* Mobile: top bar + drawer */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-5 lg:hidden">
        <button type="button" onClick={() => onNavigate("works")} className="text-left">
          <span className="block text-[13px] font-bold leading-4">{SITE.name}</span>
          <span className="block text-[11px] leading-4 text-neutral-500">
            {SITE.role}
          </span>
        </button>
        <button
          type="button"
          aria-label={drawerOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="relative h-10 w-10"
        >
          <span
            className={`absolute left-2.5 h-px w-5 bg-black transition-all duration-300 ${
              drawerOpen ? "top-5 rotate-45" : "top-[15px]"
            }`}
          />
          <span
            className={`absolute left-2.5 h-px w-5 bg-black transition-all duration-300 ${
              drawerOpen ? "top-5 -rotate-45" : "top-[24px]"
            }`}
          />
        </button>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer"
            className="fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col justify-between bg-white px-6 pb-8 pt-10 lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav aria-label="Основное меню">
              <NavList view={view} onNavigate={onNavigate} layoutId="nav-marker-m" large />
              <div className="mt-6">
                <Link
                  href="/reviews"
                  className="text-2xl leading-5 text-neutral-500 hover:text-black transition-colors block"
                >
                  Отзывы
                </Link>
              </div>
            </nav>
            <div className="space-y-6">
              <GetInTouch onClick={() => onNavigate("contacts")} className="w-full" />
              <Socials />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}