# Scroll-driven hero

A pinned hero where a top-down car drives across the screen as you scroll, revealing the headline and four stats as it passes them.

**Live:** https://YOUR-USERNAME.github.io/YOUR-REPO/

**Stack:** Next.js (static export), React, Tailwind CSS, GSAP + ScrollTrigger. Fonts are self-hosted through Fontsource.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Push to `main`.
2. In the repo, go to Settings > Pages and set Source to GitHub Actions.
3. `.github/workflows/deploy.yml` builds with `NEXT_PUBLIC_BASE_PATH=/<repo-name>` and publishes `out/`.

## How the scroll logic works

All of it lives in `hooks/useHeroAnimation.ts`.

- **One pinned timeline.** ScrollTrigger pins the hero and maps scroll distance to timeline progress (0 to 1) with `scrub: 1`, which adds the smoothing.
- **The car owns the clock.** Its `x` tween spans the whole timeline with `ease: "none"`, so progress equals position.
- **Reveals follow the car.** Each letter and stat is measured once, then placed on the timeline at the progress where the car's nose reaches it. Letters rise and fade in. Stats rise, fade in, and count up from 0.
- **Clean first frame.** Nothing reveals until the car actually moves, so the page opens on the car and the road only.
- **Load intro.** The road draws in, then the car fades up onto it. This plays once.
- **Performance.** Only `x`, `y`, `scale`, and `opacity` are animated. Layout is measured once per build, never inside the scroll handler.
- **Resize.** Positions are measured from the DOM, so the timeline is rebuilt (debounced) when the width changes. Mobile address-bar resizes are ignored.
- **Reduced motion.** With `prefers-reduced-motion`, the final state renders with no animation.

## Tuning

Constants at the top of the hook: `PAD`, `REVEAL`, `GHOST`, `SCROLL_LENGTH`. Set `GHOST` to `0.12` to show a faint headline and stats on load.
