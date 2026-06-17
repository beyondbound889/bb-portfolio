import { Mail, Linkedin } from "lucide-react";
import { site, nav } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-14">
      <div className="mx-auto grid w-full max-w-shell gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-lg font-semibold text-ink">{site.name}</p>
          <p className="mt-1 font-mono text-xs text-slate">{site.role}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">
            Building preventive healthcare India can trust — measured, not marketed.
          </p>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate">Navigate</p>
          <ul className="mt-4 space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-sm text-slate transition-colors hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate">Reach out</p>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-sm text-slate transition-colors hover:text-ink">
                <Mail size={14} className="text-petrol" /> {site.email}
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-slate transition-colors hover:text-ink">
                <Linkedin size={14} className="text-petrol" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-shell flex-col items-start justify-between gap-2 border-t border-line pt-6 sm:flex-row sm:items-center">
        <p className="font-mono text-[11px] text-slate">
          © {new Date().getFullYear()} {site.name}. Beyond Bound® is a registered brand.
        </p>
        <p className="font-mono text-[11px] text-slate">
          Press <kbd className="rounded border border-line px-1">⌘K</kbd> to search
        </p>
      </div>
    </footer>
  );
}
