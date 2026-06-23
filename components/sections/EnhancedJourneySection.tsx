'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * EnhancedJourneySection
 *
 * A cinematic, scroll-driven timeline with large typographic numbers,
 * sticky chapter headings, and staggered reveals.
 *
 * Replace or augment the existing journey/timeline section with this file.
 * The animation style is inspired by the partner site's storytelling approach:
 * large display numbers that track scroll, with editorial copy beside them.
 */

interface Chapter {
  num: string;
  tag: string;
  headline: string;
  body: string;
  meta: string;
  accent?: string; // optional accent label
}

const CHAPTERS: Chapter[] = [
  {
    num: '01',
    tag: 'Roots',
    headline: 'B.Sc Agriculture — Learning from the soil.',
    body: 'Trained at Mahatma Jyotiba Phule Rohilkhand University, where the first principle was simple: living systems reward patience and punish shortcuts. Agriculture taught me that health starts at the molecular level — in the food we grow and the nutrition we consume.',
    meta: 'MJP Rohilkhand University',
    accent: 'The foundation',
  },
  {
    num: '02',
    tag: 'Corporate',
    headline: 'Industry & market research at scale.',
    body: 'Hands-on exposure at Patanjali Ayurved and Allied Market Research showed me how India actually buys wellness — and how often it is sold a promise no one ever measured. Distribution channels, pharma pipeline data, consumer behavior: strategy is meaningless without execution.',
    meta: 'Patanjali Ayurved · Allied Market Research',
    accent: 'Commercial scale',
  },
  {
    num: '03',
    tag: 'Postgraduate',
    headline: 'MBA at K J Somaiya — turning instinct into discipline.',
    body: 'An MBA from K J Somaiya Institute of Management, Mumbai. The more I studied healthcare systems, the more I noticed the gap: the industry was designed to manage sickness, not to build health. We were waiting for people to become patients before giving them guidance.',
    meta: 'K J Somaiya Institute of Management, Mumbai',
    accent: 'Systems thinking',
  },
  {
    num: '04',
    tag: 'The Gap',
    headline: 'The problem wasn\'t a lack of products. It was a lack of clarity.',
    body: 'Reviewing market data and speaking to consumers showed me that wellness brands were trying to solve everything. Few focused deeply on metabolism. People were overwhelmed by conflicting advice, with no trusted destination for metabolic health.',
    meta: 'Market research · Consumer interviews',
    accent: 'The insight',
  },
  {
    num: '05',
    tag: 'Founding',
    headline: 'Beyond Bound® — registered and built on evidence.',
    body: 'Started Beyond Bound on one belief: people deserve health solutions they can verify. A registered brand focused entirely on metabolic health for everyday Indian life. Before asking anyone to trust it, I spent months wearing a continuous glucose monitor — my own glucose curve, openly tracked.',
    meta: 'Beyond Bound® — Registered Brand · India',
    accent: 'The build',
  },
  {
    num: '06',
    tag: 'Product',
    headline: 'Glycomics™ — from formulation to self-observation.',
    body: 'Developed Glycomics, a natural glucose-metabolism support formulation. Rather than building another generic wellness brand, I focused entirely on metabolic health. The formulation was pressure-tested on the founder first using a CGM — now running Self-Observation Season 2.',
    meta: 'Live on Amazon.in · Self-Observation Season 2',
    accent: 'From thesis to shelf',
  },
  {
    num: '07',
    tag: 'Stage',
    headline: 'BIRAC · CHEMTECH — into a serious research room.',
    body: 'Presented at the Biotechnology Industry Research Assistance Council stall at CHEMTECH — putting an early-stage Indian wellness product into an industry-and-research room. Connected with researchers, practitioners, and healthcare professionals at the All India Institute of Ayurveda.',
    meta: 'BIRAC · CHEMTECH · AIIA',
    accent: 'Public proof',
  },
  {
    num: '08',
    tag: '2025 →',
    headline: 'Deepening evidence. Widening the vision.',
    body: 'The goal isn\'t to build another supplement company. I want Beyond Bound to become a health brand where trust comes before marketing, evidence comes before claims, and people can turn to for absolute clarity about their metabolic health. The direction is fixed.',
    meta: 'Beyond Bound® — the next decade',
    accent: 'What\'s next',
  },
];

