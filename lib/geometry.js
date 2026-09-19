// Shared easing: a strong ease-in-out, the "heavy inertia" feel of the reference.
export const EASE = [0.76, 0, 0.24, 1];
export const DURATION = 1.05;

/**
 * Where a project card sits inside the stage, in % of the stage box.
 * Desktop: cards alternate left/right; the title block sits beside the card.
 * `step` is how far (in % of stage height) neighbouring slides are offset,
 * chosen so the next/previous card peeks in from the edge.
 */
export function cardGeometry(i, desktop) {
  if (desktop) {
    const left = i % 2 === 0 ? 17 : 31;
    const width = 42;
    const top = 17;
    const height = 66;
    return {
      left,
      top,
      width,
      height,
      step: 70,
      info: { left: `${left + width + 2.5}%`, bottom: `${100 - top - height}%` },
    };
  }
  const top = 9;
  const height = 56;
  return {
    left: 7,
    top,
    width: 86,
    height,
    step: 82,
    info: { left: "7%", top: `${top + height + 2.5}%` },
  };
}

// CSS clip-path that exactly frames the card inside the stage.
export const insetOf = (g) =>
  `inset(${g.top}% ${100 - g.left - g.width}% ${100 - g.top - g.height}% ${g.left}%)`;

export const FULL = "inset(0% 0% 0% 0%)";
