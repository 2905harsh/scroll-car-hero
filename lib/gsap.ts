import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once, on the client only.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Mobile address-bar show/hide fires resize; don't recompute for it.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
