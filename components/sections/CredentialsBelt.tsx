'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * CredentialsBelt
 * Replaces the old scrolling marquee with a structured, stationary
 * proof-of-credentials strip. The marquee data (university, experience,
 * achievements) is redistributed here and in the StatsSection below.
 *
 * Drop-in placement: directly below the HeroSection, above Why I Started.
 */

interface CredItem {
  icon: string;
  label: string;
  sub: string;
}

const CREDENTIALS: CredItem[] = [
  { icon: '🌱', label: 'B.Sc Agriculture', sub: 'MJP Rohilkhand University' },
  { icon: '🏛️', label: 'MBA Healthcare', sub: 'K J Somaiya, Mumbai' },
  { icon: '🔬', label: 'Corporate Execution', sub: 'Patanjali · Allied Research' },
  { icon: '📦', label: 'Glycomics™', sub: 'Live on Amazon.in' },
  { icon: '📈', label: 'CGM Self-Observation', sub: '2 Seasons of Data' },
  { icon: '🏆', label: 'BIRAC · CHEMTECH', sub: 'Industry Showcase' },
  { icon: '🩺', label: 'AIIA Engagement', sub: 'All India Institute of Ayurveda' },
  { icon: '🌿', label: 'Beyond Bound®', sub: 'Registered Brand · India' },
];

function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function StatCard({
  value, suffix, label, delay, inView,
}: {
  value: number; suffix: string; label: string; delay: number; inView: boolean;
}) {
  const count = useCountUp(value, inView);
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="stat-number">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
}

export default function CredentialsBelt() {
  const beltRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isBeltInView = useInView(beltRef, { once: true, margin: '-10%' });
  const isStatsInView = useInView(statsRef, { once: true, margin: '-10%' });

  return (
    <>
      {/* ── Credentials grid ── */}
      <section
        ref={beltRef}
        className="creds-belt"
        aria-label="Credentials and milestones"
      >
        <div className="creds-inner">
          <p className="creds-eyebrow">The record so far</p>
          <div className="creds-grid">
            {CREDENTIALS.map((item, i) => (
              <motion.div
                key={item.label}
                className="cred-item"
                initial={{ opacity: 0, y: 16 }}
                animate={isBeltInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
              >
                <span className="cred-icon" aria-hidden="true">{item.icon}</span>
                <span className="cred-label">{item.label}</span>
                <span className="cred-sub">{item.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats counter strip ── */}
      <section
        ref={statsRef}
        className="stats-belt"
        aria-label="Key numbers"
      >
        <div className="stats-inner">
          <StatCard value={1}  suffix="" label="Flagship product — Glycomics™"           delay={0}    inView={isStatsInView} />
          <StatCard value={2}  suffix="" label="CGM self-observation seasons"             delay={0.08} inView={isStatsInView} />
          <StatCard value={60} suffix="" label="Capsules per pack — one full month"       delay={0.16} inView={isStatsInView} />
          <StatCard value={1}  suffix="" label="Industry showcase — BIRAC · CHEMTECH"     delay={0.24} inView={isStatsInView} />
        </div>
        <p className="stats-note">
          All figures are verified and reflect real business activity.
        </p>
      </section>

      <style jsx>{`
        /* ── Credentials belt ── */
        .creds-belt {
          padding: 4rem 1.5rem 3rem;
          background: var(--card, #f9fafb);
          border-top: 1px solid var(--border, rgba(0,0,0,0.06));
          border-bottom: 1px solid var(--border, rgba(0,0,0,0.06));
        }
        :global(.dark) .creds-belt {
          background: rgba(255,255,255,0.03);
        }
        .creds-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .creds-eyebrow {
          font-size: 0.70rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted-foreground, #9ca3af);
          margin-bottom: 2rem;
          text-align: center;
        }
        .creds-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1px;
          background: var(--border, rgba(0,0,0,0.08));
          border: 1px solid var(--border, rgba(0,0,0,0.08));
          border-radius: 12px;
          overflow: hidden;
        }
        .cred-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 1.2rem 1.3rem;
          background: var(--background);
          transition: background 0.2s;
        }
        .cred-item:hover {
          background: var(--card, #f3f4f6);
        }
        :global(.dark) .cred-item { background: var(--card, #111827); }
        :global(.dark) .cred-item:hover { background: rgba(255,255,255,0.06); }
        .cred-icon {
          font-size: 1.2rem;
          line-height: 1;
          margin-bottom: 0.35rem;
        }
        .cred-label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--foreground);
          line-height: 1.3;
        }
        .cred-sub {
          font-size: 0.75rem;
          color: var(--muted-foreground, #9ca3af);
          line-height: 1.4;
        }

        /* ── Stats belt ── */
        .stats-belt {
          padding: 3.5rem 1.5rem 1.5rem;
          background: var(--background);
        }
        .stats-inner {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 2px;
          text-align: center;
        }
        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          padding: 2rem 1rem;
          border-right: 1px solid var(--border, rgba(0,0,0,0.08));
        }
        .stat-card:last-child { border-right: none; }
        @media (max-width: 600px) {
          .stat-card { border-right: none; border-bottom: 1px solid var(--border, rgba(0,0,0,0.08)); }
          .stat-card:last-child { border-bottom: none; }
        }
        .stat-number {
          font-size: clamp(2.4rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--foreground);
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .stat-label {
          font-size: 0.75rem;
          color: var(--muted-foreground, #9ca3af);
          line-height: 1.4;
          text-align: center;
          max-width: 140px;
        }

        .stats-note {
          margin: 1.5rem auto 0;
          text-align: center;
          font-size: 0.7rem;
          color: var(--muted-foreground, #9ca3af);
          letter-spacing: 0.04em;
          max-width: 460px;
        }
      `}</style>
    </>
  );
}