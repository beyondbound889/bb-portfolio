import { journey } from "@/lib/content";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Journey() {
  return (
    <Section id="journey" tint>
      <Reveal>
        <Eyebrow>Founder journey</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-[1.08] tracking-tightest text-ink sm:text-[2.6rem]">
          From the soil to a measured shelf.
        </h2>
      </Reveal>

      <ol className="mt-14 border-l border-line">
        {journey.map((s, i) => (
          <Reveal key={s.index} delay={Math.min(i * 0.05, 0.3)}>
            <li className="relative grid gap-1 pb-12 pl-8 last:pb-0 sm:grid-cols-[auto_1fr] sm:gap-x-10">
              <span className="absolute -left-[6px] top-1.5 h-3 w-3 rounded-full border-2 border-petrol bg-paper" />
              <div className="font-mono text-xs text-slate sm:pt-1">
                <span className="text-petrol">{s.index}</span>
                <span className="mt-1 block max-w-[10rem]">{s.period}</span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-slate">{s.body}</p>
                {s.proof ? (
                  <p className="mt-3 inline-block rounded-full bg-surface px-3 py-1 font-mono text-[11px] text-petrol ring-1 ring-line">
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
