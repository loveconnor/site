"use client";

import { useActionState, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import StatusMark from "@/components/StatusMark";
import { DatePicker } from "@/components/date-picker";
import { PillButton } from "@/components/ui";
import { submitInquiry, type InquiryState } from "@/app/contact/actions";
import { engagements, type EngagementId } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const engagementDetail: Record<EngagementId, { body: string; price?: string }> = {
  project: { body: "A website, application, or redesign with a defined scope.", price: "Websites from $4,500" },
  monthly: { body: "Reserved design and development capacity for an active backlog.", price: "$3,000 / month" },
  care: { body: "Routine care and small edits for an existing website.", price: "$250 / site / month" },
  unsure: { body: "Describe the problem and I’ll suggest the right fit." },
};

const projectBudgets = ["$4,500 – $8,000", "$8,000 – $15,000", "$15,000 – $30,000", "$30,000+", "Not sure yet"];

const planPrice: Partial<Record<EngagementId, string>> = {
  monthly: "Studio Monthly is $3,000 per month for 24 hours of reserved capacity.",
  care: "Site Care is $250 per site per month.",
};

const timingOptions = ["As soon as possible", "In the next 1–3 months", "Later this year", "Flexible"];

const steps = [
  { title: "What can I help with?", short: "Engagement" },
  { title: "Tell me about the work.", short: "The work" },
  { title: "When would you like it?", short: "Timing" },
  { title: "Where should I reply?", short: "Your details" },
];

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

type Values = {
  engagement: EngagementId;
  description: string;
  link: string;
  budget: string;
  timing: string;
  date: Date | null;
  name: string;
  email: string;
  company: string;
};
type Errors = Partial<Record<"description" | "name" | "email", string>>;

const inputClass =
  "mt-2 w-full rounded-2xl bg-card px-4 py-3.5 text-[16px] text-ink ring-1 ring-line transition-[box-shadow,background-color] duration-300 outline-none ring-inset placeholder:text-ink-3 hover:ring-ink/25 focus:bg-[#fffefb] focus:shadow-[0_0_0_4px_rgba(22,21,19,0.05)] focus:ring-ink/35 aria-[invalid=true]:ring-accent/60";

export function InquiryForm({ initialEngagement }: { initialEngagement?: EngagementId }) {
  const reduce = useReducedMotion();
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiry, { status: "idle" });
  const [step, setStep] = useState(initialEngagement ? 1 : 0);
  const [direction, setDirection] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState<Values>({
    engagement: initialEngagement ?? "unsure",
    description: "",
    link: "",
    budget: "",
    timing: "",
    date: null,
    name: "",
    email: "",
    company: "",
  });
  const heading = useRef<HTMLHeadingElement>(null);
  const last = step === steps.length - 1;

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const timing = values.date ? `Target date: ${dateFormat.format(values.date)}` : values.timing;
  const budget = planPrice[values.engagement] ?? values.budget;

  function check(at: number) {
    const next: Errors = {};
    if (at === 1 && !values.description.trim()) next.description = "Please add a little context about the work.";
    if (at === 3) {
      if (!values.name.trim()) next.name = "Please add your name.";
      if (!EMAIL.test(values.email.trim())) next.email = "Please check the email address.";
    }
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) document.getElementById(`inquiry-${first}`)?.focus();
    return !first;
  }

  function go(to: number) {
    if (to > step && !check(step)) return;
    setDirection(to > step ? 1 : -1);
    setStep(to);
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
  }

  // Enter moves forward on single-line fields instead of submitting early.
  const advanceOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !last) {
      event.preventDefault();
      go(step + 1);
    }
  };

  if (state.status === "success") {
    return (
      <motion.div
        className="min-h-[560px] border-t border-line pt-10"
        role="status"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <StatusMark status="done" size={44} doneColor="#161513" />
        <h2 className="mt-10 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.024em]">
          Thanks, your project details are in.
        </h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-2">
          I’ll review what you sent and reply to {values.email || "the email address you provided"}.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      onSubmit={(event) => {
        if (!last || !check(3)) event.preventDefault();
      }}
      className="relative"
    >
      {/* Everything the server action reads, whichever step is on screen. */}
      <input type="hidden" name="engagement" value={values.engagement} />
      <input type="hidden" name="description" value={values.description} />
      <input type="hidden" name="link" value={values.link} />
      <input type="hidden" name="budget" value={budget} />
      <input type="hidden" name="timing" value={timing} />
      <input type="hidden" name="name" value={values.name} />
      <input type="hidden" name="email" value={values.email} />
      <input type="hidden" name="company" value={values.company} />
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex items-center justify-between gap-6 border-b border-line pb-5">
        <p className="text-[13px] font-medium text-ink-2">
          <span className="text-ink tabular-nums">{step + 1}</span>
          <span className="text-ink-3"> / {steps.length}</span>
          <span className="ml-3">{steps[step].short}</span>
        </p>
        <ol className="flex w-32 gap-1.5 sm:w-44" aria-hidden="true">
          {steps.map((s, i) => (
            <li key={s.short} className="h-[3px] flex-1 overflow-hidden rounded-full bg-line">
              <motion.span
                className="block h-full origin-left rounded-full bg-ink"
                animate={{ scaleX: i <= step ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
              />
            </li>
          ))}
        </ol>
      </div>

      <div className="relative min-h-[520px] pt-10 pb-10 sm:pt-12">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={reduce ? false : { opacity: 0, x: direction * 32, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={reduce ? undefined : { opacity: 0, x: direction * -32, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <h2
              ref={heading}
              tabIndex={-1}
              className="text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.04] font-medium tracking-[-0.028em] outline-none"
            >
              {steps[step].title}
            </h2>

            <div className="mt-10">
              {step === 0 && (
                <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Engagement type">
                  {engagements.map(({ id, label }) => (
                    <Choice
                      key={id}
                      selected={values.engagement === id}
                      onSelect={() => {
                        set("engagement", id);
                        set("budget", "");
                      }}
                      title={label}
                      body={engagementDetail[id].body}
                      meta={engagementDetail[id].price}
                    />
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-8">
                  <Field label="What needs to change?" htmlFor="inquiry-description" error={errors.description}>
                    <textarea
                      id="inquiry-description"
                      rows={5}
                      value={values.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Who is it for, what isn’t working today, and what would a useful result look like?"
                      aria-invalid={Boolean(errors.description)}
                      aria-describedby={errors.description ? "inquiry-description-error" : undefined}
                      className={`${inputClass} resize-none`}
                    />
                  </Field>
                  <Field label="Website or product link" help="Optional" htmlFor="inquiry-link">
                    <input
                      id="inquiry-link"
                      type="url"
                      inputMode="url"
                      placeholder="https://"
                      value={values.link}
                      onChange={(e) => set("link", e.target.value)}
                      onKeyDown={advanceOnEnter}
                      className={inputClass}
                    />
                  </Field>
                  <div>
                    <p className="text-[15px] font-medium text-ink">
                      Budget <span className="ml-1 font-normal text-ink-3">Optional</span>
                    </p>
                    {planPrice[values.engagement] ? (
                      <p className="mt-3 rounded-2xl bg-paper-2 px-4 py-3.5 text-[15px] text-ink-2">
                        {planPrice[values.engagement]}
                      </p>
                    ) : (
                      <Pills
                        label="Budget range"
                        options={projectBudgets}
                        value={values.budget}
                        onChange={(v) => set("budget", v)}
                      />
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
                  <div>
                    <p className="text-[15px] font-medium text-ink">A general timeframe</p>
                    <div className="mt-3 grid gap-2" role="radiogroup" aria-label="Timeframe">
                      {timingOptions.map((option) => {
                        const selected = !values.date && values.timing === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => {
                              set("date", null);
                              set("timing", selected ? "" : option);
                            }}
                            className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[15px] ring-1 transition-colors duration-300 ring-inset ${
                              selected ? "bg-ink text-paper ring-ink" : "bg-card text-ink ring-line hover:ring-ink/30"
                            }`}
                          >
                            {option}
                            <Dot on={selected} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-ink">
                      Or a target date
                      {values.date && (
                        <span className="ml-2 font-normal text-ink-2">{dateFormat.format(values.date)}</span>
                      )}
                    </p>
                    <div className="mt-3">
                      <DatePicker
                        value={values.date}
                        label="Target date"
                        onChange={(date) => {
                          set("timing", "");
                          set("date", values.date && date.toDateString() === values.date.toDateString() ? null : date);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid gap-8">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Your name" htmlFor="inquiry-name" error={errors.name}>
                      <input
                        id="inquiry-name"
                        autoComplete="name"
                        value={values.name}
                        onChange={(e) => set("name", e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "inquiry-name-error" : undefined}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Email address" htmlFor="inquiry-email" error={errors.email}>
                      <input
                        id="inquiry-email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => set("email", e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "inquiry-email-error" : undefined}
                        className={inputClass}
                      />
                    </Field>
                  </div>
                  <Field label="Company or project" help="Optional" htmlFor="inquiry-company">
                    <input
                      id="inquiry-company"
                      autoComplete="organization"
                      value={values.company}
                      onChange={(e) => set("company", e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <dl className="grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-3">
                    {[
                      { term: "Engagement", detail: engagements.find((e) => e.id === values.engagement)?.label, to: 0 },
                      { term: "Budget", detail: (planPrice[values.engagement] ? engagementDetail[values.engagement].price : budget) || "Not given", to: 1 },
                      { term: "Timing", detail: timing.replace("Target date: ", "") || "Not given", to: 2 },
                    ].map((row) => (
                      <div key={row.term} className="bg-card px-4 py-3.5">
                        <dt className="flex items-center justify-between text-[12px] font-medium text-ink-3">
                          {row.term}
                          <button
                            type="button"
                            onClick={() => go(row.to)}
                            className="text-ink-2 underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink"
                          >
                            Edit
                          </button>
                        </dt>
                        <dd className="mt-1 truncate text-[14px] text-ink">{row.detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {state.status === "error" && (state.message || state.errors) && (
        <p role="alert" className="mb-6 rounded-2xl bg-accent/5 px-4 py-3 text-[15px] text-ink ring-1 ring-accent/30 ">
          {state.message ?? "Some details need another look. Please check each step."}
        </p>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-line pt-6">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => go(step - 1)}
            className="inline-flex items-center gap-2 py-2 text-[15px] font-medium text-ink-2 transition-colors hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M11 7H3m4-4L3 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        ) : (
          <span className="text-[13px] text-ink-3">Takes about two minutes</span>
        )}
        {last ? (
          <PillButton type="submit" disabled={pending}>
            {pending ? "Sending…" : "Send project details"}
          </PillButton>
        ) : (
          <PillButton type="button" onClick={() => go(step + 1)}>
            Continue
          </PillButton>
        )}
      </div>
      <p aria-live="polite" className="sr-only">
        {pending ? "Sending your details…" : `Step ${step + 1} of ${steps.length}: ${steps[step].short}`}
      </p>
    </form>
  );
}

function Field({
  label,
  help,
  error,
  htmlFor,
  children,
}: {
  label: string;
  help?: string;
  error?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-[15px] font-medium text-ink">
        {label}
        {help && <span className="ml-2 font-normal text-ink-3">{help}</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-2 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

function Choice({
  selected,
  onSelect,
  title,
  body,
  meta,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  body: string;
  meta?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex flex-col justify-between gap-4 rounded-[20px] sm:min-h-40 sm:gap-6 p-5 text-left ring-1 transition-colors duration-300 ring-inset sm:p-6 ${
        selected ? "bg-ink text-paper ring-ink" : "bg-card text-ink ring-line hover:ring-ink/30"
      }`}
    >
      <span className="flex items-start justify-between gap-4">
        <span className="text-[18px] font-medium tracking-[-0.015em]">{title}</span>
        <Dot on={selected} />
      </span>
      <span>
        <span className={`block text-[14px] leading-relaxed ${selected ? "text-paper/70" : "text-ink-2"}`}>{body}</span>
        {meta && (
          <span className={`mt-3 block text-[13px] font-medium ${selected ? "text-paper" : "text-ink"}`}>{meta}</span>
        )}
      </span>
    </button>
  );
}

function Pills({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(selected ? "" : option)}
            className={`rounded-full px-4 py-2.5 text-[14px] ring-1 transition-colors duration-300 ring-inset ${
              selected ? "bg-ink text-paper ring-ink" : "bg-card text-ink ring-line hover:ring-ink/30"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

/** A small radio indicator that fills when selected. */
function Dot({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ring-1 transition-colors duration-300 ring-inset ${
        on ? "ring-paper/60" : "ring-line"
      }`}
    >
      <motion.span
        className="h-2.5 w-2.5 rounded-full bg-current"
        animate={{ scale: on ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </span>
  );
}
