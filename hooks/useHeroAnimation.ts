"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PAD = 16; // car inset from the left/right edges (px)
const REVEAL = 60; // px of car travel an item takes to fully appear
const GHOST = 0; // opacity before reveal. 0 = hidden; try 0.12 for a faint headline and stats on load
const SCROLL_LENGTH = { desktop: "+=150%", mobile: "+=120%" };

/**
 * One pinned, scrubbed timeline (progress 0 -> 1):
 *  - the car travels left to right (x only)
 *  - every letter and stat is placed on the timeline at the progress where the
 *    car's nose reaches it, so the reveal is driven by the car's real position
 * Positions are measured from the DOM, so the build re-runs when the width changes.
 */
export function useHeroAnimation(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;

    let ctx: gsap.Context | undefined;
    let lastWidth = window.innerWidth;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const build = (playIntro: boolean) => {
      ctx = gsap.context(() => {
        const car = root.querySelector<SVGElement>("[data-car]")!;
        const road = root.querySelector<HTMLElement>("[data-road]")!;
        const letters = gsap.utils.toArray<HTMLElement>("[data-letter]", root);
        const stats = gsap.utils.toArray<HTMLElement>("[data-stat]", root);
        const setNum = (el: HTMLElement, v: number) => {
          el.querySelector("[data-num]")!.textContent = `${Math.round(v)}%`;
        };

        const carW = car.getBoundingClientRect().width; // SVG elements have no offsetWidth
        const start = PAD;
        const end = root.clientWidth - carW - PAD;
        const travel = Math.max(end - start, 1);
        const gate = start + carW + 6; // nothing reveals until the car actually moves
        const span = REVEAL / travel;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gsap.set(car, { x: end });
          gsap.set([...letters, ...stats], { opacity: 1, y: 0 });
          stats.forEach((s) => setNum(s, Number(s.dataset.value)));
          return;
        }

        const rootLeft = root.getBoundingClientRect().left;
        const centerOf = (el: HTMLElement) => {
          const r = el.getBoundingClientRect();
          return r.left - rootLeft + r.width / 2;
        };
        // Timeline progress at which the car's nose reaches x.
        const at = (x: number) =>
          Math.min((Math.max(x, gate) - start - carW) / travel, 1 - span);

        const tl = gsap.timeline({
          defaults: { ease: "none" }, // scrub supplies the smoothing
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: window.innerWidth < 768 ? SCROLL_LENGTH.mobile : SCROLL_LENGTH.desktop,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.fromTo(car, { x: start }, { x: end, duration: 1 }, 0);

        letters.forEach((el) => {
          tl.fromTo(el, { opacity: GHOST, y: 14 }, { opacity: 1, y: 0, duration: span }, at(centerOf(el)));
        });

        stats.forEach((el) => {
          const t = at(centerOf(el));
          const counter = { v: 0 };
          tl.fromTo(el, { opacity: GHOST, y: 18 }, { opacity: 1, y: 0, duration: span }, t);
          tl.to(
            counter,
            { v: Number(el.dataset.value), duration: span, onUpdate: () => setNum(el, counter.v) },
            t,
          );
        });

        if (playIntro) {
          // One-time load sequence: the road draws in, then the car fades up onto it.
          const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
          intro
            .from(road, { scaleX: 0, duration: 1.1 })
            .from(car, { opacity: 0, scale: 0.92, duration: 0.8 }, 0.25);
          if (GHOST > 0) {
            intro
              .to(letters, { opacity: GHOST, duration: 0.6, stagger: 0.04 }, 0.5)
              .to(stats, { opacity: GHOST, duration: 0.6, stagger: 0.15 }, 1.0);
          }
        }
      }, root);
    };

    build(true);

    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ctx?.revert();
        build(false);
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      ctx?.revert();
    };
  }, [scope]);
}
