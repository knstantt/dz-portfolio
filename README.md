# Dmitry Zhilyakov — interior design portfolio

Next.js (App Router) · Tailwind CSS 3 · Framer Motion

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/            layout (Montserrat, Latin + Cyrillic), page, globals.css
components/
  Shell.jsx          view state, right-area AnimatePresence (Y slide + fade)
  Sidebar.jsx        sticky left column; mobile top bar + drawer; project info panel
  ProjectSlider.jsx  vertical slider, intro hero, card reveal
  ProjectDetail.jsx  expanded project (clip-path unmask, gallery, next project)
  Manifesto.jsx / Contacts.jsx
lib/
  projects.js        project data (placeholder copy)
  site.js            contact details + nav
  geometry.js        card positions, easing, clip-path helper
public/images/       portrait.jpg + project-N.jpg (cover) / project-N-2|3.jpg (gallery)
```

## Replace before launch

- **Photos:** overwrite the generated placeholders in `public/images/` (same filenames)
  or edit paths in `lib/projects.js`. Covers work best at ~4:5 portrait, gallery ~16:10.
- **Project titles, years, copy:** `lib/projects.js` (all placeholder).
- **MAX link:** `lib/site.js` → `max` is a placeholder. Telegram uses a phone-number link;
  swap for an @username link if preferred.

## Interaction notes

- Slider: mouse wheel, touch swipe, ↑/↓ or ←/→ keys, click a peeking card to jump to it.
- Click the centred card to expand it; `Esc` or **Back** closes; **Next project** advances.
- `prefers-reduced-motion` is respected.
