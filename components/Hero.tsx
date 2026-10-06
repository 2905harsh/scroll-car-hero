"use client";

import { useRef } from "react";
import Car from "./Car";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

const WORDS = ["WELCOME", "ITZFIZZ"];

const STATS = [
  { value: 58, label: "Increase in pick up point use" },
  { value: 23, label: "Decrease in customer phone calls" },
  { value: 27, label: "Increase in pick up point use" },
  { value: 40, label: "Decrease in customer phone calls" },
];

export default function Hero() {
  const scope = useRef<HTMLElement>(null);
  useHeroAnimation(scope);

  return (
    <section ref={scope} className="relative h-svh overflow-hidden">
      <h1
        aria-label="Welcome ItzFizz"
        className="absolute inset-x-0 top-[12svh] flex flex-wrap justify-center gap-x-[1.4em] px-4 font-display text-lg sm:text-2xl md:text-4xl lg:text-5xl"
      >
        {WORDS.map((word) => (
          <span key={word} aria-hidden="true" className="inline-flex">
            {[...word].map((char, i) => (
              <span key={i} data-letter className="inline-block px-[0.22em] opacity-0 will-change-transform">
                {char}
              </span>
            ))}
          </span>
        ))}
      </h1>

      <div className="absolute inset-x-0 top-[34svh] flex h-24 items-center md:h-36">
        <div data-road className="absolute inset-0 origin-left bg-road">
          <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-lane/40" />
        </div>
        <Car data-car className="relative z-10 w-24 shrink-0 will-change-transform md:w-40" />
      </div>

      <ul className="absolute inset-x-0 top-[60svh] mx-auto grid w-full max-w-5xl grid-cols-2 gap-x-6 gap-y-8 px-6 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <li key={i} data-stat data-value={stat.value} className="opacity-0 will-change-transform">
            <p data-num className="font-display text-4xl md:text-5xl">0%</p>
            <p className="mt-2 max-w-[18ch] text-sm text-ink/70 md:text-base">{stat.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
