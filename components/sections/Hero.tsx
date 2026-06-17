"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { hero } from "@/lib/content";
import { SteadyLine } from "@/components/ui/SteadyLine";

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-32 sm:pt-40">
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="mx-auto grid w-full max-w-shell items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div {...rise(0)} className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-petrol">
            <span className="h-px w-6 bg-petrol/50" />
            {hero.eyebrow}
          </motion.div>

          <h1 className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.02] tracking-tightest text-ink sm:text-6xl">
            <motion.span {...rise(0.08)} className="block">
              {hero.headline[0]}
            </motion.span>
            <motion.span {...rise(0.16)} className="block text-petrol">
              {hero.headline[1]}
            </motion.span>
          </h1>

          <motion.div {...rise(0.24)} className="mt-7 max-w-xl">
            <SteadyLine className="h-9" />
          </motion.div>

          <motion.p {...rise(0.32)} className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
            {hero.sub}
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              {hero.primaryCta.label}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-petrol hover:text-petrol"
            >
              {hero.secondaryCta.label}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          <motion.dl {...rise(0.48)} className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {hero.credentials.map((c) => (
              <div key={c.label} className="bg-paper p-4">
                <dt className="font-display text-sm font-semibold text-ink">{c.label}</dt>
                {c.sub ? <dd className="mt-0.5 font-mono text-[11px] text-slate">{c.sub}</dd> : null}
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          {...(reduce ? {} : { initial: { opacity: 0, scale: 0.98 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] } })}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
            <Image
              src="/images/priyanshu-portrait.png"
              alt="Priyanshu Chauhan, Founder & Director of Beyond Bound"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-xl border border-line bg-surface px-4 py-3 shadow-sm">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate">Now building</p>
            <p className="mt-0.5 font-display text-sm font-semibold text-ink">
              Glycomics™ · metabolic wellness
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
