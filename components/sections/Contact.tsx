"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, Mail, Phone, Instagram } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    interest: "Architectural Penthouse",
    budget: "€ 5M — 15M",
  });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Curtain-pull reveal: large background that rises from below */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[110%] z-0 origin-bottom"
        style={{
          background: "var(--color-surface)",
          y,
        }}
      />

      <div className="relative z-10 container-x py-24 lg:py-48">
        {/* 
          First Grid Block:
          Changed from static grid-cols-12 to responsive grid-cols-1.
          This completely prevents gap blowout on mobile screens.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <span className="eyebrow">— § V · The Salon</span>
          </div>
          <div className="col-span-1 lg:col-span-10">
            <h2 className="font-display text-[clamp(2.5rem,7vw,7.5rem)] leading-[0.94] tracking-tightest text-balance">
              Begin <em className="italic text-gold-shimmer">a quiet</em>{" "}
              <br className="hidden lg:block" /> conversation.
            </h2>
            <p
              className="mt-8 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--color-ink-soft)" }}
            >
              Our brokers are available for private viewings, off-market
              introductions, and acquisition counsel. The first conversation is
              always without obligation.
            </p>
          </div>
        </div>

        {/* 
          Second Grid Block:
          Using grid-cols-1 for mobile, so gap-10 applies only vertically (row-gap).
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16">
          {/* Form Container */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-1 lg:col-span-7 space-y-8 w-full min-w-0"
          >
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              required
            />

            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              required
            />

            <SelectField
              label="I am seeking"
              value={form.interest}
              options={[
                "Architectural Penthouse",
                "Modernist Villa",
                "Heritage Estate",
                "Off-Market Mandate",
                "Acquisition Counsel",
              ]}
              onChange={(v) => setForm({ ...form, interest: v })}
            />

            <SelectField
              label="Indicated budget"
              value={form.budget}
              options={[
                "€ 1M — 5M",
                "€ 5M — 15M",
                "€ 15M — 40M",
                "€ 40M+",
                "Prefer to discuss",
              ]}
              onChange={(v) => setForm({ ...form, budget: v })}
            />

            <div className="w-full min-w-0">
              <label
                className="text-[10px] uppercase tracking-[0.32em]"
                style={{ color: "var(--color-ink-muted)" }}
              >
                A note
              </label>
              <textarea
                rows={3}
                placeholder="Tell us, in a sentence, what you are looking for."
                className="mt-2 w-full min-w-0 bg-transparent border-b py-3 text-lg font-display italic outline-none transition-colors resize-none rounded-none block"
                style={{
                  borderColor: "var(--color-line-strong)",
                  color: "var(--color-ink)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-accent)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor =
                    "var(--color-line-strong)")
                }
              />
            </div>

            {/* Submit Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 w-full min-w-0">
              <button
                type="submit"
                data-cursor="hover"
                className="btn btn-gold w-full sm:w-auto justify-center shrink-0"
                disabled={sent}
              >
                <span>
                  {sent ? "Received — thank you" : "Send to a broker"}
                </span>
                {!sent && <ArrowUpRight size={14} strokeWidth={1.2} />}
              </button>
              <span
                className="text-[10px] uppercase tracking-[0.32em] text-left sm:text-right"
                style={{ color: "var(--color-ink-muted)" }}
              >
                Encrypted · Reply within 24h
              </span>
            </div>
          </motion.form>

          {/* Sidebar Area */}
          <div className="col-span-1 lg:col-span-5 space-y-10 lg:pl-6 w-full min-w-0">
            <ContactLink
              icon={<Mail size={14} strokeWidth={1.2} />}
              label="Atelier"
              value="atelier@maisonnoir.co"
            />
            <ContactLink
              icon={<Phone size={14} strokeWidth={1.2} />}
              label="Direct"
              value="+41 44 555 0209"
            />
            <ContactLink
              icon={<Instagram size={14} strokeWidth={1.2} />}
              label="Dispatches"
              value="@maisonnoir"
            />

            <div
              className="pt-10 border-t"
              style={{ borderColor: "var(--color-line)" }}
            >
              <div
                className="text-[10px] uppercase tracking-[0.32em] mb-4"
                style={{ color: "var(--color-ink-muted)" }}
              >
                Offices
              </div>
              <ul className="space-y-2 font-display text-xl tracking-tight">
                <li>
                  Zürich{" "}
                  <span className="text-[var(--color-ink-muted)] text-sm">
                    — HQ
                  </span>
                </li>
                <li>New York</li>
                <li>Paris</li>
                <li>Marrakech</li>
                <li>São Paulo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 border-t"
        style={{
          borderColor: "var(--color-line)",
          background: "var(--color-bg)",
        }}
      >
        <div className="container-x py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 28 28"
              className="text-[var(--color-ink)]"
            >
              <path
                d="M2 26 L14 4 L26 26 L20 26 L14 14 L8 26 Z"
                fill="currentColor"
              />
              <line
                x1="14"
                y1="4"
                x2="14"
                y2="26"
                stroke="var(--color-accent)"
                strokeWidth="0.6"
              />
            </svg>
            <div className="font-display text-sm tracking-[0.32em] uppercase">
              Maison Noir
            </div>
          </div>
          <div
            className="text-[10px] uppercase tracking-[0.32em] flex flex-wrap gap-x-8 gap-y-2"
            style={{ color: "var(--color-ink-muted)" }}
          >
            <span>© MMXXVI</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Press · Financial Times, AD, Wallpaper*</span>
          </div>
        </div>
        <div
          className="overflow-hidden border-t"
          style={{ borderColor: "var(--color-line)" }}
        >
          <div className="font-display text-[clamp(4rem,18vw,18rem)] leading-none tracking-tightest py-6 px-6 marquee-mask">
            <span className="flex gap-12 animate-marquee-slow whitespace-nowrap">
              <span>MAISON</span>
              <span className="italic text-gold-shimmer">—</span>
              <span>NOIR</span>
              <span>·</span>
              <span>ARCHITECTURE</span>
              <span className="italic text-gold-shimmer">—</span>
              <span>REPRESENTED</span>
              <span>·</span>
              <span>WITH</span>
              <span className="italic text-gold-shimmer">—</span>
              <span>CARE</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="w-full min-w-0">
      <label
        className="text-[10px] uppercase tracking-[0.32em]"
        style={{ color: "var(--color-ink-muted)" }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        /* Added min-w-0 and block to release browser content limits on mobile */
        className="mt-2 w-full min-w-0 bg-transparent border-b py-3 text-lg font-display italic outline-none transition-colors rounded-none block"
        style={{
          borderColor: "var(--color-line-strong)",
          color: "var(--color-ink)",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-accent)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-line-strong)")
        }
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full min-w-0">
      <label
        className="text-[10px] uppercase tracking-[0.32em]"
        style={{ color: "var(--color-ink-muted)" }}
      >
        {label}
      </label>
      <div className="relative mt-2 w-full min-w-0">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          /* Added min-w-0 and block */
          className="w-full min-w-0 appearance-none bg-transparent border-b py-3 pr-8 text-lg font-display italic outline-none transition-colors rounded-none block"
          style={{
            borderColor: "var(--color-line-strong)",
            color: "var(--color-ink)",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-accent)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-line-strong)")
          }
        >
          {options.map((o) => (
            <option
              key={o}
              value={o}
              style={{ background: "var(--color-bg-elev)" }}
            >
              {o}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[var(--color-accent)]">
          ▾
        </span>
      </div>
    </div>
  );
}

function ContactLink({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href="#"
      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 border-b py-4 w-full overflow-hidden min-w-0"
      data-cursor="hover"
      style={{ borderColor: "var(--color-line)" }}
    >
      <div className="flex items-center gap-3">
        <span className="text-[var(--color-accent)]">{icon}</span>
        <span
          className="text-[10px] uppercase tracking-[0.32em]"
          style={{ color: "var(--color-ink-muted)" }}
        >
          {label}
        </span>
      </div>
      <span className="font-display text-lg sm:text-xl tracking-tight group-hover:text-[var(--color-accent)] transition-colors truncate">
        {value}
      </span>
    </a>
  );
}
