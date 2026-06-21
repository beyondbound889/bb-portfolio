import { ArrowUpRight, Check } from "lucide-react";
import { beyondBound } from "@/lib/content";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SteadyLine } from "@/components/ui/SteadyLine";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function BeyondBound() {
  const b = beyondBound;
  return (
    <Section id="beyond-bound" tint>
      <Reveal>
        <Eyebrow>{b.eyebrow}</Eyebrow>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-semibold tracking-tightest text-ink sm:text-5xl">
            {b.title}
          </h2>
          <a
            href={b.product.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-petrol"
          >
            {b.product.cta.label}
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate">{b.lede}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal className="grid gap-6">
          <div className="rounded-2xl border border-line bg-surface p-7 dark:bg-surface/50 dark:backdrop-blur-xl dark:backdrop-saturate-150">
            <p className="font-mono text-[11px] uppercase tracking-widest text-petrol">Mission</p>
            <p className="mt-3 text-lg leading-relaxed text-ink">{b.mission}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7 dark:bg-surface/50 dark:backdrop-blur-xl dark:backdrop-saturate-150">
            <p className="font-mono text-[11px] uppercase tracking-widest text-petrol">Vision</p>
            <p className="mt-3 text-lg leading-relaxed text-ink">{b.vision}</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7 dark:bg-surface/50 dark:backdrop-blur-xl dark:backdrop-saturate-150">
            <p className="font-display text-base font-semibold text-ink">{b.approachTitle}</p>
            <ul className="mt-4 space-y-3">
              {b.approach.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-slate">
                  <Check size={18} className="mt-0.5 shrink-0 text-sprout" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-6">
          <ParallaxImage
            src="/images/priyanshu-desk.png"
            alt="Priyanshu Chauhan working alongside Beyond Bound products"
            sizes="(max-width: 1024px) 90vw, 560px"
            strength={26}
            wrapperClassName="aspect-[16/11] rounded-2xl border border-line"
          />

          <div className="rounded-2xl border border-line bg-ink p-7 text-paper transition-shadow duration-300 hover:shadow-[0_30px_80px_-24px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-2xl font-semibold">{b.product.name}</p>
                <p className="mt-1 font-mono text-xs text-paper/60">{b.product.type}</p>
              </div>
              <span className="rounded-full bg-sprout/15 px-3 py-1 font-mono text-[11px] text-sprout">
                Live on Amazon.in
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-paper/80">{b.product.desc}</p>
            <div className="mt-6 rounded-xl bg-paper/5 p-4 ring-1 ring-paper/10">
              <p className="font-mono text-[10px] uppercase tracking-widest text-sprout">
                Founder self-observation
              </p>
              <p className="mt-2 text-sm leading-relaxed text-paper/85">{b.product.observation}</p>
              <div className="mt-3">
                <SteadyLine className="h-8" showSpike />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-slate">{b.disclaimer}</p>
      </Reveal>
    </Section>
  );
}