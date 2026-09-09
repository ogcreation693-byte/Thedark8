"use client";

import { useEffect, useState } from "react";

const consentKey = "thedark8-analytics-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(window.localStorage.getItem(consentKey) === null), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function choose(value: "accepted" | "declined") {
    window.localStorage.setItem(consentKey, value);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("thedark8-consent", { detail: value }));
  }

  if (!visible) return null;
  return <aside className="cookie-consent" aria-label="Cookie preferences"><strong>Measurement choices</strong><p>Optional analytics helps us understand how the site is used. You can accept or decline it.</p><div><button className="button button-small" type="button" onClick={() => choose("accepted")}>Accept</button><button className="cookie-decline" type="button" onClick={() => choose("declined")}>Decline</button></div></aside>;
}
