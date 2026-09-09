"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { InnerPage } from "@/components/inner-page";

export default function ContactPage() {
  return (
    <InnerPage
      eyebrow="Contact / Start a conversation"
      title={
        <>
          Bring us the <em>growth problem.</em>
        </>
      }
      intro="Tell us what you are building, where the friction is and what you want to make clearer."
    >
      <Form title="Contact enquiry" />
    </InnerPage>
  );
}

export function Form({ title = "Growth audit request", audit = false }: { title?: string; audit?: boolean }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    const values = {
      name: String(payload.name ?? "").trim(),
      company: String(payload.company ?? "").trim(),
      website: String(payload.website ?? "").trim(),
      industry: String(payload.industry ?? "").trim(),
      location: String(payload.location ?? "").trim(),
      email: String(payload.email ?? "").trim(),
      phone: String(payload.phone ?? "").trim(),
      budget: String(payload.budget ?? "").trim(),
      objective: String(payload.objective ?? "").trim(),
      channels: String(payload.channels ?? "").trim(),
      challenge: String(payload.challenge ?? "").trim(),
      service: String(payload.service ?? "").trim(),
      description: String(payload.description ?? "").trim(),
      consent: String(payload.consent ?? ""),
    };

    const isAudit = audit;
    const requiredFields = [
      values.name,
      values.company,
      values.email,
      values.phone,
      values.website,
      values.industry,
      values.consent,
    ];

    if (isAudit) {
      requiredFields.push(
        values.location,
        values.budget,
        values.objective,
        values.channels,
        values.challenge,
      );
    } else {
      requiredFields.push(values.service, values.budget, values.description);
    }

    if (requiredFields.some((field) => field.length === 0)) {
      setStatus("error");
      setErrorMessage("Please complete all required fields before submitting.");
      return;
    }

    if (!values.email.includes("@") || !values.email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!/^https?:\/\//i.test(values.website)) {
      setStatus("error");
      setErrorMessage("Please enter a valid website URL including http:// or https://");
      return;
    }

    if (values.consent.toLowerCase() !== "on") {
      setStatus("error");
      setErrorMessage("Please confirm the privacy consent checkbox.");
      return;
    }

    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) throw new Error(data?.error ?? "delivery failed");

      form.reset();
      setStatus("success");
      setErrorMessage("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong while sending the form.");
    }
  }

  return (
    <section className="section shell form-section">
      <div className="form-intro"><p className="eyebrow">Private briefing room</p><h2>Make the next <em>move clearer.</em></h2><p>Share the context behind the challenge. We will come back with the most useful next step.</p></div>
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <input type="hidden" name="formType" value={audit ? "growth-audit" : "contact"} />

        <label className="honeypot" aria-hidden="true">
          Leave this blank
          <input tabIndex={-1} autoComplete="off" name="websiteConfirm" />
        </label>

        <label>
          Name
          <input required maxLength={100} name="name" autoComplete="name" />
        </label>

        <label>
          Company
          <input required maxLength={120} name="company" autoComplete="organization" />
        </label>

        <label>
          Website
          <input required type="url" maxLength={200} name="website" autoComplete="url" />
        </label>

        {audit && (
          <>
            <label>
              Industry
              <input required maxLength={100} name="industry" />
            </label>
            <label>
              Location
              <input required maxLength={100} name="location" />
            </label>
            <label>
              Phone
              <input required maxLength={40} name="phone" autoComplete="tel" />
            </label>
            <label>
              Monthly marketing budget
              <input required maxLength={100} name="budget" />
            </label>
            <label>
              Main objective
              <textarea required maxLength={1000} name="objective" rows={3} />
            </label>
            <label>
              Current marketing channels
              <textarea required maxLength={1000} name="channels" rows={3} />
            </label>
            <label>
              Biggest challenge
              <textarea required maxLength={1000} name="challenge" rows={3} />
            </label>
          </>
        )}

        {!audit && (
          <>
            <label>
              Industry
              <input required maxLength={100} name="industry" />
            </label>
            <label>
              Phone
              <input required maxLength={40} name="phone" autoComplete="tel" />
            </label>
            <label>
              Service required
              <input required maxLength={120} name="service" />
            </label>
            <label>
              Budget
              <input required maxLength={100} name="budget" />
            </label>
            <label>
              Project description
              <textarea required maxLength={1500} name="description" rows={5} />
            </label>
          </>
        )}

        <label>
          Email
          <input required maxLength={160} type="email" name="email" autoComplete="email" />
        </label>

        <label className="consent">
          <input required type="checkbox" name="consent" value="on" /> I agree to be contacted about this enquiry.
        </label>

        <button className="button" type="submit">
          Send enquiry <i>-&gt;</i>
        </button>

        {status === "success" && (
          <p className="form-success" role="status">
            <strong>{audit ? "Your Growth Audit Request Has Been Received." : "Your request has been received."}</strong>
          </p>
        )}

        {status === "error" && (
          <p className="form-error" role="alert">{errorMessage || "There was a problem with your submission."}</p>
        )}
      </form>
    </section>
  );
}
