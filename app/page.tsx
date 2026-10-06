import Hero from "@/components/Hero";

export default function Page() {
  return (
    <main>
      <Hero />
      <section className="grid h-svh place-items-center px-6 text-center">
        <p className="max-w-xl font-display text-xl md:text-2xl">
          Next.js, GSAP ScrollTrigger and Tailwind. No scroll libraries beyond that.
        </p>
      </section>
    </main>
  );
}
