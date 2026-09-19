"use client";
import { useEffect, useState } from "react";

// `initial` is what the server renders; the real value is applied after mount.
export function useMedia(query, initial = true) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}
