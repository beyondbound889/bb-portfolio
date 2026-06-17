import Image from "next/image";
import { philosophy } from "@/lib/content";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Philosophy() {
  return (
    <Section id="philosophy">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>{philosophy.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.08] tracking-tightest text-ink sm:text-[2.6rem]">
              {philosophy.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/priyanshu-window.png"
                alt="Priyanshu Chauhan in thought"
                fill
                sizes="(max-width: 1024px) 90vw, 380px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="space-y-6">
          {philosophy.body.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-lg leading-relaxed text-slate first:text-xl first:text-ink">
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <p className="border-l-2 border-petrol pl-5 font-display text-xl font-medium leading-snug text-ink">
              “If a product can’t hold up to being measured on the founder first,
              it has no business being sold to anyone.”
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
