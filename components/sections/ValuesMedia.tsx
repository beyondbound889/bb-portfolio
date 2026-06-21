import { values, media } from "@/lib/content";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

export function Values() {
  return (
    <Section id="values">
      <div className="grid gap-14 lg:grid-cols-[0.7fr_1fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Operating values</Eyebrow>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.08] tracking-tightest text-ink sm:text-[2.6rem]">
            The rules I won’t bend.
          </h2>
          <p className="mt-4 leading-relaxed text-slate">
            Healthcare runs on trust. These are the standards that keep the brand
            honest when shortcuts would be easier.
          </p>
        </Reveal>

        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {values.map((v) => (
            <StaggerItem
              key={v.title}
              className="group relative z-0 bg-paper p-7 transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:bg-surface hover:shadow-[0_24px_60px_-20px_rgb(var(--petrol)/0.22)]"
            >
              <Icon name={v.icon} className="text-petrol" />
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{v.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

export function Media() {
  return (
    <Section id="media" tint>
      <Reveal>
        <Eyebrow>Media & appearances</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-[1.08] tracking-tightest text-ink sm:text-[2.6rem]">
          Where the work has shown up.
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2">
        {media.map((m) => (
          <StaggerItem key={m.title}>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-petrol/40 hover:shadow-[0_24px_60px_-20px_rgb(var(--petrol)/0.18)]">
              <p className="font-mono text-[11px] uppercase tracking-widest text-petrol">{m.kind}</p>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{m.context}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
