"use client";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GlucoseChart } from "@/components/ui/GlucoseChart";

/**
 * CGMSection
 *
 * Standalone wrapper for the CGM (Continuous Glucose Monitor) data chart.
 * Previously embedded inside Journey.tsx — now extracted as its own section
 * so it persists after the Journey replacement with EnhancedJourneySection.
 *
 * Placement: immediately after EnhancedJourneySection.
 */
export function CGMSection() {
  return (
    <Section id="cgm-data" tint>
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-petrol">
          The proof behind the product
        </p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold leading-[1.08] tracking-tightest text-ink sm:text-[2.6rem]">
          What the glucose monitor showed.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate">
          Two seasons of self-observation wearing a continuous glucose monitor —
          the same meals, the only variable changing is the formulation. This is
          the data the brand was built on.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="mt-10">
          <GlucoseChart />
        </div>
      </Reveal>
      <Reveal delay={0.25}>
        <p className="mt-6 font-mono text-[11px] text-slate">
          Self-Observation Season 2 currently active. All data is from the
          founder&rsquo;s own CGM sessions — not sourced from third-party studies.
        </p>
      </Reveal>
    </Section>
  );
}