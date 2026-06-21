"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { journey } from "@/lib/content";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Journey() {
  const railRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  // Ties the rail's brand-coloured fill to scroll position through the
  // timeline — same "steady line" motif as the hero/product card, just
  // told over time instead of a single SVG path.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 80%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <Section id="journey" tint>
      <Reveal>
        <Eyebrow>Founder journey</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-[1.08] tracking-tightest text-ink sm:text-[2.6rem]">
          From the soil to a measured shelf.
        </h2>
      </Reveal>

      <ol ref={railRef} className="relative mt-14 border-l border-line">
        {/* Animated fill — overlays the static rail exactly, left-0 with a
            1px translate to sit centered on the same boundary the dots
            align to (verified against the dot math below; do not change
            one without the other). */}
        <motion.div
          aria-hidden="true"
          className="absolute -left-px top-0 w-px origin-top bg-gradient-to-b from-sprout via-petrol to-sprout/40"
          style={{ scaleY: reduce ? 1 : fill, height: "100%" }}
        />

        {journey.map((s, i) => (
          <Reveal key={s.index} delay={Math.min(i * 0.05, 0.3)}>
            <li className="group relative grid gap-1 pb-12 pl-8 last:pb-0 sm:grid-cols-[auto_1fr] sm:gap-x-10">
              <span className="absolute -left-[6px] top-1.5 h-3 w-3 rounded-full border-2 border-petrol bg-paper transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_0_4px_rgb(var(--petrol)/0.15)]" />
              <div className="font-mono text-xs text-slate sm:pt-1">
                <span className="text-petrol">{s.index}</span>
                <span className="mt-1 block max-w-[10rem]">{s.period}</span>
              </div>
              <div className="-mx-3 -my-2 rounded-xl px-3 py-2 transition-colors duration-300 group-hover:bg-surface">
                <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-slate">{s.body}</p>
                {s.proof ? (
                  <p className="mt-3 inline-block rounded-full bg-surface px-3 py-1 font-mono text-[11px] text-petrol ring-1 ring-line transition-colors duration-300 group-hover:ring-petrol/40">
                    {s.proof}
                  </p>
                ) : null}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
