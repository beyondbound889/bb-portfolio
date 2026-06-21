import { ArrowUpRight } from "lucide-react";
import { insights } from "@/lib/content";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Insights() {
  return (
    <Section id="insights" tint>
      <Reveal>
        <Eyebrow>Insights & field notes</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-[1.08] tracking-tightest text-ink sm:text-[2.6rem]">
          Building in the open.
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-slate">
          Observations from the work — published as they happen, including the
          unremarkable results.
        </p>
      </Reveal>

      <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
        {insights.map((a) => (
          <StaggerItem key={a.title}>
            <a
              href={a.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-petrol hover:shadow-[0_24px_60px_-20px_rgb(var(--petrol)/0.22)]"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-petrol">{a.kind}</p>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">{a.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{a.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="font-mono text-[11px] text-slate">{a.source}</span>
                <ArrowUpRight size={16} className="text-petrol transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
