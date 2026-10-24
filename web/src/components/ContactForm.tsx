"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { SERVICES } from "@/lib/content";
import { SITE } from "@/lib/site";

type Fields = { name: string; email: string; phone: string; company: string; service: string; message: string };
const EMPTY: Fields = { name: "", email: "", phone: "", company: "", service: "", message: "" };

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "Please tell us your name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.message.trim().length < 10) e.message = "Please tell us a little more (at least 10 characters).";
  return e;
}

/** Posts to the existing True North contact API. If the API cannot be
 *  reached, the visitor gets a prefilled email instead, so no enquiry is lost. */
export default function ContactForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((x) => ({ ...x, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };
  const body = () => [...(f.service ? [`Service: ${f.service}`] : []), ...(f.phone ? [`Phone: ${f.phone}`] : []), "", f.message].join("\n");
  const mailto = () => `mailto:${SITE.email}?subject=${encodeURIComponent(`Project enquiry from ${f.name || "the website"}`)}&body=${encodeURIComponent(`Name: ${f.name}\nEmail: ${f.email}\nCompany: ${f.company}\n${body()}`)}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(f);
    setErrors(found);
    if (Object.keys(found).length) { document.getElementById(`cf-${Object.keys(found)[0]}`)?.focus(); return; }
    setState("sending");
    try {
      const res = await fetch(SITE.contactApi, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.name, email: f.email, phone: f.phone, company: f.company, service: f.service, message: body() }) });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      setF(EMPTY);
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="flex flex-col items-center rounded-[28px] bg-card p-10 text-center ring-1 ring-line" role="status">
        <CheckCircle2 size={46} className="text-ok" aria-hidden />
        <h2 className="mt-5 text-[26px] font-bold text-ink">Thank you. We will be in touch.</h2>
        <p className="mt-3 max-w-[420px] text-[15.5px] leading-relaxed text-ink-2">We reply within one working day with next steps.</p>
        <button type="button" onClick={() => setState("idle")} className="mt-6 text-[14.5px] font-semibold text-red underline underline-offset-4">Send another message</button>
      </div>
    );
  }

  const field = "mt-2 h-12 w-full rounded-xl bg-paper px-4 text-[15.5px] text-ink outline-none ring-1 ring-line-strong transition-shadow placeholder:text-ink-3 focus:ring-2 focus:ring-red";
  const label = "text-[14px] font-semibold text-ink";
  const err = (k: keyof Fields) => errors[k] ? <p id={`cf-${k}-err`} className="mt-1.5 text-[13px] font-medium text-red">{errors[k]}</p> : null;
  const aria = (k: keyof Fields) => ({ id: `cf-${k}`, "aria-invalid": Boolean(errors[k]) || undefined, "aria-describedby": errors[k] ? `cf-${k}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 rounded-[28px] bg-card p-6 ring-1 ring-line shadow-[0_40px_90px_-50px_rgba(20,20,20,0.4)] sm:grid-cols-2 sm:p-9">
      <div><label htmlFor="cf-name" className={label}>Your name</label><input {...aria("name")} autoComplete="name" value={f.name} onChange={set("name")} className={field} />{err("name")}</div>
      <div><label htmlFor="cf-email" className={label}>Email</label><input {...aria("email")} type="email" autoComplete="email" value={f.email} onChange={set("email")} className={field} />{err("email")}</div>
      <div><label htmlFor="cf-phone" className={label}>Phone (optional)</label><input {...aria("phone")} type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} placeholder="+91" className={field} /></div>
      <div><label htmlFor="cf-company" className={label}>Company (optional)</label><input {...aria("company")} autoComplete="organization" value={f.company} onChange={set("company")} className={field} /></div>
      <div className="sm:col-span-2"><label htmlFor="cf-service" className={label}>What do you need?</label>
        <select {...aria("service")} value={f.service} onChange={set("service")} className={field}>
          <option value="">Choose one</option>
          {SERVICES.map((s) => <option key={s.slug}>{s.name}</option>)}
          <option>GRIT for my school</option>
          <option>Something else</option>
        </select></div>
      <div className="sm:col-span-2"><label htmlFor="cf-message" className={label}>Tell us about your project</label>
        <textarea {...aria("message")} rows={5} value={f.message} onChange={set("message")} placeholder="What you are building, where you are now, and what good looks like" className={`${field} h-auto py-3`} />{err("message")}</div>
      {state === "error" ? <p className="sm:col-span-2 rounded-xl bg-red-soft px-4 py-3 text-[14px] font-medium text-red-strong" role="alert">We could not send your message just now. <a className="underline" href={mailto()}>Send it by email instead</a>, or write to {SITE.email}.</p> : null}
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-ink-3">We use your details only to reply to you. <a href="/privacy/" className="underline underline-offset-2">Privacy Policy</a></p>
        <button type="submit" disabled={state === "sending"} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-red px-7 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(211,8,18,0.65)] transition-colors hover:bg-red-strong disabled:opacity-70">
          {state === "sending" ? <><Loader2 size={17} className="animate-spin" aria-hidden /> Sending</> : <>Send Message <Send size={16} aria-hidden /></>}
        </button>
      </div>
    </form>
  );
}
