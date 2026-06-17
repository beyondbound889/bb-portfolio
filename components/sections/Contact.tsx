"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, Linkedin, ArrowRight, Check, Loader2 } from "lucide-react";
import { contact, site } from "@/lib/content";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  reason: z.string().min(1, "Pick a reason"),
  message: z.string().min(10, "A little more detail helps"),
});
type FormValues = z.infer<typeof schema>;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (raw: FormValues) => {
    const parsed = schema.safeParse(raw);
    if (!parsed.success) return;
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    // No key configured yet → fall back to a prefilled email so the form still works.
    if (!key) {
      const body = `Reason: ${raw.reason}%0D%0A%0D%0A${encodeURIComponent(raw.message)}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `[${raw.reason}] from ${raw.name}`
      )}&body=${body}`;
      return;
    }

    try {
      setStatus("sending");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: `[${raw.reason}] Beyond Bound enquiry from ${raw.name}`,
          from_name: raw.name,
          ...raw,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" tint>
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr]">
        <Reveal>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-3xl font-semibold leading-[1.08] tracking-tightest text-ink sm:text-[2.6rem]">
            {contact.title}
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-slate">{contact.sub}</p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink transition-colors hover:border-petrol"
            >
              <Mail size={16} className="text-petrol" />
              {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink transition-colors hover:border-petrol"
            >
              <Linkedin size={16} className="text-petrol" />
              LinkedIn — Priyanshu Chauhan
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {status === "done" ? (
            <div className="flex h-full min-h-[20rem] flex-col items-start justify-center rounded-2xl border border-line bg-surface p-8">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-sprout/15 text-sprout">
                <Check size={22} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">Message sent.</h3>
              <p className="mt-2 text-slate">Thanks — I’ll get back to you personally.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4 rounded-2xl border border-line bg-surface p-7"
              noValidate
            >
              <Field label="Name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  className="input"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  className="input"
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </Field>
              <Field label="Reason" error={errors.reason?.message}>
                <select {...register("reason")} className="input" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  {contact.reasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="input resize-none"
                  placeholder="What would you like to talk about?"
                />
              </Field>

              {status === "error" ? (
                <p className="text-sm text-petrol">
                  Something went wrong. Email {site.email} directly and it’ll reach me.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>

      <style>{`
        .input{width:100%;border-radius:0.6rem;border:1px solid rgb(var(--line));background:rgb(var(--paper));padding:0.7rem 0.9rem;font-size:0.9rem;color:rgb(var(--ink));outline:none}
        .input::placeholder{color:rgb(var(--slate))}
        .input:focus{border-color:rgb(var(--petrol))}
      `}</style>
    </Section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-slate">
        {label}
        {error ? <span className="normal-case tracking-normal text-petrol">{error}</span> : null}
      </span>
      {children}
    </label>
  );
}
