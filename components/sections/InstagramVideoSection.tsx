'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * InstagramVideoSection
 * Embeds the Instagram reel: https://www.instagram.com/reel/DUNpGpFjFYv/
 * Place this section between the "Why I Started Building" section and
 * the "Founder Journey" timeline — it serves as a cinematic interstitial
 * that shows the founder in motion before diving into his detailed story.
 */
export default function InstagramVideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });

  useEffect(() => {
    if (!isInView) return;
    // Dynamically load Instagram embed script only when section is visible
    if (document.querySelector('script[src*="instagram.com/embed.js"]')) {
      // Script already present — just re-process embeds
      // @ts-ignore
      if (window.instgrm) window.instgrm.Embeds.process();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.instgrm) window.instgrm.Embeds.process();
    };
    document.body.appendChild(script);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="ig-video-section"
      aria-label="Founder in the field"
    >
      <div className="ig-video-inner">
        {/* Left — editorial text */}
        <motion.div
          className="ig-video-text"
          initial={{ opacity: 0, x: -32 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="ig-eyebrow">In the field</span>
          <h2 className="ig-headline">
            The build<br />happens in public.
          </h2>
          <p className="ig-body">
            Priyanshu doesn&rsquo;t just theorise about metabolic wellness —
            he tests it on himself first, tracks every variable, and documents
            what the data actually shows. No polished claims. Just the work.
          </p>
          <a
            href="https://www.instagram.com/reel/DUNpGpFjFYv/"
            target="_blank"
            rel="noopener noreferrer"
            className="ig-cta"
            aria-label="Watch full reel on Instagram"
          >
            Watch on Instagram
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M7.5 1.5L13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

        {/* Right — Instagram embed */}
        <motion.div
          className="ig-video-embed-wrapper"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ig-embed-container">
            {/* Instagram oEmbed blockquote */}
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink="https://www.instagram.com/reel/DUNpGpFjFYv/?utm_source=ig_embed&utm_campaign=loading"
              data-instgrm-version="14"
              style={{
                background: 'transparent',
                border: 0,
                borderRadius: '12px',
                boxShadow: 'none',
                display: 'block',
                margin: '0 auto',
                maxWidth: '400px',
                minWidth: '326px',
                padding: 0,
                width: '100%',
              }}
            >
              {/* Fallback while embed loads */}
              <div className="ig-placeholder">
                <div className="ig-placeholder-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <p className="ig-placeholder-text">Loading reel…</p>
              </div>
            </blockquote>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        /* ── Section shell ── */
        .ig-video-section {
          padding: 6rem 1.5rem;
          background: var(--background);
          border-top: 1px solid var(--border, rgba(0,0,0,0.07));
          border-bottom: 1px solid var(--border, rgba(0,0,0,0.07));
        }
        .ig-video-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 5rem;
          align-items: center;
        }
        @media (max-width: 860px) {
          .ig-video-inner {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        /* ── Text column ── */
        .ig-eyebrow {
          display: block;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted-foreground, #6b7280);
          margin-bottom: 1.2rem;
        }
        .ig-headline {
          font-size: clamp(2rem, 4.5vw, 3rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--foreground);
          margin: 0 0 1.5rem;
        }
        .ig-body {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--muted-foreground, #6b7280);
          margin: 0 0 2.2rem;
          max-width: 460px;
        }
        .ig-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--foreground);
          text-decoration: none;
          border-bottom: 1.5px solid currentColor;
          padding-bottom: 2px;
          transition: opacity 0.2s;
        }
        .ig-cta:hover { opacity: 0.65; }

        /* ── Embed column ── */
        .ig-video-embed-wrapper {
          width: 100%;
        }
        .ig-embed-container {
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 4px 6px -1px rgba(0,0,0,0.08),
            0 20px 50px -10px rgba(0,0,0,0.18);
        }

        /* Placeholder shown while IG script loads */
        .ig-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 560px;
          background: var(--card, #f9fafb);
          border-radius: 12px;
          gap: 1rem;
          color: var(--muted-foreground, #9ca3af);
        }
        .ig-placeholder-icon { opacity: 0.4; }
        .ig-placeholder-text {
          font-size: 0.85rem;
          opacity: 0.6;
        }

        /* Hide placeholder once embed is rendered by IG script */
        :global(.instagram-media iframe ~ .ig-placeholder),
        :global(.instagram-media[data-instgrm-permalink] .ig-placeholder) {
          display: none;
        }
      `}</style>
    </section>
  );
}