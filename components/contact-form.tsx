"use client";

import { email } from "@/lib/contact";
import { FormEvent } from "react";

type ContactFormProps = {
  labels: {
    formTitle: string;
    formNote: string;
    name: string;
    organization: string;
    email: string;
    message: string;
    submit: string;
    required: string;
  };
};

export function ContactForm({ labels }: ContactFormProps) {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const organization = String(data.get("organization") ?? "");
    const from = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`LSAR* Works Group — ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}\n${organization}\n${from}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  const field =
    "mt-2 w-full border border-charcoal/15 bg-paper px-3 py-3 text-base text-charcoal outline-none transition-colors focus:border-olive";

  return (
    <form onSubmit={onSubmit} className="bg-stone px-6 py-8 sm:px-8" noValidate={false}>
      <h2 className="font-display text-3xl text-charcoal">{labels.formTitle}</h2>
      <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{labels.formNote}</p>
      <div className="mt-8 grid gap-5">
        <label className="text-sm text-charcoal">
          {labels.name}
          <span className="sr-only"> {labels.required}</span>
          <input className={field} name="name" type="text" required autoComplete="name" />
        </label>
        <label className="text-sm text-charcoal">
          {labels.organization}
          <input className={field} name="organization" type="text" autoComplete="organization" />
        </label>
        <label className="text-sm text-charcoal">
          {labels.email}
          <span className="sr-only"> {labels.required}</span>
          <input className={field} name="email" type="email" required autoComplete="email" />
        </label>
        <label className="text-sm text-charcoal">
          {labels.message}
          <span className="sr-only"> {labels.required}</span>
          <textarea className={`${field} min-h-36 resize-y`} name="message" required />
        </label>
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center bg-charcoal px-6 text-sm text-ivory transition-colors hover:bg-olive hover:text-white sm:w-auto"
        >
          {labels.submit}
        </button>
      </div>
    </form>
  );
}
