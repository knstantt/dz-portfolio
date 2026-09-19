"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import ProjectSlider from "@/components/ProjectSlider";
import Manifesto from "@/components/Manifesto";
import Contacts from "@/components/Contacts";
import { projects } from "@/data/projectsData";
import { EASE } from "@/lib/geometry";

// Right-hand view switch: slide on the Y axis + fade.
const viewMotion = {
  initial: { opacity: 0, y: 56 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -56 },
  transition: { duration: 0.6, ease: EASE },
};

export default function Shell() {
  const [view, setView] = useState("works");
  const [index, setIndex] = useState(0); // active slide
  const [openIndex, setOpenIndex] = useState(null); // expanded project, or null
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  const navigate = useCallback((next) => {
    setDrawerOpen(false);
    setOpenIndex(null);
    setView(next);
  }, []);

  const openProject = useCallback((i) => {
    setIndex(i);
    setOpenIndex(i);
  }, []);

  const nextProject = useCallback(() => {
    setOpenIndex((cur) => {
      const n = ((cur ?? 0) + 1) % projects.length;
      setIndex(n);
      return n;
    });
  }, []);

  const activeProject = openIndex !== null ? projects[openIndex] : null;

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-[100dvh] w-full overflow-hidden bg-white text-ink">
        <Sidebar
          view={view}
          project={activeProject}
          onNavigate={navigate}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />

        <main className="relative h-full min-w-0 flex-1 bg-paper pt-14 lg:pt-0">
          <div className="relative h-full w-full overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              {view === "works" && (
                <motion.div key="works" className="absolute inset-0" {...viewMotion}>
                  <ProjectSlider
                    index={index}
                    setIndex={setIndex}
                    openIndex={openIndex}
                    onOpen={openProject}
                    onClose={() => setOpenIndex(null)}
                    onNext={nextProject}
                    showIntro={!introDone}
                    onIntroDone={() => setIntroDone(true)}
                  />
                </motion.div>
              )}
              {view === "manifesto" && (
                <motion.div
                  key="manifesto"
                  className="thin-scroll absolute inset-0 overflow-y-auto bg-white"
                  {...viewMotion}
                >
                  <Manifesto onContact={() => navigate("contacts")} />
                </motion.div>
              )}
              {view === "contacts" && (
                <motion.div
                  key="contacts"
                  className="thin-scroll absolute inset-0 overflow-y-auto bg-white"
                  {...viewMotion}
                >
                  <Contacts />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </MotionConfig>
  );
}
