import { personal, vision } from "@/lib/content";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function Personal() {
  return (
    <Section id="personal">
      <Reveal>
        <Eyebrow>{personal.eyebrow}</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-[1.08] tracking-tightest text-ink sm:text-[2.6rem]">
          {personal.title}
        </h2>
      </Reveal>

      <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
        {personal.items.map((p) => (
          <StaggerItem
            key={p.title}
            className="rounded-2xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-petrol/40 hover:shadow-[0_24px_60px_-20px_rgb(var(--petrol)/0.18)] dark:bg-surface/50 dark:backdrop-blur-xl dark:backdrop-saturate-150 dark:hover:bg-surface/70"
          >
            <Icon name={p.icon} className="text-petrol" />
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{p.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export function Vision() {
  return (
    <section id="vision" className="relative overflow-hidden px-6 py-28 sm:py-40">
      <div className="absolute inset-0 -z-10">
        <ParallaxImage
          src="/images/priyanshu-rooftop.png"
          alt=""
          sizes="100vw"
          strength={70}
          wrapperClassName="h-full w-full"
          className="object-center opacity-[0.14] dark:opacity-[0.10]"
        />
        <div className="absolute inset-0 bg-paper/40" />
      </div>

      <div className="mx-auto w-full max-w-shell">
        <Reveal>
          <Eyebrow>{vision.eyebrow}</Eyebrow>
          <h2 className="mt-7 max-w-3xl font-display text-3xl font-semibold leading-[1.06] tracking-tightest text-ink sm:text-5xl">
            {vision.question}
          </h2>
        </Reveal>
        <div className="mt-10 max-w-2xl space-y-5">
          {vision.answer.map((a, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-lg leading-relaxed text-slate">{a}</p>
            </Reveal>
          ))}
          <Reveal delay={0.35}>
            <p className="pt-3 font-display text-2xl font-semibold tracking-tight text-petrol">
              {vision.closing}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}