function ChapterItem({ chapter, index }: { chapter: Chapter; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-12%' });

  return (
    <motion.div
      ref={ref}
      className="chapter-item"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Large chapter number */}
      <motion.div
        className="chapter-num"
        aria-hidden="true"
        initial={{ x: -20, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        {chapter.num}
      </motion.div>

      {/* Content column */}
      <div className="chapter-content">
        <motion.div
          className="chapter-tags"
          initial={{ y: 12, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <span className="chapter-tag">{chapter.tag}</span>
          {chapter.accent && (
            <span className="chapter-accent">{chapter.accent}</span>
          )}
        </motion.div>

        <motion.h3
          className="chapter-headline"
          initial={{ y: 18, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          {chapter.headline}
        </motion.h3>

        <motion.p
          className="chapter-body"
          initial={{ y: 14, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          {chapter.body}
        </motion.p>

        <motion.p
          className="chapter-meta"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {chapter.meta}
        </motion.p>
      </div>

      {/* Vertical connector line */}
      {index < CHAPTERS.length - 1 && (
        <div className="chapter-connector" aria-hidden="true" />
      )}
    </motion.div>
  );
}

export default function EnhancedJourneySection() {
  return (
    <section id="journey" className="journey-section" aria-label="Founder journey">
      {/* Sticky header */}
      <div className="journey-header">
        <div className="journey-header-inner">
          <span className="journey-eyebrow">Storytelling</span>
          <h2 className="journey-title">The Journey</h2>
          <p className="journey-subtitle">
            Every step was necessary. Each one compounds into what Beyond Bound® is today.
          </p>
        </div>
      </div>

      {/* Chapter list */}
      <div className="journey-chapters">
        <div className="journey-chapters-inner">
          {CHAPTERS.map((chapter, i) => (
            <ChapterItem key={chapter.num} chapter={chapter} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ── Section shell ── */
        .journey-section {
          padding-bottom: 8rem;
          background: var(--background);
        }

        /* ── Sticky header ── */
        .journey-header {
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid var(--border, rgba(0,0,0,0.06));
          padding: 2.5rem 1.5rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: rgb(var(--paper) / 0.92);
        }
        :global(.dark) .journey-header {
          background: rgb(var(--paper) / 0.92);
        }
        .journey-header-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          align-items: baseline;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .journey-eyebrow {
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted-foreground, #9ca3af);
          flex-shrink: 0;
        }
        .journey-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: var(--foreground);
          margin: 0;
        }
        .journey-subtitle {
          font-size: 0.85rem;
          color: var(--muted-foreground, #9ca3af);
          margin: 0;
          line-height: 1.5;
        }

        /* ── Chapter list ── */
        .journey-chapters {
          max-width: 900px;
          margin: 0 auto;
          padding: 5rem 1.5rem 0;
        }
        .journey-chapters-inner {
          display: flex;
          flex-direction: column;
        }

        /* ── Individual chapter ── */
        .chapter-item {
          position: relative;
          display: grid;
          grid-template-columns: 90px 1fr;
          gap: 2.5rem;
          padding-bottom: 5rem;
        }
        @media (max-width: 600px) {
          .chapter-item {
            grid-template-columns: 56px 1fr;
            gap: 1.5rem;
          }
        }

        /* Large display number */
        .chapter-num {
          font-size: clamp(3.5rem, 7vw, 5.5rem);
          font-weight: 800;
          letter-spacing: -0.06em;
          line-height: 1;
          color: var(--border, rgba(0,0,0,0.08));
          /* Increases on hover of the whole chapter */
          transition: color 0.3s;
          user-select: none;
          padding-top: 0.1em;
          font-variant-numeric: tabular-nums;
        }
        .chapter-item:hover .chapter-num {
          color: var(--muted-foreground, rgba(0,0,0,0.2));
        }
        :global(.dark) .chapter-num { color: rgba(255,255,255,0.07); }
        :global(.dark) .chapter-item:hover .chapter-num { color: rgba(255,255,255,0.18); }

        /* Tags row */
        .chapter-tags {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.8rem;
          flex-wrap: wrap;
        }
        .chapter-tag {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted-foreground, #9ca3af);
        }
        .chapter-accent {
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--foreground);
          background: var(--card, #f3f4f6);
          border: 1px solid var(--border, rgba(0,0,0,0.08));
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }
        :global(.dark) .chapter-accent {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.1);
        }

        /* Headline */
        .chapter-headline {
          font-size: clamp(1.2rem, 2.5vw, 1.6rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.25;
          color: var(--foreground);
          margin: 0 0 1rem;
        }

        /* Body */
        .chapter-body {
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--muted-foreground, #6b7280);
          margin: 0 0 0.9rem;
          max-width: 560px;
        }

        /* Meta */
        .chapter-meta {
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: var(--muted-foreground, #9ca3af);
          border-left: 2px solid var(--border, rgba(0,0,0,0.1));
          padding-left: 0.75rem;
          margin: 0;
        }

        /* Vertical connector line */
        .chapter-connector {
          position: absolute;
          left: 44px; /* center of num column */
          top: 80px;
          bottom: 0;
          width: 1px;
          background: var(--border, rgba(0,0,0,0.08));
          transform: translateX(-0.5px);
        }
        @media (max-width: 600px) {
          .chapter-connector { left: 27px; }
        }
      `}</style>
    </section>
  );
}